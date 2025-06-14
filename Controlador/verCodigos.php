<?php
ini_set('display_errors', 0); // Deshabilitar salida de errores
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

// Validación de sesión y tipo de usuario
if (!isset($_SESSION['usuario']) || $_SESSION['tipo_usuario'] !== 'psicologo') {
    echo json_encode(["exito" => false, "error" => "Acceso denegado."]);
    exit;
}

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "error" => "ID de usuario no disponible en sesión."]);
    exit;
}

// Verificar la ruta de conexion.php
$conexion_file = __DIR__ . '/conexion.php';
if (!file_exists($conexion_file)) {
    error_log("Archivo de conexión no encontrado: $conexion_file");
    echo json_encode(["exito" => false, "error" => "Error interno del servidor."]);
    exit;
}

require_once $conexion_file;

// Verificar conexión
if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "error" => "Error de conexión a la base de datos."]);
    exit;
}

$id_creador = $_SESSION['id_usuario'];

// Preparar consulta SQL
$query = "
    SELECT 
        c.id,
        c.codigo_visible,
        c.usado,
        c.fecha_creacion,
        c.fecha_expiracion,
        u.nombre AS nombre_usuario,
        u.apellido AS apellido_usuario
    FROM codigos_invitacion c
    LEFT JOIN usuario u ON c.id_usuario_usado = u.id
    WHERE c.id_creador = ?
    ORDER BY c.fecha_creacion DESC
";

// Ejecutar consulta
$stmt = $conexion->prepare($query);
if (!$stmt) {
    error_log("Error al preparar la consulta: " . $conexion->error);
    echo json_encode(["exito" => false, "error" => "Error al preparar la consulta."]);
    exit;
}

$stmt->bind_param("i", $id_creador);
if (!$stmt->execute()) {
    error_log("Error al ejecutar la consulta: " . $stmt->error);
    echo json_encode(["exito" => false, "error" => "Error al ejecutar la consulta."]);
    exit;
}

$resultado = $stmt->get_result();

// Procesar resultados
$codigos = [];

while ($fila = $resultado->fetch_assoc()) {
    $expirado = (strtotime($fila['fecha_expiracion']) < time());

    $codigos[] = [
        "id" => $fila['id'],
        "codigo" => $fila['codigo_visible'],
        "usado" => (bool)$fila['usado'],
        "expirado" => $expirado,
        "fecha_creacion" => $fila['fecha_creacion'],
        "fecha_expiracion" => $fila['fecha_expiracion'],
        "usuario_asignado" => $fila['usado'] ? ($fila['nombre_usuario'] . " " . $fila['apellido_usuario']) : null
    ];
}

// Responder en JSON
echo json_encode(["exito" => true, "codigos" => $codigos]);

// Cerrar recursos
$stmt->close();
$conexion->close();
?>