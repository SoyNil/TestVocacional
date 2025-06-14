<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario']) || $_SESSION['tipo_usuario'] !== 'psicologo') {
    echo json_encode(["exito" => false, "error" => "Acceso denegado."]);
    exit;
}

require_once 'conexion.php';

// Función para generar el código visible (solo letras y números, sin confusos)
function generarCodigoVisible($longitud = 12) {
    $caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Evita O, I, 1, 0
    $codigo = '';
    for ($i = 0; $i < $longitud; $i++) {
        $codigo .= $caracteres[random_int(0, strlen($caracteres) - 1)];
    }
    return $codigo;
}

// Genera un código único
do {
    $codigo_visible = generarCodigoVisible();
    $codigo_hash = password_hash($codigo_visible, PASSWORD_DEFAULT);

    // Aunque no puedas comparar hashes, aseguramos que no exista el código visible repetido
    $stmt = $conexion->prepare("SELECT COUNT(*) FROM codigos_invitacion WHERE codigo_visible = ?");
    $stmt->bind_param("s", $codigo_visible);
    $stmt->execute();
    $stmt->bind_result($existe);
    $stmt->fetch();
    $stmt->close();
} while ($existe > 0);

$id_creador = $_SESSION['id_usuario']; // Este campo debe estar seteado en login

// Puedes definir aquí una fecha de expiración, por ejemplo 7 días después
$fecha_expiracion = date('Y-m-d H:i:s', strtotime('+7 days'));

$stmt = $conexion->prepare("
    INSERT INTO codigos_invitacion (
        codigo_hash, codigo_visible, id_creador, fecha_expiracion
    ) VALUES (?, ?, ?, ?)
");

$stmt->bind_param("ssis", $codigo_hash, $codigo_visible, $id_creador, $fecha_expiracion);

if ($stmt->execute()) {
    echo json_encode(["exito" => true, "codigo" => $codigo_visible]);
} else {
    echo json_encode(["exito" => false, "error" => "Error al guardar el código."]);
}

$stmt->close();
$conexion->close();
?>
