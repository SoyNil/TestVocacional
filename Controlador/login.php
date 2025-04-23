<?php
session_start();
require_once 'conexion.php';

// Verificamos que el formulario haya sido enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario_o_correo = trim($_POST['usuario_o_correo']);
    $contrasena = $_POST['contrasena'];

    // Preparamos la consulta para verificar si es un nombre de usuario o correo electrónico
    $sql = "SELECT id, nombre_usuario, nombre, sexo, correo, fecha_nacimiento, contraseña,apellido FROM usuario WHERE nombre_usuario = ? OR correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $usuario_o_correo, $usuario_o_correo); // Bindeamos el mismo valor a ambos parámetros
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        // Verificamos la contraseña con password_verify
        if (password_verify($contrasena, $usuario['contraseña'])) {
            $_SESSION['usuario'] = $usuario['nombre_usuario'];
            $_SESSION['id_usuario'] = $usuario['id'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['sexo'] = $usuario['sexo'];  
            $_SESSION['fecha_nacimiento'] = $usuario['fecha_nacimiento']; 
            $_SESSION['apellido'] = $usuario['apellido']; 
            $_SESSION['correo'] = $usuario['correo']; 

            // Redirigimos a la página principal
            header("Location: ../Vista/principal.html");
            exit();
        } else {
            // Redirigir con el error "contraseña_incorrecta" en la URL
            header("Location: ../Vista/login.html?error=contraseña_incorrecta");
            exit();
        }
    } else {
        // Redirigir con el error "usuario_no_existe" en la URL
        header("Location: ../Vista/login.html?error=usuario_no_existe");
        exit();
    }

    $stmt->close();
    $conexion->close();
} else {
    // Si no es una solicitud POST, redirigir con el error de acceso no autorizado
    header("Location: ../Vista/login.html?error=acceso_no_autorizado");
    exit();
}
?>
