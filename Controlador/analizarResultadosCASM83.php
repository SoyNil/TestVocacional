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
$sexo = $input['sexo'] ?? '';

if (empty($resultados) || empty($sexo)) {
    logError("No se proporcionaron datos suficientes para analizar: " . json_encode($input));
    echo json_encode(['exito' => false, 'mensaje' => 'No se proporcionaron datos suficientes para analizar.']);
    exit;
}

// Definir rangos de percentiles según sexo
$rangos = $sexo === "Masculino" ? [
    "CCFM" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-12" => "Indecisión", "14-15" => "Promedio Alto", "16-17" => "Alto", "18-22" => "Muy Alto"],
    "CCSS" => ["0-3" => "Desinterés", "4-6" => "Bajo", "7-8" => "Promedio Bajo", "9-12" => "Indecisión", "13-14" => "Promedio Alto", "15-16" => "Alto", "17-22" => "Muy Alto"],
    "CCNA" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-13" => "Indecisión", "14-15" => "Promedio Alto", "16-18" => "Alto", "19-22" => "Muy Alto"],
    "CCCO" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-10" => "Indecisión", "11-13" => "Promedio Alto", "14-17" => "Alto", "18-22" => "Muy Alto"],
    "ARTE" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-10" => "Indecisión", "11-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
    "BURO" => ["0-3" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-10" => "Indecisión", "11-13" => "Promedio Alto", "14-15" => "Alto", "16-22" => "Muy Alto"],
    "CCEP" => ["0-2" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-10" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
    "HAA" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-9" => "Indecisión", "10-12" => "Promedio Alto", "13-14" => "Alto", "15-18" => "Muy Alto"],
    "FINA" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-7" => "Promedio Bajo", "8-10" => "Indecisión", "11-13" => "Promedio Alto", "14-15" => "Alto", "16-20" => "Muy Alto"],
    "LING" => ["0-3" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-9" => "Indecisión", "10-12" => "Promedio Alto", "13-14" => "Alto", "15-20" => "Muy Alto"],
    "JURI" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-7" => "Promedio Bajo", "8-10" => "Indecisión", "11-13" => "Promedio Alto", "14-15" => "Alto", "16-20" => "Muy Alto"]
] : [
    "CCFM" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
    "CCSS" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-14" => "Indecisión", "15-16" => "Promedio Alto", "17-19" => "Alto", "20-22" => "Muy Alto"],
    "CCNA" => ["0-3" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
    "CCCO" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
    "ARTE" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
    "BURO" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-14" => "Indecisión", "15-16" => "Promedio Alto", "17-19" => "Alto", "20-22" => "Muy Alto"],
    "CCEP" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
    "HAA" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-9" => "Indecisión", "10-12" => "Promedio Alto", "13-15" => "Alto", "16-22" => "Muy Alto"],
    "FINA" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
    "LING" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
    "JURI" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"]
];

// Crear tabla de datos para el prompt
$datos_tabla = "Resultados del Test CASM-83:\n\nCategoría\tPuntaje\tA\tB\tNivel\tSexo\n";
$hash_input = "";
foreach ($resultados as $categoria => $datos) {
    if (!isset($datos['total'], $datos['A'], $datos['B'])) {
        logError("Formato de datos inválido: " . json_encode($resultados));
        echo json_encode(['exito' => false, 'mensaje' => 'Formato de datos inválido.']);
        exit;
    }

    // Determinar el nivel según el puntaje y los rangos
    $puntaje = $datos['total'];
    $nivel = "Desconocido";
    if (isset($rangos[$categoria])) {
        foreach ($rangos[$categoria] as $rango => $etiqueta) {
            list($min, $max) = explode("-", $rango);
            if ($puntaje >= $min && $puntaje <= $max) {
                $nivel = $etiqueta;
                break;
            }
        }
    }

    $datos_tabla .= "$categoria\t$puntaje\t{$datos['A']}\t{$datos['B']}\t$nivel\t$sexo\n";
    $hash_input .= "$categoria|{$datos['total']}|{$datos['A']}|{$datos['B']}|$nivel|$sexo|";
}

$grupo_hash = hash('sha256', $hash_input);

// Verificar si el análisis ya existe en la base de datos
$result = $conexion->query("SELECT analisis FROM analisis_casm83 WHERE grupo_hash = '$grupo_hash'");
if ($result === false) {
    logError("Error en consulta SQL: " . $conexion->error);
    echo json_encode(['exito' => false, 'mensaje' => 'Error en la base de datos: ' . $conexion->error]);
    exit;
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['exito' => true, 'analisis' => $row['analisis']]);
    exit;
}

// Configurar solicitud a la API de Together
$together_api_key = "d285b1cfe48c461f457e1a3d0241826e4f17d04bc98e5dead7d48c9107912a4e"; // Reemplaza con tu clave
$together_api_url = "https://api.together.xyz/v1/chat/completions";

$data = [
    "model" => "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    "messages" => [
        [
            "role" => "system",
            "content" => "Eres un asistente especializado en análisis vocacional. Recibes los resultados de un test CASM-83, que evalúan intereses vocacionales en 13 categorías (CCFM, CCSS, CCNA, CCCO, ARTE, BURO, CCEP, HAA, FINA, LING, JURI, VERA, CONS). Cada categoría tiene un puntaje (0-22), respuestas A y B, un nivel (Desinterés, Bajo, Promedio Bajo, Indecisión, Promedio Alto, Alto, Muy Alto), y el sexo del participante (Masculino/Femenino). Genera un análisis en prosa claro, conciso y en español, detallando los intereses principales, patrones, fortalezas, debilidades y recomendaciones vocacionales. No menciones la falta de acceso a datos ni incluyas explicaciones técnicas."
        ],
        [
            "role" => "user",
            "content" => "Analiza los siguientes resultados del Test CASM-83 en un párrafo en prosa:\n\n$datos_tabla"
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
    "Authorization: Bearer $together_api_key"
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

// Guardar el análisis en la base de datos
$stmt = $conexion->prepare("INSERT INTO analisis_casm83 (grupo_hash, analisis) VALUES (?, ?)");
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