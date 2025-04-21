let respuestas = {}; // Almacena las respuestas seleccionadas
function toggleTachado(checkbox) {
    const span = checkbox.nextElementSibling;
    span.classList.toggle("tachado", checkbox.checked);
    }

    document.addEventListener("DOMContentLoaded", function () {
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

    // Mostrar el cuestionario
    document.getElementById("cuestionario").style.display = "block";
    });

    // 🔍 Verificar consistencia entre pares
    function verResultados() {
    // Ocultar el formulario de preguntas
    document.getElementById("cuestionario").style.display = "none";
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = ""; // Limpiar resultados anteriores
    // Mostrar respuestas seleccionadas
    const tabla = document.getElementById("tablaCuestionario");
    preguntasCASM83.forEach(pregunta => {
        const numero = pregunta.numero;
        
        // Encontrar las filas correspondientes usando dataset
        const filaA = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="A"]`);
        const filaB = tabla.querySelector(`tr[data-numero="${numero}"][data-opcion="B"]`);

        const respuestaA = respuestas[numero]?.A ? "(a)" : "";
        const respuestaB = respuestas[numero]?.B ? "(b)" : "";

        // Actualizar las celdas de respuestas con el valor correspondiente
        if (filaA && filaA.querySelector('span')) {
            filaA.querySelector('span').textContent = respuestaA;
        }

        if (filaB && filaB.querySelector('span')) {
            filaB.querySelector('span').textContent = respuestaB;
        }
    });

    // =======================
    // Evaluación de Consistencia
    // =======================
    const paresConsistentes = [
        [13, 131], [26, 132], [39, 133], [52, 134], [65, 135],
        [78, 136], [91, 137], [104, 138], [117, 139], [130, 140], [143, 1]
    ];

    let inconsistencias = 0;

    paresConsistentes.forEach(([num1, num2]) => {
        const checkA1 = respuestas[num1]?.A ?? false;
        const checkB1 = respuestas[num1]?.B ?? false;
        const checkA2 = respuestas[num2]?.A ?? false;
        const checkB2 = respuestas[num2]?.B ?? false;

        if (checkA1 !== checkA2 || checkB1 !== checkB2) {
            inconsistencias++;
        }
    });

    resultados.innerHTML += `<p>🧪 Inconsistencias encontradas: <strong>${inconsistencias}</strong></p>`;
    if (inconsistencias > 5) {
        resultados.innerHTML += `<p><strong>❗Nota de consistencia:</strong> Más de 5 pares inconsistentes. Se recomienda revisar tus respuestas.</p>`;
    }

    // =======================
    // Evaluación de Veracidad
    // =======================
    const preguntasVeracidad = [12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142];
    let conteoVeracidadA = 0;

    preguntasVeracidad.forEach(numero => {
        const checkboxA = document.querySelector(`input[data-numero="${numero}"][data-opcion="A"]`);
        if (checkboxA?.checked) {
            conteoVeracidadA++;
        }
    });

    resultados.innerHTML += `<p>✅ Respuestas "A" en preguntas de veracidad: <strong>${conteoVeracidadA}</strong></p>`;
    if (conteoVeracidadA > 5) {
        resultados.innerHTML += `<p><strong>❗Nota de veracidad:</strong> Se marcaron más de 5 opciones "A" en las preguntas de veracidad. Esto puede indicar respuestas poco realistas.</p>`;
    }

    // =======================
    // Resultados finales
    // =======================

    const etiquetas = ["CCFM", "CCSS", "CCNA", "CCCO", "ARTE", "BURO", "CCEP", "HAA", "FINA", "LING", "JURI", "VERA", "CONS"];
    const etiquetasVertical = etiquetas.slice(0, 11); // Solo 11 filas (sin VERA y CONS en la vertical)

    const contenedorResumen = document.getElementById("tablaResumen");
    contenedorResumen.innerHTML = ""; // Limpiar contenido anterior

    const tablaCruce = document.createElement("table");
    tablaCruce.border = "1";
    tablaCruce.style.borderCollapse = "collapse";
    tablaCruce.style.marginTop = "30px";
    tablaCruce.style.textAlign = "center";

    // Fila de encabezado
    const encabezadoFila = document.createElement("tr");
    encabezadoFila.appendChild(document.createElement("th")); // Celda vacía en la esquina

    etiquetas.forEach(etiqueta => {
        const th = document.createElement("th");
        th.textContent = etiqueta;
        th.style.padding = "6px";
        th.style.backgroundColor = "#eee";
        encabezadoFila.appendChild(th);
    });
    tablaCruce.appendChild(encabezadoFila);

    // Rellenar filas
    let preguntaNumero = 1;
    etiquetasVertical.forEach((etiquetaFila) => {
        const fila = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = etiquetaFila;
        th.style.backgroundColor = "#eee";
        fila.appendChild(th);

        etiquetas.forEach((etiquetaColumna, colIndex) => {
            const celda = document.createElement("td");

            // Mostrar número de pregunta y tachado según selección
            const checkA = document.querySelector(`input[data-numero="${preguntaNumero}"][data-opcion="A"]`)?.checked;
            const checkB = document.querySelector(`input[data-numero="${preguntaNumero}"][data-opcion="B"]`)?.checked;

            const spanA = document.createElement("span");
            spanA.textContent = "(a)";
            if (checkA) spanA.classList.add("tachado");

            const spanB = document.createElement("span");
            spanB.textContent = "(b)";
            if (checkB) spanB.classList.add("tachado");

            celda.appendChild(spanA);
            celda.appendChild(document.createTextNode(` ${preguntaNumero} `));
            celda.appendChild(spanB);

            fila.appendChild(celda);
            preguntaNumero++;
        });

        tablaCruce.appendChild(fila);
    });

    contenedorResumen.appendChild(tablaCruce);

    // =======================
    // Cálculo de puntajes por categoría
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
        VERA: { horizontal: [], vertical: [12, 142] }, // Veracidad especial
        CONS: { horizontal: [], vertical: [] }, // No se calcula aquí
    };

    const resultadosCategorias = {};

    for (const [categoria, rangos] of Object.entries(categorias)) {
        let total = 0;
        let countA = 0;
        let countB = 0;

        // Sumar B (horizontal)
        for (let i = rangos.horizontal[0]; i <= rangos.horizontal[1]; i++) {
            if (document.querySelector(`input[data-numero="${i}"][data-opcion="B"]`)?.checked) {
                countB++;
                total++;
            }
        }

        // Sumar A (vertical)
        for (let i = rangos.vertical[0]; i <= rangos.vertical[1]; i += 13) {
            if (document.querySelector(`input[data-numero="${i}"][data-opcion="A"]`)?.checked) {
                countA++;
                total++;
            }
        }

        // Guardar resultados
        resultadosCategorias[categoria] = { total, A: countA, B: countB };
    }

    // Mostrar resultados por categoría
    resultados.innerHTML += "<h3>📊 Puntaje por categoría:</h3><ul>";
    for (const [cat, { total, A, B }] of Object.entries(resultadosCategorias)) {
        resultados.innerHTML += `
            <li>
                <strong>${cat}:</strong> Total: ${total} (A: ${A}, B: ${B})
            </li>
        `;
    }
    resultados.innerHTML += "</ul>";

}
