<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"]) || !isset($_SESSION["jerarquia"]) || $_SESSION["jerarquia"] !== "admin") {
    error_log("Intento de acceso no autorizado a crearPsicologo.php");
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

require_once "conexion.php";

if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "mensaje" => "Error de conexión a la base de datos."]);
    exit;
}

$nombreUsuario = trim($_POST['nombre_usuario'] ?? '');
$nombre = trim($_POST['nombre'] ?? '');
$apellido = trim($_POST['apellido'] ?? '');
$correo = trim($_POST['correo'] ?? '');
$contrasena = $_POST['contrasena'] ?? '';
$jerarquia = $_POST['jerarquia'] ?? 'psicologo';
$sexo = $_POST['sexo'] ?? null;
$fechaNacimiento = $_POST['fecha_nacimiento'] ?? null;

if (empty($nombreUsuario) || empty($nombre) || empty($apellido) || empty($correo) || empty($contrasena) || !in_array($jerarquia, ['psicologo', 'admin'])) {
    echo json_encode(["exito" => false, "mensaje" => "Todos los campos obligatorios deben estar completos y válidos."]);
    exit;
}

// Validar correo
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["exito" => false, "mensaje" => "Correo inválido."]);
    exit;
}

// Validar longitud de contraseña
if (strlen($contrasena) < 8) {
    echo json_encode(["exito" => false, "mensaje" => "La contraseña debe tener al menos 8 caracteres."]);
    exit;
}

// Verificar si el nombre de usuario o correo ya existen
$sqlCheck = "SELECT id FROM psicologos WHERE nombre_usuario = ? OR correo = ?";
$stmtCheck = $conexion->prepare($sqlCheck);
if (!$stmtCheck) {
    error_log("Error al preparar consulta de verificación: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al verificar datos."]);
    exit;
}
$stmtCheck->bind_param("ss", $nombreUsuario, $correo);
$stmtCheck->execute();
if ($stmtCheck->get_result()->num_rows > 0) {
    echo json_encode(["exito" => false, "mensaje" => "El nombre de usuario o correo ya están registrados."]);
    $stmtCheck->close();
    exit;
}
$stmtCheck->close();

// Encriptar contraseña
$contrasenaHash = password_hash($contrasena, PASSWORD_BCRYPT);

// Insertar psicólogo
$sqlInsert = "INSERT INTO psicologos (nombre_usuario, nombre, apellido, sexo, fecha_nacimiento, correo, contraseña, jerarquia) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmtInsert = $conexion->prepare($sqlInsert);
if (!$stmtInsert) {
    error_log("Error al preparar inserción: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al crear psicólogo."]);
    exit;
}
$stmtInsert->bind_param("ssssssss", $nombreUsuario, $nombre, $apellido, $sexo, $fechaNacimiento, $correo, $contrasenaHash, $jerarquia);
if (!$stmtInsert->execute()) {
    error_log("Error al insertar psicólogo: " . $conexion->error);
    echo json_encode(["exito" => false, "mensaje" => "Error al crear psicólogo."]);
    exit;
}

error_log("Psicólogo $nombreUsuario creado correctamente por admin: {$_SESSION['usuario']}");
echo json_encode(["exito" => true, "mensaje" => "Psicólogo creado correctamente."]);

$stmtInsert->close();
$conexion->close();
?>