<?php
ini_set('display_errors', 0); // Desactivar errores en pantalla
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

session_start();
require_once 'conexion.php';

header('Content-Type: application/json');

// Verificar si el usuario está autenticado
if (!isset($_SESSION['id_usuario'], $_SESSION['tipo_usuario'])) {
    http_response_code(401);
    echo json_encode(["exito" => false, "mensaje" => "No autenticado"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$tipo_usuario = $_SESSION['tipo_usuario'];
$input = json_decode(file_get_contents("php://input"), true);

// Registrar entrada para depuración
file_put_contents('debug.log', print_r($input, true) . "\n", FILE_APPEND);

// Validar estructura básica
if (!$input || !isset($input['tipo_usuario']) || !in_array($input['tipo_usuario'], ['usuario', 'institucion'])) {
    http_response_code(400);
    echo json_encode(["exito" => false, "mensaje" => "Estructura o tipo_usuario inválido"]);
    exit;
}

// Validar que tipo_usuario coincide con la sesión
if ($input['tipo_usuario'] !== $tipo_usuario) {
    http_response_code(400);
    echo json_encode(["exito" => false, "mensaje" => "tipo_usuario no coincide con la sesión"]);
    exit;
}

try {
    if (isset($input['emotividad'], $input['actividad'], $input['resonancia'], $input['tipo_caracterologico'], $input['formula_caracterologica'], $input['sexo'], $input['fecha'])) {
        // === Gastón ===
        $emotividad = (int)$input['emotividad'];
        $actividad = (int)$input['actividad'];
        $resonancia = (int)$input['resonancia'];
        $tipo_caracterologico = $input['tipo_caracterologico'];
        $formula_caracterologica = $input['formula_caracterologica'];
        $sexo = strtolower(trim($input['sexo']));
        if ($sexo === 'masculino' || $sexo === 'másculino') {
            $sexo = 'Masculino';
        } elseif ($sexo === 'femenino') {
            $sexo = 'Femenino';
        } else {
            http_response_code(400);
            echo json_encode(["exito" => false, "mensaje" => "Sexo inválido: debe ser 'Masculino' o 'Femenino'"]);
            exit;
        }
        $fecha = $input['fecha'];

        // Validar datos
        if ($emotividad < 0 || $actividad < 0 || $resonancia < 0 || empty($tipo_caracterologico) || empty($formula_caracterologica) || !in_array($sexo, ['Masculino', 'Femenino']) || empty($fecha)) {
            http_response_code(400);
            echo json_encode(["exito" => false, "mensaje" => "Datos inválidos para Gastón"]);
            exit;
        }

        $stmt = $conexion->prepare("
            INSERT INTO test_gaston (id_usuario, tipo_usuario, emotividad, actividad, resonancia, tipo_caracterologico, formula_caracterologica, sexo, fecha)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        if ($stmt === false) {
            throw new Exception("Error en preparación de consulta Gastón: " . $conexion->error);
        }
        $stmt->bind_param(
            "isiiissss",
            $id_usuario,
            $tipo_usuario,
            $emotividad,
            $actividad,
            $resonancia,
            $tipo_caracterologico,
            $formula_caracterologica,
            $sexo,
            $fecha
        );
        if (!$stmt->execute()) {
            throw new Exception("Error al guardar resultados Gastón: " . $stmt->error);
        }

        echo json_encode(["exito" => true, "mensaje" => "Resultados Gastón guardados correctamente"]);

    } elseif (isset($input['sexo'], $input['resultados'], $input['fecha'], $input['tipo_usuario']) && is_array($input['resultados']) && isset($input['resultados'][array_key_first($input['resultados'])]['total'])) {
        // === CASM83 ===
        $sexo = $input['sexo'];
        $fecha = $input['fecha'];
        $tipo_usuario = $input['tipo_usuario'];

        if (!in_array($sexo, ['Masculino', 'Femenino'])) {
            http_response_code(400);
            echo json_encode(["exito" => false, "mensaje" => "Sexo inválido"]);
            exit;
        }

        if (empty($fecha)) {
            http_response_code(400);
            echo json_encode(["exito" => false, "mensaje" => "Fecha inválida"]);
            exit;
        }

        // Verificar si la tabla test_casm83 tiene la columna tipo_usuario
        $result = $conexion->query("SHOW COLUMNS FROM test_casm83 LIKE 'tipo_usuario'");
        if ($result->num_rows === 0) {
            $conexion->query("ALTER TABLE test_casm83 ADD tipo_usuario VARCHAR(20) NOT NULL");
        }

        $stmt = $conexion->prepare("INSERT INTO test_casm83 (id_usuario, tipo_usuario, categoria, total, count_a, count_b, sexo, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            throw new Exception("Error en preparación de consulta CASM-83: " . $conexion->error);
        }

        foreach ($input['resultados'] as $categoria => $scores) {
            if (!isset($scores['total'], $scores['A'], $scores['B'])) {
                file_put_contents('debug.log', "Entrada inválida para categoría $categoria: " . print_r($scores, true) . "\n", FILE_APPEND);
                continue;
            }

            $total = (int)$scores['total'];
            $count_a = (int)$scores['A'];
            $count_b = (int)$scores['B'];

            $stmt->bind_param("issiiiss", $id_usuario, $tipo_usuario, $categoria, $total, $count_a, $count_b, $sexo, $fecha);
            if (!$stmt->execute()) {
                file_put_contents('debug.log', "Error al guardar categoría $categoria: " . $stmt->error . "\n", FILE_APPEND);
            }
        }

        echo json_encode(["exito" => true, "mensaje" => "Resultados CASM83 guardados correctamente"]);

    } elseif (isset($input['resultados']) && is_array($input['resultados']) && isset($input['resultados'][0]['area'], $input['resultados'][0]['puntaje'], $input['resultados'][0]['categoria'])) {
        // === CASM85 ===
        $fecha = isset($input['fecha']) ? $input['fecha'] : date('Y-m-d');
        $tipo_usuario = $input['tipo_usuario'];

        // Verificar si la tabla test_casm85 tiene la columna tipo_usuario
        $result = $conexion->query("SHOW COLUMNS FROM test_casm85 LIKE 'tipo_usuario'");
        if ($result->num_rows === 0) {
            $conexion->query("ALTER TABLE test_casm85 ADD tipo_usuario VARCHAR(20) NOT NULL");
        }

        $stmt = $conexion->prepare("INSERT INTO test_casm85 (id_usuario, tipo_usuario, area, puntaje, categoria, fecha) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            throw new Exception("Error en preparación de consulta CASM-85: " . $conexion->error);
        }

        foreach ($input['resultados'] as $resultado) {
            $area = $resultado['area'];
            $puntaje = (int)$resultado['puntaje'];
            $categoria = $resultado['categoria'];

            $stmt->bind_param("ississ", $id_usuario, $tipo_usuario, $area, $puntaje, $categoria, $fecha);
            if (!$stmt->execute()) {
                throw new Exception("Error al guardar resultados CASM-85: " . $stmt->error);
            }
        }

        echo json_encode(["exito" => true, "mensaje" => "Resultados CASM85 guardados correctamente"]);

    } elseif (isset($input['resultados']['factorV'], $input['resultados']['factorE'], $input['resultados']['factorR'], $input['resultados']['factorN'], $input['resultados']['factorF'], $input['resultados']['puntajeTotal'])) {
        // === PMA ===
        $resultados = $input['resultados'];
        $factorV = (int)$resultados['factorV'];
        $factorE = (int)$resultados['factorE'];
        $factorR = (int)$resultados['factorR'];
        $factorN = (int)$resultados['factorN'];
        $factorF = (int)$resultados['factorF'];
        $puntajeTotal = floatval($resultados['puntajeTotal']);
        $fecha_resultado = $resultados['fecha'];
        $tipo_usuario = $input['tipo_usuario'];

        // Verificar si la tabla test_pma tiene la columna tipo_usuario
        $result = $conexion->query("SHOW COLUMNS FROM test_pma LIKE 'tipo_usuario'");
        if ($result->num_rows === 0) {
            $conexion->query("ALTER TABLE test_pma ADD tipo_usuario VARCHAR(20) NOT NULL");
        }

        $stmt = $conexion->prepare("INSERT INTO test_pma (id_usuario, tipo_usuario, factorV, factorE, factorR, factorN, factorF, puntajeTotal, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            throw new Exception("Error en preparación de consulta PMA: " . $conexion->error);
        }
        $stmt->bind_param("isiiiiids", $id_usuario, $tipo_usuario, $factorV, $factorE, $factorR, $factorN, $factorF, $puntajeTotal, $fecha_resultado);
        if (!$stmt->execute()) {
            throw new Exception("Error al guardar resultados PMA: " . $stmt->error);
        }

        echo json_encode(["exito" => true, "mensaje" => "Resultados PMA guardados correctamente"]);

    } else {
        http_response_code(400);
        echo json_encode(["exito" => false, "mensaje" => "Formato de resultados no reconocido"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    file_put_contents('debug.log', "Excepción: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(["exito" => false, "mensaje" => "Error al guardar resultados: " . $e->getMessage()]);
}

if (isset($stmt)) {
    $stmt->close();
}
$conexion->close();
?>