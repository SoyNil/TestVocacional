<?php
session_start();
$logueado = isset($_SESSION['usuario']);

if (!$logueado) {
    echo '
        <a href="../Vista/login.html" class="btn-auth">Iniciar Sesión</a>
        <a href="../Vista/registro.html" class="btn-auth">Registrarse</a>
    ';
} else {
    echo '
        <a href="../Vista/perfil.html" class="btn-auth">Ver Perfil</a>
        <a href="../Controlador/logout.php" class="btn-auth cerrar-sesion">Cerrar Sesión</a>
    ';
}
?>
