document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("mostrarModalLimite") === "true") {
        localStorage.removeItem("mostrarModalLimite");
        mostrarModalLimite(); // Ya existente
    }

    // MENSAJE DE BIENVENIDA
    fetch("../Controlador/mensajeBienvenida.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("mensaje-bienvenida").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el mensaje de bienvenida:", error));

    // VERIFICAR SESIÓN Y ABRIR MODAL SI ESTÁ LOGUEADO
    fetch("../Controlador/verificarSesion.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("auth-buttons").innerHTML = data;

            const tipoUsuarioElement = document.getElementById("tipo-usuario");
            const modal = document.getElementById("contenidoAjax");
            if (tipoUsuarioElement && modal) {
                const tipo = tipoUsuarioElement.dataset.tipo;
                if (tipo === "psicologo") {
                    window.location.href = "principalpsicologo.html";
                } else if (tipo === "usuario" || tipo === "institucion") {
                    modal.style.display = "block";
                    setTimeout(() => {
                        modal.classList.add("show");
                        cargarContenido("test");
                    }, 10);
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

    if (btnApoyoVocacional && modal) {
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
                    cargarContenido("test"); // Cargar tests por defecto
                }, 10);
            }
        });
    }

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
                    <button onclick="verificarYRedirigir('../Vista/testPMA.html')">TEST DE APTITUDES MENTALES PRIMARIAS (PMA)</button>
                    <button onclick="verificarYRedirigir('../Vista/testGaston.html')">TEST DE TEMPERAMENTO CARACTEROLOGICO DE GASTÓN BERGIER</button>
                </div>
            `;
        } else {
            // contenido general
        }
    }

    function verificarYRedirigir(urlTest) {
        fetch("../Controlador/verificarSesionJSON.php")
            .then(res => res.json())
            .then(data => {
                if (!data.logueado) {
                    mostrarModalLogin();
                    return;
                }
                if (data.tipo_usuario !== 'usuario' && data.tipo_usuario !== 'institucion') {
                    mostrarMensaje("Solo los usuarios e instituciones pueden acceder a los tests.", false);
                    window.location.href = "../Vista/principalpsicologo.html";
                    return;
                }

                // Determinar endpoint y categoría por test
                let endpoint = "";
                let categoriasPorTest = 1;
                if (urlTest.includes("testCASM83.html")) {
                    endpoint = `../Controlador/obtenerResultadosCASM83General.php?tipo_usuario=${data.tipo_usuario}`;
                    categoriasPorTest = 13;
                } else if (urlTest.includes("testCASM85.html")) {
                    endpoint = `../Controlador/obtenerResultadosCASM85General.php?tipo_usuario=${data.tipo_usuario}`;
                    categoriasPorTest = 5;
                } else if (urlTest.includes("testPMA.html")) {
                    endpoint = `../Controlador/obtenerResultadosPMAGeneral.php?tipo_usuario=${data.tipo_usuario}`;
                    categoriasPorTest = 1;
                } else if (urlTest.includes("testGaston.html")) {
                    endpoint = `../Controlador/obtenerResultadosGastonGeneral.php?tipo_usuario=${data.tipo_usuario}`;
                    categoriasPorTest = 1;
                }

                // Si no hay endpoint, ir directo
                if (!endpoint) {
                    window.location.href = urlTest;
                    return;
                }

                // Verificar intentos
                fetch(endpoint)
                    .then(res => res.json())
                    .then(dataTest => {
                        if (!dataTest.exito) {
                            console.error("Error al obtener resultados:", dataTest.mensaje);
                            mostrarMensaje("Error al verificar intentos.", false);
                            return;
                        }

                        const numTests = Math.floor(dataTest.resultados.length / categoriasPorTest);
                        if (numTests >= 4) {
                            mostrarModalLimite();
                        } else {
                            window.location.href = urlTest;
                        }
                    })
                    .catch(error => {
                        console.error("Error al consultar resultados:", error);
                        mostrarMensaje("Hubo un problema al verificar los intentos.", false);
                    });
            })
            .catch(error => {
                console.error("Error al verificar la sesión:", error);
                mostrarMensaje("Hubo un problema al verificar la sesión.", false);
            });
    }

    function mostrarModalLogin() {
        // Crear modal si no existe
        let modal = document.getElementById("modal-login-required");
        if (!modal) {
            const modalHTML = `
                <div id="modal-login-required" class="modal-log">
                    <div class="modal-content-log">
                        <span id="modal-close-login" class="modal-close">×</span>
                        <h3>Inicio de Sesión Requerido</h3>
                        <p>Debes iniciar sesión para acceder a este test. Si tienes una cuenta presiona <a href="../Vista/login.html" style="color: #2944ff; text-decoration: underline;">aquí</a> o si te vas a registrar hazlo <a href="../Vista/registro.html" style="color: #2944ff; text-decoration: underline;">aquí</a>.</p>
                        <button id="modal-ok-login" class="modal-button">Aceptar</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML("beforeend", modalHTML);
            modal = document.getElementById("modal-login-required");

            // Configurar eventos
            const closeBtn = document.getElementById("modal-close-login");
            const okBtn = document.getElementById("modal-ok-login");

            closeBtn.onclick = () => {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            };

            okBtn.onclick = () => {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            };

            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.classList.remove("show");
                    setTimeout(() => {
                        modal.style.display = "none";
                    }, 300);
                }
            };
        }

        // Mostrar modal
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    }

    function mostrarModalLimite() {
        // Crear modal si no existe
        let modal = document.getElementById("modal-limit-exceeded");
        if (!modal) {
            const modalHTML = `
                <div id="modal-limit-exceeded" class="modal-adv">
                    <div class="modal-content-adv">
                        <span id="modal-close" class="modal-close">×</span>
                        <h3>Límite de Intentos Alcanzado</h3>
                        <p>Has excedido el número de intentos para hacer la prueba. Si quieres más, <a href="https://wa.me/51995107778?text=Hola,%20me%20gustaría%20solicitar%20más%20intentos" style="color: #2944ff; text-decoration: underline;">contáctate con nosotros.</a></p>
                        <button id="modal-ok" class="modal-button">Aceptar</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML("beforeend", modalHTML);
            modal = document.getElementById("modal-limit-exceeded");

            // Configurar eventos
            const closeBtn = document.getElementById("modal-close");
            const okBtn = document.getElementById("modal-ok");

            closeBtn.onclick = () => {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            };

            okBtn.onclick = () => {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            };

            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.classList.remove("show");
                    setTimeout(() => {
                        modal.style.display = "none";
                    }, 300);
                }
            };
        }

        // Mostrar modal
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
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