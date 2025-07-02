let respuestas = {}; // Almacena las respuestas seleccionadas
let tipoUsuario = null; // Variable global para almacenar tipo_usuario

function toggleTachado(checkbox) {
    const span = checkbox.nextElementSibling;
    span.classList.toggle("tachado", checkbox.checked);
}

document.addEventListener("DOMContentLoaded", function () {
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

    // Verificar sesión y tipo de usuario
    fetch("../Controlador/verificarSesionJSON.php")
        .then(response => response.json())
        .then(data => {
            if (!data.logueado) {
                window.location.href = "../Vista/principal.html";
            } else if (data.tipo_usuario !== 'usuario' && data.tipo_usuario !== 'institucion') {
                window.location.href = "../Vista/principalpsicologo.html";
            } else {
                // Almacenar tipo_usuario globalmente
                tipoUsuario = data.tipo_usuario;

                // Cargar datos del usuario
                document.getElementById("nombre").value = data.nombre || '';
                document.getElementById("sexo").value = data.sexo || '';

                // Calcular edad si hay fecha de nacimiento
                if (data.fecha_nacimiento) {
                    const fechaNacimiento = new Date(data.fecha_nacimiento);
                    const hoy = new Date();
                    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

                    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                        edad--;
                    }

                    const edadInput = document.getElementById("edad");
                    if (edadInput) {
                        edadInput.value = edad;
                    }
                }

                // Verificar número de intentos del CASM83
                fetch(`../Controlador/obtenerResultadosCASM83General.php?tipo_usuario=${data.tipo_usuario}`)
                    .then(res => res.json())
                    .then(dataTest => {
                        if (!dataTest.exito || !Array.isArray(dataTest.resultados)) {
                            redirigirConModal();
                            return;
                        }

                        const intentos = Math.floor(dataTest.resultados.length / 13);
                        if (intentos >= 4) {
                            redirigirConModal();
                        } else {
                            console.log("✔️ Acceso permitido al CASM83.");
                        }
                    })
                    .catch(error => {
                        console.error("Error verificando intentos:", error);
                        redirigirConModal();
                    });
            }
        })
        .catch(error => {
            console.error("Error verificando sesión:", error);
            window.location.href = "../Vista/principal.html";
        });

    // Función para redirigir con el modal de límite
    function redirigirConModal() {
        localStorage.setItem("mostrarModalLimite", "true");
        window.location.href = "../Vista/principal.html";
    }

    const form = document.querySelector("form");
    const formContainer = form.closest('.container');
    const seccionCuestionario = document.getElementById("seccionCuestionario");

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
                seccionCuestionario.style.display = "block";
            }
        });
    }

    function cargarCuestionario() {
        const tabla = document.getElementById("tablaCuestionario");

        // Agregar contenedor y modal de instrucciones
        const instruccionesHTML = `
            <div class="instrucciones-container">
                <button id="btnInstrucciones" class="modal-button">Instrucciones</button>
                <div id="modal-instrucciones" class="modal-instrucciones">
                    <div class="modal-content-instrucciones">
                        <span id="modal-close-instrucciones" class="modal-close">×</span>
                        <h3>Instrucciones del Test CASM-83</h3>
                        <p>El test CASM-83 evalúa tus preferencias y habilidades. Para cada pregunta, selecciona la opción (a o b) que mejor refleje tu elección marcando el checkbox correspondiente. Puedes seleccionar una o ambas opciones si aplica, pero responde con honestidad para obtener resultados precisos. Una vez completado, haz clic en "Enviar" para procesar tus respuestas.</p>
                        <button id="modal-cerrar-instrucciones" class="modal-button">Cerrar</button>
                    </div>
                </div>
            </div>`;

        // Insertar el contenedor de instrucciones antes de la tabla
        tabla.insertAdjacentHTML('beforebegin', instruccionesHTML);

        preguntasCASM83.forEach((pregunta, index) => {
            const numero = pregunta.numero;

            const fila1 = document.createElement("tr");
            const celdaPregunta = document.createElement("td");
            celdaPregunta.rowSpan = 2;
            celdaPregunta.textContent = `${numero}`;
            celdaPregunta.style.textAlign = "center";

            const celdaOpcionA = document.createElement("td");
            celdaOpcionA.style.textAlign = "center";
            const checkboxA = document.createElement("input");
            checkboxA.type = "checkbox";
            checkboxA.dataset.numero = numero;
            checkboxA.dataset.opcion = 'A';
            checkboxA.onchange = function () {
                toggleTachado(this);
                if (!respuestas[numero]) respuestas[numero] = {};
                respuestas[numero].A = this.checked;
            };
            const spanA = document.createElement("span");
            spanA.textContent = "a";
            celdaOpcionA.appendChild(checkboxA);
            celdaOpcionA.appendChild(spanA);

            const celdaTextoA = document.createElement("td");
            celdaTextoA.textContent = pregunta.opcionA;
            celdaTextoA.style.textAlign = "left";

            fila1.appendChild(celdaPregunta);
            fila1.appendChild(celdaOpcionA);
            fila1.appendChild(celdaTextoA);

            const fila2 = document.createElement("tr");
            const celdaOpcionB = document.createElement("td");
            celdaOpcionB.style.textAlign = "center";
            const checkboxB = document.createElement("input");
            checkboxB.type = "checkbox";
            checkboxB.dataset.numero = numero;
            checkboxB.dataset.opcion = 'B';
            checkboxB.onchange = function () {
                toggleTachado(this);
                if (!respuestas[numero]) respuestas[numero] = {};
                respuestas[numero].B = this.checked;
            };
            const spanB = document.createElement("span");
            spanB.textContent = "b";
            celdaOpcionB.appendChild(checkboxB);
            celdaOpcionB.appendChild(spanB);

            const celdaTextoB = document.createElement("td");
            celdaTextoB.textContent = pregunta.opcionB;
            celdaTextoB.style.textAlign = "left";

            fila2.appendChild(celdaOpcionB);
            fila2.appendChild(celdaTextoB);

            tabla.appendChild(fila1);
            tabla.appendChild(fila2);
        });

        // Configurar eventos del modal
        const btnInstrucciones = document.getElementById("btnInstrucciones");
        const modalInstrucciones = document.getElementById("modal-instrucciones");
        const closeBtn = document.getElementById("modal-close-instrucciones");
        const cerrarBtn = document.getElementById("modal-cerrar-instrucciones");

        // Mostrar el modal automáticamente al cargar el cuestionario
        modalInstrucciones.style.display = "flex";
        setTimeout(() => modalInstrucciones.classList.add("show"), 10);

        btnInstrucciones.addEventListener("click", () => {
            modalInstrucciones.style.display = "flex";
            setTimeout(() => modalInstrucciones.classList.add("show"), 10);
        });

        [closeBtn, cerrarBtn].forEach(btn => {
            btn.addEventListener("click", () => {
                modalInstrucciones.classList.remove("show");
                setTimeout(() => modalInstrucciones.style.display = "none", 300);
            });
        });

        modalInstrucciones.addEventListener("click", (e) => {
            if (e.target === modalInstrucciones) {
                modalInstrucciones.classList.remove("show");
                setTimeout(() => modalInstrucciones.style.display = "none", 300);
            }
        });
    }

    document.getElementById("cuestionario").style.display = "block";
    
    document.getElementById("resultadosBtn").addEventListener("click", function() {
        console.log('Botón presionado');
        verResultados();
    });    

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function dibujarPuntos(resultadosCategorias) {
        console.log("Dibujando puntos...");

        document.querySelectorAll(".punto").forEach(punto => punto.remove());
        document.querySelectorAll(".punto-marcado").forEach(celda => celda.classList.remove("punto-marcado"));

        const posiciones = [];

        Object.entries(resultadosCategorias).forEach(([categoria, { total }]) => {
            const celdas = document.querySelectorAll(`.celda-percentil[data-cat="${categoria}"]`);
            let celdaMarcada = null;

            celdas.forEach(celda => {
                const rangoTexto = celda.dataset.rango;
                const [min, max] = rangoTexto.split("-").map(Number);

                if (total >= min && total <= max) {
                    celda.classList.add("punto-marcado");
                    celdaMarcada = celda;
                }
            });

            if (celdaMarcada) {
                const punto = document.createElement("div");
                punto.className = "punto";
                celdaMarcada.style.position = "relative";
                punto.style.position = "absolute";
                punto.style.width = "10px";
                punto.style.height = "10px";
                punto.style.background = "#ff4d4d";
                punto.style.borderRadius = "50%";
                punto.style.left = "50%";
                punto.style.top = "50%";
                punto.style.transform = "translate(-50%, -50%)";
                celdaMarcada.appendChild(punto);

                const contenedorTabla = document.querySelector("#tablaResumen .contenedor-tabla");
                const celdaRect = celdaMarcada.getBoundingClientRect();
                const contenedorRect = contenedorTabla.getBoundingClientRect();

                const coordenada = {
                    x: celdaRect.left + celdaRect.width / 2 - contenedorRect.left,
                    y: celdaRect.top + celdaRect.height / 2 - contenedorRect.top
                };

                console.log(`📍 Punto en categoría '${categoria}': (x: ${coordenada.x}, y: ${coordenada.y})`);

                posiciones.push(coordenada);
            }
        });

        dibujarLineasEntrePuntos(posiciones);
    }

    function dibujarLineasEntrePuntos(posiciones) {
        const svg = document.getElementById("svg-lineas");

        if (!svg) {
            console.error("❌ No se encontró el elemento SVG.");
            return;
        }

        const contenedorTabla = document.querySelector("#tablaResumen .contenedor-tabla");
        const contenedorRect = contenedorTabla.getBoundingClientRect();
        svg.setAttribute("width", contenedorRect.width);
        svg.setAttribute("height", contenedorRect.height);

        svg.innerHTML = "";

        console.log("🔷 Dibujando líneas entre puntos...");
        console.log("📌 Total de puntos:", posiciones.length);

        for (let i = 0; i < posiciones.length - 1; i++) {
            const { x: x1, y: y1 } = posiciones[i];
            const { x: x2, y: y2 } = posiciones[i + 1];

            console.log(`➡️ Línea ${i + 1}: (${x1}, ${y1}) -> (${x2}, ${y2})`);

            const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
            linea.setAttribute("x1", x1.toString());
            linea.setAttribute("y1", y1.toString());
            linea.setAttribute("x2", x2.toString());
            linea.setAttribute("y2", y2.toString());
            linea.setAttribute("stroke", "#0ff");
            linea.setAttribute("stroke-width", "2");

            svg.appendChild(linea);
        }

        console.log("✅ Líneas dibujadas.");
    }

    function verResultados() {
        document.getElementById("seccionCuestionario").style.display = "none";
        document.getElementById("seccionResultados").style.display = "block";
        const resultados = document.getElementById("resultados");
        resultados.innerHTML = "";

        const tabla = document.getElementById("tablaCuestionario");

        preguntasCASM83.forEach(pregunta => {
            const numero = pregunta.numero;
            const filaA = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="A"]`);
            const filaB = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="B"]`);
            const respuestaA = respuestas[numero]?.A ? "(a)" : "";
            const respuestaB = respuestas[numero]?.B ? "(b)" : "";

            if (filaA?.querySelector('span')) filaA.querySelector('span').textContent = respuestaA;
            if (filaB?.querySelector('span')) filaB.querySelector('span').textContent = respuestaB;
        });

        const paresConsistentes = [
            [13, 131], [26, 132], [39, 133], [52, 134], [65, 135],
            [78, 136], [91, 137], [104, 138], [117, 139], [130, 140], [143, 1]
        ];

        let inconsistencias = 0;
        paresConsistentes.forEach(([num1, num2]) => {
            const A1 = respuestas[num1]?.A ?? false;
            const B1 = respuestas[num1]?.B ?? false;
            const A2 = respuestas[num2]?.A ?? false;
            const B2 = respuestas[num2]?.B ?? false;
            if (A1 !== A2 || B1 !== B2) inconsistencias++;
        });

        const preguntasVeracidad = [12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142];
        let conteoVeracidadA = 0;

        preguntasVeracidad.forEach(numero => {
            if (document.querySelector(`input[data-numero="${numero}"][data-opcion="A"]`)?.checked) {
                conteoVeracidadA++;
            }
        });

        const categorias = {
            CCFM: { horizontal: [1, 11], vertical: [1, 131] },
            CCSS: { horizontal: [14, 24], vertical: [2, 132] },
            CCNA: { horizontal: [27, 37], vertical: [3, 133] },
            CCCO: { horizontal: [40, 50], vertical: [4, 134] },
            ARTE: { horizontal: [53, 63], vertical: [5, 135] },
            BURO: { horizontal: [66, 76], vertical: [6, 136] },
            CCEP: { horizontal: [79, 89], vertical: [7, 137] },
            HAA:  { horizontal: [92, 102], vertical: [8, 138] },
            FINA: { horizontal: [105, 115], vertical: [9, 139] },
            LING: { horizontal: [118, 128], vertical: [10, 140] },
            JURI: { horizontal: [131, 147], vertical: [11, 141] },
            VERA: { horizontal: [], vertical: [12, 142] },
            CONS: { horizontal: [], vertical: [] }
        };

        const resultadosCategorias = {};
        for (const [categoria, rangos] of Object.entries(categorias)) {
            let total = 0, countA = 0, countB = 0;

            for (let i = rangos.horizontal[0]; i <= rangos.horizontal[1]; i++) {
                if (document.querySelector(`input[data-numero="${i}"][data-opcion="B"]`)?.checked) {
                    countB++;
                    total++;
                }
            }

            for (let i = rangos.vertical[0]; i <= rangos.vertical[1]; i += 13) {
                if (document.querySelector(`input[data-numero="${i}"][data-opcion="A"]`)?.checked) {
                    countA++;
                    total++;
                }
            }

            resultadosCategorias[categoria] = { total, A: countA, B: countB };
        }

        const sexo = document.getElementById('sexo').value;
        if (!sexo || !['Masculino', 'Femenino'].includes(sexo)) {
            alert('Por favor, selecciona un sexo válido (Masculino o Femenino) en el formulario');
            return;
        }

        // Agregar fecha actual y tipo_usuario
        const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const payload = { resultados: resultadosCategorias, sexo: sexo, fecha: fechaActual, tipo_usuario: tipoUsuario };

        fetch('../Controlador/guardarResultadosTest.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                console.log('Resultados guardados:', data.mensaje);
            } else {
                console.error('Error al guardar:', data.mensaje);
                alert('Error al guardar los resultados: ' + (data.mensaje || 'Desconocido'));
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert('Error al guardar los resultados: ' + error.message);
        });

        const tablaResumen = document.getElementById("tablaResumen");
        let tablaHTML = `
            <div class="card" style="margin: 0; padding: 0; border: none;">
                <div class="card-body" style="padding: 0;">
                    <p style="margin: 20px 0;">Si quieres volver a ver tus resultados ve a "Ver Perfil" en la ventana de inicio o presione <a href="../Vista/perfil.html" style="color: #2944ff;">aquí</a></p>
                    <h3 class="card-title" style="margin: 10px 0;">📈 Tabla de Percentiles (${sexo})</h3>
                    <div class="contenedor-tabla" style="position: relative; overflow-x: auto; margin: 0; padding: 0;">
                        <svg id="svg-lineas" style="position: absolute; top: 0; left: 0; pointer-events: none; z-index: 10;"></svg>
                        <table border="1" class="percentiles-table" style="border-collapse: collapse; text-align: center; margin: 0;">
        `;

        if (sexo === "Masculino") {
            const encabezados = ["", "Desinterés", "Bajo", "Promedio Bajo", "Indecisión", "Promedio Alto", "Alto", "Muy Alto", ""];
            const categoriasPercentiles = [
                ["CCFM", "0-4", "5-7", "8-9", "10-12", "14-15", "16-17", "18-22"],
                ["CCSS", "0-3", "4-6", "7-8", "9-12", "13-14", "15-16", "17-22"],
                ["CCNA", "0-4", "5-7", "8-9", "10-13", "14-15", "16-18", "19-22"],
                ["CCCO", "0-2", "3-4", "5-6", "7-10", "11-13", "14-17", "18-22"],
                ["ARTE", "0-2", "3-4", "5-6", "7-10", "11-14", "15-17", "18-22"],
                ["BURO", "0-3", "4-5", "6-7", "8-11", "12-13", "14-16", "17-22"],
                ["CCEP", "0-3", "4-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["HAA", "0-3", "4-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["FINA", "0-2", "3-4", "5-6", "7-10", "11-12", "13-16", "17-22"],
                ["LING", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                ["JURI", "0-2", "3-4", "5-6", "7-10", "11-13", "14-16", "17-22"]
            ];
            const percentiles = ["1-14", "15-29", "30-39", "40-60", "61-74", "75-89", "90-99"];

            tablaHTML += `
                <tr><th colspan="9">Masculino</th></tr>
                <tr>${encabezados.map(h => `<th>${h}</th>`).join('')}</tr>
                ${categoriasPercentiles.map(fila => `
                    <tr>
                        <td>${fila[0]}</td>
                        ${fila.slice(1).map(rango => `<td class="celda-percentil" data-cat="${fila[0]}" data-rango="${rango}">${rango}</td>`).join('')}
                        <td>${fila[0]}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td></td>
                    ${percentiles.map(p => `<td>${p}</td>`).join('')}
                    <td></td>
                </tr>
                <tr>
                    <td colspan="9" style="text-align:center;"><strong>PERCENTILES</strong></td>
                </tr>
            `;
        } else if (sexo === "Femenino") {
            const encabezados = ["", "Desinterés", "Bajo", "Promedio Bajo", "Indecisión", "Promedio Alto", "Alto", "Muy Alto", ""];
            const categoriasPercentiles = [
                ["CCFM", "0-2", "3-4", "5-6", "7-11", "12-14", "15-17", "18-22"],
                ["CCSS", "0-4", "5-7", "8-9", "10-14", "15-16", "17-19", "20-22"],
                ["CCNA", "0-3", "4-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["CCCO", "0-2", "3-4", "5-6", "7-11", "12-13", "14-16", "17-22"],
                ["ARTE", "0-2", "3-4", "5-6", "7-11", "12-13", "14-16", "17-22"],
                ["BURO", "0-4", "5-7", "8-9", "10-14", "15-16", "17-19", "20-22"],
                ["CCEP", "0-2", "3-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["HAA", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                ["FINA", "0-2", "3-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["LING", "0-2", "3-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["JURI", "0-2", "3-4", "5-6", "7-11", "12-13", "14-16", "17-22"]
            ];
            const percentiles = ["1-14", "15-29", "30-39", "40-60", "61-74", "75-89", "90-99"];

            tablaHTML += `
                <tr><th colspan="9">Femenino</th></tr>
                <tr>${encabezados.map(h => `<th>${h}</th>`).join('')}</tr>
                ${categoriasPercentiles.map(fila => `
                    <tr>
                        <td>${fila[0]}</td>
                        ${fila.slice(1).map(rango => `<td class="celda-percentil" data-cat="${fila[0]}" data-rango="${rango}">${rango}</td>`).join('')}
                        <td>${fila[0]}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td></td>
                    ${percentiles.map(p => `<td>${p}</td>`).join('')}
                    <td></td>
                </tr>
                <tr>
                    <td colspan="9" style="text-align:center;"><strong>PERCENTILES</strong></td>
                </tr>
            `;
        }

        // Añadir veracidad, consistencia y análisis
        const veracidadCumple = conteoVeracidadA <= 5;
        const consistenciaCumple = inconsistencias <= 5;

        tablaHTML += `
                        </table>
                    </div>
                    <p style="margin-top: 10px;">Veracidad: <strong>${veracidadCumple ? 'Se cumple la veracidad' : 'No se cumple la veracidad'}</strong></p>
                    <p style="margin-top: 5px;">Consistencia: <strong>${consistenciaCumple ? 'Se cumple la consistencia' : 'No se cumple la consistencia'}</strong></p>
                    <p style="margin-top: 20px;"><strong>Análisis de resultados:</strong> <span id="analisis-casm83">${veracidadCumple && consistenciaCumple ? 'Cargando análisis' : 'No se puede realizar el análisis debido a inconsistencias o falta de veracidad en las respuestas.'}</span></p>
                </div>
            </div>`;

        tablaResumen.innerHTML = tablaHTML;

        requestAnimationFrame(() => dibujarPuntos(resultadosCategorias));

        const actualizarGrafico = debounce(() => {
            console.log("🔄 Ventana redimensionada, actualizando gráfico...");
            requestAnimationFrame(() => dibujarPuntos(resultadosCategorias));
        }, 100);

        window.removeEventListener("resize", actualizarGrafico);
        window.addEventListener("resize", actualizarGrafico);

        if (!document.getElementById("svg-lineas")) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("id", "svg-lineas");
            svg.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;");
            tablaResumen.querySelector(".contenedor-tabla").appendChild(svg);
        }

        // Solicitar análisis si se cumplen los criterios
        if (veracidadCumple && consistenciaCumple) {
            setTimeout(() => {
                enviarSolicitudConReintentosCASM83(resultadosCategorias, sexo);
            }, 0);
        }
    }

    async function enviarSolicitudConReintentosCASM83(resultadosCategorias, sexo, intentos = 3, esperaInicial = 1000) {
        const categorias = ['CCFM', 'CCSS', 'CCNA', 'CCCO', 'ARTE', 'BURO', 'CCEP', 'HAA', 'FINA', 'LING', 'JURI', 'VERA', 'CONS'];
        const resultadosOrdenados = {};

        categorias.forEach(categoria => {
            if (resultadosCategorias[categoria]) {
                resultadosOrdenados[categoria] = {
                    total: resultadosCategorias[categoria].total,
                    A: resultadosCategorias[categoria].A,
                    B: resultadosCategorias[categoria].B
                };
            } else {
                console.warn(`Categoría ${categoria} no encontrada en resultados, usando valores por defecto`);
                resultadosOrdenados[categoria] = { total: 0, A: 0, B: 0 };
            }
        });

        console.log("Datos enviados a analizarResultadosCASM83:", JSON.stringify({ resultados: resultadosOrdenados, sexo }, null, 2));

        try {
            const response = await fetch("../Controlador/analizarResultadosCASM83.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resultados: resultadosOrdenados, sexo })
            });
            const data = await response.json();
            const analisisSpan = document.getElementById("analisis-casm83");
            if (!analisisSpan) {
                console.error("No se encontró el elemento analisis-casm83");
                return;
            }
            if (data.exito) {
                analisisSpan.innerHTML = data.analisis;
            } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                console.log(`Límite de solicitudes alcanzado. Reintentando en ${esperaInicial}ms (${intentos} intentos restantes)`);
                await new Promise(resolve => setTimeout(resolve, esperaInicial));
                return enviarSolicitudConReintentosCASM83(resultadosCategorias, sexo, intentos - 1, esperaInicial * 2);
            } else {
                console.error("Error del servidor:", data.mensaje);
                analisisSpan.innerHTML = `Error: ${data.mensaje}`;
            }
        } catch (error) {
            console.error("Error al obtener análisis CASM-83:", error);
            const analisisSpan = document.getElementById("analisis-casm83");
            if (analisisSpan) {
                analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
            }
        }
    }
});