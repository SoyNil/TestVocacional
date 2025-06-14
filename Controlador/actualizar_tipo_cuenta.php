<?php
require_once '../Controlador/conexion.php'; // Ajusta la ruta si es necesario

// Consulta preparada para actualizar tipo_cuenta por nombre
$consulta = "UPDATE usuario SET tipo_cuenta = ? WHERE nombre = ?";

// Preparar la sentencia
$stmt = $conexion->prepare($consulta);

// Verificar que se preparó correctamente
if (!$stmt) {
    die("Error en la preparación: " . $conexion->error);
}

// Primer update: Nilton => Libre
$tipo1 = "Libre";
$nombre1 = "Nilton";
$stmt->bind_param("ss", $tipo1, $nombre1);
$stmt->execute();

// Segundo update: Carlos => Invitación
$tipo2 = "Invitación";
$nombre2 = "Carlos";
$stmt->bind_param("ss", $tipo2, $nombre2);
$stmt->execute();

echo "Actualización completada correctamente.";

$stmt->close();
$conexion->close();
?>
