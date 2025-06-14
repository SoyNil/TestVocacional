<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario']) || $_SESSION['tipo_usuario'] !== 'psicologo') {
    echo json_encode(["exito" => false, "error" => "Acceso denegado."]);
    exit;
}

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "error" => "ID de sesión no válido."]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id'])) {
    echo json_encode(["exito" => false, "error" => "ID del código no proporcionado."]);
    exit;
}

require_once 'conexion.php';

$idCodigo = $input['id'];
$idCreador = $_SESSION['id_usuario'];

// Solo puede eliminar sus propios códigos
$stmt = $conexion->prepare("DELETE FROM codigos_invitacion WHERE id = ? AND id_creador = ?");
$stmt->bind_param("ii", $idCodigo, $idCreador);

if ($stmt->execute()) {
    echo json_encode(["exito" => true]);
} else {
    echo json_encode(["exito" => false, "error" => "No se pudo eliminar el código."]);
}

$stmt->close();
$conexion->close();
