document.addEventListener("DOMContentLoaded", function () {
    // MENSAJE DE BIENVENIDA
    fetch("../Controlador/mensajeBienvenida.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("mensaje-bienvenida").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el mensaje de bienvenida:", error));

    // VERIFICAR SESIÓN
    fetch("../Controlador/verificarSesion.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("auth-buttons").innerHTML = data;

            const tipoUsuarioElement = document.getElementById("tipo-usuario");
            if (tipoUsuarioElement) {
                const tipo = tipoUsuarioElement.dataset.tipo;
                if (tipo === "psicologo") {
                    window.location.href = "principalpsicologo.html";
                }
            }
        })
        .catch(error => {
            console.error("Error al cargar botones de sesión:", error);
        });

    // CARRUSEL DE BOTONES
    const carruselSlide = document.querySelector('.carrusel-imagenes-slide');

    let scrollX = 0;
    let direccion = 1; // 1 = izquierda a derecha, -1 = derecha a izquierda
    const velocidad = 100; // píxeles por segundo
    let ultimaHora = performance.now();

    function animarCarrusel(tiempoActual) {
        const delta = (tiempoActual - ultimaHora) / 1000; // segundos
        ultimaHora = tiempoActual;

        const paso = velocidad * delta * direccion;
        scrollX += paso;

        const maxScroll = carruselSlide.scrollWidth - carruselSlide.parentElement.clientWidth;

        if (scrollX >= maxScroll) {
            scrollX = maxScroll;
            direccion = -1;
        } else if (scrollX <= 0) {
            scrollX = 0;
            direccion = 1;
        }

        carruselSlide.style.transform = `translateX(-${scrollX}px)`;
        requestAnimationFrame(animarCarrusel);
    }

    requestAnimationFrame(animarCarrusel);

    const slides = document.querySelectorAll('.slide');
    let indiceActual = 0;

    const mostrarSlide = (indice) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('activo', i === indice);
        });
    };

    document.getElementById('btnAnterior').addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + slides.length) % slides.length;
        mostrarSlide(indiceActual);
    });

    document.getElementById('btnSiguiente').addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % slides.length;
        mostrarSlide(indiceActual);
    });

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

    // Modal y Tabs
    const btnApoyoVocacional = document.getElementById("btnApoyoVocacional");
    const modal = document.getElementById("contenidoAjax");
    const tabButtons = document.querySelectorAll(".tab-button");
    const contenidoTab = document.getElementById("contenidoTab");

    btnApoyoVocacional.addEventListener("click", function (e) {
        e.preventDefault();
        if (modal.classList.contains("show")) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        } else {
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const contentType = this.getAttribute("data-content");
            cargarContenido(contentType);
        });
    });

    function cargarContenido(tipo) {
        const contenidoTab = document.getElementById("contenidoTab");

        if (tipo === "test") {
            contenidoTab.innerHTML = `
                <h2>Test Psicológico</h2>
                <div class="botones-test">
                    <button onclick="verificarYRedirigir('../Vista/testCASM85.html')">INVENTARIO DE HÁBITOS DE ESTUDIO CASM-85-R 2005</button>
                    <button onclick="verificarYRedirigir('../Vista/testCASM83.html')">INVENTARIO DE INTERESES VOCACIONALES Y OCUPACIONALES CASM-83</button>
                    <button onclick="verificarYRedirigir('../Vista/otro_test2.html')">Otro Test 2</button>
                </div>
            `;
        } else {
            let contenido = "";
            switch (tipo) {
                case "consejos":
                    contenido = "<h2>Consejos</h2><p>Algunos consejos para elegir una carrera profesional adecuada.</p>";
                    break;
                case "orientacion":
                    contenido = "<h2>Orientación Vocacional</h2><p>Información sobre orientación vocacional y cómo puede ayudarte.</p>";
                    break;
            }
            contenidoTab.innerHTML = contenido;
        }
    }

    function verificarYRedirigir(urlTest) {
        fetch("../Controlador/verificarSesionJSON.php")
            .then(res => res.json())
            .then(data => {
                if (!data.logueado) {
                    mostrarMensaje("Debes iniciar sesión para acceder a este test.", false);
                } else if (data.tipo_usuario !== 'usuario') {
                    mostrarMensaje("Solo los usuarios pueden acceder a los tests.", false);
                    // Opcional: Redirigir a principalpsicologo.html si es psicólogo
                    window.location.href = "../Vista/principalpsicologo.html";
                } else {
                    window.location.href = urlTest;
                }
            })
            .catch(error => {
                console.error("Error al verificar la sesión:", error);
                mostrarMensaje("Hubo un problema al verificar la sesión.", false);
            });
    }

    function mostrarMensaje(mensaje, exito = true) {
        let mensajeElemento = document.getElementById("mensaje-error");

        if (!mensajeElemento) {
            mensajeElemento = document.createElement("div");
            mensajeElemento.id = "mensaje-error";
            mensajeElemento.style.marginTop = "1em";
            mensajeElemento.style.padding = "0.5em";
            mensajeElemento.style.borderRadius = "5px";
            mensajeElemento.style.fontWeight = "bold";

            const contenedor = document.querySelector(".botones-test");
            if (contenedor) {
                contenedor.appendChild(mensajeElemento);
            }
        }

        mensajeElemento.textContent = mensaje;
        mensajeElemento.style.color = exito ? "green" : "#a94442";
        mensajeElemento.style.backgroundColor = exito ? "#dff0d8" : "#f2dede";
        mensajeElemento.style.border = exito ? "1px solid #d6e9c6" : "1px solid green";
    }

    window.verificarYRedirigir = verificarYRedirigir;
});