<?php
session_start();
require_once 'conexion.php';

header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON

// Verificar autenticación
if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode(["error" => "No autenticado"]);
    exit;
}

// Leer y decodificar el JSON
$input = json_decode(file_get_contents("php://input"), true);

// Depuración: Registrar el JSON recibido
file_put_contents('debug.log', print_r($input, true));

// Validar que 'resultados' y 'sexo' existan
if (!isset($input['resultados']) || !is_array($input['resultados']) || !isset($input['sexo']) || !in_array($input['sexo'], ['Masculino', 'Femenino'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos inválidos", "input" => $input]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$sexo = $input['sexo'];
$fecha = date('Y-m-d');

try {
    $stmt = $conexion->prepare("INSERT INTO test_CASM83 (id_usuario, categoria, total, count_a, count_b, sexo, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    foreach ($input['resultados'] as $categoria => $scores) {
        if (!isset($scores['total']) || !isset($scores['A']) || !isset($scores['B'])) {
            file_put_contents('debug.log', "Entrada inválida para categoría $categoria: " . print_r($scores, true) . "\n", FILE_APPEND);
            continue; // Skip invalid entries
        }
        $total = (int)$scores['total'];
        $count_a = (int)$scores['A'];
        $count_b = (int)$scores['B'];
        $stmt->bind_param("isiiiss", $id_usuario, $categoria, $total, $count_a, $count_b, $sexo, $fecha);
        $stmt->execute();
    }
    
    echo json_encode(["message" => "Resultados guardados correctamente"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar resultados: " . $e->getMessage()]);
}

$stmt->close();
$conexion->close();
?>