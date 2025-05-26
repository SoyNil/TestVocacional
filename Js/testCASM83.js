let respuestas = {}; // Almacena las respuestas seleccionadas
function toggleTachado(checkbox) {
    const span = checkbox.nextElementSibling;
    span.classList.toggle("tachado", checkbox.checked);
}

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
// VERIFICAR SESIÓN
fetch("../Controlador/verificarSesionJSON.php")
.then(response => response.json())
.then(data => {
    if (!data.logueado) {
        window.location.href = "../Vista/principal.html";
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
                edad--;  // Si no ha cumplido años aún este año, restar un año
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
    function cargarCuestionario(){
    const tabla = document.getElementById("tablaCuestionario");

    preguntasCASM83.forEach((pregunta, index) => {
        const numero = pregunta.numero; // Usamos el número real, no el índice

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
    }
    // Mostrar el cuestionario
    document.getElementById("cuestionario").style.display = "block";
    
    document.getElementById("resultadosBtn").addEventListener("click", function() {
        console.log('Botón presionado');
        verResultados();
    });    

    // Función de debounce
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

    // Función para dibujar puntos
    function dibujarPuntos(resultadosCategorias) {
        console.log("Dibujando puntos...");

        // Limpiar puntos y clases anteriores
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
                punto.style.background = "red";
                punto.style.borderRadius = "50%";
                punto.style.left = "50%";
                punto.style.top = "50%";
                punto.style.transform = "translate(-50%, -50%)";
                celdaMarcada.appendChild(punto);

                const contenedorTabla = document.querySelector("#tablaResumen .contenedor-tabla");
                const celdaRect = celdaMarcada.getBoundingClientRect();
                const contenedorRect = contenedorTabla.getBoundingClientRect();

                // Calcular coordenadas relativas al contenedor de la tabla
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

    // Función para dibujar líneas
    function dibujarLineasEntrePuntos(posiciones) {
        const svg = document.getElementById("svg-lineas");

        if (!svg) {
            console.error("❌ No se encontró el elemento SVG.");
            return;
        }

        // Ajustar dimensiones del SVG al contenedor de la tabla
        const contenedorTabla = document.querySelector("#tablaResumen .contenedor-tabla");
        const contenedorRect = contenedorTabla.getBoundingClientRect();
        svg.setAttribute("width", contenedorRect.width);
        svg.setAttribute("height", contenedorRect.height);

        svg.innerHTML = ""; // Limpiar líneas anteriores

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
            linea.setAttribute("stroke", "blue");
            linea.setAttribute("stroke-width", "2");

            svg.appendChild(linea);
        }

        console.log("✅ Líneas dibujadas.");
    }

    // 🔍 Verificar consistencia entre pares
    function verResultados() {
        // 1. Ocultar cuestionario y mostrar sección de resultados
        document.getElementById("seccionCuestionario").style.display = "none";
        document.getElementById("seccionResultados").style.display = "block";
        const resultados = document.getElementById("resultados");
        resultados.innerHTML = ""; // Limpiar resultados previos

        const tabla = document.getElementById("tablaCuestionario");

        // 2. Mostrar respuestas seleccionadas en el cuestionario
        preguntasCASM83.forEach(pregunta => {
            const numero = pregunta.numero;
            const filaA = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="A"]`);
            const filaB = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="B"]`);
            const respuestaA = respuestas[numero]?.A ? "(a)" : "";
            const respuestaB = respuestas[numero]?.B ? "(b)" : "";

            if (filaA?.querySelector('span')) filaA.querySelector('span').textContent = respuestaA;
            if (filaB?.querySelector('span')) filaB.querySelector('span').textContent = respuestaB;
        });

        // 3. Evaluación de Consistencia
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

        // Crear tarjeta de Consistencia
        resultados.innerHTML += `
        <div class="card">
            <h3>🧪 Evaluación de Consistencia</h3>
            <p>Inconsistencias encontradas: <strong>${inconsistencias}</strong></p>
            ${inconsistencias > 5 ? '<p><strong>❗Nota:</strong> Más de 5 inconsistencias detectadas. Revisa tus respuestas.</p>' : ''}
        </div>
        `;

        // 4. Evaluación de Veracidad
        const preguntasVeracidad = [12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142];
        let conteoVeracidadA = 0;

        preguntasVeracidad.forEach(numero => {
            if (document.querySelector(`input[data-numero="${numero}"][data-opcion="A"]`)?.checked) {
                conteoVeracidadA++;
            }
        });

        // Crear tarjeta de Veracidad
        resultados.innerHTML += `
        <div class="card">
            <h3>✅ Evaluación de Veracidad</h3>
            <p>Respuestas "A" en preguntas de veracidad: <strong>${conteoVeracidadA}</strong></p>
            ${conteoVeracidadA > 5 ? '<p><strong>❗Nota:</strong> Se marcaron más de 5 opciones "A" en veracidad. Respuestas poco realistas.</p>' : ''}
        </div>
        `;

        // 5. Cálculo de Puntajes por Categoría
        const categorias = {
            CCFM: { horizontal: [1, 13], vertical: [1, 131] },
            CCSS: { horizontal: [14, 26], vertical: [2, 132] },
            CCNA: { horizontal: [27, 39], vertical: [3, 133] },
            CCCO: { horizontal: [40, 52], vertical: [4, 134] },
            ARTE: { horizontal: [53, 65], vertical: [5, 135] },
            BURO: { horizontal: [66, 78], vertical: [6, 136] },
            CCEP: { horizontal: [79, 91], vertical: [7, 137] },
            HAA:  { horizontal: [92, 104], vertical: [8, 138] },
            FINA: { horizontal: [105, 117], vertical: [9, 139] },
            LING: { horizontal: [118, 130], vertical: [10, 140] },
            JURI: { horizontal: [131, 143], vertical: [11, 141] },
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

        // Crear tarjeta de Categorías
        let listaCategorias = "<ul>";
        for (const [cat, { total, A, B }] of Object.entries(resultadosCategorias)) {
            listaCategorias += `<li><strong>${cat}:</strong> Total: ${total} (A: ${A}, B: ${B})</li>`;
        }
        listaCategorias += "</ul>";

        resultados.innerHTML += `
        <div class="card">
            <h3>📊 Puntaje por Categoría</h3>
            ${listaCategorias}
        </div>
        `;

        // Obtener el valor de sexo del formulario
        const sexo = document.getElementById('sexo').value;
        console.log('Valor de sexo:', sexo); // Depuración
        if (!sexo || !['Masculino', 'Femenino'].includes(sexo)) {
            alert('Por favor, selecciona un sexo válido (Masculino o Femenino) en el formulario');
            return;
        }

        // Depuración: Mostrar los datos a enviar
        console.log('Resultados a enviar:', resultadosCategorias);
        const payload = { resultados: resultadosCategorias, sexo: sexo };
        console.log('JSON a enviar:', JSON.stringify(payload));

        // Enviar los resultados al servidor
        fetch('../Controlador/guardar_resultado_CASM83.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            console.log('Código de respuesta:', response.status); // Depuración
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            if (data.message) {
                alert('Resultados guardados correctamente');
            } else {
                alert('Error al guardar: ' + (data.error || 'Desconocido'));
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert('Error al guardar los resultados');
        });

        // 6. Tabla Cruzada de Preguntas
        const etiquetas = ["CCFM", "CCSS", "CCNA", "CCCO", "ARTE", "BURO", "CCEP", "HAA", "FINA", "LING", "JURI", "VERA", "CONS"];
        const etiquetasVertical = etiquetas.slice(0, 11);

        const tablaCruce = document.createElement("table");
        tablaCruce.border = "1";
        tablaCruce.style.borderCollapse = "collapse";
        tablaCruce.style.marginTop = "20px";
        tablaCruce.style.textAlign = "center";
        tablaCruce.style.width = "100%";

        // Encabezado
        const encabezadoFila = document.createElement("tr");
        encabezadoFila.appendChild(document.createElement("th")); // Celda vacía
        etiquetas.forEach(et => {
            const th = document.createElement("th");
            th.textContent = et;
            th.style.padding = "6px";
            th.style.backgroundColor = "#eee";
            encabezadoFila.appendChild(th);
        });
        tablaCruce.appendChild(encabezadoFila);

        // Filas
        let preguntaNumero = 1;
        etiquetasVertical.forEach(etFila => {
            const fila = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = etFila;
            th.style.backgroundColor = "#eee";
            fila.appendChild(th);

            etiquetas.forEach(() => {
                const td = document.createElement("td");
                const checkA = document.querySelector(`input[data-numero="${preguntaNumero}"][data-opcion="A"]`)?.checked;
                const checkB = document.querySelector(`input[data-numero="${preguntaNumero}"][data-opcion="B"]`)?.checked;

                const spanA = document.createElement("span");
                spanA.textContent = "(a)";
                if (checkA) spanA.classList.add("tachado");

                const spanB = document.createElement("span");
                spanB.textContent = "(b)";
                if (checkB) spanB.classList.add("tachado");

                td.appendChild(spanA);
                td.appendChild(document.createTextNode(` ${preguntaNumero} `));
                td.appendChild(spanB);
                fila.appendChild(td);
                preguntaNumero++;
            });

            tablaCruce.appendChild(fila);
        });

        // Crear tarjeta de Tabla Cruzada
        const cardTablaCruce = document.createElement("div");
        cardTablaCruce.className = "card";
        const tituloTablaCruce = document.createElement("h3");
        tituloTablaCruce.textContent = "🗂️ Tabla Cruzada de Preguntas";
        cardTablaCruce.appendChild(tituloTablaCruce);
        cardTablaCruce.appendChild(tablaCruce);

        resultados.appendChild(cardTablaCruce);

        // =======================
        // Tabla de percentiles (masculino)
        // =======================

        const sexoSeleccionado = document.getElementById("sexo").value;

        if (sexoSeleccionado === "Masculino") {
            const encabezados = ["", "Desinterés", "Bajo", "Promedio Bajo", "Indecisión", "Promedio Alto", "Alto", "Muy Alto", ""];
            const categorias = [
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

            let tablaHTML = `
            <div class="card" style="margin: 0; padding: 0; border: none;">
                <div class="card-body" style="padding: 0;">
                    <h3 class="card-title" style="margin: 10px 0;">📈 Tabla de Percentiles (Masculino)</h3>
                    <div class="contenedor-tabla" style="position: relative; overflow-x: auto; margin: 0; padding: 0;">
                        <svg id="svg-lineas" style="position: absolute; top: 0; left: 0; pointer-events: none; z-index: 10;"></svg>
                        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; text-align: center; width: 100%; margin: 0;">
                            <tr><th colspan="9">Masculino</th></tr>
                            <tr>${encabezados.map(h => `<th>${h}</th>`).join('')}</tr>
                            ${categorias.map(fila => `
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
                        </table>
                    </div>
                </div>
            </div>`;

            const tablaResumen = document.getElementById("tablaResumen");
            tablaResumen.innerHTML = tablaHTML;

            // Dibujar puntos inicialmente usando requestAnimationFrame
            requestAnimationFrame(() => dibujarPuntos(resultadosCategorias));

            // Agregar listener para resize con debounce
            const actualizarGrafico = debounce(() => {
                console.log("🔄 Ventana redimensionada, actualizando gráfico...");
                requestAnimationFrame(() => dibujarPuntos(resultadosCategorias));
            }, 100);

            // Remover listeners anteriores para evitar duplicados
            window.removeEventListener("resize", actualizarGrafico);
            window.addEventListener("resize", actualizarGrafico);
        }

        // =======================
        // Tabla de percentiles (Femeino)
        // =======================

        if (sexoSeleccionado === "Femenino") {
            const encabezados = ["", "Desinterés", "Bajo", "Promedio Bajo", "Indecisión", "Promedio Alto", "Alto", "Muy Alto", ""];
            const categorias = [
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

            let tablaHTML = `
            <div class="card" style="margin: 0; padding: 0; border: none;">
                <div class="card-body" style="padding: 0;">
                    <h3 class="card-title" style="margin: 10px 0;">📈 Tabla de Percentiles (Femenino)</h3>
                    <div class="contenedor-tabla" style="position: relative; overflow-x: auto; margin: 0; padding: 0;">
                        <svg id="svg-lineas" style="position: absolute; top: 0; left: 0; pointer-events: none; z-index: 10;"></svg>
                        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; text-align: center; width: 100%; margin: 0;">
                            <tr><th colspan="9">Femenino</th></tr>
                            <tr>${encabezados.map(h => `<th>${h}</th>`).join('')}</tr>
                            ${categorias.map(fila => `
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
                        </table>
                    </div>
                </div>
            </div>`;

            const tablaResumen = document.getElementById("tablaResumen");
            tablaResumen.innerHTML = tablaHTML;

            // Dibujar puntos inicialmente usando requestAnimationFrame
            requestAnimationFrame(() => dibujarPuntos(resultadosCategorias));

            // Agregar listener para resize con debounce
            const actualizarGrafico = debounce(() => {
                console.log("🔄 Ventana redimensionada, actualizando gráfico...");
                requestAnimationFrame(() => dibujarPuntos(resultadosCategorias));
            }, 100);

            // Remover listeners anteriores para evitar duplicados
            window.removeEventListener("resize", actualizarGrafico);
            window.addEventListener("resize", actualizarGrafico);
        }

        // Asegúrate de que el SVG esté dentro ANTES de dibujar
        if (!document.getElementById("svg-lineas")) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("id", "svg-lineas");
            svg.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;");
            tablaResumen.appendChild(svg);
        }       
    }
});
