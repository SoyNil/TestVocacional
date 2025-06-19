<?php
session_start();
require_once 'conexion.php';

header('Content-Type: application/json');

// Verificar si el usuario está autenticado
if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode(["error" => "No autenticado"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$input = json_decode(file_get_contents("php://input"), true);
$fecha = date('Y-m-d');

// Registrar entrada para depuración
file_put_contents('debug.log', print_r($input, true));

// Validar estructura básica
if (!isset($input['resultados']) || !is_array($input['resultados'])) {
    http_response_code(400);
    echo json_encode(["error" => "Estructura inválida"]);
    exit;
}

try {
    // 🔍 Detectar tipo de test por estructura
    $primerElemento = $input['resultados'][array_key_first($input['resultados'])];

    if (isset($input['sexo']) && isset($primerElemento['total'])) {
        // === CASM83 ===
        $sexo = $input['sexo'];

        if (!in_array($sexo, ['Masculino', 'Femenino'])) {
            http_response_code(400);
            echo json_encode(["error" => "Sexo inválido"]);
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

        echo json_encode(["message" => "Resultados CASM83 guardados correctamente"]);

    } elseif (isset($primerElemento['area'], $primerElemento['puntaje'], $primerElemento['categoria'])) {
        // === CASM85 ===
        $stmt = $conexion->prepare("INSERT INTO test_CASM85 (id_usuario, area, puntaje, categoria, fecha) VALUES (?, ?, ?, ?, ?)");

        foreach ($input['resultados'] as $resultado) {
            $area = $resultado['area'];
            $puntaje = (int)$resultado['puntaje'];
            $categoria = $resultado['categoria'];

            $stmt->bind_param("isiss", $id_usuario, $area, $puntaje, $categoria, $fecha);
            $stmt->execute();
        }

        echo json_encode(["message" => "Resultados CASM85 guardados correctamente"]);

    } else {
        http_response_code(400);
        echo json_encode(["error" => "Formato de resultados no reconocido"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar resultados: " . $e->getMessage()]);
}

if (isset($stmt)) {
    $stmt->close();
}
$conexion->close();
