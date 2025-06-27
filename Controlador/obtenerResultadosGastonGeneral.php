<?php
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

require_once 'conexion.php';

// Validar sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "mensaje" => "No ha iniciado sesión"]);
    exit;
}

$id_usuario_sesion = $_SESSION['id_usuario'];
$jerarquia = $_SESSION['jerarquia'] ?? null;

// MODO 1: Obtener resultados propios
if (!isset($_GET['id_inicio'])) {
    $sql = "SELECT emotividad, actividad, resonancia, tipo_caracterologico, formula_caracterologica, sexo, fecha
            FROM test_gaston
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

// MODO 2: Obtener resultados por ID (modo admin/jerarquía)
$idInicio = (int)$_GET['id_inicio'];
$idFin = $idInicio + 12;

// Verificar que tenga jerarquía para consultar
if (!$jerarquia) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

$sql = "SELECT g.emotividad, g.actividad, g.resonancia, g.tipo_caracterologico, g.formula_caracterologica, g.sexo, g.fecha
        FROM test_gaston g
        INNER JOIN usuario u ON g.id_usuario = u.id
        WHERE g.id BETWEEN ? AND ?
        AND (u.tipo_cuenta = 'Invitación' OR ? = 'admin')
        ORDER BY g.id ASC";

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    error_log("Error al preparar consulta Gastón: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al consultar resultados."]);
    exit;
}

$stmt->bind_param("iis", $idInicio, $idFin, $jerarquia);
$stmt->execute();
$resultado = $stmt->get_result();

$resultados = [];
while ($row = $resultado->fetch_assoc()) {
    $resultados[] = $row;
}

if (count($resultados) !== 13) {
    echo json_encode(["exito" => false, "mensaje" => "El test seleccionado no tiene 13 registros."]);
} else {
    echo json_encode(["exito" => true, "resultados" => $resultados]);
}

$stmt->close();
$conexion->close();
?>
