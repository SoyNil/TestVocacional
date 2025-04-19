document.addEventListener("DOMContentLoaded", function () {
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

        // Cambiar de dirección al llegar a los extremos
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

    // =======================
    // Modal y Tabs (como ya lo tenías)
    // =======================
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
        let contenido = "";
        switch (tipo) {
            case "test":
                contenido = `
                    <h2>Test Psicológico</h2>
                    <div class="botones-test">
                        <button onclick="window.location.href='testCASM85.html'">INVENTARIO DE HÁBITOS DE ESTUDIO CASM-85-R 2005</button>
                        <button onclick="window.location.href='testCASM83.html'">INVENTARIO DE INTERESES VOCACIONALES Y OCUPACIONALES CASM-83</button>
                        <button onclick="window.location.href='otro_test2.html'">Otro Test 2</button>
                    </div>
                `;
                break;
            case "consejos":
                contenido = "<h2>Consejos</h2><p>Algunos consejos para elegir una carrera profesional adecuada.</p>";
                break;
            case "orientacion":
                contenido = "<h2>Orientación Vocacional</h2><p>Información sobre orientación vocacional y cómo puede ayudarte.</p>";
                break;
        }
        contenidoTab.innerHTML = contenido;
    }
});

