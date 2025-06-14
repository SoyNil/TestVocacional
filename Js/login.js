// Función para limpiar mensajes de error
function clearErrors() {
    const errorDivs = document.querySelectorAll('.error-message');
    errorDivs.forEach(div => div.textContent = '');
}

// Función para mostrar errores debajo de los campos
function showErrors(errors) {
    clearErrors();
    console.log('Errores recibidos:', errors);
    for (const [field, message] of Object.entries(errors)) {
        const errorDiv = document.getElementById(`error-${field}`);
        if (errorDiv) {
            errorDiv.textContent = `❌ ${message}`;
        } else {
            console.warn(`No se encontró el div de error para el campo: ${field}`);
        }
    }
}

// Manejar el formulario de registro
const registroForm = document.getElementById('registro-form');
if (registroForm) {
    console.log('Formulario de registro encontrado');
    registroForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('Formulario enviado');

        const formData = new FormData(registroForm);
        console.log('Datos del formulario:', Object.fromEntries(formData));

        try {
            const response = await fetch('../Controlador/registro.php', {
                method: 'POST',
                body: formData
            });

            console.log('Respuesta recibida:', response);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const text = await response.text(); // Obtener respuesta cruda
            console.log('Respuesta cruda:', text); // Depuración

            try {
                const data = JSON.parse(text);
                console.log('Datos JSON:', data);
                if (data.exito) {
                    console.log('Registro exitoso, redirigiendo a login.html');
                    window.location.href = 'login.html';
                } else {
                    showErrors(data.errores);
                }
            } catch (jsonErr) {
                console.error('Error al parsear JSON:', jsonErr, 'Respuesta:', text);
                showErrors({ general: 'Error al procesar la respuesta del servidor.' });
            }
        } catch (err) {
            console.error('Error en la solicitud:', err);
            showErrors({ general: 'Error en la conexión con el servidor: ' + err.message });
        }
    });
}

// Comprobar si hay un parámetro de error en la URL (para login.html)
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        console.log('Error en URL:', error);
        switch (error) {
            case 'contraseña_incorrecta':
                errorDiv.textContent = '❌ Contraseña incorrecta.';
                break;
            case 'usuario_no_existe':
                errorDiv.textContent = '❌ El usuario o correo no existe.';
                break;
            case 'acceso_no_autorizado':
                errorDiv.textContent = '❌ Acceso no autorizado.';
                break;
            case 'codigo_invalido':
                errorDiv.textContent = '❌ El código de invitación es inválido o ha expirado.';
                break;
            case 'codigo_usado':
                errorDiv.textContent = '❌ Este código de invitación ya ha sido utilizado.';
                break;
            default:
                errorDiv.textContent = '❌ Ha ocurrido un error desconocido.';
        }
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else {
        console.warn('No se encontró #error-message para mostrar error en URL');
    }
}

// Manejar menú hamburguesa
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
const toggle = document.getElementById("servicios-toggle");
const menu = document.getElementById("servicios-menu");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
}

if (toggle && menu) {
    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        menu.classList.toggle("show");
    });

    document.addEventListener("click", function(e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove("show");
        }
    });
}