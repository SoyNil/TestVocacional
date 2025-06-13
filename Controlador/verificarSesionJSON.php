<?php
// ACTIVAR ERRORES (solo para desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

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
        "jerarquia" => $_SESSION['jerarquia'] ?? '',
        "foto_perfil" => $_SESSION['foto_perfil'] ?? ''
    ]);
} else {
    echo json_encode(["logueado" => false]);
}
?>
