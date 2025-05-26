<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

// Validar si el usuario está logueado
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "mensaje" => "No ha iniciado sesión"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
require_once 'conexion.php';

// Buscar resultados del test_CASM83
$sqlResultados = "SELECT categoria, total, count_a, count_b, sexo, fecha FROM test_CASM83 WHERE id_usuario = ? ORDER BY id ASC";
$stmt = $conexion->prepare($sqlResultados);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$resultados = $stmt->get_result();

$datos = [];
while ($fila = $resultados->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode(["exito" => true, "resultados" => $datos]);

$stmt->close();
$conexion->close();
?>