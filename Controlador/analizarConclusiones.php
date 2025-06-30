<?php
// Asegurarse de que no haya salida antes de session_start()
if (ob_get_level()) ob_end_clean();

// Iniciar la sesión
session_start();

// Incluir la conexión a la base de datos
include "../Controlador/conexion.php";

// Establecer el encabezado de respuesta
header('Content-Type: application/json; charset=utf-8');

// Función para registrar errores
function logError($mensaje) {
    $logFile = 'C:\xampp\htdocs\TestVocacional\Controlador\debug_error.txt';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $mensaje\n", FILE_APPEND);
}

// Depuración: Registrar información de la sesión y cookies
file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_session.txt', 
    "Sesión iniciada: " . print_r($_SESSION, true) . 
    "\nCookies recibidas: " . print_r($_COOKIE, true) . 
    "\nPHPSESSID: " . (session_id() ?: 'No definida') . 
    "\n" . date('Y-m-d H:i:s') . "\n", 
    FILE_APPEND
);

// Verificar que la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    logError("Método no permitido: " . $_SERVER["REQUEST_METHOD"]);
    echo json_encode(['exito' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

// Verificar sesión
if (!isset($_SESSION['id_usuario']) || !isset($_SESSION['jerarquia'])) {
    logError("Sesión no iniciada o jerarquía no definida. Sesión: " . print_r($_SESSION, true) . "\nCookies: " . print_r($_COOKIE, true));
    echo json_encode(['exito' => false, 'mensaje' => "Sesión no iniciada o jerarquía no definida."]);
    exit;
}

// Verificar jerarquía
if ($_SESSION['jerarquia'] !== 'admin' && $_SESSION['jerarquia'] !== 'psicologo') {
    logError("Jerarquía no autorizada: " . $_SESSION['jerarquia']);
    echo json_encode(['exito' => false, 'mensaje' => "Jerarquía no autorizada."]);
    exit;
}

// Obtener el cuerpo de la solicitud
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    logError("Error al decodificar JSON: " . json_last_error_msg());
    echo json_encode(['exito' => false, 'mensaje' => 'Error al decodificar los datos enviados.']);
    exit;
}

// Verificar que se recibieron los resultados necesarios
$required_results = ['resultados83', 'resultados85', 'resultadosPMA', 'resultadoGaston'];
foreach ($required_results as $result) {
    if (!isset($data[$result]) || empty($data[$result])) {
        logError("Falta el resultado $result.");
        echo json_encode(['exito' => false, 'mensaje' => "Falta el resultado $result."]);
        exit;
    }
}

$resultados83 = $data['resultados83'];
$resultados85 = $data['resultados85'];
$resultadosPMA = $data['resultadosPMA'];
$resultadoGaston = $data['resultadoGaston'];

// Validar los datos recibidos
if (!is_array($resultados83) || empty($resultados83)) {
    logError("Resultados de CASM-83 inválidos o vacíos.");
    echo json_encode(['exito' => false, 'mensaje' => "Resultados de CASM-83 inválidos o vacíos."]);
    exit;
}
if (!is_array($resultados85) || empty($resultados85)) {
    logError("Resultados de CASM-85 inválidos o vacíos.");
    echo json_encode(['exito' => false, 'mensaje' => "Resultados de CASM-85 inválidos o vacíos."]);
    exit;
}
if (!is_array($resultadosPMA) || empty($resultadosPMA)) {
    logError("Resultados de PMA inválidos o vacíos.");
    echo json_encode(['exito' => false, 'mensaje' => "Resultados de PMA inválidos o vacíos."]);
    exit;
}
if (!is_array($resultadoGaston) || empty($resultadoGaston)) {
    logError("Resultados de Gastón inválidos o vacíos.");
    echo json_encode(['exito' => false, 'mensaje' => "Resultados de Gastón inválidos o vacíos."]);
    exit;
}

try {
    // Procesar resultados de CASM-83
    $sexo = $resultados83[0]['sexo'] ?? 'Desconocido';
    $resultadosCategorias83 = [];
    foreach ($resultados83 as $fila) {
        if (isset($fila['categoria'], $fila['total'], $fila['count_a'], $fila['count_b'])) {
            $resultadosCategorias83[$fila['categoria']] = [
                'total' => $fila['total'],
                'A' => $fila['count_a'],
                'B' => $fila['count_b']
            ];
        }
    }

    // Obtener tipo caracterológico de Gastón
    $tipoGaston = $resultadoGaston['tipo_caracterologico'] ?? 'Desconocido';

    // Definir características generales de Gastón
    $tiposCaracterologicos = [
        "Colérico" => [
            "caracteristicasGenerales" => "El Colérico se caracteriza por ser apasionado, impulsivo y con una fuerte inclinación hacia el liderazgo. Su naturaleza emocional y activa lo lleva a tomar decisiones rápidas y a asumir roles de autoridad. Sin embargo, puede mostrar impaciencia o reacciones intensas ante la frustración. Es ideal para entornos dinámicos que requieren iniciativa, pero debe trabajar en la gestión de sus emociones para mejorar sus relaciones interpersonales."
        ],
        "Pasional" => [
            "caracteristicasGenerales" => "El Pasional es una persona profundamente emocional, activa y con una fuerte capacidad de reflexión. Tiende a comprometerse intensamente con sus objetivos y muestra gran perseverancia. Su resonancia secundaria le permite analizar situaciones antes de actuar, pero puede ser propenso a la introspección excesiva o al perfeccionismo. Es adecuado para roles que requieren dedicación y análisis profundo."
        ],
        "Nervioso" => [
            "caracteristicasGenerales" => "El Nervioso combina emotividad con una baja actividad y resonancia primaria, lo que lo hace reactivo e impulsivo. Tiende a experimentar emociones intensas, pero puede carecer de constancia en sus esfuerzos. Es ideal para entornos que requieren creatividad espontánea, pero debe trabajar en la organización y la perseverancia."
        ],
        "Sentimental" => [
            "caracteristicasGenerales" => "El Sentimental es emocional, no activo y con resonancia secundaria, lo que lo lleva a ser introspectivo y sensible. Prefiere entornos estables y valora las relaciones profundas. Puede ser propenso a la melancolía o la indecisión, pero destaca en roles que requieren empatía y reflexión."
        ],
        "Sanguíneo" => [
            "caracteristicasGenerales" => "El Sanguíneo es no emocional, activo y primario, mostrando una personalidad extrovertida y dinámica. Es adaptable y sociable, ideal para trabajos en equipo, pero puede ser superficial en sus emociones. Debe trabajar en la profundidad emocional y la atención al detalle."
        ],
        "Flemático" => [
            "caracteristicasGenerales" => "El Flemático es no emocional, activo y secundario, caracterizado por su calma y perseverancia. Es metódico y confiable, ideal para tareas que requieren consistencia, pero puede ser resistente al cambio. Debe trabajar en su flexibilidad y adaptabilidad."
        ],
        "Amorfo" => [
            "caracteristicasGenerales" => "El Amorfo es no emocional, no activo y primario, mostrando una actitud relajada y adaptable, pero con poca iniciativa. Es ideal para entornos de baja presión, pero debe trabajar en la motivación y la proactividad."
        ],
        "Apático" => [
            "caracteristicasGenerales" => "El Apático es no emocional, no activo y secundario, con tendencia a la introspección y poca motivación. Prefiere entornos estables y puede ser resistente al cambio. Debe trabajar en encontrar motivaciones internas y mejorar su compromiso."
        ]
    ];
    $caracteristicaGeneral = $tiposCaracterologicos[$tipoGaston]['caracteristicasGenerales'] ?? "No disponible";

    // Preparar datos para la API (conclusión)
    $datos_tabla = "Resultados de los tests:\n\n";
    $datos_tabla .= "CASM-83 (Intereses Vocacionales):\n";
    foreach ($resultadosCategorias83 as $categoria => $valores) {
        $datos_tabla .= "- $categoria: Puntaje {$valores['total']}, Respuestas A: {$valores['A']}, Respuestas B: {$valores['B']}\n";
    }
    $datos_tabla .= "Sexo: $sexo\n\n";

    $datos_tabla .= "CASM-85 (Hábitos de Estudio):\n";
    foreach ($resultados85 as $fila) {
        $datos_tabla .= "- {$fila['area']}: Puntaje {$fila['puntaje']}, Categoría {$fila['categoria']}\n";
    }
    $datos_tabla .= "\nPMA (Aptitudes Mentales Primarias):\n";
    $datos_tabla .= "- Comprensión Verbal (V): {$resultadosPMA['factorV']} (Máximo 50)\n";
    $datos_tabla .= "- Razonamiento Espacial (E): {$resultadosPMA['factorE']} (Máximo 20)\n";
    $datos_tabla .= "- Razonamiento (R): {$resultadosPMA['factorR']} (Máximo 30)\n";
    $datos_tabla .= "- Cálculo Numérico (N): {$resultadosPMA['factorN']} (Máximo 70)\n";
    $datos_tabla .= "- Fluidez Verbal (F): {$resultadosPMA['factorF']} (Máximo 75)\n";
    $datos_tabla .= "- Puntaje Total: {$resultadosPMA['puntajeTotal']}\n\n";
    $datos_tabla .= "Gastón (Características de Personalidad):\n";
    $datos_tabla .= "- Tipo Caracterológico: $tipoGaston\n";
    $datos_tabla .= "- Características Generales: $caracteristicaGeneral\n";

    // Depuración: Guardar los datos enviados a la API
    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_datos_tabla.txt', $datos_tabla . "\n---\n", FILE_APPEND);

    // Configurar solicitud a la API de Together para la conclusión
    $together_api_key = "d285b1cfe48c461f457e1a3d0241826e4f17d04bc98e5dead7d48c9107912a4e";
    $together_api_url = "https://api.together.xyz/v1/chat/completions";

    $data_conclusion = [
        "model" => "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        "messages" => [
            [
                "role" => "system",
                "content" => "Eres un asistente especializado en análisis vocacional. Recibes resultados de cuatro tests: CASM-83 (intereses vocacionales, 13 categorías con puntajes 0-22, respuestas A y B, y sexo del participante), CASM-85 (hábitos de estudio, áreas con puntajes y categorías), PMA (aptitudes mentales en cinco factores con puntajes y máximos), y Gastón (tipo caracterológico con características generales). Genera una conclusión en prosa clara, concisa y en español, integrando los resultados para ofrecer una visión holística de las fortalezas, debilidades, intereses, hábitos, aptitudes y personalidad del participante. Limita la respuesta a 300-400 palabras. No menciones la falta de acceso a datos ni incluyas explicaciones técnicas."
            ],
            [
                "role" => "user",
                "content" => "Genera una conclusión en prosa basada en los siguientes resultados:\n\n$datos_tabla"
            ]
        ],
        "temperature" => 0.7,
        "max_tokens" => 1000
    ];

    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_api_conclusion_request.txt', json_encode($data_conclusion, JSON_PRETTY_PRINT) . "\n---\n", FILE_APPEND);

    $ch = curl_init($together_api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer $together_api_key"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data_conclusion));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Deshabilitar verificación SSL para pruebas

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    // Depuración: Guardar la respuesta de la API para la conclusión
    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_api_conclusion_response.txt', $response . "\n---\n", FILE_APPEND);
    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_api_conclusion_length.txt', "Longitud de la respuesta (conclusión): " . strlen($response) . " caracteres\n", FILE_APPEND);

    if ($response === false || $http_code !== 200) {
        logError("Error en la solicitud a la API (conclusión): HTTP $http_code, Error: $error");
        echo json_encode(['exito' => false, 'mensaje' => "Error en la solicitud a la API (conclusión): HTTP $http_code"]);
        exit;
    }

    $api_response = json_decode($response, true);
    if (!is_array($api_response) || !isset($api_response['choices'][0]['message']['content'])) {
        logError("Respuesta de la API inválida (conclusión): " . json_encode($api_response));
        echo json_encode(['exito' => false, 'mensaje' => "Respuesta de la API inválida (conclusión)."]);
        exit;
    }

    $conclusion = $api_response['choices'][0]['message']['content'];

    // Configurar solicitud a la API de Together para las recomendaciones
    $data_recommendations = [
        "model" => "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        "messages" => [
            [
                "role" => "system",
                "content" => "Eres un asistente especializado en orientación vocacional. Basándote en una conclusión sobre el perfil vocacional de un participante, genera recomendaciones vocacionales específicas, prácticas y en español. Incluye 4-5 recomendaciones que cubran carreras, áreas profesionales o trayectorias educativas alineadas con las fortalezas, intereses, aptitudes, hábitos de estudio y personalidad del participante, además de sugerencias para mejorar áreas débiles. Limita la respuesta a 300-400 palabras. Escribe en prosa clara y concisa, evitando referencias a la falta de datos o explicaciones técnicas."
            ],
            [
                "role" => "user",
                "content" => "Genera recomendaciones vocacionales basadas en la siguiente conclusión:\n\n$conclusion"
            ]
        ],
        "temperature" => 0.7,
        "max_tokens" => 1000
    ];

    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_api_recommendations_request.txt', json_encode($data_recommendations, JSON_PRETTY_PRINT) . "\n---\n", FILE_APPEND);

    $ch = curl_init($together_api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer $together_api_key"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data_recommendations));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Deshabilitar verificación SSL para pruebas

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    // Depuración: Guardar la respuesta de la API para las recomendaciones
    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_api_recommendations_response.txt', $response . "\n---\n", FILE_APPEND);
    file_put_contents('C:\xampp\htdocs\TestVocacional\Controlador\debug_api_recommendations_length.txt', "Longitud de la respuesta (recomendaciones): " . strlen($response) . " caracteres\n", FILE_APPEND);

    if ($response === false || $http_code !== 200) {
        logError("Error en la solicitud a la API (recomendaciones): HTTP $http_code, Error: $error");
        echo json_encode(['exito' => false, 'mensaje' => "Error en la solicitud a la API (recomendaciones): HTTP $http_code"]);
        exit;
    }

    $api_response = json_decode($response, true);
    if (!is_array($api_response) || !isset($api_response['choices'][0]['message']['content'])) {
        logError("Respuesta de la API inválida (recomendaciones): " . json_encode($api_response));
        echo json_encode(['exito' => false, 'mensaje' => "Respuesta de la API inválida (recomendaciones)."]);
        exit;
    }

    $recomendaciones = $api_response['choices'][0]['message']['content'];

    // Retornar conclusión y recomendaciones
    echo json_encode(['exito' => true, 'conclusion' => trim($conclusion), 'recomendaciones' => trim($recomendaciones)]);

} catch (Exception $e) {
    logError("Error en analizarConclusiones.php: " . $e->getMessage());
    echo json_encode(['exito' => false, 'mensaje' => "Error: " . $e->getMessage()]);
} finally {
    // Cerrar la conexión a la base de datos
    if (isset($conexion) && $conexion instanceof mysqli) {
        $conexion->close();
    }
}
?>