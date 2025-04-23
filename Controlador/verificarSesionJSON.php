<?php
// ACTIVAR ERRORES (solo para desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if (isset($_SESSION['usuario'])) {
    echo json_encode([
        "logueado" => true,
        "nombre_usuario" => $_SESSION['usuario'],
        "id_usuario" => $_SESSION['id_usuario'],
        "nombre" => $_SESSION['nombre'],
        "apellido" => $_SESSION['apellido'] ?? '',
        "correo" => $_SESSION['correo'] ?? '',
        "sexo" => $_SESSION['sexo'] ?? '',
        "fecha_nacimiento" => $_SESSION['fecha_nacimiento'] ?? ''
    ]);
} else {
    echo json_encode(["logueado" => false]);
}
