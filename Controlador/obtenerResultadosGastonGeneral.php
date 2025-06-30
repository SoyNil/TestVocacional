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
    $sql = "SELECT emotividad, actividad, resonancia, tipo_caracterologico, formula_caracterologica, sexo, fecha, tipo_usuario
            FROM test_gaston
            WHERE id_usuario = ? AND tipo_usuario = ?
            ORDER BY id ASC";

    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar consulta: " . $conexion->error);
        echo json_encode(["exito" => false, "mensaje" => "Error al consultar resultados."]);
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

// Modo 2: obtener resultados por ID (modo admin/jerarquía)
$idInicio = (int)$_GET['id_inicio'];

// Verificar jerarquía
if (!isset($jerarquia)) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

$sql = "SELECT g.emotividad, g.actividad, g.resonancia, g.tipo_caracterologico, g.formula_caracterologica, g.sexo, g.fecha, g.tipo_usuario
        FROM test_gaston g
        INNER JOIN usuario u ON g.id_usuario = u.id AND g.tipo_usuario = 'usuario'
        WHERE g.id = ? AND g.tipo_usuario = 'usuario'
        AND (u.tipo_cuenta = 'Invitación' OR ? = 'admin')
        UNION
        SELECT g.emotividad, g.actividad, g.resonancia, g.tipo_caracterologico, g.formula_caracterologica, g.sexo, g.fecha, g.tipo_usuario
        FROM test_gaston g
        INNER JOIN institucion i ON g.id_usuario = i.id AND g.tipo_usuario = 'institucion'
        WHERE g.id = ? AND g.tipo_usuario = 'institucion'
        AND ? = 'admin'
        LIMIT 1";

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    error_log("Error al preparar consulta Gastón: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al consultar resultados."]);
    exit;
}

$stmt->bind_param("isis", $idInicio, $jerarquia, $idInicio, $jerarquia);
$stmt->execute();
$resultado = $stmt->get_result();

if ($row = $resultado->fetch_assoc()) {
    // Calcular lectura por factores
    $lectura = [];

    if ($row['sexo'] === 'Masculino') {
        $lectura[] = ($row['emotividad'] >= 48) ? 'Emotivo' : 'No Emotivo';
    } else {
        $lectura[] = ($row['emotividad'] >= 51) ? 'Emotivo' : 'No Emotivo';
    }

    $lectura[] = ($row['actividad'] >= 55) ? 'Activo' : 'No Activo';
    $lectura[] = ($row['resonancia'] >= 55) ? 'Secundario' : 'Primario';

    $row['lectura_factores'] = implode(', ', $lectura);

    echo json_encode(["exito" => true, "resultado" => $row]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "No se encontró el test con ese ID."]);
}

$stmt->close();
$conexion->close();
?>