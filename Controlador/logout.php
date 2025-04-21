<?php
session_start();

// Destruimos todas las variables de sesión
session_unset();

// Destruimos la sesión
session_destroy();

// Redirigimos al inicio o a la página de login
header("Location: ../Vista/principal.html");
exit();
?>
