<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"]) || !isset($_SESSION["id_usuario"])) {
    error_log("Intento de acceso no autorizado a eliminarUsuario.php");
    echo json_encode(["exito" => false, "mensaje" => "No autorizado."]);
    exit;
}

if (!isset($_GET["id_usuario"]) || !is_numeric($_GET["id_usuario"])) {
    error_log("ID de usuario inválido recibido: " . (isset($_GET["id_usuario"]) ? $_GET["id_usuario"] : "No proporcionado"));
    echo json_encode(["exito" => false, "mensaje" => "ID de usuario inválido."]);
    exit;
}

require_once "conexion.php";

if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo json_encode(["exito" => false, "mensaje" => "Error de conexión a la base de datos."]);
    exit;
}

$idUsuario = (int)$_GET["id_usuario"];
$isAdmin = isset($_SESSION["jerarquia"]) && $_SESSION["jerarquia"] === "admin";
$isSelf = $idUsuario === (int)$_SESSION["id_usuario"];
$tipoUsuario = $_SESSION["tipo_usuario"] ?? 'usuario';

if (!$isAdmin && !$isSelf) {
    error_log("Usuario {$_SESSION['usuario']} intentó eliminar cuenta de id_usuario $idUsuario sin permisos");
    echo json_encode(["exito" => false, "mensaje" => "No tienes permiso para eliminar esta cuenta."]);
    exit;
}

error_log("Procesando eliminación de usuario con id_usuario: $idUsuario por usuario: {$_SESSION['usuario']} (tipo: $tipoUsuario)");

$conexion->begin_transaction();

try {
    if ($tipoUsuario === 'psicologo') {
        // Eliminar cuenta de psicólogo
        $sqlDeletePsicologo = "DELETE FROM psicologos WHERE id = ?";
        $stmtDeletePsicologo = $conexion->prepare($sqlDeletePsicologo);
        if (!$stmtDeletePsicologo) {
            throw new Exception("Error al preparar eliminación de psicólogo: " . $conexion->error);
        }
        $stmtDeletePsicologo->bind_param("i", $idUsuario);
        if (!$stmtDeletePsicologo->execute()) {
            throw new Exception("Error al eliminar psicólogo: " . $conexion->error);
        }
        if ($stmtDeletePsicologo->affected_rows === 0) {
            throw new Exception("No se encontró el psicólogo.");
        }
        error_log("Psicólogo $idUsuario eliminado correctamente");
        $stmtDeletePsicologo->close();
    } else {
        // Verificar tipo_cuenta del usuario
        $sqlTipoCuenta = "SELECT tipo_cuenta FROM usuario WHERE id = ?";
        $stmtTipoCuenta = $conexion->prepare($sqlTipoCuenta);
        if (!$stmtTipoCuenta) {
            throw new Exception("Error al preparar consulta de tipo_cuenta: " . $conexion->error);
        }
        $stmtTipoCuenta->bind_param("i", $idUsuario);
        $stmtTipoCuenta->execute();
        $resultTipoCuenta = $stmtTipoCuenta->get_result();
        if ($resultTipoCuenta->num_rows === 0) {
            throw new Exception("Usuario no encontrado.");
        }
        $tipoCuenta = $resultTipoCuenta->fetch_assoc()['tipo_cuenta'];
        $stmtTipoCuenta->close();

        // Eliminar código de invitación si es tipo 'Invitación'
        if ($tipoCuenta === 'Invitación') {
            $sqlDeleteCodigo = "DELETE FROM codigos_invitacion WHERE id_usuario_usado = ?";
            $stmtDeleteCodigo = $conexion->prepare($sqlDeleteCodigo);
            if (!$stmtDeleteCodigo) {
                throw new Exception("Error al preparar eliminación de código de invitación: " . $conexion->error);
            }
            $stmtDeleteCodigo->bind_param("i", $idUsuario);
            if (!$stmtDeleteCodigo->execute()) {
                throw new Exception("Error al eliminar código de invitación: " . $conexion->error);
            }
            error_log("Eliminados " . $stmtDeleteCodigo->affected_rows . " códigos de invitación para usuario $idUsuario");
            $stmtDeleteCodigo->close();
        }

        // Obtener grupo_hash de analisis_casm83
        $sqlHashes83 = "SELECT DISTINCT a.grupo_hash 
                        FROM analisis_casm83 a 
                        INNER JOIN test_casm83 t ON t.id_usuario = ? 
                        WHERE t.id IN (
                            SELECT id FROM test_casm83 
                            WHERE id_usuario = ? 
                            GROUP BY fecha
                        )";
        $stmtHashes83 = $conexion->prepare($sqlHashes83);
        if (!$stmtHashes83) {
            throw new Exception("Error al preparar consulta de hashes CASM-83: " . $conexion->error);
        }
        $stmtHashes83->bind_param("ii", $idUsuario, $idUsuario);
        $stmtHashes83->execute();
        $resultHashes83 = $stmtHashes83->get_result();
        $hashes83 = [];
        while ($row = $resultHashes83->fetch_assoc()) {
            $hashes83[] = $row['grupo_hash'];
        }
        $stmtHashes83->close();

        // Eliminar análisis de CASM-83
        if (!empty($hashes83)) {
            $placeholders = implode(',', array_fill(0, count($hashes83), '?'));
            $sqlDeleteAnalisis83 = "DELETE FROM analisis_casm83 WHERE grupo_hash IN ($placeholders)";
            $stmtDeleteAnalisis83 = $conexion->prepare($sqlDeleteAnalisis83);
            if (!$stmtDeleteAnalisis83) {
                throw new Exception("Error al preparar eliminación de análisis CASM-83: " . $conexion->error);
            }
            $stmtDeleteAnalisis83->bind_param(str_repeat('s', count($hashes83)), ...$hashes83);
            if (!$stmtDeleteAnalisis83->execute()) {
                throw new Exception("Error al eliminar análisis CASM-83: " . $conexion->error);
            }
            error_log("Eliminados " . $stmtDeleteAnalisis83->affected_rows . " análisis CASM-83 para usuario $idUsuario");
            $stmtDeleteAnalisis83->close();
        } else {
            error_log("No se encontraron análisis CASM-83 para usuario $idUsuario");
        }

        // Eliminar tests CASM-83
        $sqlDeleteTests83 = "DELETE FROM test_casm83 WHERE id_usuario = ?";
        $stmtDeleteTests83 = $conexion->prepare($sqlDeleteTests83);
        if (!$stmtDeleteTests83) {
            throw new Exception("Error al preparar eliminación de tests CASM-83: " . $conexion->error);
        }
        $stmtDeleteTests83->bind_param("i", $idUsuario);
        if (!$stmtDeleteTests83->execute()) {
            throw new Exception("Error al eliminar tests CASM-83: " . $conexion->error);
        }
        error_log("Eliminados " . $stmtDeleteTests83->affected_rows . " tests CASM-83 para usuario $idUsuario");
        $stmtDeleteTests83->close();

        // Obtener grupo_hash de analisis_casm85
        $sqlHashes85 = "SELECT DISTINCT a.grupo_hash 
                        FROM analisis_casm85 a 
                        INNER JOIN test_casm85 t ON t.id_usuario = ? 
                        WHERE t.id IN (
                            SELECT id FROM test_casm85 
                            WHERE id_usuario = ? 
                            GROUP BY fecha
                        )";
        $stmtHashes85 = $conexion->prepare($sqlHashes85);
        if (!$stmtHashes85) {
            throw new Exception("Error al preparar consulta de hashes CASM-85: " . $conexion->error);
        }
        $stmtHashes85->bind_param("ii", $idUsuario, $idUsuario);
        $stmtHashes85->execute();
        $resultHashes85 = $stmtHashes85->get_result();
        $hashes85 = [];
        while ($row = $resultHashes85->fetch_assoc()) {
            $hashes85[] = $row['grupo_hash'];
        }
        $stmtHashes85->close();

        // Eliminar análisis de CASM-85
        if (!empty($hashes85)) {
            $placeholders = implode(',', array_fill(0, count($hashes85), '?'));
            $sqlDeleteAnalisis85 = "DELETE FROM analisis_casm85 WHERE grupo_hash IN ($placeholders)";
            $stmtDeleteAnalisis85 = $conexion->prepare($sqlDeleteAnalisis85);
            if (!$stmtDeleteAnalisis85) {
                throw new Exception("Error al preparar eliminación de análisis CASM-85: " . $conexion->error);
            }
            $stmtDeleteAnalisis85->bind_param(str_repeat('s', count($hashes85)), ...$hashes85);
            if (!$stmtDeleteAnalisis85->execute()) {
                throw new Exception("Error al eliminar análisis CASM-85: " . $conexion->error);
            }
            error_log("Eliminados " . $stmtDeleteAnalisis85->affected_rows . " análisis CASM-85 para usuario $idUsuario");
            $stmtDeleteAnalisis85->close();
        } else {
            error_log("No se encontraron análisis CASM-85 para usuario $idUsuario");
        }

        // Eliminar tests CASM-85
        $sqlDeleteTests85 = "DELETE FROM test_casm85 WHERE id_usuario = ?";
        $stmtDeleteTests85 = $conexion->prepare($sqlDeleteTests85);
        if (!$stmtDeleteTests85) {
            throw new Exception("Error al preparar eliminación de tests CASM-85: " . $conexion->error);
        }
        $stmtDeleteTests85->bind_param("i", $idUsuario);
        if (!$stmtDeleteTests85->execute()) {
            throw new Exception("Error al eliminar tests CASM-85: " . $conexion->error);
        }
        error_log("Eliminados " . $stmtDeleteTests85->affected_rows . " tests CASM-85 para usuario $idUsuario");
        $stmtDeleteTests85->close();

        // Eliminar cuenta de usuario
        $sqlDeleteUsuario = "DELETE FROM usuario WHERE id = ? AND tipo_cuenta IN ('Libre', 'Invitación')";
        $stmtDeleteUsuario = $conexion->prepare($sqlDeleteUsuario);
        if (!$stmtDeleteUsuario) {
            throw new Exception("Error al preparar eliminación de usuario: " . $conexion->error);
        }
        $stmtDeleteUsuario->bind_param("i", $idUsuario);
        if (!$stmtDeleteUsuario->execute()) {
            throw new Exception("Error al eliminar usuario: " . $conexion->error);
        }
        if ($stmtDeleteUsuario->affected_rows === 0) {
            throw new Exception("No se encontró el usuario o no es de tipo 'Libre' o 'Invitación'.");
        }
        error_log("Usuario $idUsuario eliminado correctamente");
        $stmtDeleteUsuario->close();
    }

    $conexion->commit();
    
    // Si el usuario eliminó su propia cuenta, cerrar sesión
    if ($isSelf) {
        session_destroy();
    }
    
    echo json_encode(["exito" => true, "mensaje" => "Cuenta eliminada correctamente."]);
} catch (Exception $e) {
    $conexion->rollback();
    error_log("Error al eliminar cuenta $idUsuario: " . $e->getMessage());
    echo json_encode(["exito" => false, "mensaje" => $e->getMessage()]);
}

$conexion->close();
?>