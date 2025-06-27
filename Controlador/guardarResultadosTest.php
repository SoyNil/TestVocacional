<?php
session_start();
require_once 'conexion.php';

header('Content-Type: application/json');

// Verificar si el usuario está autenticado
if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode(["exito" => false, "mensaje" => "No autenticado"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$input = json_decode(file_get_contents("php://input"), true);

// Registrar entrada para depuración
file_put_contents('debug.log', print_r($input, true), FILE_APPEND);

// Validar estructura básica
if (!$input) {
    http_response_code(400);
    echo json_encode(["exito" => false, "mensaje" => "Estructura inválida"]);
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
            INSERT INTO test_gaston (id_usuario, emotividad, actividad, resonancia, tipo_caracterologico, formula_caracterologica, sexo, fecha)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        if ($stmt === false) {
            throw new Exception("Error en preparación de consulta Gastón: " . $conexion->error);
        }
        $stmt->bind_param(
            "iiisssss",
            $id_usuario,
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

    } elseif (isset($input['sexo']) && isset($input['resultados']) && is_array($input['resultados']) && isset($input['resultados'][array_key_first($input['resultados'])]['total'])) {
        // === CASM83 ===
        $sexo = $input['sexo'];

        if (!in_array($sexo, ['Masculino', 'Femenino'])) {
            http_response_code(400);
            echo json_encode(["exito" => false, "mensaje" => "Sexo inválido"]);
            exit;
        }

        $stmt = $conexion->prepare("INSERT INTO test_CASM83 (id_usuario, categoria, total, count_a, count_b, sexo, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)");

        foreach ($input['resultados'] as $categoria => $scores) {
            if (!isset($scores['total'], $scores['A'], $scores['B'])) {
                file_put_contents('debug.log', "Entrada inválida para categoría $categoria: " . print_r($scores, true), FILE_APPEND);
                continue;
            }

            $total = (int)$scores['total'];
            $count_a = (int)$scores['A'];
            $count_b = (int)$scores['B'];

            $stmt->bind_param("isiiiss", $id_usuario, $categoria, $total, $count_a, $count_b, $sexo, $fecha);
            $stmt->execute();
        }

        echo json_encode(["exito" => true, "mensaje" => "Resultados CASM83 guardados correctamente"]);

    } elseif (isset($input['resultados']) && is_array($input['resultados']) && isset($input['resultados'][0]['area'], $input['resultados'][0]['puntaje'], $input['resultados'][0]['categoria'])) {
        // === CASM85 ===
        $stmt = $conexion->prepare("INSERT INTO test_CASM85 (id_usuario, area, puntaje, categoria, fecha) VALUES (?, ?, ?, ?, ?)");

        foreach ($input['resultados'] as $resultado) {
            $area = $resultado['area'];
            $puntaje = (int)$resultado['puntaje'];
            $categoria = $resultado['categoria'];

            $stmt->bind_param("isiss", $id_usuario, $area, $puntaje, $categoria, $fecha);
            $stmt->execute();
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

        // Validar puntajes no negativos
        if ($factorV < 0 || $factorE < 0 || $factorR < 0 || $factorN < 0 || $factorF < 0 || $puntajeTotal < 0) {
            http_response_code(400);
            echo json_encode(["exito" => false, "mensaje" => "Puntajes inválidos"]);
            exit;
        }

        $stmt = $conexion->prepare("INSERT INTO test_PMA (id_usuario, factorV, factorE, factorR, factorN, factorF, puntajeTotal, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            throw new Exception("Error en preparación de consulta PMA: " . $conexion->error);
        }
        $stmt->bind_param("iiiiiiis", $id_usuario, $factorV, $factorE, $factorR, $factorN, $factorF, $puntajeTotal, $fecha_resultado);
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
    echo json_encode(["exito" => false, "mensaje" => "Error al guardar resultados: " . $e->getMessage()]);
}

if (isset($stmt)) {
    $stmt->close();
}
$conexion->close();
?>