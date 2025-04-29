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

document.addEventListener("DOMContentLoaded", () => {
    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach((customSelect) => {
        const selectButton = customSelect.querySelector(".select-button");
        const dropdown = customSelect.querySelector(".select-dropdown");
        const options = dropdown.querySelectorAll("li");
        const selectedValue = selectButton.querySelector(".selected-value");
        const hiddenInput = customSelect.querySelector("#sexo-value");

        let focusedIndex = -1;

        const toggleDropdown = (expand = null) => {
            const isOpen =
                expand !== null ? expand : dropdown.classList.contains("hidden");
            dropdown.classList.toggle("hidden", !isOpen);
            selectButton.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                focusedIndex = [...options].findIndex((option) =>
                    option.classList.contains("selected")
                );
                focusedIndex = focusedIndex === -1 ? 0 : focusedIndex;
                updateFocus();
            } else {
                focusedIndex = -1;
                selectButton.focus();
            }
        };

        const updateFocus = () => {
            options.forEach((option, index) => {
                if (option) {
                    option.setAttribute("tabindex", index === focusedIndex ? "0" : "-1");
                    if (index === focusedIndex) option.focus();
                }
            });
        };

        const handleOptionSelect = (option) => {
            options.forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            const value = option.dataset.value;
            selectedValue.textContent = option.textContent.trim();
            hiddenInput.value = value;
        };

        options.forEach((option) => {
            option.addEventListener("click", () => {
                handleOptionSelect(option);
                toggleDropdown(false);
            });
        });

        selectButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevenir el envío del formulario
            toggleDropdown();
        });

        selectButton.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                toggleDropdown(true);
            } else if (event.key === "Escape") {
                toggleDropdown(false);
            }
        });

        dropdown.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                focusedIndex = (focusedIndex + 1) % options.length;
                updateFocus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusedIndex = (focusedIndex - 1 + options.length) % options.length;
                updateFocus();
            } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOptionSelect(options[focusedIndex]);
                toggleDropdown(false);
            } else if (event.key === "Escape") {
                toggleDropdown(false);
            }
        });

        document.addEventListener("click", (event) => {
            const isOutsideClick = !customSelect.contains(event.target);
            if (isOutsideClick) {
                toggleDropdown(false);
            }
        });
    });
});