<?php
ob_start();
header('Content-Type: application/json');

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

require_once '../Controlador/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['exito' => false, 'errores' => []];

    // Recoger y sanitizar datos
    $nombre_usuario = trim($_POST['nombre_usuario'] ?? '');
    $nombre = trim($_POST['nombre'] ?? '');
    $apellido = trim($_POST['apellido'] ?? '');
    $correo = trim($_POST['correo'] ?? '');
    $contraseña = $_POST['contraseña'] ?? '';
    $sexo = $_POST['sexo'] ?? '';
    $fecha_nacimiento = $_POST['fecha_nacimiento'] ?? '';
    $codigo_invitacion = trim($_POST['codigo_invitacion'] ?? '');

    // Validar campos requeridos
    if (empty($nombre_usuario)) {
        $response['errores']['nombre_usuario'] = 'El nombre de usuario es requerido.';
    }
    if (empty($nombre)) {
        $response['errores']['nombre'] = 'El nombre es requerido.';
    }
    if (empty($apellido)) {
        $response['errores']['apellido'] = 'El apellido es requerido.';
    }
    if (empty($correo)) {
        $response['errores']['correo'] = 'El correo es requerido.';
    } elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $response['errores']['correo'] = 'El correo no es válido.';
    }
    if (empty($contraseña)) {
        $response['errores']['contraseña'] = 'La contraseña es requerida.';
    }
    if (empty($sexo)) {
        $response['errores']['sexo'] = 'El sexo es requerido.';
    }
    if (empty($fecha_nacimiento)) {
        $response['errores']['fecha_nacimiento'] = 'La fecha de nacimiento es requerida.';
    }

    // Si hay errores de validación, devolver la respuesta
    if (!empty($response['errores'])) {
        ob_end_clean();
        echo json_encode($response);
        exit;
    }

    // Verificar si el nombre de usuario o correo ya existen
    $consulta = "
        SELECT 'usuario' AS origen, nombre_usuario, correo FROM usuario WHERE nombre_usuario = ? OR correo = ?
        UNION
        SELECT 'psicologo' AS origen, nombre_usuario, correo FROM psicologos WHERE nombre_usuario = ? OR correo = ?
    ";
    if (!$stmt = $conexion->prepare($consulta)) {
        error_log('Error al preparar consulta: ' . $conexion->error);
        $response['errores']['general'] = 'Error en la consulta de duplicados.';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    $stmt->bind_param("ssss", $nombre_usuario, $correo, $nombre_usuario, $correo);
    if (!$stmt->execute()) {
        error_log('Error al ejecutar consulta: ' . $stmt->error);
        $response['errores']['general'] = 'Error al ejecutar la consulta de duplicados.';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    $resultado = $stmt->get_result();
    error_log('Filas encontradas: ' . $resultado->num_rows . ', Nombre usuario: ' . $nombre_usuario . ', Correo: ' . $correo);

    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            error_log('Fila: ' . print_r($row, true));
            if ($nombre_usuario === $row['nombre_usuario']) {
                $response['errores']['nombre_usuario'] = 'El nombre de usuario ya está registrado.';
            }
            if ($correo === $row['correo']) {
                $response['errores']['correo'] = 'El correo ya está registrado.';
            }
        }
        ob_end_clean();
        echo json_encode($response);
        exit;
    }

    // Validar código de invitación si fue ingresado
    $idCodigo = null;
    $tipo_cuenta = "Libre";

    if (!empty($codigo_invitacion)) {
        $consultaCodigo = "
            SELECT id, usado, fecha_expiracion FROM codigos_invitacion 
            WHERE codigo_visible = ? 
            AND (fecha_expiracion IS NULL OR fecha_expiracion > NOW())
        ";
        if (!$stmt = $conexion->prepare($consultaCodigo)) {
            error_log('Error al preparar consulta de código: ' . $conexion->error);
            $response['errores']['general'] = 'Error en la consulta de código.';
            ob_end_clean();
            echo json_encode($response);
            exit;
        }
        $stmt->bind_param("s", $codigo_invitacion);
        $stmt->execute();
        $resultadoCodigo = $stmt->get_result();

        if ($resultadoCodigo->num_rows === 0) {
            $response['errores']['codigo_invitacion'] = 'El código de invitación es inválido o ha expirado.';
            ob_end_clean();
            echo json_encode($response);
            exit;
        }

        $filaCodigo = $resultadoCodigo->fetch_assoc();
        if ($filaCodigo['usado']) {
            $response['errores']['codigo_invitacion'] = 'Este código de invitación ya ha sido utilizado.';
            ob_end_clean();
            echo json_encode($response);
            exit;
        }

        $idCodigo = $filaCodigo['id'];
        $tipo_cuenta = "Invitación";
    }

    // Encriptar contraseña
    $hash = password_hash($contraseña, PASSWORD_DEFAULT);

    // Insertar usuario con tipo_cuenta
    $insertar = "
        INSERT INTO usuario (nombre_usuario, nombre, apellido, correo, contraseña, sexo, fecha_nacimiento, tipo_cuenta) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";
    if (!$stmt = $conexion->prepare($insertar)) {
        error_log('Error al preparar inserción: ' . $conexion->error);
        $response['errores']['general'] = 'Error al preparar la inserción.';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    $stmt->bind_param("ssssssss", $nombre_usuario, $nombre, $apellido, $correo, $hash, $sexo, $fecha_nacimiento, $tipo_cuenta);

    if ($stmt->execute()) {
        $idNuevoUsuario = $stmt->insert_id;

        // Actualizar código como usado
        if ($idCodigo !== null) {
            $actualizarCodigo = "UPDATE codigos_invitacion SET usado = 1, id_usuario_usado = ?, fecha_uso = NOW() WHERE id = ?";
            if (!$stmt2 = $conexion->prepare($actualizarCodigo)) {
                error_log('Error al preparar actualización de código: ' . $conexion->error);
                $response['errores']['general'] = 'Error al actualizar el código.';
                ob_end_clean();
                echo json_encode($response);
                exit;
            }
            $stmt2->bind_param("ii", $idNuevoUsuario, $idCodigo);
            $stmt2->execute();
        }

        $response['exito'] = true;
        ob_end_clean();
        echo json_encode($response);
        exit;
    } else {
        error_log('Error al insertar usuario: ' . $stmt->error);
        $response['errores']['general'] = 'Error al registrar: ' . $conexion->error;
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
} else {
    $response = ['exito' => false, 'errores' => ['general' => 'Acceso no permitido.']];
    ob_end_clean();
    echo json_encode($response);
    exit;
}
?>