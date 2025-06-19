<?php
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');
require_once 'conexion.php';

// Validar si hay sesión iniciada
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "mensaje" => "No ha iniciado sesión"]);
    exit;
}

$id_usuario_sesion = $_SESSION['id_usuario'];
$jerarquia = $_SESSION['jerarquia'] ?? null;

// Si no hay parámetro GET, devolver resultados del usuario actual
if (!isset($_GET['id_inicio'])) {
    $sql = "SELECT area, puntaje, categoria, fecha 
            FROM test_casm85 
            WHERE id_usuario = ? 
            ORDER BY id ASC";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id_usuario_sesion);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }

    echo json_encode(["exito" => true, "resultados" => $datos]);
    $stmt->close();
    $conexion->close();
    exit;
}

// Si hay parámetro GET, verificar permiso de jerarquía
if (!isset($jerarquia)) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

$idInicio = (int)$_GET['id_inicio'];
$idFin = $idInicio + 4; // 5 resultados consecutivos

$sql = "SELECT area, puntaje, categoria, fecha 
        FROM test_casm85 
        WHERE id BETWEEN ? AND ? 
        AND id_usuario IN (
            SELECT id FROM usuario 
            WHERE tipo_cuenta = 'Invitación' OR ? = 'admin'
        )
        ORDER BY id ASC";

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    error_log("Error al preparar consulta: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al consultar los resultados."]);
    exit;
}

$stmt->bind_param("iis", $idInicio, $idFin, $jerarquia);
$stmt->execute();
$resultado = $stmt->get_result();

$resultados = [];
while ($row = $resultado->fetch_assoc()) {
    $resultados[] = $row;
}

if (count($resultados) !== 5) {
    echo json_encode(["exito" => false, "mensaje" => "Resultados incompletos para el test seleccionado."]);
} else {
    echo json_encode(["exito" => true, "resultados" => $resultados]);
}

$stmt->close();
$conexion->close();
?>
