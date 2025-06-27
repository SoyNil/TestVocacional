import { preguntasGaston } from "./preguntasGaston.js";

document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    const toggle = document.getElementById("servicios-toggle");
    const menu = document.getElementById("servicios-menu");
    const datosPersonales = document.getElementById("datosPersonales");
    const cuestionario = document.getElementById("cuestionario");
    const resultados = document.getElementById("resultados");
    const form = document.getElementById("form");
    const tablaCuestionario = document.getElementById("tablaCuestionario");

    // Manejar menú hamburguesa
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    // Manejar menú desplegable de servicios
    if (toggle && menu) {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            menu.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
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

                // Verificar intentos del test Gastón
                fetch("../Controlador/obtenerResultadosGastonGeneral.php")
                    .then(res => res.json())
                    .then(dataTest => {
                        if (!dataTest.exito || !Array.isArray(dataTest.resultados)) {
                            redirigirConModal();
                            return;
                        }

                        const intentos = dataTest.resultados.length; // 1 fila por intento
                        if (intentos >= 4) {
                            redirigirConModal();
                        } else {
                            console.log("✔️ Acceso permitido al test Gastón.");
                            // Puedes continuar con el flujo normal del test aquí
                        }
                    })
                    .catch(error => {
                        console.error("Error verificando intentos test Gastón:", error);
                        redirigirConModal();
                    });
            }
        })
        .catch(error => {
            console.error("Error verificando sesión:", error);
            window.location.href = "../Vista/principal.html";
        });

    // Función para redirigir con modal de límite
    function redirigirConModal() {
        localStorage.setItem("mostrarModalLimite", "true");
        window.location.href = "../Vista/principal.html";
    }

    // Generar encabezado de la tabla
    function generarEncabezadoTabla() {
        const thead = tablaCuestionario.querySelector("thead");
        thead.innerHTML = `
            <tr>
                <th>Número</th>
                <th>Pregunta</th>
                <th>Puntaje</th>
                <th>Respuesta</th>
            </tr>
        `;
    }

    // Restringir valores de entrada
    function restrictInput(input, isPregunta26) {
        const validValues = isPregunta26 ? ['1', '5', '9'] : ['1', '9'];
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && !validValues.includes(value)) {
                e.target.value = '';
            }
        });
        input.addEventListener('keydown', (e) => {
            const allowedKeys = ['1', '5', '9', 'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
            if (isPregunta26) {
                if (!allowedKeys.includes(e.key)) {
                    e.preventDefault();
                }
            } else {
                if (!['1', '9', 'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                }
            }
        });
    }

    // Generar preguntas en la tabla
    function cargarPreguntas() {
        const tbody = tablaCuestionario.querySelector("tbody");
        tbody.innerHTML = "";
        preguntasGaston.forEach(pregunta => {
            const isPregunta26 = pregunta.numero === 26;
            const rowCount = isPregunta26 ? 3 : 2;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td rowspan="${rowCount}">${pregunta.numero}</td>
                <td>${pregunta.opciones[0].texto}</td>
                <td>${pregunta.opciones[0].puntaje}</td>
                <td rowspan="${rowCount}">
                    <input type="text" name="respuesta${pregunta.numero}" 
                           pattern="${isPregunta26 ? '[1,5,9]' : '[1,9]'}" 
                           placeholder="${isPregunta26 ? '1, 5 o 9' : '1 o 9'}" 
                           maxlength="1">
                </td>
            `;
            tbody.appendChild(row);

            for (let i = 1; i < pregunta.opciones.length; i++) {
                const extraRow = document.createElement("tr");
                extraRow.innerHTML = `
                    <td>${pregunta.opciones[i].texto}</td>
                    <td>${pregunta.opciones[i].puntaje}</td>
                `;
                tbody.appendChild(extraRow);
            }

            const input = row.querySelector(`input[name="respuesta${pregunta.numero}"]`);
            restrictInput(input, isPregunta26);
        });
    }

    // Calcular resultados
    function calcularResultados(respuestas, sexo) {
        let emotividad = 0, actividad = 0, resonancia = 0;
        
        respuestas.forEach((respuesta, index) => {
            const pregunta = preguntasGaston[index];
            const opcion = pregunta.opciones.find(opt => opt.puntaje == respuesta);
            const puntaje = opcion ? parseInt(opcion.puntaje) : 0;
            
            if (index < 10) emotividad += puntaje;
            else if (index < 20) actividad += puntaje;
            else resonancia += puntaje;
        });

        // Determinar categorías
        const emotividadCategoria = sexo === 'masculino' 
            ? (emotividad >= 48 ? 'Emotivo' : 'No Emotivo')
            : (emotividad >= 51 ? 'Emotivo' : 'No Emotivo');
        const actividadCategoria = actividad >= 55 ? 'Activo' : 'No Activo';
        const resonanciaCategoria = resonancia >= 55 ? 'Secundario' : 'Primario';

        // Determinar fórmula y tipo caracterológico
        const formula = `${emotividadCategoria === 'Emotivo' ? 'E' : 'NE'}${actividadCategoria === 'Activo' ? 'A' : 'NA'}${resonanciaCategoria === 'Secundario' ? 'S' : 'P'}`;
        let tipoCaracterologico;
        switch (formula) {
            case 'EAP': tipoCaracterologico = 'Colérico'; break;
            case 'EAS': tipoCaracterologico = 'Pasional'; break;
            case 'ENAP': tipoCaracterologico = 'Nervioso'; break;
            case 'ENAS': tipoCaracterologico = 'Sentimental'; break;
            case 'NEAP': tipoCaracterologico = 'Sanguíneo'; break;
            case 'NEAS': tipoCaracterologico = 'Flemático'; break;
            case 'NENAP': tipoCaracterologico = 'Amorfo'; break;
            case 'NENAS': tipoCaracterologico = 'Apático'; break;
            default: tipoCaracterologico = 'Desconocido';
        }

        return {
            emotividad,
            actividad,
            resonancia,
            emotividadCategoria,
            actividadCategoria,
            resonanciaCategoria,
            formula,
            tipoCaracterologico
        };
    }

    // Mostrar resultados
    function mostrarResultados(datosUsuario, resultadosTest) {
        cuestionario.style.display = "none";
        resultados.style.display = "block";
        resultados.classList.add("container");
        resultados.innerHTML = `
            <h2>Resultados del Test Gastón</h2>
            <h3>Datos Personales</h3>
            <p><strong>Nombre:</strong> ${datosUsuario.nombre}</p>
            <p><strong>Sexo:</strong> ${datosUsuario.sexo.charAt(0).toUpperCase() + datosUsuario.sexo.slice(1)}</p>
            <p><strong>Edad:</strong> ${datosUsuario.edad}</p>
            <p><strong>Grado de Estudio:</strong> ${datosUsuario.gradoEstudio}</p>
            <table class="tabla-resultados">
                <thead>
                    <tr>
                        <th>Área</th>
                        <th>Puntaje</th>
                        <th>Tipo Caracterológico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Emotividad (1-10)</td>
                        <td>${resultadosTest.emotividad}</td>
                        <td rowspan="3">${resultadosTest.tipoCaracterologico}</td>
                    </tr>
                    <tr>
                        <td>Actividad (11-20)</td>
                        <td>${resultadosTest.actividad}</td>
                    </tr>
                    <tr>
                        <td>Resonancia S/P (21-30)</td>
                        <td>${resultadosTest.resonancia}</td>
                    </tr>
                </tbody>
            </table>
            <table class="tabla-resultados">
                <thead>
                    <tr>
                        <th>LECTURA POR FACTORES</th>
                        <th>FORMULA CARACTEROLOGICA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${[resultadosTest.emotividadCategoria, resultadosTest.actividadCategoria, resultadosTest.resonanciaCategoria].join(', ')}</td>
                        <td>${resultadosTest.formula}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    // Guardar resultados en el servidor
    function guardarResultados(datosUsuario, resultadosTest) {
        const datos = {
            id_usuario: null, // Se obtendrá del servidor
            emotividad: resultadosTest.emotividad,
            actividad: resultadosTest.actividad,
            resonancia: resultadosTest.resonancia,
            tipo_caracterologico: resultadosTest.tipoCaracterologico,
            formula_caracterologica: resultadosTest.formula,
            sexo: datosUsuario.sexo, // ✅ agregar sexo
            fecha: new Date().toISOString().split('T')[0]
        };

        fetch("../Controlador/guardarResultadosTest.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (!data.exito) {
                    console.error("Error al guardar resultados:", data.mensaje);
                }
            })
            .catch(err => console.error("Error al guardar resultados:", err));
    }

    // Manejar formulario de datos personales
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const sexo = document.getElementById("sexo").value.trim().toLowerCase();
            const edad = document.getElementById("edad").value;
            const gradoEstudio = document.getElementById("gradoEstudio").value;

            if (!nombre || !sexo || !edad || !gradoEstudio) {
                alert("Por favor, completa todos los campos requeridos.");
                return;
            }

            datosPersonales.style.display = "none";
            cuestionario.style.display = "block";
            generarEncabezadoTabla();
            cargarPreguntas();

            // Añadir botón de enviar respuestas
            const submitBtn = document.createElement("button");
            submitBtn.classList.add("button-form");
            submitBtn.textContent = "Enviar Respuestas";
            cuestionario.appendChild(submitBtn);

            submitBtn.addEventListener("click", () => {
                const inputs = tablaCuestionario.querySelectorAll("input[name^='respuesta']");
                const respuestas = Array.from(inputs).map(input => input.value);
                
                if (respuestas.length !== 30 || respuestas.some(r => !r)) {
                    alert("Por favor, responde todas las preguntas.");
                    return;
                }

                const resultadosTest = calcularResultados(respuestas, sexo);
                const datosUsuario = { nombre, sexo, edad, gradoEstudio };
                
                mostrarResultados(datosUsuario, resultadosTest);
                guardarResultados(datosUsuario, resultadosTest);
            });
        });
    }
});