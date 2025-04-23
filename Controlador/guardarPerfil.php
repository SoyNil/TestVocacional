<?php
// guardarPerfil.php
session_start();
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verificar que el usuario esté logueado
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario'];  // Suponemos que el nombre de usuario está en la sesión

        // Variables de los campos que pueden ser modificados
        $nombre_usuario = isset($data['nombre_usuario']) ? $data['nombre_usuario'] : null;
        $nombre = isset($data['nombre']) ? $data['nombre'] : null;
        $apellido = isset($data['apellido']) ? $data['apellido'] : null;
        $correo = isset($data['correo']) ? $data['correo'] : null;
        $sexo = isset($data['sexo']) ? $data['sexo'] : null;
        $fecha_nacimiento = isset($data['fecha_nacimiento']) ? $data['fecha_nacimiento'] : null;
        $contraseña = isset($data['contraseña']) ? $data['contraseña'] : null;

        // Preparamos la parte de la consulta que se actualizará, solo si se ha modificado
        $update_fields = [];
        $params = [];

        if ($nombre_usuario) {
            $update_fields[] = "nombre_usuario = ?";
            $params[] = $nombre_usuario;
        }
        if ($nombre) {
            $update_fields[] = "nombre = ?";
            $params[] = $nombre;
        }
        if ($apellido) {
            $update_fields[] = "apellido = ?";
            $params[] = $apellido;
        }
        if ($correo) {
            $update_fields[] = "correo = ?";
            $params[] = $correo;
        }
        if ($sexo) {
            $update_fields[] = "sexo = ?";
            $params[] = $sexo;
        }
        if ($fecha_nacimiento) {
            $update_fields[] = "fecha_nacimiento = ?";
            $params[] = $fecha_nacimiento;
        }
        if ($contraseña) {
            $contraseña = password_hash($contraseña, PASSWORD_DEFAULT);
            $update_fields[] = "contraseña = ?";
            $params[] = $contraseña;
        }

        // Si no hay cambios, no realizamos ninguna actualización
        if (empty($update_fields)) {
            echo json_encode(["exito" => false, "mensaje" => "No se realizaron cambios."]);
            exit();
        }

        // Preparar la consulta para actualizar los datos
        $sql = "UPDATE usuario SET " . implode(", ", $update_fields) . " WHERE nombre_usuario = ?";
        $params[] = $usuario;  // Agregar el nombre de usuario al final para la cláusula WHERE

        // Preparamos la consulta
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param(str_repeat("s", count($params)), ...$params);  // Usamos bind_param dinámicamente

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Si la actualización fue exitosa, actualizamos la sesión
            // Actualizar los valores de la sesión con los nuevos valores
            foreach ($data as $key => $value) {
                $_SESSION[$key] = $value;
            }
            echo json_encode(["exito" => true]);
        } else {
            // Si hubo un error en la ejecución de la consulta
            echo json_encode(["exito" => false, "mensaje" => "Error en la base de datos."]);
        }

        $stmt->close();
        $conexion->close();
    } else {
        // Si el usuario no está logueado
        echo json_encode(["exito" => false, "mensaje" => "No se encontró al usuario en sesión"]);
    }
} else {
    echo json_encode(["exito" => false, "mensaje" => "Método no permitido"]);
}
?>
