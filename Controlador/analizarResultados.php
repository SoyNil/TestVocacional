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

$datos_tabla = "Resultados del Test CASM85:\n\nÁrea\tPuntaje\tCategoría\tFecha\n";
$hash_input = "";
foreach ($resultados as $fila) {
    if (!isset($fila['area'], $fila['puntaje'], $fila['categoria'], $fila['fecha'])) {
        logError("Formato de datos inválido: " . json_encode($resultados));
        echo json_encode(['exito' => false, 'mensaje' => 'Formato de datos inválido.']);
        exit;
    }
    $datos_tabla .= "{$fila['area']}\t{$fila['puntaje']}\t{$fila['categoria']}\t{$fila['fecha']}\n";
    $hash_input .= "{$fila['area']}|{$fila['puntaje']}|{$fila['categoria']}|{$fila['fecha']}|";
}

$grupo_hash = hash('sha256', $hash_input);

$result = $conexion->query("SELECT analisis_texto FROM analisis_casm85 WHERE grupo_hash = '$grupo_hash'");
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

$together_api_key = "d285b1cfe48c461f457e1a3d0241826e4f17d04bc98e5dead7d48c9107912a4e";
$together_api_url = "https://api.together.xyz/v1/chat/completions";

$data = [
    "model" => "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    "messages" => [
        [
            "role" => "system",
            "content" => "Eres un asistente especializado en análisis de datos. Recibes los resultados de un test CASM85, que evalúa hábitos de estudio en 5 áreas. Cada área tiene un puntaje (0 a 5) y una categoría (MUY NEGATIVO, NEGATIVO, REGULAR, POSITIVO, MUY POSITIVO). Genera un análisis en prosa claro, conciso y en español, destacando patrones, fortalezas, debilidades y recomendaciones basadas en los datos proporcionados. No menciones la falta de acceso a datos ni incluyas explicaciones técnicas."
        ],
        [
            "role" => "user",
            "content" => "Analiza los siguientes resultados del test CASM85 en un párrafo en prosa:\n\n$datos_tabla"
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

$stmt = $conexion->prepare("INSERT INTO analisis_casm85 (grupo_hash, analisis_texto) VALUES (?, ?)");
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