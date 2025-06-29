<?php
session_start();
header('Content-Type: application/json');

function logError($mensaje) {
    $logFile = __DIR__ . '/error_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $mensaje\n", FILE_APPEND);
}

include "../Controlador/conexion.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    logError("Método no permitido: " . $_SERVER["REQUEST_METHOD"]);
    echo json_encode(['exito' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$resultados = $input['resultados'] ?? [];

if (empty($resultados)) {
    logError("No se proporcionaron datos para analizar.");
    echo json_encode(['exito' => false, 'mensaje' => 'No se proporcionaron datos para analizar.']);
    exit;
}

// Validar campos de PMA
if (!isset($resultados['factorV'], $resultados['factorE'], $resultados['factorR'], $resultados['factorN'], $resultados['factorF'], $resultados['puntajeTotal'], $resultados['fecha'])) {
    logError("Formato de datos inválido: " . json_encode($resultados));
    echo json_encode(['exito' => false, 'mensaje' => 'Formato de datos inválido.']);
    exit;
}

// Normalizar el formato de fecha a YYYY-MM-DD
$fecha = date('Y-m-d', strtotime($resultados['fecha']));

// Redondear puntajeTotal a 2 decimales
$puntajeTotal = number_format((float)$resultados['puntajeTotal'], 2, '.', '');

// Crear string para tabla
$datos_tabla = "Resultados del Test PMA:\n\n";
$datos_tabla .= "Factor\tPuntaje\tMáximo\n";
$datos_tabla .= "Comprensión Verbal (V)\t{$resultados['factorV']}\t50\n";
$datos_tabla .= "Razonamiento Espacial (E)\t{$resultados['factorE']}\t20\n";
$datos_tabla .= "Razonamiento (R)\t{$resultados['factorR']}\t30\n";
$datos_tabla .= "Cálculo Numérico (N)\t{$resultados['factorN']}\t70\n";
$datos_tabla .= "Fluidez Verbal (F)\t{$resultados['factorF']}\t75\n";
$datos_tabla .= "Puntuación Total\t{$puntajeTotal}\t-\n";

// Crear hash con fecha normalizada y puntajeTotal redondeado
$hash_input = "{$resultados['factorV']}|{$resultados['factorE']}|{$resultados['factorR']}|{$resultados['factorN']}|{$resultados['factorF']}|{$puntajeTotal}|$fecha|";
logError("Hash_input para PMA: $hash_input");
$grupo_hash = hash('sha256', $hash_input);

// Consultar si el análisis ya existe
$result = $conexion->query("SELECT analisis_texto FROM analisis_pma WHERE grupo_hash = '$grupo_hash'");
if ($result === false) {
    logError("Error en consulta SQL: " . $conexion->error);
    echo json_encode(['exito' => false, 'mensaje' => 'Error en la base de datos: ' . $conexion->error]);
    exit;
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['exito' => true, 'analisis' => $row['analisis_texto']]);
    exit;
}

// Configurar API de Together
$together_api_key = "d285b1cfe48c461f457e1a3d0241826e4f17d04bc98e5dead7d48c9107912a4e";
$together_api_url = "https://api.together.xyz/v1/chat/completions";

$data = [
    "model" => "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    "messages" => [
        [
            "role" => "system",
            "content" => "Eres un asistente especializado en análisis de datos psicológicos. Recibes los resultados del Test de Aptitudes Mentales Primarias (PMA), que evalúa cinco factores: Comprensión Verbal (V, máx. 50), Razonamiento Espacial (E, máx. 20), Razonamiento (R, máx. 30), Cálculo Numérico (N, máx. 70), y Fluidez Verbal (F, máx. 75), junto con una puntuación total. Genera un análisis en prosa claro, conciso y en español, destacando fortalezas, debilidades, patrones y recomendaciones para el desarrollo personal o profesional basadas en los puntajes. Usa rangos para clasificar los puntajes: Alto (>80% del máximo), Medio (50-80%), Bajo (<50%). No menciones la falta de acceso a datos ni incluyas explicaciones técnicas."
        ],
        [
            "role" => "user",
            "content" => "Analiza los siguientes resultados del Test PMA en un párrafo en prosa:\n\n$datos_tabla"
        ]
    ],
    "temperature" => 0.7,
    "max_tokens" => 500
];

$ch = curl_init($together_api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer " . $together_api_key
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 429) {
    logError("Límite de solicitudes alcanzado (HTTP 429).");
    echo json_encode(['exito' => false, 'mensaje' => 'Límite de solicitudes alcanzado. Intenta de nuevo en un momento.']);
    exit;
} elseif ($http_code !== 200) {
    logError("Error en API. Código HTTP: $http_code, Respuesta: $response");
    echo json_encode(['exito' => false, 'mensaje' => "Error en API. Código HTTP: $http_code"]);
    exit;
}

$result = json_decode($response, true);
$analisis = $result["choices"][0]["message"]["content"] ?? "Error en la respuesta del bot.";
if ($analisis === "Error en la respuesta del bot.") {
    logError("Error en respuesta de API: " . json_encode($result));
    echo json_encode(['exito' => false, 'mensaje' => $analisis]);
    exit;
}

// Guardar análisis en la base de datos
$stmt = $conexion->prepare("INSERT INTO analisis_pma (grupo_hash, analisis_texto, fecha) VALUES (?, ?, NOW())");
if ($stmt === false) {
    logError("Error en preparación de consulta: " . $conexion->error);
    echo json_encode(['exito' => false, 'mensaje' => 'Error en la base de datos: ' . $conexion->error]);
    exit;
}
$stmt->bind_param("ss", $grupo_hash, $analisis);
if (!$stmt->execute()) {
    logError("Error al guardar análisis: " . $stmt->error);
    echo json_encode(['exito' => false, 'mensaje' => 'Error al guardar análisis: ' . $stmt->error]);
    exit;
}
$stmt->close();

echo json_encode(['exito' => true, 'analisis' => trim($analisis)]);
exit;
?>