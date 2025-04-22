<?php
session_start();

if (isset($_SESSION['usuario'])) {
    $usuario = htmlspecialchars($_SESSION['usuario']);
    echo "<h1 class='titulo-bienvenida'>Hola $usuario, en IllaVocacional te ofrecemos lo siguiente:</h1>";
} else {
    echo "<h1 class='titulo-bienvenida'>Hola, en IllaVocacional te ofrecemos lo siguiente:</h1>";
}
?>
