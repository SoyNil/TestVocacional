import { preguntasPMA } from './preguntasPMA.js';

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
            } else if (data.tipo_usuario !== 'usuario') {
                window.location.href = "../Vista/principalpsicologo.html";
            } else {
                // Rellenar datos personales
                document.getElementById("nombre").value = data.nombre || '';
                document.getElementById("sexo").value = data.sexo || '';
                if (data.fecha_nacimiento) {
                    const fechaNacimiento = new Date(data.fecha_nacimiento);
                    const hoy = new Date();
                    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
                    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                        edad--;
                    }
                    console.log("Fecha de nacimiento:", data.fecha_nacimiento, "Edad calculada:", edad);
                    document.getElementById("edad").value = edad;
                }
            }
        })
        .catch(error => {
            console.error("Error verificando sesión:", error);
            window.location.href = "../Vista/principal.html";
        });

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

    // Validar y mostrar cuestionario
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
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
            if (isValid) {
                datosPersonales.style.display = "none";
                cuestionario.style.display = "block";
                cargarFactorV();
            }
        });
    }

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
                console.log(`Factor V: Clic en ${group}, opción ${opcion}`);
                document.querySelectorAll(`td[data-group='${group}']`).forEach(c => c.classList.remove('selected'));
                cell.classList.add('selected');
                respuestasUsuario[group] = opcion;
                console.log('respuestasUsuario:', respuestasUsuario);
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
        console.log('Puntaje Factor V:', puntaje);
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
                console.log(`Factor E: Clic en ${group}, opción ${opcion}`);
                img.classList.toggle('selected');
                if (!respuestasUsuario[group]) {
                    respuestasUsuario[group] = [];
                }
                if (img.classList.contains('selected')) {
                    respuestasUsuario[group].push(opcion);
                } else {
                    respuestasUsuario[group] = respuestasUsuario[group].filter(o => o !== opcion);
                }
                console.log('respuestasUsuario:', respuestasUsuario);
            });
        });

        iniciarTemporizador(300, evaluarFactorE);
        resultadosBtn.onclick = evaluarFactorE;
        desplazarArriba();
    }

    // Evaluar Factor E
    function evaluarFactorE() {
        clearInterval(temporizadorInterval);
        let aciertos = 0;
        let errores = 0;
        preguntasPMA.factorE.forEach(pregunta => {
            const seleccionadas = respuestasUsuario[`p${pregunta.id}`] || [];
            const correctas = pregunta.respuestaCorrecta;
            if (seleccionadas.length === correctas.length && 
                seleccionadas.every(op => correctas.includes(op)) && 
                correctas.every(op => seleccionadas.includes(op))) {
                aciertos++;
            }
            seleccionadas.forEach(op => {
                if (!correctas.includes(op)) {
                    errores++;
                }
            });
        });
        puntajes.factorE = Math.max(0, aciertos - errores);
        console.log(`Factor E: Aciertos=${aciertos}, Errores=${errores}, Puntaje=${puntajes.factorE}`);
        respuestasUsuario = {};
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
                console.log(`Factor R: ${group} = ${input.value}`);
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
        console.log('Puntaje Factor R:', puntaje);
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
                console.log(`Factor N: ${group} = ${select.value}`);
            });
        });

        iniciarTemporizador(360, evaluarFactorN);
        resultadosBtn.onclick = evaluarFactorN;
        desplazarArriba();
    }

    // Evaluar Factor N
    function evaluarFactorN() {
        clearInterval(temporizadorInterval);
        let aciertos = 0;
        let errores = 0;
        preguntasPMA.factorN.forEach(pregunta => {
            const respuesta = respuestasUsuario[`p${pregunta.id}`] || '';
            if (respuesta === pregunta.respuestaCorrecta) {
                aciertos++;
            } else if (respuesta !== '') {
                errores++;
            }
        });
        puntajes.factorN = Math.max(0, aciertos - errores);
        console.log(`Factor N: Aciertos=${aciertos}, Errores=${errores}, Puntaje=${puntajes.factorN}`);
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
                console.log(`Factor F: ${group} = ${input.value}`);
            });
        });

        modal.querySelector('p').textContent = modal.querySelector('p').textContent.replace("{letra}", letraFactorF);
        iniciarTemporizador(300, evaluarFactorF);
        resultadosBtn.onclick = evaluarFactorF;
        desplazarArriba();
    }

    // Validar palabras del Factor F
    function esPalabraValida(palabra, palabrasVistas, letraInicial) {
        if (!palabra || palabra.length < 2 || !palabra.toUpperCase().startsWith(letraInicial)) {
            console.log(`Palabra inválida: "${palabra}" (longitud < 2 o no empieza con ${letraInicial})`);
            return false;
        }

        const normalizar = palabra => palabra.toLowerCase()
            .replace(/[áàäâ]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöô]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/ñ/g, 'n');

        const palabraNormalizada = normalizar(palabra);

        if (palabrasVistas.has(palabraNormalizada)) {
            console.log(`Palabra inválida: "${palabra}" (repetida)`);
            return false;
        }

        const sufijosDerivados = [
            's', 'es', 'a', 'as', 'o', 'os',
            'ita', 'ito', 'in', 'ote', 'on', 'azo',
            'mente', 'cion', 'sion', 'dad', 'tad', 'ez', 'ura'
        ];

        for (let palabraVista of palabrasVistas) {
            for (let sufijo of sufijosDerivados) {
                if (palabraNormalizada.endsWith(sufijo)) {
                    const raiz = palabraNormalizada.slice(0, -sufijo.length);
                    if (palabraVista.startsWith(raiz) || palabraNormalizada.startsWith(palabraVista)) {
                        console.log(`Palabra inválida: "${palabra}" (derivado de "${palabraVista}")`);
                        return false;
                    }
                }
            }
        }

        palabrasVistas.add(palabraNormalizada);
        return true;
    }

    // Evaluar Factor F
    function evaluarFactorF() {
        clearInterval(temporizadorInterval);
        let puntaje = 0;
        const palabrasVistas = new Set();
        for (let i = 1; i <= 75; i++) {
            const palabra = respuestasUsuario[`p${i}`] || "";
            if (esPalabraValida(palabra, palabrasVistas, letraFactorF)) {
                puntaje++;
            }
        }
        puntajes.factorF = puntaje;
        console.log(`Factor F: Puntaje=${puntaje}, Palabras válidas=${[...palabrasVistas]}`);
        respuestasUsuario = {};
        tablaCuestionario.style.display = "table";
        document.getElementById("contenedorFactorF").remove();
        mostrarResultados();
    }

    function mostrarResultados() {
    cuestionario.style.display = "none";
    resultados.style.display = "block";
    iconoInstrucciones.style.display = "none";

    const nombre = document.getElementById("nombre").value || "Sin nombre";
    const edad = document.getElementById("edad").value || "Sin edad";
    const sexo = document.getElementById("sexo").value || "Sin especificar";
    const gradoEstudio = document.getElementById("gradoEstudio").value || "Sin especificar";
    const fechaActual = new Date().toISOString().split('T')[0];

    const puntuacionTotal = (1.5 * (puntajes.factorV || 0)) + 
                           (puntajes.factorE || 0) + 
                           (2 * (puntajes.factorR || 0)) + 
                           (puntajes.factorN || 0) + 
                           (puntajes.factorF || 0);

    let resultadosHTML = `
        <h2>Resultados del Test PMA</h2>
        <div style="display: flex; justify-content: space-between; gap: 40px; align-items: flex-start;">
            <div style="flex: 1;">
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Edad:</strong> ${edad}</p>
                <p><strong>Sexo:</strong> ${sexo}</p>
                <p><strong>Grado de Estudio:</strong> ${gradoEstudio}</p>
                <p><strong>Fecha:</strong> ${fechaActual}</p>
            </div>
        </div>
        <p style="margin-top: 20px;">Si quieres volver a ver tus resultados ve a "Ver Perfil" o presione <a href="../Vista/perfil.html" style="color: #2944ff;">aquí</a></p>
        <table border="1">
            <thead>
                <tr>
                    <th>FACTOR</th>
                    <th>PUNTAJE</th>
                    <th>MÁXIMO</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Comprensión Verbal (V)</td><td>${puntajes.factorV || 0}</td><td>50</td></tr>
                <tr><td>Razonamiento Espacial (E)</td><td>${puntajes.factorE || 0}</td><td>20</td></tr>
                <tr><td>Razonamiento (R)</td><td>${puntajes.factorR || 0}</td><td>30</td></tr>
                <tr><td>Cálculo Numérico (N)</td><td>${puntajes.factorN || 0}</td><td>70</td></tr>
                <tr><td>Fluidez Verbal (F)</td><td>${puntajes.factorF || 0}</td><td>75</td></tr>
                <tr><td><strong>Puntuación Total</strong></td><td><strong>${puntuacionTotal.toFixed(2)}</strong></td><td>-</td></tr>
            </tbody>
        </table>
        <p><strong>Análisis de resultados:</strong> <span id="analisis" class="loading">Cargando análisis</span></p>
    `;

    document.getElementById("resultadosContenido").innerHTML = resultadosHTML;

    // Preparar resultados para enviar
    const resultadosParaEnviar = {
        factorV: puntajes.factorV || 0,
        factorE: puntajes.factorE || 0,
        factorR: puntajes.factorR || 0,
        factorN: puntajes.factorN || 0,
        factorF: puntajes.factorF || 0,
        puntajeTotal: puntuacionTotal,
        fecha: fechaActual
    };

    console.log("Datos enviados a guardarResultadosTest.php:", JSON.stringify({ resultados: resultadosParaEnviar }, null, 2));

    // Enviar resultados al backend para guardar
    fetch("../Controlador/guardarResultadosTest.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ resultados: resultadosParaEnviar })
    })
    .then(response => response.text())
    .then(text => {
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("Respuesta no es JSON válido:", text);
            document.getElementById("analisis").innerHTML = `Error al guardar resultados: Respuesta del servidor no válida (${text})`;
            return;
        }
        console.log("Respuesta del servidor (guardar):", data);
        if (!data.exito) {
            const mensajeError = data.mensaje || "Error desconocido al guardar los resultados";
            console.error("Error al guardar resultados:", mensajeError);
            document.getElementById("analisis").innerHTML = `Error al guardar resultados: ${mensajeError}`;
            return;
        }

        // Enviar solicitud de análisis
        const enviarSolicitudConReintentos = async (resultados, intentos = 3, esperaInicial = 1000) => {
            try {
                const response = await fetch("../Controlador/analizarResultadosPMA.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ resultados })
                });
                const data = await response.json();
                const analisisSpan = document.getElementById("analisis");
                if (!analisisSpan) {
                    console.error("No se encontró el elemento analisis en el DOM");
                    return;
                }
                if (data.exito) {
                    analisisSpan.innerHTML = data.analisis;
                } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                    console.log(`Límite de solicitudes alcanzado. Reintentando en ${esperaInicial}ms... (${intentos} intentos restantes)`);
                    await new Promise(resolve => setTimeout(resolve, esperaInicial));
                    return enviarSolicitudConReintentos(resultados, intentos - 1, esperaInicial * 2);
                } else {
                    const mensajeError = data.mensaje || "Error desconocido al obtener el análisis";
                    analisisSpan.innerHTML = `Error: ${mensajeError}`;
                }
            } catch (error) {
                console.error("Error al obtener análisis:", error);
                const analisisSpan = document.getElementById("analisis");
                if (analisisSpan) {
                    analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
                }
            }
        };

        setTimeout(() => {
            enviarSolicitudConReintentos(resultadosParaEnviar);
        }, 0);
    })
    .catch(error => {
        console.error("Error al guardar los resultados:", error);
        document.getElementById("analisis").innerHTML = `Error al guardar los resultados: ${error.message}`;
    });

    console.log('Mostrando resultados:', puntajes, `Puntuación Total: ${puntuacionTotal}`);
    desplazarArriba();
}
});