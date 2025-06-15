<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"]) || !isset($_SESSION["jerarquia"])) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

if (!isset($_GET["id_inicio"]) || !is_numeric($_GET["id_inicio"])) {
    echo json_encode(["exito" => false, "mensaje" => "ID de test inválido."]);
    exit;
}

require_once "conexion.php";

if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "mensaje" => "Error de conexión a la base de datos."]);
    exit;
}

$idInicio = (int)$_GET["id_inicio"];
$jerarquia = $_SESSION["jerarquia"];

$idFin = $idInicio + 12;
$sql = "SELECT categoria, total, count_a, count_b, sexo, fecha 
        FROM test_casm83 
        WHERE id BETWEEN ? AND ? 
        AND id_usuario IN (
            SELECT id FROM usuario 
            WHERE tipo_cuenta = 'Invitación' OR ? = 'admin'
        ) 
        ORDER BY id ASC";
$stmt = $conexion->prepare($sql);
if (!$stmt) {
    error_log("Error al preparar consulta: " . $conexion->error);
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