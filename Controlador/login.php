<?php
session_start();
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario_o_correo = trim($_POST['usuario_o_correo']);
    $contrasena = $_POST['contrasena'];

    // Función para intentar login en una tabla
    function intentarLogin($conexion, $tabla, $usuario_o_correo, $contrasena) {
        $sql = "SELECT * FROM $tabla WHERE nombre_usuario = ? OR correo = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ss", $usuario_o_correo, $usuario_o_correo);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 1) {
            $usuario = $resultado->fetch_assoc();
            if (password_verify($contrasena, $usuario['contraseña'])) {
                return $usuario;
            }
        }
        return false;
    }

    // Intentar login como usuario
    $usuario = intentarLogin($conexion, 'usuario', $usuario_o_correo, $contrasena);
    if ($usuario) {
        $_SESSION['tipo_usuario'] = 'usuario';
        $_SESSION['id_usuario'] = $usuario['id'];
        $_SESSION['usuario'] = $usuario['nombre_usuario'];
        $_SESSION['nombre'] = $usuario['nombre'];
        $_SESSION['apellido'] = $usuario['apellido'] ?? '';
        $_SESSION['correo'] = $usuario['correo'] ?? '';
        $_SESSION['sexo'] = $usuario['sexo'] ?? '';
        $_SESSION['fecha_nacimiento'] = $usuario['fecha_nacimiento'] ?? '';
        $_SESSION['foto_perfil'] = $usuario['foto_perfil'] ?? '';
        header("Location: ../Vista/principal.html");
        exit();
    }

    // Intentar login como psicólogo
    $psicologo = intentarLogin($conexion, 'psicologos', $usuario_o_correo, $contrasena);
    if ($psicologo) {
        $_SESSION['tipo_usuario'] = 'psicologo';
        $_SESSION['id_usuario'] = $psicologo['id'];
        $_SESSION['usuario'] = $psicologo['nombre_usuario'];
        $_SESSION['nombre'] = $psicologo['nombre'];
        $_SESSION['apellido'] = $psicologo['apellido'] ?? '';
        $_SESSION['correo'] = $psicologo['correo'] ?? '';
        $_SESSION['sexo'] = $psicologo['sexo'] ?? '';
        $_SESSION['fecha_nacimiento'] = $psicologo['fecha_nacimiento'] ?? '';
        $_SESSION['jerarquia'] = $psicologo['jerarquia'] ?? '';
        $_SESSION['foto_perfil'] = $psicologo['foto_perfil'] ?? '';
        header("Location: ../Vista/principalpsicologo.html");
        exit();
    }

    // Si no se autentica
    header("Location: ../Vista/login.html?error=credenciales_invalidas");
    exit();
}
?>