<?php
$servidor = "localhost";
$usuario = "root";        // Por defecto en XAMPP
$contrasena = "";         // Vacía por defecto en XAMPP
$basededatos = "test_vocacional";

// Crear conexión
$conexion = new mysqli($servidor, $usuario, $contrasena, $basededatos);

// Verificar conexión
if ($conexion->connect_error) {
    header('Content-Type: application/json');
    echo json_encode([
        "exito" => false,
        "error" => "Conexión fallida: " . $conexion->connect_error
    ]);
    exit;
}

// Opcional: configurar codificación de caracteres
$conexion->set_charset("utf8");