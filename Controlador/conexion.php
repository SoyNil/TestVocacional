<?php
$servidor = "localhost";
$usuario = "root";        // Por defecto en XAMPP
$contrasena = "";         // Vacía por defecto en XAMPP
$basededatos = "test_vocacional";

// Crear conexión
$conexion = new mysqli($servidor, $usuario, $contrasena, $basededatos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Opcional: configurar codificación de caracteres
$conexion->set_charset("utf8");
?>
