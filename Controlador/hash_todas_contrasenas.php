<?php
require 'conexion.php'; // Debe devolver $conexion (MySQLi)

$tabla = 'usuario'; // Cambia a 'usuario' si quieres

$query = "SELECT id, nombre_usuario, contraseña FROM $tabla";
$resultado = $conexion->query($query);

if (!$resultado) {
    die("❌ Error al obtener datos: " . $conexion->error);
}

while ($row = $resultado->fetch_assoc()) {
    $id = $row['id'];
    $nombre_usuario = $row['nombre_usuario'];
    $contrasena = $row['contraseña'];

    // Saltar si ya está hasheada
    if (str_starts_with($contrasena, '$2y$')) {
        echo "🔒 Usuario '$nombre_usuario' ya tiene contraseña segura. Saltando...\n";
        continue;
    }

    // Hashear la contraseña actual tal como está
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);

    // Actualizar en la base de datos
    $update = $conexion->prepare("UPDATE $tabla SET contraseña = ? WHERE id = ?");
    $update->bind_param("si", $hash, $id);

    if ($update->execute()) {
        echo "✅ Contraseña de '$nombre_usuario' actualizada.\n";
    } else {
        echo "❌ Error actualizando ID $id: " . $update->error . "\n";
    }
}

echo "✔️ Proceso completado.";
$conexion->close();
?>
