<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

if (isset($_SESSION['usuario'])) {
    $tipo = $_SESSION['tipo_usuario'] ?? 'usuario';

    echo json_encode([
        "logueado" => true,
        "tipo_usuario" => $tipo,
        "id_usuario" => $_SESSION['id_usuario'],
        "nombre_usuario" => $_SESSION['usuario'],
        "nombre" => $_SESSION['nombre'],
        "apellido" => $_SESSION['apellido'] ?? '',
        "correo" => $_SESSION['correo'] ?? '',
        "sexo" => $_SESSION['sexo'] ?? '',
        "fecha_nacimiento" => $_SESSION['fecha_nacimiento'] ?? '',
        "jerarquia" => $_SESSION['jerarquia'] ?? '', // Incluye jerarquia para psicólogos
        "foto_perfil" => $_SESSION['foto_perfil'] ?? ''
    ]);
} else {
    echo json_encode(["logueado" => false]);
}
?>