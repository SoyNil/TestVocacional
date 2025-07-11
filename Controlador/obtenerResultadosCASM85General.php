<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');
require_once 'conexion.php';

// Validar sesión
if (!isset($_SESSION['id_usuario'], $_SESSION['tipo_usuario'])) {
    echo json_encode(["exito" => false, "mensaje" => "No ha iniciado sesión"]);
    exit;
}

$id_usuario_sesion = $_SESSION['id_usuario'];
$tipo_usuario = $_SESSION['tipo_usuario'];
$jerarquia = $_SESSION['jerarquia'] ?? null;

// Modo 1: obtener resultados propios
if (!isset($_GET['id_inicio'])) {
    $sql = "SELECT area, puntaje, categoria, fecha, tipo_usuario 
            FROM test_casm85 
            WHERE id_usuario = ? AND tipo_usuario = ?
            ORDER BY id ASC";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar consulta: " . $conexion->error);
        echo json_encode(["exito" => false, "mensaje" => "Error al consultar los resultados."]);
        exit;
    }
    $stmt->bind_param("is", $id_usuario_sesion, $tipo_usuario);
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

// Modo 2: obtener resultados por ID de test (rango de 5)
if (!isset($jerarquia)) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

$idInicio = (int)$_GET['id_inicio'];
$idFin = $idInicio + 4; // 5 resultados por test

$sql = "SELECT area, puntaje, categoria, fecha, tipo_usuario 
        FROM test_casm85 
        WHERE id BETWEEN ? AND ? 
        AND id_usuario IN (
            SELECT id FROM usuario WHERE tipo_cuenta = 'Invitación' OR ? = 'admin'
            UNION
            SELECT id FROM institucion WHERE ? = 'admin'
        )
        ORDER BY id ASC";

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    error_log("Error al preparar consulta: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al consultar los resultados."]);
    exit;
}

$stmt->bind_param("iiss", $idInicio, $idFin, $jerarquia, $jerarquia);
$stmt->execute();
$resultado = $stmt->get_result();

$resultados = [];
while ($row = $resultado->fetch_assoc()) {
    $resultados[] = $row;
}

if (count($resultados) !== 5) {
    echo json_encode(["exito" => false, "mensaje" => "El test seleccionado no tiene 5 registros."]);
} else {
    echo json_encode(["exito" => true, "resultados" => $resultados]);
}

$stmt->close();
$conexion->close();
?>