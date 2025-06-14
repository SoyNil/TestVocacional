<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"]) || !isset($_SESSION["jerarquia"])) {
    echo json_encode(["exito" => false, "error" => "No autorizado."]);
    exit;
}

require_once "conexion.php";

if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "error" => "Error de conexión a la base de datos."]);
    exit;
}

$jerarquia = $_SESSION["jerarquia"];
$usuarios = [];

if ($jerarquia === "admin") {
    $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo FROM usuario WHERE tipo_cuenta IN ('Libre', 'Invitación')";
} elseif ($jerarquia === "psicologo") {
    $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo FROM usuario WHERE tipo_cuenta = 'Invitación'";
} else {
    echo json_encode(["exito" => false, "error" => "Jerarquía no autorizada."]);
    exit;
}

$resultado = $conexion->query($sql);

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
