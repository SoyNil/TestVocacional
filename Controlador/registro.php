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
    $codigo_invitacion = trim($_POST['codigo_invitacion']);

    if (empty($nombre_usuario) || empty($nombre) || empty($apellido) || empty($correo) || empty($contraseña) || empty($sexo)) {
        die('Por favor, complete todos los campos.');
    }

    // Verificar si el nombre de usuario o correo ya existen
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

    // Validar código de invitación si fue ingresado
    $idCodigo = null;
    $tipo_cuenta = "Libre"; // Valor por defecto

    if (!empty($codigo_invitacion)) {
        $consultaCodigo = "
            SELECT id, usado, fecha_expiracion FROM codigos_invitacion 
            WHERE codigo_visible = ? 
            AND (fecha_expiracion IS NULL OR fecha_expiracion > NOW())
        ";
        $stmt = $conexion->prepare($consultaCodigo);
        $stmt->bind_param("s", $codigo_invitacion);
        $stmt->execute();
        $resultadoCodigo = $stmt->get_result();

        if ($resultadoCodigo->num_rows === 0) {
            header("Location: ../Vista/registro.html?error=codigo_invalido");
            exit;
        }

        $filaCodigo = $resultadoCodigo->fetch_assoc();
        if ($filaCodigo['usado']) {
            header("Location: ../Vista/registro.html?error=codigo_usado");
            exit;
        }

        $idCodigo = $filaCodigo['id'];
        $tipo_cuenta = "Invitación";
    }

    // Encriptar contraseña
    $hash = password_hash($contraseña, PASSWORD_DEFAULT);

    // Insertar usuario con tipo_cuenta
    $insertar = "
        INSERT INTO usuario (nombre_usuario, nombre, apellido, correo, contraseña, sexo, fecha_nacimiento, tipo_cuenta) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $stmt = $conexion->prepare($insertar);
    $stmt->bind_param("ssssssss", $nombre_usuario, $nombre, $apellido, $correo, $hash, $sexo, $fecha_nacimiento, $tipo_cuenta);

    if ($stmt->execute()) {
        $idNuevoUsuario = $stmt->insert_id;

        // Actualizar código como usado
        if ($idCodigo !== null) {
            $actualizarCodigo = "UPDATE codigos_invitacion SET usado = 1, id_usuario_usado = ?, fecha_uso = NOW() WHERE id = ?";
            $stmt2 = $conexion->prepare($actualizarCodigo);
            $stmt2->bind_param("ii", $idNuevoUsuario, $idCodigo);
            $stmt2->execute();
        }

        // Redirigir al login
        header("Location: ../Vista/login.html");
        exit;
    } else {
        echo "Error al registrar: " . $conexion->error;
    }
} else {
    echo "Acceso no permitido.";
}
?>
