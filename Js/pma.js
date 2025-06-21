import { preguntasPMA } from './preguntasPMA.js';

document.addEventListener("DOMContentLoaded", function () {
    const datosPersonales = document.getElementById("datosPersonales");
    const cuestionario = document.getElementById("cuestionario");
    const resultados = document.getElementById("resultados");
    const form = document.getElementById("form");
    const tablaCuestionario = document.getElementById("tablaCuestionario");
    const resultadosBtn = document.getElementById("resultadosBtn");
    resultadosBtn.textContent = "Siguiente sección";
    let respuestasUsuario = {};
    let puntajes = {};
    let temporizadorInterval;
    let letraFactorF;

    // Crear modal de instrucciones
    const modal = document.createElement("div");
    modal.id = "instruccionesModal";
    document.body.appendChild(modal);

    // Crear ícono de instrucciones
    const iconoInstrucciones = document.createElement("button");
    iconoInstrucciones.id = "iconoInstrucciones";
    iconoInstrucciones.textContent = "❓";
    document.body.appendChild(iconoInstrucciones);

    // Crear contenedor de temporizador
    const temporizador = document.createElement("div");
    temporizador.id = "temporizador";
    cuestionario.insertBefore(temporizador, cuestionario.firstChild);

    // Crear notificación de tiempo
    const notificacion = document.createElement("div");
    notificacion.id = "notificacionTiempo";
    document.body.appendChild(notificacion);

    // Mostrar modal al cargar cuestionario
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        datosPersonales.style.display = "none";
        cuestionario.style.display = "block";
        cargarFactorV();
    });

    // Cerrar modal
    function cerrarModal() {
        modal.style.display = "none";
    }

    // Iniciar temporizador
    function iniciarTemporizador(tiempoLimite, callbackFinal) {
        let tiempoRestante = tiempoLimite;
        temporizador.textContent = `Tiempo restante: ${Math.floor(tiempoRestante / 60)}:${(tiempoRestante % 60).toString().padStart(2, '0')}`;
        notificacion.style.display = "none";

        temporizadorInterval = setInterval(() => {
            tiempoRestante--;
            temporizador.textContent = `Tiempo restante: ${Math.floor(tiempoRestante / 60)}:${(tiempoRestante % 60).toString().padStart(2, '0')}`;
            if (tiempoRestante === 30) {
                notificacion.textContent = "¡Quedan 30 segundos!";
                notificacion.style.display = "block";
                setTimeout(() => {
                    notificacion.style.display = "none";
                }, 5000);
            }
            if (tiempoRestante <= 0) {
                clearInterval(temporizadorInterval);
                callbackFinal();
            }
        }, 1000);
    }

    // Desplazar al inicio del contenedor
    function desplazarArriba() {
        window.scrollTo({ top: cuestionario.offsetTop, behavior: 'smooth' });
    }

    // Cargar Factor V
    function cargarFactorV() {
        modal.innerHTML = `
            <div>
                <h3>Factor V: Comprensión Verbal</h3>
                <p>En cada fila, se presenta una palabra en mayúsculas seguida de cuatro opciones (A, B, C, D). 
                    Seleccione la opción que tenga el mismo significado o sea sinónimo de la palabra dada. 
                    Solo puede elegir una opción por pregunta. Tiene 4 minutos para completar este factor.</p>
                <button id="cerrarModal">Cerrar</button>
            </div>
        `;
        modal.style.display = "flex";
        iconoInstrucciones.style.display = "block";
        document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
        iconoInstrucciones.addEventListener("click", () => modal.style.display = "flex");

        cuestionario.querySelector("h2").textContent = "Cuestionario - Factor V: Comprensión Verbal";
        tablaCuestionario.querySelector("tbody").innerHTML = "";
        preguntasPMA.factorV.forEach(pregunta => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pregunta.id}. ${pregunta.pregunta}</td>
                <td>
                    <table>
                        ${Object.entries(pregunta.opciones).map(([letra, texto]) => `
                            <tr>
                                <td data-group="p${pregunta.id}" data-opcion="${letra}">
                                    ${letra}: ${texto}
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </td>
            `;
            tablaCuestionario.querySelector("tbody").appendChild(row);
        });

        document.querySelectorAll('td[data-group]').forEach(cell => {
            cell.addEventListener('click', () => {
                const group = cell.getAttribute('data-group');
                const opcion = cell.getAttribute('data-opcion');
                console.log(`Factor V: Clic en ${group}, opción ${opcion}`); // Depuración
                document.querySelectorAll(`td[data-group='${group}']`).forEach(c => c.classList.remove('selected'));
                cell.classList.add('selected');
                respuestasUsuario[group] = opcion;
                console.log('respuestasUsuario:', respuestasUsuario); // Depuración
            });
        });

        iniciarTemporizador(240, evaluarFactorV);
        resultadosBtn.onclick = evaluarFactorV;
        desplazarArriba();
    }

    // Evaluar Factor V
    function evaluarFactorV() {
        clearInterval(temporizadorInterval);
        let puntaje = 0;
        preguntasPMA.factorV.forEach(pregunta => {
            if (respuestasUsuario[`p${pregunta.id}`] === pregunta.respuestaCorrecta) {
                puntaje++;
            }
        });
        puntajes.factorV = puntaje;
        console.log('Puntaje Factor V:', puntaje); // Depuración
        respuestasUsuario = {};
        cargarFactorE();
    }

    // Cargar Factor E
    function cargarFactorE() {
        modal.innerHTML = `
            <div>
                <h3>Factor E: Razonamiento Espacial</h3>
                <p>Para cada pregunta, se muestra una figura principal seguida de seis opciones (A, B, C, D, E, F). 
                    Seleccione todas las opciones que sean idénticas a la figura principal, incluso si están rotadas, 
                    pero no si están invertidas (como en un espejo). Tiene 5 minutos para completar este factor.</p>
                <button id="cerrarModal">Cerrar</button>
            </div>
        `;
        modal.style.display = "flex";
        iconoInstrucciones.style.display = "block";
        document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
        iconoInstrucciones.addEventListener("click", () => modal.style.display = "flex");

        cuestionario.querySelector("h2").textContent = "Cuestionario - Factor E: Razonamiento Espacial";
        tablaCuestionario.querySelector("tbody").innerHTML = "";
        preguntasPMA.factorE.forEach(pregunta => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${pregunta.pregunta}" alt="Pregunta ${pregunta.id}" class="factorE-img"></td>
                <td>
                    <div class="opciones-fila">
                        ${Object.entries(pregunta.opciones).map(([letra, imgSrc]) => `
                            <div class="opcion-contenedor">
                                <img src="${imgSrc}" alt="Opción ${letra}" class="factorE-img" 
                                    data-group="p${pregunta.id}" data-opcion="${letra}">
                                <span>${letra}</span>
                            </div>
                        `).join('')}
                    </div>
                </td>
            `;
            tablaCuestionario.querySelector("tbody").appendChild(row);
        });

        document.querySelectorAll('img[data-group]').forEach(img => {
            img.addEventListener('click', () => {
                const group = img.getAttribute('data-group');
                const opcion = img.getAttribute('data-opcion');
                console.log(`Factor E: Clic en ${group}, opción ${opcion}`); // Depuración
                img.classList.toggle('selected');
                if (!respuestasUsuario[group]) {
                    respuestasUsuario[group] = [];
                }
                if (img.classList.contains('selected')) {
                    respuestasUsuario[group].push(opcion);
                } else {
                    respuestasUsuario[group] = respuestasUsuario[group].filter(o => o !== opcion);
                }
                console.log('respuestasUsuario:', respuestasUsuario); // Depuración
            });
        });

        iniciarTemporizador(300, evaluarFactorE);
        resultadosBtn.onclick = function () {
            console.log('Botón Siguiente clicado en Factor E'); // Depuración
            evaluarFactorE();
        };
        desplazarArriba();
    }

    // Evaluar Factor E
    function evaluarFactorE() {
        clearInterval(temporizadorInterval);
        let puntaje = 0;
        preguntasPMA.factorE.forEach(pregunta => {
            const seleccionadas = respuestasUsuario[`p${pregunta.id}`] || [];
            const correctas = pregunta.respuestaCorrecta;
            if (seleccionadas.length === correctas.length && 
                seleccionadas.every(op => correctas.includes(op)) && 
                correctas.every(op => seleccionadas.includes(op))) {
                puntaje++;
            }
        });
        puntajes.factorE = puntaje;
        console.log('Puntaje Factor E:', puntaje); // Depuración
        respuestasUsuario = {};
        console.log('Cargando Factor R'); // Depuración
        cargarFactorR();
    }

    // Cargar Factor R
    function cargarFactorR() {
        modal.innerHTML = `
            <div>
                <h3>Factor R: Razonamiento</h3>
                <p>En cada fila, se presenta una serie de letras del alfabeto (sin incluir ch, ll, rr). 
                    Identifique el patrón de repetición en la serie y escriba la letra mayúscula que debería seguir. 
                    Por ejemplo, en la serie "a b a b a b", la letra siguiente es "a". 
                    Ingrese solo una letra por pregunta. Tiene 6 minutos para completar este factor.</p>
                <button id="cerrarModal">Cerrar</button>
            </div>
        `;
        modal.style.display = "flex";
        iconoInstrucciones.style.display = "block";
        document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
        iconoInstrucciones.addEventListener("click", () => modal.style.display = "flex");

        cuestionario.querySelector("h2").textContent = "Cuestionario - Factor R: Razonamiento";
        tablaCuestionario.querySelector("tbody").innerHTML = "";
        preguntasPMA.factorR.forEach(pregunta => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pregunta.id}. ${pregunta.pregunta}</td>
                <td>
                    <input type="text" class="factorR-input" data-group="p${pregunta.id}" 
                            maxlength="1" placeholder="A-Z" 
                            oninput="this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '')">
                </td>
            `;
            tablaCuestionario.querySelector("tbody").appendChild(row);
        });

        document.querySelectorAll('.factorR-input').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.getAttribute('data-group');
                respuestasUsuario[group] = input.value;
                console.log(`Factor R: ${group} = ${input.value}`); // Depuración
            });
        });

        iniciarTemporizador(360, evaluarFactorR);
        resultadosBtn.onclick = evaluarFactorR;
        desplazarArriba();
    }

    // Evaluar Factor R
    function evaluarFactorR() {
        clearInterval(temporizadorInterval);
        let puntaje = 0;
        preguntasPMA.factorR.forEach(pregunta => {
            if (respuestasUsuario[`p${pregunta.id}`] === pregunta.respuestaCorrecta) {
                puntaje++;
            }
        });
        puntajes.factorR = puntaje;
        console.log('Puntaje Factor R:', puntaje); // Depuración
        respuestasUsuario = {};
        cargarFactorN();
    }

    // Cargar Factor N
    function cargarFactorN() {
        modal.innerHTML = `
            <div>
                <h3>Factor N: Cálculo Numérico</h3>
                <p>En cada fila, se presenta una suma matemática. Resuélvala mentalmente y seleccione si está 
                    "Bien" (B) o "Mal" (M). Tiene 6 minutos para completar este factor.</p>
                <button id="cerrarModal">Cerrar</button>
            </div>
        `;
        modal.style.display = "flex";
        iconoInstrucciones.style.display = "block";
        document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
        iconoInstrucciones.addEventListener("click", () => modal.style.display = "flex");

        cuestionario.querySelector("h2").textContent = "Cuestionario - Factor N: Cálculo Numérico";
        tablaCuestionario.querySelector("tbody").innerHTML = "";
        preguntasPMA.factorN.forEach(pregunta => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pregunta.id}. ${pregunta.pregunta}</td>
                <td>
                    <select class="factorN-select" data-group="p${pregunta.id}">
                        <option value="">Seleccione...</option>
                        <option value="B">Bien</option>
                        <option value="M">Mal</option>
                    </select>
                </td>
            `;
            tablaCuestionario.querySelector("tbody").appendChild(row);
        });

        document.querySelectorAll('.factorN-select').forEach(select => {
            select.addEventListener('change', () => {
                const group = select.getAttribute('data-group');
                respuestasUsuario[group] = select.value;
                console.log(`Factor N: ${group} = ${select.value}`); // Depuración
            });
        });

        iniciarTemporizador(360, evaluarFactorN);
        resultadosBtn.onclick = evaluarFactorN;
        desplazarArriba();
    }

    // Evaluar Factor N
    function evaluarFactorN() {
        clearInterval(temporizadorInterval);
        let puntaje = 0;
        preguntasPMA.factorN.forEach(pregunta => {
            if (respuestasUsuario[`p${pregunta.id}`] === pregunta.respuestaCorrecta) {
                puntaje++;
            }
        });
        puntajes.factorN = puntaje;
        console.log('Puntaje Factor N:', puntaje); // Depuración
        respuestasUsuario = {};
        cargarFactorF();
    }

    // Cargar Factor F
    function cargarFactorF() {
        modal.innerHTML = `
            <div>
                <h3>Factor F: Fluidez Verbal</h3>
                <p>Escriba tantas palabras como pueda que comiencen con la letra {letra} en los campos proporcionados. 
                    Use una palabra por campo. Tiene 5 minutos para completar este factor.</p>
                <button id="cerrarModal">Cerrar</button>
            </div>
        `;
        modal.style.display = "flex";
        iconoInstrucciones.style.display = "block";
        document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
        iconoInstrucciones.addEventListener("click", () => modal.style.display = "flex");

        cuestionario.querySelector("h2").textContent = "Cuestionario - Factor F: Fluidez Verbal";
        tablaCuestionario.style.display = "none";
        const contenedorF = document.createElement("div");
        contenedorF.id = "contenedorFactorF";

        // Seleccionar letra aleatoria
        const pregunta = preguntasPMA.factorF[0];
        letraFactorF = pregunta.letrasPermitidas[Math.floor(Math.random() * pregunta.letrasPermitidas.length)];
        const instruccion = pregunta.instruccionBase.replace("{letra}", letraFactorF);

        let inputsHTML = '';
        for (let i = 1; i <= 75; i++) {
            inputsHTML += `
                <div class="factorF-campo">
                    <label>${i}.</label>
                    <input type="text" class="factorF-input" data-group="p${i}" 
                            placeholder="Palabra..." 
                            oninput="this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '')">
                </div>
            `;
        }

        contenedorF.innerHTML = `
            <p class="factorF-instruccion">${instruccion}</p>
            <div class="factorF-inputs">${inputsHTML}</div>
        `;
        cuestionario.appendChild(contenedorF);

        document.querySelectorAll('.factorF-input').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.getAttribute('data-group');
                respuestasUsuario[group] = input.value;
                console.log(`Factor F: ${group} = ${input.value}`); // Depuración
            });
        });

        modal.querySelector('p').textContent = modal.querySelector('p').textContent.replace("{letra}", letraFactorF);
        iniciarTemporizador(300, evaluarFactorF);
        resultadosBtn.onclick = evaluarFactorF;
        desplazarArriba();
    }

    // Evaluar Factor F
    function evaluarFactorF() {
        clearInterval(temporizadorInterval);
        let puntaje = 0;
        for (let i = 1; i <= 75; i++) {
            const palabra = respuestasUsuario[`p${i}`] || "";
            if (palabra.length >= 2 && palabra.toUpperCase().startsWith(letraFactorF)) {
                puntaje++;
            }
        }
        puntajes.factorF = puntaje;
        console.log('Puntaje Factor F:', puntaje); // Depuración
        respuestasUsuario = {};
        tablaCuestionario.style.display = "table";
        document.getElementById("contenedorFactorF").remove();
        mostrarResultados();
    }

    // Mostrar resultados
    function mostrarResultados() {
        cuestionario.style.display = "none";
        resultados.style.display = "block";
        iconoInstrucciones.style.display = "none";
        document.getElementById("resultadosContenido").innerHTML = `
            <p><strong>Puntaje Factor V:</strong> ${puntajes.factorV}/50</p>
            <p><strong>Puntaje Factor E:</strong> ${puntajes.factorE}/20</p>
            <p><strong>Puntaje Factor R:</strong> ${puntajes.factorR}/30</p>
            <p><strong>Puntaje Factor N:</strong> ${puntajes.factorN}/70</p>
            <p><strong>Puntaje Factor F:</strong> ${puntajes.factorF}/75</p>
        `;
        console.log('Mostrando resultados:', puntajes); // Depuración
        desplazarArriba();
    }
});