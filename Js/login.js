// Función para mostrar el error
function showError(message) {
    var errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(function() {
        errorDiv.style.display = 'none';
    }, 5000);  // 5000 milisegundos = 5 segundos
}

// Comprobar si hay un parámetro de error en la URL
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error) {
    if (error === 'contraseña_incorrecta') {
        showError('❌ Contraseña incorrecta.');
    } else if (error === 'usuario_no_existe') {
        showError('❌ El usuario o correo no existe.');
    } else if (error === 'acceso_no_autorizado') {
        showError('❌ Acceso no autorizado.');
    }
}
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    const toggle = document.getElementById("servicios-toggle");
    const menu = document.getElementById("servicios-menu");

    // Verificar si los elementos existen antes de agregar eventos
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active"); // Agrega o elimina la clase 'active' en cada clic
        });
    }

    // Verificar si los elementos del dropdown existen
    if (toggle && menu) {
        toggle.addEventListener("click", function(e) {
            e.preventDefault(); // Evita el comportamiento predeterminado
            menu.classList.toggle("show");
        });

        // Ocultar submenú si se hace clic fuera
        document.addEventListener("click", function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove("show");
            }
        });
    }