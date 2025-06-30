<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"], $_SESSION["jerarquia"])) {
    echo json_encode(["exito" => false, "error" => "No autorizado."]);
    exit;
}

require_once "conexion.php";

if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "error" => "Error de conexión a la base de datos."]);
    exit;
}

$jerarquia = $_SESSION["jerarquia"];
$tipo_usuario = isset($_GET["tipo_usuario"]) ? $_GET["tipo_usuario"] : null;
$id = isset($_GET["id"]) && is_numeric($_GET["id"]) ? (int)$_GET["id"] : null;
$usuarios = [];

if ($jerarquia === "admin") {
    if ($id !== null) {
        // Consulta específica por ID y tipo_usuario
        if ($tipo_usuario === "institucion") {
            $sql = "SELECT id, nombre_usuario, nombre, Apellido AS apellido, Correo_Apoderado AS correo, Sexo AS sexo, 'Institucion' AS tipo_cuenta 
                    FROM institucion 
                    WHERE id = ?";
            $stmt = $conexion->prepare($sql);
            if (!$stmt) {
                error_log("Error al preparar consulta de institucion por ID: " . $conexion->error);
                echo json_encode(["exito" => false, "error" => "Error al consultar institución."]);
                exit;
            }
            $stmt->bind_param("i", $id);
        } elseif ($tipo_usuario === "usuario") {
            $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, tipo_cuenta 
                    FROM usuario 
                    WHERE id = ? AND tipo_cuenta IN ('Libre', 'Invitación')";
            $stmt = $conexion->prepare($sql);
            if (!$stmt) {
                error_log("Error al preparar consulta de usuario por ID: " . $conexion->error);
                echo json_encode(["exito" => false, "error" => "Error al consultar usuario."]);
                exit;
            }
            $stmt->bind_param("i", $id);
        } else {
            echo json_encode(["exito" => false, "error" => "Tipo de usuario inválido."]);
            exit;
        }
    } else {
        // Consulta general por tipo_usuario o todas las cuentas
        if ($tipo_usuario === "institucion") {
            $sql = "SELECT id, nombre_usuario, nombre, Apellido AS apellido, Correo_Apoderado AS correo, Sexo AS sexo, 'Institucion' AS tipo_cuenta 
                    FROM institucion";
            $stmt = $conexion->prepare($sql);
            if (!$stmt) {
                error_log("Error al preparar consulta de institucion: " . $conexion->error);
                echo json_encode(["exito" => false, "error" => "Error al consultar instituciones."]);
                exit;
            }
        } elseif ($tipo_usuario === "usuario") {
            $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, tipo_cuenta 
                    FROM usuario 
                    WHERE tipo_cuenta IN ('Libre', 'Invitación')";
            $stmt = $conexion->prepare($sql);
            if (!$stmt) {
                error_log("Error al preparar consulta de usuario: " . $conexion->error);
                echo json_encode(["exito" => false, "error" => "Error al consultar usuarios."]);
                exit;
            }
        } else {
            $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, tipo_cuenta 
                    FROM usuario 
                    WHERE tipo_cuenta IN ('Libre', 'Invitación')
                    UNION
                    SELECT id, nombre_usuario, nombre, Apellido AS apellido, Correo_Apoderado AS correo, Sexo AS sexo, 'Institucion' AS tipo_cuenta 
                    FROM institucion";
            $stmt = $conexion->prepare($sql);
            if (!$stmt) {
                error_log("Error al preparar consulta combinada: " . $conexion->error);
                echo json_encode(["exito" => false, "error" => "Error al consultar usuarios e instituciones."]);
                exit;
            }
        }
    }
} elseif ($jerarquia === "psicologo") {
    if ($id !== null) {
        $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, tipo_cuenta 
                FROM usuario 
                WHERE id = ? AND tipo_cuenta = 'Invitación'";
        $stmt = $conexion->prepare($sql);
        if (!$stmt) {
            error_log("Error al preparar consulta de usuario por ID: " . $conexion->error);
            echo json_encode(["exito" => false, "error" => "Error al consultar usuario."]);
            exit;
        }
        $stmt->bind_param("i", $id);
    } else {
        $sql = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, tipo_cuenta 
                FROM usuario 
                WHERE tipo_cuenta = 'Invitación'";
        $stmt = $conexion->prepare($sql);
        if (!$stmt) {
            error_log("Error al preparar consulta de usuario: " . $conexion->error);
            echo json_encode(["exito" => false, "error" => "Error al consultar usuarios."]);
            exit;
        }
    }
} else {
    echo json_encode(["exito" => false, "error" => "Jerarquía no autorizada."]);
    exit;
}

$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado) {
    while ($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }
    echo json_encode(["exito" => true, "usuarios" => $usuarios]);
} else {
    error_log("Error en la consulta: " . $conexion->error);
    echo json_encode(["exito" => false, "error" => "Error al consultar la base de datos."]);
}

$stmt->close();
$conexion->close();
?>