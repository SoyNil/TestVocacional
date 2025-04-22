<?php
require_once '../Controlador/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre_usuario = trim($_POST['nombre_usuario']);
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $correo = trim($_POST['correo']);
    $contraseña = $_POST['contraseña'];
    $sexo = $_POST['sexo']; // Captura del sexo

    // Validaciones básicas
    if (empty($nombre_usuario) || empty($nombre) || empty($apellido) || empty($correo) || empty($contraseña) || empty($sexo)) {
        die('Por favor, complete todos los campos.');
    }

    // Verificar si el usuario o correo ya existen
    $consulta = "SELECT * FROM usuario WHERE nombre_usuario = ? OR correo = ?";
    $stmt = $conexion->prepare($consulta);
    $stmt->bind_param("ss", $nombre_usuario, $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo "El nombre de usuario o correo ya está registrado.";
        exit;
    }

    // Hash de la contraseña
    $hash = password_hash($contraseña, PASSWORD_DEFAULT);

    // Insertar usuario en la base de datos
    $insertar = "INSERT INTO usuario (nombre_usuario, nombre, apellido, correo, contraseña, sexo) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($insertar);
    $stmt->bind_param("ssssss", $nombre_usuario, $nombre, $apellido, $correo, $hash, $sexo); // Agregar el sexo en la consulta

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
