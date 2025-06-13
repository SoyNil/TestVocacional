<?php
require_once '../Controlador/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre_usuario = trim($_POST['nombre_usuario']);
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $correo = trim($_POST['correo']);
    $contraseña = $_POST['contraseña'];
    $sexo = $_POST['sexo'];
    $fecha_nacimiento = $_POST['fecha_nacimiento'];

    if (empty($nombre_usuario) || empty($nombre) || empty($apellido) || empty($correo) || empty($contraseña) || empty($sexo)) {
        die('Por favor, complete todos los campos.');
    }

    // Verificar duplicado en ambas tablas
    $consulta = "
        SELECT 'usuario' AS origen FROM usuario WHERE nombre_usuario = ? OR correo = ?
        UNION
        SELECT 'psicologo' AS origen FROM psicologos WHERE nombre_usuario = ? OR correo = ?
    ";
    $stmt = $conexion->prepare($consulta);
    $stmt->bind_param("ssss", $nombre_usuario, $correo, $nombre_usuario, $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo "El nombre de usuario o correo ya está registrado.";
        exit;
    }

    $hash = password_hash($contraseña, PASSWORD_DEFAULT);

    $insertar = "INSERT INTO usuario (nombre_usuario, nombre, apellido, correo, contraseña, sexo, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($insertar);
    $stmt->bind_param("sssssss", $nombre_usuario, $nombre, $apellido, $correo, $hash, $sexo, $fecha_nacimiento);

    if ($stmt->execute()) {
        header("Location: ../Vista/login.html");
        exit;
    } else {
        echo "Error al registrar: " . $conexion->error;
    }
} else {
    echo "Acceso no permitido.";
}
?>
