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

// Iniciar transacción
$conexion->begin_transaction();

try {
    // Obtener los 5 registros del test para generar el grupo_hash
    $idFin = $idInicio + 4;
    $sqlTest = "SELECT area, puntaje, categoria, fecha 
                FROM test_casm85 
                WHERE id BETWEEN ? AND ? 
                AND id_usuario IN (
                    SELECT id FROM usuario 
                    WHERE tipo_cuenta = 'Invitación' OR ? = 'admin'
                ) 
                ORDER BY id ASC";
    $stmtTest = $conexion->prepare($sqlTest);
    if (!$stmtTest) {
        throw new Exception("Error al preparar consulta de test: " . $conexion->error);
    }
    $stmtTest->bind_param("iis", $idInicio, $idFin, $jerarquia);
    $stmtTest->execute();
    $resultadoTest = $stmtTest->get_result();

    if ($resultadoTest->num_rows !== 5) {
        throw new Exception("No se encontraron los 5 registros esperados del test.");
    }

    // Generar grupo_hash
    $hash_input = "";
    while ($row = $resultadoTest->fetch_assoc()) {
        $hash_input .= "{$row['area']}|{$row['puntaje']}|{$row['categoria']}|{$row['fecha']}|";
    }
    $grupo_hash = hash('sha256', $hash_input);

    // Eliminar análisis (si existe)
    $sqlDeleteAnalisis = "DELETE FROM analisis_casm85 WHERE grupo_hash = ?";
    $stmtDeleteAnalisis = $conexion->prepare($sqlDeleteAnalisis);
    if (!$stmtDeleteAnalisis) {
        throw new Exception("Error al preparar eliminación de análisis: " . $conexion->error);
    }
    $stmtDeleteAnalisis->bind_param("s", $grupo_hash);
    if (!$stmtDeleteAnalisis->execute()) {
        throw new Exception("Error al eliminar análisis: " . $conexion->error);
    }

    // Eliminar registros del test
    $sqlDeleteTest = "DELETE FROM test_casm85 
                      WHERE id BETWEEN ? AND ? 
                      AND id_usuario IN (
                          SELECT id FROM usuario 
                          WHERE tipo_cuenta = 'Invitación' OR ? = 'admin'
                      )";
    $stmtDeleteTest = $conexion->prepare($sqlDeleteTest);
    if (!$stmtDeleteTest) {
        throw new Exception("Error al preparar eliminación de test: " . $conexion->error);
    }
    $stmtDeleteTest->bind_param("iis", $idInicio, $idFin, $jerarquia);
    if (!$stmtDeleteTest->execute()) {
        throw new Exception("Error al eliminar test: " . $conexion->error);
    }

    if ($stmtDeleteTest->affected_rows !== 5) {
        throw new Exception("No se eliminaron los 5 registros esperados del test.");
    }

    // Confirmar transacción
    $conexion->commit();
    echo json_encode(["exito" => true, "mensaje" => "Test y análisis eliminados correctamente."]);

} catch (Exception $e) {
    // Revertir transacción en caso de error
    $conexion->rollback();
    error_log("Error al eliminar test CASM-85: " . $e->getMessage());
    echo json_encode(["exito" => false, "mensaje" => $e->getMessage()]);
}

$stmtTest->close();
$stmtDeleteAnalisis->close();
$stmtDeleteTest->close();
$conexion->close();
?>