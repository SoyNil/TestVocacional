<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"]) || !isset($_SESSION["jerarquia"])) {
    error_log("Intento de acceso no autorizado a eliminarTestCASM83.php");
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

if (!isset($_GET["id_inicio"]) || !is_numeric($_GET["id_inicio"])) {
    error_log("ID de test inválido recibido: " . (isset($_GET["id_inicio"]) ? $_GET["id_inicio"] : "No proporcionado"));
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
error_log("Procesando eliminación de test CASM-83 con id_inicio: $idInicio para usuario: {$_SESSION['usuario']}");

$conexion->begin_transaction();

try {
    // Obtener los 13 registros del test
    $idFin = $idInicio + 12;
    $sqlTest = "SELECT categoria, total, count_a, count_b, sexo, fecha 
                FROM test_casm83 
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

    if ($resultadoTest->num_rows !== 13) {
        throw new Exception("No se encontraron los 13 registros esperados del test. Encontrados: " . $resultadoTest->num_rows);
    }

    // Definir orden fijo de categorías
    $categorias = ['CCFM', 'CCSS', 'CCNA', 'CCCO', 'ARTE', 'BURO', 'CCEP', 'HAA', 'FINA', 'LING', 'JURI', 'VERA', 'CONS'];
    
    // Almacenar registros
    $registros = [];
    while ($row = $resultadoTest->fetch_assoc()) {
        $registros[$row['categoria']] = $row;
    }

    // Verificar que todas las categorías estén presentes
    foreach ($categorias as $categoria) {
        if (!isset($registros[$categoria])) {
            throw new Exception("Falta la categoría $categoria en el test con id_inicio: $idInicio");
        }
    }

    $sexo = $registros['CCFM']['sexo'];
    $rangos = $sexo === "Masculino" ? [
        "CCFM" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-12" => "Indecisión", "14-15" => "Promedio Alto", "16-17" => "Alto", "18-22" => "Muy Alto"],
        "CCSS" => ["0-3" => "Desinterés", "4-6" => "Bajo", "7-8" => "Promedio Bajo", "9-12" => "Indecisión", "13-14" => "Promedio Alto", "15-16" => "Alto", "17-22" => "Muy Alto"],
        "CCNA" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-13" => "Indecisión", "14-15" => "Promedio Alto", "16-18" => "Alto", "19-22" => "Muy Alto"],
        "CCCO" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-10" => "Indecisión", "11-13" => "Promedio Alto", "14-17" => "Alto", "18-22" => "Muy Alto"],
        "ARTE" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-10" => "Indecisión", "11-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
        "BURO" => ["0-3" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-10" => "Indecisión", "11-13" => "Promedio Alto", "14-15" => "Alto", "16-22" => "Muy Alto"],
        "CCEP" => ["0-2" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-10" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
        "HAA" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-9" => "Indecisión", "10-12" => "Promedio Alto", "13-14" => "Alto", "15-18" => "Muy Alto"],
        "FINA" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-7" => "Promedio Bajo", "8-10" => "Indecisión", "11-13" => "Promedio Alto", "14-15" => "Alto", "16-20" => "Muy Alto"],
        "LING" => ["0-3" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-9" => "Indecisión", "10-12" => "Promedio Alto", "13-14" => "Alto", "15-20" => "Muy Alto"],
        "JURI" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-7" => "Promedio Bajo", "8-10" => "Indecisión", "11-13" => "Promedio Alto", "14-15" => "Alto", "16-20" => "Muy Alto"],
        "VERA" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-9" => "Indecisión", "10-12" => "Promedio Alto", "13-15" => "Alto", "16-22" => "Muy Alto"],
        "CONS" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-9" => "Indecisión", "10-12" => "Promedio Alto", "13-15" => "Alto", "16-22" => "Muy Alto"]
    ] : [
        "CCFM" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
        "CCSS" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-14" => "Indecisión", "15-16" => "Promedio Alto", "17-19" => "Alto", "20-22" => "Muy Alto"],
        "CCNA" => ["0-3" => "Desinterés", "4-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
        "CCCO" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
        "ARTE" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
        "BURO" => ["0-4" => "Desinterés", "5-7" => "Bajo", "8-9" => "Promedio Bajo", "10-14" => "Indecisión", "15-16" => "Promedio Alto", "17-19" => "Alto", "20-22" => "Muy Alto"],
        "CCEP" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
        "HAA" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-9" => "Indecisión", "10-12" => "Promedio Alto", "13-15" => "Alto", "16-22" => "Muy Alto"],
        "FINA" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
        "LING" => ["0-2" => "Desinterés", "3-5" => "Bajo", "6-7" => "Promedio Bajo", "8-12" => "Indecisión", "13-14" => "Promedio Alto", "15-17" => "Alto", "18-22" => "Muy Alto"],
        "JURI" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-11" => "Indecisión", "12-13" => "Promedio Alto", "14-16" => "Alto", "17-22" => "Muy Alto"],
        "VERA" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-9" => "Indecisión", "10-12" => "Promedio Alto", "13-15" => "Alto", "16-22" => "Muy Alto"],
        "CONS" => ["0-2" => "Desinterés", "3-4" => "Bajo", "5-6" => "Promedio Bajo", "7-9" => "Indecisión", "10-12" => "Promedio Alto", "13-15" => "Alto", "16-22" => "Muy Alto"]
    ];

    // Generar grupo_hash
    $hash_input = "";
    foreach ($categorias as $categoria) {
        $row = $registros[$categoria];
        $puntaje = $row['total'];
        $nivel = "Desconocido";
        if (isset($rangos[$categoria])) {
            foreach ($rangos[$categoria] as $rango => $etiqueta) {
                list($min, $max) = explode("-", $rango);
                if ($puntaje >= (int)$min && $puntaje <= (int)$max) {
                    $nivel = $etiqueta;
                    break;
                }
            }
        }
        $hash_input .= "{$row['categoria']}|{$row['total']}|{$row['count_a']}|{$row['count_b']}|$nivel|{$row['sexo']}|";
        error_log("Hash input para $categoria: {$row['categoria']}|{$row['total']}|{$row['count_a']}|{$row['count_b']}|$nivel|{$row['sexo']}|");
    }
    $grupo_hash = hash('sha256', $hash_input);
    error_log("Grupo_hash generado: $grupo_hash");

    // Verificar si el análisis existe
    $sqlCheckAnalisis = "SELECT id FROM analisis_casm83 WHERE grupo_hash = ?";
    $stmtCheckAnalisis = $conexion->prepare($sqlCheckAnalisis);
    if (!$stmtCheckAnalisis) {
        throw new Exception("Error al preparar verificación de análisis: " . $conexion->error);
    }
    $stmtCheckAnalisis->bind_param("s", $grupo_hash);
    $stmtCheckAnalisis->execute();
    $resultadoCheck = $stmtCheckAnalisis->get_result();
    $analisisExiste = $resultadoCheck->num_rows > 0;
    error_log("Análisis encontrado para grupo_hash $grupo_hash: " . ($analisisExiste ? "Sí" : "No"));

    // Eliminar análisis (si existe)
    if ($analisisExiste) {
        $sqlDeleteAnalisis = "DELETE FROM analisis_casm83 WHERE grupo_hash = ?";
        $stmtDeleteAnalisis = $conexion->prepare($sqlDeleteAnalisis);
        if (!$stmtDeleteAnalisis) {
            throw new Exception("Error al preparar eliminación de análisis: " . $conexion->error);
        }
        $stmtDeleteAnalisis->bind_param("s", $grupo_hash);
        if (!$stmtDeleteAnalisis->execute()) {
            throw new Exception("Error al eliminar análisis: " . $conexion->error);
        }
        error_log("Análisis eliminado para grupo_hash: $grupo_hash");
    } else {
        error_log("No se encontró análisis para eliminar con grupo_hash: $grupo_hash");
    }

    // Eliminar registros del test
    $sqlDeleteTest = "DELETE FROM test_casm83 
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

    if ($stmtDeleteTest->affected_rows !== 13) {
        throw new Exception("No se eliminaron los 13 registros esperados del test. Eliminados: " . $stmtDeleteTest->affected_rows);
    }

    $conexion->commit();
    error_log("Test CASM-83 y análisis eliminados correctamente para id_inicio: $idInicio");
    echo json_encode(["exito" => true, "mensaje" => "Test y análisis eliminados correctamente."]);
} catch (Exception $e) {
    $conexion->rollback();
    error_log("Error al eliminar test CASM-83: " . $e->getMessage());
    echo json_encode(["exito" => false, "mensaje" => $e->getMessage()]);
}

$stmtTest->close();
if (isset($stmtCheckAnalisis)) $stmtCheckAnalisis->close();
if (isset($stmtDeleteAnalisis)) $stmtDeleteAnalisis->close();
$stmtDeleteTest->close();
$conexion->close();
?>