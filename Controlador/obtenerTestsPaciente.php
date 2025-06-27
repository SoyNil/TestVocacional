<?php
   ini_set('display_errors', 0);
   ini_set('log_errors', 1);
   ini_set('error_log', 'php_errors.log');
   error_reporting(E_ALL);

   session_start();
   header("Content-Type: application/json");

   if (!isset($_SESSION["usuario"]) || !isset($_SESSION["jerarquia"])) {
       echo json_encode(["exito" => false, "error" => "No autorizado."]);
       exit;
   }

   if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
       echo json_encode(["exito" => false, "error" => "ID de paciente inválido."]);
       exit;
   }

   require_once "conexion.php";

   if ($conexion->connect_error) {
       error_log("Error de conexión: " . $conexion->connect_error);
       echo json_encode(["exito" => false, "error" => "Error de conexión a la base de datos."]);
       exit;
   }

   $idPaciente = (int)$_GET["id"];
   $jerarquia = $_SESSION["jerarquia"];

   // Verificar que el paciente exista y sea accesible según la jerarquía
   if ($jerarquia === "admin") {
       $sqlPaciente = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, fecha_nacimiento, tipo_cuenta 
                       FROM usuario 
                       WHERE id = ? AND tipo_cuenta IN ('Libre', 'Invitación')";
   } elseif ($jerarquia === "psicologo") {
       $sqlPaciente = "SELECT id, nombre_usuario, nombre, apellido, correo, sexo, fecha_nacimiento, tipo_cuenta 
                       FROM usuario 
                       WHERE id = ? AND tipo_cuenta = 'Invitación'";
   } else {
       echo json_encode(["exito" => false, "error" => "Jerarquía no autorizada."]);
       exit;
   }

   $stmtPaciente = $conexion->prepare($sqlPaciente);
   if (!$stmtPaciente) {
       error_log("Error al preparar consulta de paciente: " . $conexion->error);
       echo json_encode(["exito" => false, "error" => "Error al consultar el paciente."]);
       exit;
   }
   $stmtPaciente->bind_param("i", $idPaciente);
   $stmtPaciente->execute();
   $resultadoPaciente = $stmtPaciente->get_result();

   if ($resultadoPaciente->num_rows === 0) {
       echo json_encode(["exito" => false, "error" => "Paciente no encontrado o no autorizado."]);
       exit;
   }

   $paciente = $resultadoPaciente->fetch_assoc();

   // Obtener tests CASM-83
   $sqlCasm83 = "SELECT id, fecha 
                 FROM test_casm83 
                 WHERE id_usuario = ? 
                 ORDER BY id ASC";
   $stmtCasm83 = $conexion->prepare($sqlCasm83);
   if (!$stmtCasm83) {
       error_log("Error al preparar consulta de CASM-83: " . $conexion->error);
       echo json_encode(["exito" => false, "error" => "Error al consultar tests CASM-83."]);
       exit;
   }
   $stmtCasm83->bind_param("i", $idPaciente);
   $stmtCasm83->execute();
   $resultadoCasm83 = $stmtCasm83->get_result();

   $casm83Tests = [];
   $testNumber = 0;
   $recordsPerTest = 13; // 13 categorías por test
   while ($row = $resultadoCasm83->fetch_assoc()) {
       if ($row["id"] % $recordsPerTest === 1) { // Cada 13 registros es un nuevo test
           $testNumber++;
           $casm83Tests[] = [
               "test_number" => $testNumber,
               "fecha" => $row["fecha"],
               "id_inicio" => $row["id"]
           ];
       }
   }

   // Obtener tests CASM-85
   $sqlCasm85 = "SELECT id, fecha 
                 FROM test_casm85 
                 WHERE id_usuario = ? 
                 ORDER BY id ASC";
   $stmtCasm85 = $conexion->prepare($sqlCasm85);
   if (!$stmtCasm85) {
       error_log("Error al preparar consulta de CASM-85: " . $conexion->error);
       echo json_encode(["exito" => false, "error" => "Error al consultar tests CASM-85."]);
       exit;
   }
   $stmtCasm85->bind_param("i", $idPaciente);
   $stmtCasm85->execute();
   $resultadoCasm85 = $stmtCasm85->get_result();

   $casm85Tests = [];
   $testNumber = 0;
   $recordsPerTest = 5; // 5 áreas por test
   while ($row = $resultadoCasm85->fetch_assoc()) {
       if ($row["id"] % $recordsPerTest === 1) { // Cada 5 registros es un nuevo test
           $testNumber++;
           $casm85Tests[] = [
               "test_number" => $testNumber,
               "fecha" => $row["fecha"],
               "id_inicio" => $row["id"]
           ];
       }
   }

   // Obtener tests PMA
   $sqlPma = "SELECT id, fecha 
              FROM test_pma 
              WHERE id_usuario = ? 
              ORDER BY id ASC";
   $stmtPma = $conexion->prepare($sqlPma);
   if (!$stmtPma) {
       error_log("Error al preparar consulta de PMA: " . $conexion->error);
       echo json_encode(["exito" => false, "error" => "Error al consultar tests PMA."]);
       exit;
   }
   $stmtPma->bind_param("i", $idPaciente);
   $stmtPma->execute();
   $resultadoPma = $stmtPma->get_result();

   $pmaTests = [];
   $testNumber = 0;
   while ($row = $resultadoPma->fetch_assoc()) {
       $testNumber++;
       $pmaTests[] = [
           "test_number" => $testNumber,
           "fecha" => $row["fecha"],
           "id_inicio" => $row["id"]
       ];
   }

    // Obtener tests Gastón
    $sqlGaston = "SELECT id, fecha 
                FROM test_gaston 
                WHERE id_usuario = ? 
                ORDER BY id ASC";
    $stmtGaston = $conexion->prepare($sqlGaston);
    if (!$stmtGaston) {
        error_log("Error al preparar consulta de Gastón: " . $conexion->error);
        echo json_encode(["exito" => false, "error" => "Error al consultar tests Gastón."]);
        exit;
    }
    $stmtGaston->bind_param("i", $idPaciente);
    $stmtGaston->execute();
    $resultadoGaston = $stmtGaston->get_result();

    $gastonTests = [];
    $testNumber = 0;
    while ($row = $resultadoGaston->fetch_assoc()) {
        $testNumber++;
        $gastonTests[] = [
            "test_number" => $testNumber,
            "fecha" => $row["fecha"],
            "id_inicio" => $row["id"]
        ];
    }

   $response = [
    "exito" => true,
    "paciente" => $paciente,
    "tests" => [
        "casm83" => $casm83Tests,
        "casm85" => $casm85Tests,
        "pma" => $pmaTests,
        "gaston" => $gastonTests // ✅ nuevo test añadido
    ]
];

// Log de depuración
error_log("Respuesta enviada: " . json_encode($response));

echo json_encode($response);

   $conexion->close();
   ?>