document.addEventListener("DOMContentLoaded", function () {
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

    // Verificar sesión y tipo de usuario
    fetch("../Controlador/verificarSesionJSON.php")
        .then(response => response.json())
        .then(data => {
            if (!data.logueado) {
                window.location.href = "../Vista/principal.html";
            } else if (data.tipo_usuario !== 'usuario') {
                window.location.href = "../Vista/principalpsicologo.html";
            } else {
                // Rellenar los campos de nombre y sexo
                document.getElementById("nombre").value = data.nombre || '';
                document.getElementById("sexo").value = data.sexo || '';

                if (data.fecha_nacimiento) {
                    const fechaNacimiento = new Date(data.fecha_nacimiento);
                    const hoy = new Date();
                    // Calcular la edad
                    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

                    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                        edad--; // Si no ha cumplido años aún este año, restar un año
                    }

                    // Console log para verificar la edad calculada
                    console.log("Fecha de nacimiento:", data.fecha_nacimiento);
                    console.log("Edad calculada:", edad);

                    // Asignar la edad al campo input
                    const edadInput = document.getElementById("edad");
                    if (edadInput) {
                        edadInput.value = edad;
                    }
                }
            }
        })
        .catch(error => {
            console.error("Error verificando sesión:", error);
            window.location.href = "../Vista/principal.html";
        });

    const form = document.querySelector("form");
    const cuestionarioContainer = document.getElementById("cuestionario");
    const formContainer = form.closest('.container');
    const resultadosContainer = document.getElementById("resultados");
    const resultadosContenido = document.getElementById("resultadosContenido");
    const resultadosBtn = document.getElementById("resultadosBtn");

    if (form) {
        form.addEventListener("submit", function (event) {
            let isValid = true;
            const inputs = form.querySelectorAll("input, select");

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.border = "2px solid red";
                    isValid = false;
                } else {
                    input.style.border = "1px solid #ccc";
                }
            });

            if (!isValid) {
                event.preventDefault();
            } else {
                event.preventDefault();
                formContainer.style.display = "none";
                cargarCuestionario();
                cuestionarioContainer.style.display = "block";
            }
        });
    }

    if (resultadosBtn) {
        resultadosBtn.addEventListener("click", function () {
            calcularResultados();
            cuestionarioContainer.style.display = "none";
            resultadosContainer.style.display = "block";
        });
    }

    function obtenerCategoriaSeccion(puntaje, seccion) {
        switch (seccion) {
            case 1:
                if (puntaje >= 10) return "MUY POSITIVO";
                if (puntaje >= 8) return "POSITIVO";
                if (puntaje >= 5) return "TENDENCIA POSITIVA";
                if (puntaje >= 3) return "TENDENCIA NEGATIVA";
                if (puntaje >= 1) return "NEGATIVO";
                return "MUY NEGATIVO";
            case 2:
                if (puntaje === 10) return "MUY POSITIVO";
                if (puntaje >= 8) return "POSITIVO";
                if (puntaje >= 6) return "TENDENCIA POSITIVA";
                if (puntaje >= 3) return "TENDENCIA NEGATIVA";
                if (puntaje >= 1) return "NEGATIVO";
                return "MUY NEGATIVO";
            case 3:
                if (puntaje === 11) return "MUY POSITIVO";
                if (puntaje >= 9) return "POSITIVO";
                if (puntaje >= 7) return "TENDENCIA POSITIVA";
                if (puntaje >= 4) return "TENDENCIA NEGATIVA";
                if (puntaje >= 2) return "NEGATIVO";
                return "MUY NEGATIVO";
            case 4:
                if (puntaje >= 10) return "MUY POSITIVO";
                if (puntaje >= 8) return "POSITIVO";
                if (puntaje >= 6) return "TENDENCIA POSITIVA";
                if (puntaje >= 4) return "TENDENCIA NEGATIVA";
                if (puntaje >= 2) return "NEGATIVO";
                return "MUY NEGATIVO";
            case 5:
                if (puntaje >= 7) return "MUY POSITIVO";
                if (puntaje === 6) return "POSITIVO";
                if (puntaje === 5) return "TENDENCIA POSITIVA";
                if (puntaje === 4) return "TENDENCIA NEGATIVA";
                if (puntaje >= 1) return "NEGATIVO";
                return "MUY NEGATIVO";
            default:
                return "SIN CATEGORÍA";
        }
    }

    function obtenerCategoriaGlobal(puntajeTotal) {
        if (puntajeTotal >= 44) return "MUY POSITIVO";
        if (puntajeTotal >= 36) return "POSITIVO";
        if (puntajeTotal >= 28) return "TENDENCIA POSITIVA";
        if (puntajeTotal >= 18) return "TENDENCIA NEGATIVA";
        if (puntajeTotal >= 9) return "NEGATIVO";
        return "MUY NEGATIVO";
    }

    function cargarCuestionario() {
        fetch("../Js/preguntasCASM85.json")
            .then(response => response.json())
            .then(data => {
                let cuestionarioHTML = "";
                let tablaCuestionario = document.querySelector("#tablaCuestionario tbody");
                if (!data.secciones) {
                    console.error("El JSON no tiene la estructura esperada");
                    return;
                }
                let preguntaNumero = 1;
                
                function toRoman(num) {
                    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
                    return romanNumerals[num - 1] || num;
                }

                data.secciones.forEach((seccion, sectionIndex) => {
                    let numeroRomano = toRoman(sectionIndex + 1);
                    cuestionarioHTML += `
                        <thead>
                            <tr>
                                <th>${numeroRomano}</th>
                                <th>${seccion.titulo}</th>
                                <th>SIEMPRE</th>
                                <th>NUNCA</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    seccion.preguntas.forEach((pregunta) => {
                        let textoPregunta = typeof pregunta === "object" ? pregunta.texto : pregunta;
                        let regla = pregunta.regla || "normal";

                        cuestionarioHTML += `
                            <tr>
                                <td>${preguntaNumero}</td>
                                <td style="text-align: left;">${textoPregunta}</td>
                                <td><input type="radio" name="pregunta${preguntaNumero}" value="siempre"></td>
                                <td><input type="radio" name="pregunta${preguntaNumero}" value="nunca"></td>
                            </tr>`;
                        preguntaNumero++;
                    });
                    
                    cuestionarioHTML += `</tbody>`;
                });

                tablaCuestionario.innerHTML = cuestionarioHTML;
            })
            .catch(error => console.error("Error al cargar las preguntas:", error));
    }

    function calcularResultados() {
        fetch("../Js/preguntasCASM85.json")
            .then(response => response.json())
            .then(data => {
                let puntajes = {};
                let puntajeTotal = 0;
                let preguntaNumero = 1;

                if (!data.secciones) {
                    console.error("El JSON no tiene la estructura esperada");
                    return;
                }

                data.secciones.forEach(seccion => {
                    let puntajeSeccion = 0;
                    seccion.preguntas.forEach(pregunta => {
                        let regla = pregunta.regla || "normal";
                        let seleccion = document.querySelector(`input[name='pregunta${preguntaNumero}']:checked`);

                        if (seleccion) {
                            if ((regla === "normal" && seleccion.value === "siempre") || 
                                (regla === "invertida" && seleccion.value === "nunca")) {
                                puntajeSeccion++;
                                puntajeTotal++;
                            }
                        }
                        preguntaNumero++;
                    });
                    puntajes[seccion.titulo] = puntajeSeccion;
                });

                mostrarResultados(puntajes, puntajeTotal);
            })
            .catch(error => console.error("Error al calcular los resultados:", error));
    }

    function mostrarResultados(puntajes, puntajeTotal) {
        const nombre = document.getElementById("nombre").value || "Sin nombre";
        const edad = document.getElementById("edad").value || "Sin edad";
        const sexo = document.getElementById("sexo").value || "Sin especificar";
        const gradoEstudio = document.getElementById("gradoEstudio").value || "Sin especificar";
        const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

        let puntajeTotalGlobal = 0;

        let resultadosHTML = `
            <h2>Resultados del Test</h2>
            
            <div style="display: flex; justify-content: space-between; gap: 40px; align-items: flex-start;">
                <div style="flex: 1;">
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Edad:</strong> ${edad}</p>
                    <p><strong>Sexo:</strong> ${sexo}</p>
                    <p><strong>Grado de Estudio:</strong> ${gradoEstudio}</p>
                    <p><strong>Fecha:</strong> ${fechaActual}</p>
                </div>

                <table border="1" class="categoria-table">
                    <tr><th>CATEGORÍA</th></tr>
                    <tr><td>De 44-53 Muy Positivo</td></tr>
                    <tr><td>De 36-43 Positivo</td></tr>
                    <tr><td>De 28-35 Tendencia (+)</td></tr>
                    <tr><td>De 18-27 Tendencia (-)</td></tr>
                    <tr><td>De 09-17 Negativo</td></tr>
                    <tr><td>De 0-08 Muy Negativo</td></tr>
                </table>
            </div>

            <p style="margin-top: 20px;">Si quieres volver a ver tus resultados ve a "Ver Perfil" o presione <a href="../Vista/perfil.html" style="color: #2944ff;">aquí</a></p>

            <table border="1">
                <thead>
                    <tr>
                        <th>ÁREAS DE EVALUACIÓN</th>
                        <th>PUNTAJE</th>
                        <th>CATEGORÍA</th>
                    </tr>
                </thead>
                <tbody>`;

        Object.keys(puntajes).forEach((seccion, index) => {
            const puntajeSeccion = puntajes[seccion];
            const categoria = obtenerCategoriaSeccion(puntajeSeccion, index + 1);

            resultadosHTML += `
                <tr>
                    <td>${seccion}</td>
                    <td>${puntajeSeccion}</td>
                    <td>${categoria}</td>
                </tr>`;

            puntajeTotalGlobal += puntajeSeccion;
        });

        const categoriaGlobal = obtenerCategoriaGlobal(puntajeTotalGlobal);

        resultadosHTML += `
                <tr>
                    <td><strong>PUNTAJE TOTAL</strong></td>
                    <td><strong>${puntajeTotalGlobal}</strong></td>
                    <td><strong>${categoriaGlobal}</strong></td>
                </tr>
            </tbody>
        </table>
        <p style="margin-top: 20px;"><strong>Análisis de resultados:</strong> <span id="analisis-casm85">Cargando análisis</span></p>`;

        resultadosContenido.innerHTML = resultadosHTML;

        const resultadosParaEnviar = [];

        Object.keys(puntajes).forEach((seccion, index) => {
            resultadosParaEnviar.push({
                area: seccion,
                puntaje: puntajes[seccion],
                categoria: obtenerCategoriaSeccion(puntajes[seccion], index + 1),
                fecha: fechaActual
            });
        });

        // Depuración
        console.log("Datos enviados a analizarResultados.php:", JSON.stringify({ resultados: resultadosParaEnviar }, null, 2));

        // Validar que haya 5 áreas
        if (resultadosParaEnviar.length !== 5) {
            document.getElementById("analisis-casm85").innerHTML = "Error: Se esperaban 5 áreas, pero se recibieron " + resultadosParaEnviar.length;
            return;
        }

        // Enviar resultados para guardarlos
        fetch("../Controlador/guardarResultadosTest.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resultados: resultadosParaEnviar
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log("Respuesta del servidor (guardar):", data);
        })
        .catch(error => {
            console.error("Error al guardar los resultados:", error);
        });

        // Solicitar análisis
        setTimeout(() => {
            enviarSolicitudConReintentos(resultadosParaEnviar);
        }, 0);
    }

    async function enviarSolicitudConReintentos(resultados, intentos = 3, esperaInicial = 1000) {
        try {
            const response = await fetch("../Controlador/analizarResultados.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resultados })
            });
            const data = await response.json();
            const analisisSpan = document.getElementById("analisis-casm85");
            if (!analisisSpan) {
                console.error("No se encontró el elemento analisis-casm85 en el DOM");
                return;
            }
            if (data.exito) {
                analisisSpan.innerHTML = data.analisis;
            } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                console.log(`Límite de solicitudes alcanzado. Reintentando en ${esperaInicial}ms... (${intentos} intentos restantes)`);
                await new Promise(resolve => setTimeout(resolve, esperaInicial));
                return enviarSolicitudConReintentos(resultados, intentos - 1, esperaInicial * 2);
            } else {
                console.error("Error del servidor:", data.mensaje);
                analisisSpan.innerHTML = `Error: ${data.mensaje}`;
            }
        } catch (error) {
            console.error("Error al obtener análisis:", error);
            const analisisSpan = document.getElementById("analisis-casm85");
            if (analisisSpan) {
                analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
            }
        }
    }
});