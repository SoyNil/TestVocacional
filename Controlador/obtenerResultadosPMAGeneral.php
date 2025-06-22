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
    error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));

    echo json_encode(["exito" => false, "mensaje" => "No ha iniciado sesión"]);
    exit;
}

$id_usuario_sesion = $_SESSION['id_usuario'];
$jerarquia = $_SESSION['jerarquia'] ?? null;

// Si no hay parámetro GET, devolver resultados del usuario actual
if (!isset($_GET['id_inicio'])) {
    $sql = "SELECT id, factorV, factorE, factorR, factorN, factorF, puntajeTotal, fecha 
            FROM test_PMA 
            WHERE id_usuario = ? 
            ORDER BY id ASC";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar consulta: " . $conexion->error);
        error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));

        echo json_encode(["exito" => false, "mensaje" => "Error al consultar los resultados."]);
        exit;
    }
    $stmt->bind_param("i", $id_usuario_sesion);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));

    echo json_encode(["exito" => true, "resultados" => $datos]);
    $stmt->close();
    $conexion->close();
    exit;
}

// Si hay parámetro GET, verificar permiso de jerarquía
if (!isset($jerarquia)) {
    error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));

    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

$idInicio = (int)$_GET['id_inicio'];
$idFin = $idInicio; // Solo un resultado por test PMA

$sql = "SELECT id, factorV, factorE, factorR, factorN, factorF, puntajeTotal, fecha 
        FROM test_PMA 
        WHERE id = ? 
        AND id_usuario IN (
            SELECT id FROM usuario 
            WHERE tipo_cuenta = 'Invitación' OR ? = 'admin'
        )";

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    error_log("Error al preparar consulta: " . $conexion->error);
    error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));
    echo json_encode(["exito" => false, "mensaje" => "Error al consultar los resultados."]);
    exit;
}

$stmt->bind_param("is", $idInicio, $jerarquia);
$stmt->execute();
$resultado = $stmt->get_result();

$resultados = [];
while ($row = $resultado->fetch_assoc()) {
    $resultados[] = $row;
}

if (empty($resultados)) {
    error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));

    echo json_encode(["exito" => false, "mensaje" => "No se encontraron resultados para el ID especificado."]);
} else {
    error_log("➡️ PMA ID: $idInicio - Resultados devueltos: " . json_encode($resultados));

    // Como es PMA, debe devolver solo un objeto, no un array
    echo json_encode(["exito" => true, "resultados" => $resultados[0]]);
}

$stmt->close();
$conexion->close();
?>