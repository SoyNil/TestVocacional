<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"])) {
    echo json_encode(["exito" => false, "error" => "No autorizado."]);
    exit;
}

require_once "conexion.php"; // Ajustar la ruta si es necesario

// Verificar conexión
if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "error" => "Error de conexión a la base de datos."]);
    exit;
}

$sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo FROM usuario";
$resultado = $conexion->query($sql);

$usuarios = [];

if ($resultado) {
    while ($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }
    echo json_encode(["exito" => true, "usuarios" => $usuarios]);
} else {
    error_log("Error en la consulta: " . $conexion->error);
    echo json_encode(["exito" => false, "error" => "Error al consultar la base de datos."]);
}

$conexion->close();
?>