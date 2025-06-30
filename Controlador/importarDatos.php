<?php
session_start();
header('Content-Type: application/json');
require_once 'conexion.php';

if (!isset($_SESSION['id_usuario']) || $_SESSION['jerarquia'] !== 'admin') {
    echo json_encode(['exito' => false, 'mensaje' => 'No autorizado']);
    exit;
}

try {
    if (!isset($_FILES['archivo-datos']) || $_FILES['archivo-datos']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['exito' => false, 'mensaje' => 'Error al subir el archivo']);
        exit;
    }

    $fileName = $_FILES['archivo-datos']['name'];
    if (pathinfo($fileName, PATHINFO_EXTENSION) !== 'csv') {
        echo json_encode(['exito' => false, 'mensaje' => 'El archivo debe ser un CSV']);
        exit;
    }

    $file = fopen($_FILES['archivo-datos']['tmp_name'], 'r');
    if ($file === false) {
        echo json_encode(['exito' => false, 'mensaje' => 'No se pudo abrir el archivo']);
        exit;
    }

    $headers = fgetcsv($file, 0, ',');
    $expectedHeaders = ['Nombre', 'Apellido', 'DNI', 'Fecha_Nacimiento', 'Sexo', 'Institucion', 'Nombre_Apoderado', 'Telefono_Apoderado', 'Correo_Apoderado'];
    if ($headers !== $expectedHeaders) {
        fclose($file);
        echo json_encode(['exito' => false, 'mensaje' => 'El archivo CSV no tiene el formato esperado']);
        exit;
    }

    $errors = [];
    $insertedRows = 0;
    $rowNumber = 1;

    while (($data = fgetcsv($file, 0, ',')) !== false) {
        $rowNumber++;
        if (count($data) !== 9) {
            $errors[] = "Fila $rowNumber: Número de columnas incorrecto";
            continue;
        }

        $nombre = trim($data[0]);
        $apellido = trim($data[1]);
        $dni = trim($data[2]);
        $fechaNacimiento = trim($data[3]);
        $sexo = trim($data[4]);
        $institucion = trim($data[5]);
        $nombreApoderado = trim($data[6]);
        $telefonoApoderado = trim($data[7]);
        $correoApoderado = trim($data[8]);
        $nombre_usuario = str_replace(' ', '_', trim($nombre . '_' . $apellido));
        $contraseña = password_hash($dni, PASSWORD_DEFAULT);

        // Validaciones
        if (empty($nombre) || empty($apellido) || empty($dni) || empty($fechaNacimiento) || empty($sexo) || empty($institucion) || empty($nombreApoderado) || empty($telefonoApoderado) || empty($correoApoderado)) {
            $errors[] = "Fila $rowNumber: Todos los campos son obligatorios";
            continue;
        }
        if (!preg_match('/^[0-9]{8}$/', $dni)) {
            $errors[] = "Fila $rowNumber: DNI debe tener 8 dígitos";
            continue;
        }
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fechaNacimiento) || !strtotime($fechaNacimiento)) {
            $errors[] = "Fila $rowNumber: Fecha de nacimiento inválida (formato YYYY-MM-DD)";
            continue;
        }
        if (!in_array($sexo, ['Masculino', 'Femenino', 'Otro'])) {
            $errors[] = "Fila $rowNumber: Sexo debe ser Masculino, Femenino u Otro";
            continue;
        }
        if (!preg_match('/^[0-9]{9}$/', $telefonoApoderado)) {
            $errors[] = "Fila $rowNumber: Teléfono debe tener 9 dígitos";
            continue;
        }
        if (!filter_var($correoApoderado, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Fila $rowNumber: Correo electrónico inválido";
            continue;
        }
        if (!preg_match('/^[A-Za-z]+_[A-Za-z]+$/', $nombre_usuario)) {
            $errors[] = "Fila $rowNumber: Nombre de usuario inválido (debe ser Nombre_Apellido)";
            continue;
        }

        // Verificar duplicados
        $consulta = "
            SELECT 'usuario' AS origen, nombre_usuario, correo FROM usuario WHERE nombre_usuario = ? OR correo = ?
            UNION
            SELECT 'psicologo' AS origen, nombre_usuario, correo FROM psicologos WHERE nombre_usuario = ? OR correo = ?
            UNION
            SELECT 'institucion' AS origen, nombre_usuario, Correo_Apoderado AS correo FROM institucion WHERE nombre_usuario = ? OR Correo_Apoderado = ? OR DNI = ?
        ";
        $stmt = $conexion->prepare($consulta);
        $stmt->bind_param("sssssss", $nombre_usuario, $correoApoderado, $nombre_usuario, $correoApoderado, $nombre_usuario, $correoApoderado, $dni);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                if ($nombre_usuario === $row['nombre_usuario']) {
                    $errors[] = "Fila $rowNumber: Nombre de usuario $nombre_usuario ya registrado en {$row['origen']}";
                }
                if ($correoApoderado === $row['correo']) {
                    $errors[] = "Fila $rowNumber: Correo $correoApoderado ya registrado en {$row['origen']}";
                }
                if ($row['origen'] === 'institucion' && $dni === $row['DNI']) {
                    $errors[] = "Fila $rowNumber: DNI $dni ya registrado en institucion";
                }
            }
            continue;
        }

        // Escapar datos
        $nombre = $conexion->real_escape_string($nombre);
        $apellido = $conexion->real_escape_string($apellido);
        $dni = $conexion->real_escape_string($dni);
        $contraseña = $conexion->real_escape_string($contraseña);
        $fechaNacimiento = $conexion->real_escape_string($fechaNacimiento);
        $sexo = $conexion->real_escape_string($sexo);
        $institucion = $conexion->real_escape_string($institucion);
        $nombreApoderado = $conexion->real_escape_string($nombreApoderado);
        $telefonoApoderado = $conexion->real_escape_string($telefonoApoderado);
        $correoApoderado = $conexion->real_escape_string($correoApoderado);
        $nombre_usuario = $conexion->real_escape_string($nombre_usuario);

        // Insertar
        $query = "INSERT INTO institucion (nombre_usuario, Nombre, Apellido, DNI, contraseña, Fecha_Nacimiento, Sexo, Institucion, Nombre_Apoderado, Telefono_Apoderado, Correo_Apoderado)
                    VALUES ('$nombre_usuario', '$nombre', '$apellido', '$dni', '$contraseña', '$fechaNacimiento', '$sexo', '$institucion', '$nombreApoderado', '$telefonoApoderado', '$correoApoderado')";
        
        if ($conexion->query($query) === TRUE) {
            $insertedRows++;
        } else {
            if ($conexion->errno == 1062) {
                $errors[] = "Fila $rowNumber: DNI $dni o nombre_usuario $nombre_usuario ya existe";
            } else {
                $errors[] = "Fila $rowNumber: Error al insertar - " . $conexion->error;
            }
        }
    }

    fclose($file);

    if ($insertedRows > 0 && empty($errors)) {
        echo json_encode(['exito' => true, 'mensaje' => "Se importaron $insertedRows registros correctamente"]);
    } else {
        echo json_encode(['exito' => false, 'mensaje' => "Se importaron $insertedRows registros. Errores: " . implode('; ', $errors)]);
    }

} catch (Exception $e) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error: ' . $e->getMessage()]);
} finally {
    $conexion->close();
}
?>