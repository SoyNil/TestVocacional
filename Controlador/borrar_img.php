<?php
require_once 'conexion.php';
$carpeta = __DIR__ . "/../Modelo/img/perfiles/";
$archivos = scandir($carpeta);
$rutasEnBD = [];

$sql = "SELECT foto_perfil FROM psicologos WHERE foto_perfil IS NOT NULL";
$resultado = $conexion->query($sql);
while ($row = $resultado->fetch_assoc()) {
    $rutasEnBD[] = ltrim($row['foto_perfil'], '/');
}

foreach ($archivos as $archivo) {
    if ($archivo !== '.' && $archivo !== '..' && !in_array("Modelo/img/perfiles/" . $archivo, $rutasEnBD)) {
        unlink($carpeta . $archivo);
    }
}
?>