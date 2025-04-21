<?php
session_start();
require_once 'conexion.php';

// Verificamos que el formulario haya sido enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre_usuario = trim($_POST['nombre_usuario']);
    $contrasena = $_POST['contrasena'];

    // Preparamos la consulta
    $sql = "SELECT id, nombre_usuario, contraseña FROM usuario WHERE nombre_usuario = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $nombre_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        // Verificamos la contraseña con password_verify
        if (password_verify($contrasena, $usuario['contraseña'])) {
            $_SESSION['usuario'] = $usuario['nombre_usuario'];
            $_SESSION['id_usuario'] = $usuario['id'];

            // Redirigimos a la página principal
            header("Location: ../Vista/principal.html");
            exit();
        } else {
            echo "❌ Contraseña incorrecta.";
        }
    } else {
        echo "❌ El usuario no existe.";
    }

    $stmt->close();
    $conexion->close();
} else {
    echo "❌ Acceso no autorizado.";
}
?>
