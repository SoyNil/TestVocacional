<?php
session_start();
require_once 'conexion.php';

if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo "No autenticado";
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['resultados']) || !is_array($input['resultados'])) {
    http_response_code(400);
    echo "Datos inválidos";
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$fecha = date('Y-m-d');

$stmt = $conexion->prepare("INSERT INTO test_CASM85 (id_usuario, area, puntaje, categoria, fecha) VALUES (?, ?, ?, ?, ?)");

foreach ($input['resultados'] as $resultado) {
    $area = $resultado['area'];
    $puntaje = $resultado['puntaje'];
    $categoria = $resultado['categoria'];
    $stmt->bind_param("isiss", $id_usuario, $area, $puntaje, $categoria, $fecha);
    $stmt->execute();
}

echo "Resultados guardados correctamente";
?>
