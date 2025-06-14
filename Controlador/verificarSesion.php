<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    echo '
        <a href="../Vista/login.html" class="btn-auth">Iniciar Sesión</a>
        <a href="../Vista/registro.html" class="btn-auth">Registrarse</a>
    ';
} else {
    // Por defecto, tipo 'usuario'
    $tipo = $_SESSION['tipo_usuario'] ?? 'usuario';

    // Inserta un data-atributo invisible para que JS pueda leerlo
    echo "
        <div id='tipo-usuario' data-tipo='{$tipo}' style='display:none;'></div>
        <a href='../Vista/perfil.html' class='btn-auth'>Ver Perfil</a>
        <a href='../Controlador/logout.php' class='btn-auth cerrar-sesion'>Cerrar Sesión</a>
    ";
}
?>
