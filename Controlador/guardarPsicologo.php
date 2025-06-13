<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario']) || !isset($_SESSION['tipo_usuario']) || $_SESSION['tipo_usuario'] !== 'psicologo') {
    echo json_encode(["exito" => false, "error" => "No autorizado."]);
    exit;
}

if (!isset($_FILES['foto_perfil'])) {
    echo json_encode(["exito" => false, "error" => "Archivo no enviado."]);
    exit;
}

$foto = $_FILES['foto_perfil'];
$nombreArchivo = uniqid('perfil_') . '.' . pathinfo($foto['name'], PATHINFO_EXTENSION);
$rutaDestino = __DIR__ . "/../Modelo/img/perfiles/" . $nombreArchivo;
$rutaEnBD = "/TestVocacional/Modelo/img/perfiles/" . $nombreArchivo;

// Verificar si la carpeta destino existe, si no, crearla
$carpetaDestino = __DIR__ . "/../Modelo/img/perfiles/";
if (!is_dir($carpetaDestino)) {
    mkdir($carpetaDestino, 0755, true);
}

// Eliminar la imagen anterior si existe
require_once 'conexion.php';
$id = $_SESSION['id_usuario'];
$sql = "SELECT foto_perfil FROM psicologos WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

if ($usuario && !empty($usuario['foto_perfil'])) {
    // Convertir la ruta de la BD a una ruta física
    $rutaRelativa = str_replace('/TestVocacional/', '', $usuario['foto_perfil']); // Quitar el prefijo /TestVocacional/
    $rutaAnterior = __DIR__ . "/../" . $rutaRelativa;
    error_log("Intentando eliminar imagen anterior: " . $rutaAnterior); // Depuración
    if (file_exists($rutaAnterior) && is_file($rutaAnterior)) {
        if (unlink($rutaAnterior)) {
            error_log("Imagen anterior eliminada: " . $rutaAnterior);
        } else {
            error_log("Error al eliminar imagen anterior: " . $rutaAnterior);
        }
    } else {
        error_log("La imagen anterior no existe o no es un archivo: " . $rutaAnterior);
    }
}

// Mover la nueva imagen
if (!move_uploaded_file($foto['tmp_name'], $rutaDestino)) {
    error_log("Error al mover el archivo: " . $foto['error'] . " - Destino: " . $rutaDestino);
    echo json_encode(["exito" => false, "error" => "Error al mover el archivo."]);
    exit;
}

// Guardar la nueva ruta en la base de datos
$sql = "UPDATE psicologos SET foto_perfil = ? WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("si", $rutaEnBD, $id);
$exito = $stmt->execute();

if ($exito) {
    $_SESSION['foto_perfil'] = $rutaEnBD;
    echo json_encode(["exito" => true, "nueva_ruta" => $rutaEnBD]);
} else {
    echo json_encode(["exito" => false, "error" => "Error al actualizar en BD."]);
}
?>