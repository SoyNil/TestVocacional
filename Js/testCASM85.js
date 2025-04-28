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
    
                        // Si hay una respuesta seleccionada, se procesa
                        if (seleccion) {
                            if ((regla === "normal" && seleccion.value === "siempre") || 
                                (regla === "invertida" && seleccion.value === "nunca")) {
                                puntajeSeccion++;
                                puntajeTotal++;
                            }
                        }
                        // Si no hay selección, simplemente no se cuenta esa pregunta
                        preguntaNumero++;
                    });
                    puntajes[seccion.titulo] = puntajeSeccion;
                });
    
                // Ahora, mostramos los resultados, incluso si algunas respuestas están incompletas
                mostrarResultados(puntajes, puntajeTotal);  // Mostramos los resultados, incluso si algunas respuestas están incompletas
            })
            .catch(error => console.error("Error al calcular los resultados:", error));
    } 

    function mostrarResultados(puntajes, puntajeTotal) {
        const nombre = document.getElementById("nombre").value || "Sin nombre";
        const edad = document.getElementById("edad").value || "Sin edad";
        const sexo = document.getElementById("sexo").value || "Sin especificar";
        const gradoEstudio = document.getElementById("gradoEstudio").value || "Sin especificar";
        const fechaActual = new Date().toLocaleDateString();
    
        let puntajeTotalGlobal = 0;
    
        // Contenedor flexible para alinear los textos y tablas
        let resultadosHTML = `
            <h2>Resultados del Test</h2>
            
            <div style="display: flex; justify-content: space-between; gap: 40px; align-items: flex-start;">
                
                <!-- Columna izquierda: Datos personales -->
                <div style="flex: 1;">
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Edad:</strong> ${edad}</p>
                    <p><strong>Sexo:</strong> ${sexo}</p>
                    <p><strong>Grado de Estudio:</strong> ${gradoEstudio}</p>
                    <p><strong>Fecha:</strong> ${fechaActual}</p>
                </div>
    
                <!-- Tabla de interpretación de categorías -->
                <table border="1">
                    <tr><th>CATEGORÍA</th></tr>
                    <tr><td>De 44-53 Muy Positivo</td></tr>
                    <tr><td>De 36-43 Positivo</td></tr>
                    <tr><td>De 28-35 Tendencia (+)</td></tr>
                    <tr><td>De 18-27 Tendencia (-)</td></tr>
                    <tr><td>De 09-17 Negativo</td></tr>
                    <tr><td>De 0-08 Muy Negativo.</td></tr>
                </table>
    
            </div>  <!-- Fin del contenedor flexible -->
    
            <!-- Tabla de resultados -->
            <table border="1">
                <thead>
                    <tr>
                        <th>ÁREAS DE EVALUACIÓN</th>
                        <th>PUNTAJE</th>
                        <th>CATEGORÍA</th>
                    </tr>
                </thead>
                <tbody>`;
    
        // Agregar filas de evaluación
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
    
        // Agregar fila de puntaje total
        const categoriaGlobal = obtenerCategoriaGlobal(puntajeTotalGlobal);
    
        resultadosHTML += `
                <tr>
                    <td><strong>PUNTAJE TOTAL</strong></td>
                    <td><strong>${puntajeTotalGlobal}</strong></td>
                    <td><strong>${categoriaGlobal}</strong></td>
                </tr>
            </tbody>
        </table>`;
    
        // Insertar HTML en el contenedor
        resultadosContenido.innerHTML = resultadosHTML;
        // Convertir resultados a un array de objetos
        const resultadosParaEnviar = [];

        Object.keys(puntajes).forEach((seccion, index) => {
            resultadosParaEnviar.push({
                area: seccion,
                puntaje: puntajes[seccion],
                categoria: obtenerCategoriaSeccion(puntajes[seccion], index + 1)
            });
        });

        // Enviar a PHP mediante fetch POST
        fetch("../Controlador/guardar_resultados.php", {
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
            console.log("Respuesta del servidor:", data);
        })
        .catch(error => {
            console.error("Error al guardar los resultados:", error);
        });
    }   
});