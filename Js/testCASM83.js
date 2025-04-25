let respuestas = {}; // Almacena las respuestas seleccionadas
function toggleTachado(checkbox) {
    const span = checkbox.nextElementSibling;
    span.classList.toggle("tachado", checkbox.checked);
}

document.addEventListener("DOMContentLoaded", function () {
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

    // 🔍 Verificar consistencia entre pares
    function verResultados() {
        // =======================
        // 1. Mostrar Resultados y Preparar Interfaz
        // =======================
        document.getElementById("seccionCuestionario").style.display = "none";
        document.getElementById("seccionResultados").style.display = "block";
        const resultados = document.getElementById("resultados");
        resultados.innerHTML = "";

        const tabla = document.getElementById("tablaCuestionario");

        // =======================
        // 2. Mostrar Respuestas Seleccionadas
        // =======================
        preguntasCASM83.forEach(pregunta => {
            const numero = pregunta.numero;

            const filaA = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="A"]`);
            const filaB = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="B"]`);

            const respuestaA = respuestas[numero]?.A ? "(a)" : "";
            const respuestaB = respuestas[numero]?.B ? "(b)" : "";

            if (filaA?.querySelector('span')) filaA.querySelector('span').textContent = respuestaA;
            if (filaB?.querySelector('span')) filaB.querySelector('span').textContent = respuestaB;
        });

        // =======================
        // 3. Evaluación de Consistencia
        // =======================
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

        resultados.innerHTML += `<p>🧪 Inconsistencias encontradas: <strong>${inconsistencias}</strong></p>`;
        if (inconsistencias > 5) {
            resultados.innerHTML += `<p><strong>❗Nota de consistencia:</strong> Más de 5 pares inconsistentes. Se recomienda revisar tus respuestas.</p>`;
        }

        // =======================
        // 4. Evaluación de Veracidad
        // =======================
        const preguntasVeracidad = [12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142];
        let conteoVeracidadA = 0;

        preguntasVeracidad.forEach(numero => {
            if (document.querySelector(`input[data-numero="${numero}"][data-opcion="A"]`)?.checked) {
                conteoVeracidadA++;
            }
        });

        resultados.innerHTML += `<p>✅ Respuestas "A" en preguntas de veracidad: <strong>${conteoVeracidadA}</strong></p>`;
        if (conteoVeracidadA > 5) {
            resultados.innerHTML += `<p><strong>❗Nota de veracidad:</strong> Se marcaron más de 5 opciones "A" en las preguntas de veracidad. Esto puede indicar respuestas poco realistas.</p>`;
        }

        // =======================
        // 5. Tabla Cruzada de Preguntas
        // =======================
        const etiquetas = ["CCFM", "CCSS", "CCNA", "CCCO", "ARTE", "BURO", "CCEP", "HAA", "FINA", "LING", "JURI", "VERA", "CONS"];
        const etiquetasVertical = etiquetas.slice(0, 11);

        const contenedorResumen = document.getElementById("tablaResumen");
        contenedorResumen.innerHTML = "";

        const tablaCruce = document.createElement("table");
        tablaCruce.border = "1";
        tablaCruce.style.borderCollapse = "collapse";
        tablaCruce.style.marginTop = "30px";
        tablaCruce.style.textAlign = "center";

        // Encabezado
        const encabezadoFila = document.createElement("tr");
        encabezadoFila.appendChild(document.createElement("th"));
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
        contenedorResumen.appendChild(tablaCruce);

        // =======================
        // 6. Cálculo de Puntajes por Categoría
        // =======================
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

        // Mostrar resultados por categoría
        resultados.innerHTML += "<h3>📊 Puntaje por categoría:</h3><ul>";
        for (const [cat, { total, A, B }] of Object.entries(resultadosCategorias)) {
            resultados.innerHTML += `<li><strong>${cat}:</strong> Total: ${total} (A: ${A}, B: ${B})</li>`;
        }
        resultados.innerHTML += "</ul>";

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
                ["HAA",  "0-3", "4-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["FINA", "0-2", "3-4", "5-6", "7-10", "11-12", "13-16", "17-22"],
                ["LING", "0-2", "3-4", "5-6", "7-9",  "10-12", "13-15", "16-22"],
                ["JURI", "0-2", "3-4", "5-6", "7-10", "11-13", "14-16", "17-22"]
            ];
            const percentiles = ["1-14", "15-29", "30-39", "40-60", "61-74", "75-89", "90-99"];

            let tablaHTML = '<h3>📈 Tabla de Percentiles (Masculino)</h3>';
            tablaHTML += '<table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; text-align: center;">';

            // Fila 1: Título
            tablaHTML += `<tr><th colspan="9">Masculino</th></tr>`;

            // Fila 2: Encabezados
            tablaHTML += '<tr>';
            encabezados.forEach(h => tablaHTML += `<th>${h}</th>`);
            tablaHTML += '</tr>';

            // Filas por categoría
            categorias.forEach(fila => {
                const categoria = fila[0];
                tablaHTML += `<tr><td>${categoria}</td>`;
                for (let i = 1; i <= 7; i++) {
                    const rango = fila[i];
                    tablaHTML += `<td class="celda-percentil" data-cat="${categoria}" data-rango="${rango}">${rango}</td>`;
                }
                tablaHTML += `<td>${categoria}</td></tr>`;
            }); 

            // Fila percentiles
            tablaHTML += '<tr><td></td>';
            percentiles.forEach(p => tablaHTML += `<td>${p}</td>`);
            tablaHTML += '<td></td></tr>';

            // Fila final
            tablaHTML += '<tr><td colspan="9" style="text-align:center;"><strong>PERCENTILES</strong></td></tr>';

            tablaHTML += '</table>';

            resultados.innerHTML += tablaHTML;
        }  
        // Llamamos a dibujarPuntos solo una vez
        setTimeout(() => {
            dibujarPuntos(resultadosCategorias);
        }, 100);        
        
        // Crear o verificar que el SVG esté dentro de tablaResumen antes de dibujar las líneas
        const tablaResumen = document.getElementById("tablaResumen");

        // Asegúrate de que el SVG esté dentro ANTES de dibujar
        if (!document.getElementById("svg-lineas")) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("id", "svg-lineas");
            svg.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;");
            tablaResumen.appendChild(svg);
        }       
    }

    function dibujarPuntos(resultadosCategorias) {
        console.log("Dibujando puntos...");
        
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
    
                // 👇 Coordenadas absolutas relativas al contenedor SVG
                const svgContenedor = document.getElementById("tablaResumen");
                const celdaRect = celdaMarcada.getBoundingClientRect();
                const contenedorRect = svgContenedor.getBoundingClientRect();
    
                // Ajustar la coordenada Y para evitar valores negativos
                const ajustarCoordenadaY = (y) => {
                    const offset = 400; // Ajusta este valor según el rango visible
                    return y + offset;
                };
    
                // Guardamos las posiciones con la Y ajustada
                posiciones.push({
                    x: celdaRect.left + celdaRect.width / 2 - contenedorRect.left,
                    y: ajustarCoordenadaY(celdaRect.top + celdaRect.height / 2 - contenedorRect.top) // Aplicamos el ajuste
                });
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
    
        svg.innerHTML = ""; // Limpiar líneas anteriores
    
        console.log("🔷 Dibujando líneas entre puntos...");
        console.log("📌 Total de puntos:", posiciones.length);
    
        for (let i = 0; i < posiciones.length - 1; i++) {
            const { x: x1, y: y1 } = posiciones[i];
            const { x: x2, y: y2 } = posiciones[i + 1];
    
            console.log(`➡️ Línea ${i + 1}: (${x1}, ${y1}) -> (${x2}, ${y2})`);
    
            const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
            linea.setAttribute("x1", x1);
            linea.setAttribute("y1", y1);
            linea.setAttribute("x2", x2);
            linea.setAttribute("y2", y2);
            linea.setAttribute("stroke", "blue");
            linea.setAttribute("stroke-width", "2");
    
            svg.appendChild(linea);
        }
    
        console.log("✅ Líneas dibujadas.");
    } 
});
