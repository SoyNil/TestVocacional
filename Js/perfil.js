document.addEventListener("DOMContentLoaded", () => {
    // Verificar la sesión al inicio
    fetch("../Controlador/verificarSesionJSON.php")
        .then(response => response.json())
        .then(data => {
            if (!data.logueado) {
                // Si no está logueado, redirigir a principal.html
                window.location.href = "principal.html";
            }
        })
        .catch(error => {
            console.error("Error al verificar la sesión:", error);
            window.location.href = "principal.html";  // Redirigir en caso de error
        });

    const editarPerfilBtn = document.getElementById("editarPerfilBtn");
    const verResultadosBtn = document.getElementById("verResultadosBtn");
    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");

    const verResultadosSection = document.getElementById("verResultados");

    // Mostrar sección Editar Perfil
    editarPerfilBtn.addEventListener("click", () => {
        verResultadosSection.style.display = "none";

        const perfilContent = document.getElementById("perfil-content");
        if (perfilContent) {
            perfilContent.style.display = "block";
            mostrarFormularioEditarPerfil(); // Mostrar formulario
        }
    });

    // Mostrar sección Ver Resultados
    verResultadosBtn.addEventListener("click", () => {
        document.getElementById("perfil-content").style.display = "none";
        verResultadosSection.style.display = "block";
    });

    cerrarSesionBtn.addEventListener("click", () => {
        window.location.href = "../Controlador/logout.php";
    });

    function mostrarFormularioEditarPerfil() {
        const content = document.getElementById('perfil-content');
        content.innerHTML = `
            <h2>Editar Perfil</h2>
            <form id="formEditarPerfil">
                <label for="nombre_usuario">Nombre de Usuario:</label>
                <input type="text" id="nombre_usuario" name="nombre_usuario">
    
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre">
    
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido">
    
                <label for="correo">Correo:</label>
                <input type="email" id="correo" name="correo">
    
                <label for="contraseña">Contraseña:</label>
                <input type="password" id="contraseña" name="contraseña">
    
                <label for="sexo">Sexo:</label>
                <select id="sexo" name="sexo">
                    <option value="">Selecciona tu sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
    
                <label for="fecha_nacimiento">Fecha de nacimiento:</label>
                <input type="date" id="fecha_nacimiento" name="fecha_nacimiento">
    
                <button type="submit">Guardar</button>
            </form>
            <div id="mensajePerfil" style="margin-top: 10px;"></div>
        `;
    
        let datosOriginales = {};
    
        // Cargar datos del perfil actual
        fetch("../Controlador/verificarSesionJSON.php")
            .then(response => response.json())
            .then(data => {
                if (data.logueado) {
                    datosOriginales = data;
    
                    document.getElementById("nombre_usuario").value = data.nombre_usuario || '';
                    document.getElementById("nombre").value = data.nombre || '';
                    document.getElementById("apellido").value = data.apellido || '';
                    document.getElementById("correo").value = data.correo || '';
                    document.getElementById("sexo").value = data.sexo || '';
                    document.getElementById("fecha_nacimiento").value = data.fecha_nacimiento || '';
                } else {
                    window.location.href = "principal.html";
                }
            })
            .catch(error => {
                console.error("Error al verificar la sesión:", error);
                window.location.href = "principal.html";
            });
    
        // Guardar cambios
        document.getElementById("formEditarPerfil").addEventListener("submit", function (event) {
            event.preventDefault();

            const campos = ["nombre_usuario", "nombre", "apellido", "correo", "contraseña", "sexo", "fecha_nacimiento"];
            const datosActualizados = {};

            campos.forEach(campo => {
                const valorActual = document.getElementById(campo).value.trim();
                const valorOriginal = datosOriginales[campo] ? datosOriginales[campo].trim() : "";

                if (valorActual && valorActual !== valorOriginal) {
                    datosActualizados[campo] = valorActual;
                }
            });

            if (Object.keys(datosActualizados).length === 0) {
                mostrarMensaje("No se realizaron cambios.", false);
                return;
            }

            fetch('../Controlador/guardarPerfil.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActualizados)
            })
            .then(res => res.json())
            .then(data => {
                if (data.exito) {
                    mostrarMensaje("¡Perfil guardado con éxito!", true);
                    // Recargar los datos de la sesión para reflejar los cambios
                    fetch("../Controlador/verificarSesionJSON.php")
                        .then(response => response.json())
                        .then(data => {
                            if (data.logueado) {
                                // Actualizar los campos del formulario con los nuevos datos
                                document.getElementById("nombre_usuario").value = data.nombre_usuario || '';
                                document.getElementById("nombre").value = data.nombre || '';
                                document.getElementById("apellido").value = data.apellido || '';
                                document.getElementById("correo").value = data.correo || '';
                                document.getElementById("sexo").value = data.sexo || '';
                                document.getElementById("fecha_nacimiento").value = data.fecha_nacimiento || '';
                            }
                        });
                } else {
                    mostrarMensaje("Hubo un error al guardar el perfil. Inténtalo de nuevo.", false);
                }
            })
            .catch(error => {
                console.error("Error al guardar el perfil:", error);
                mostrarMensaje("Hubo un problema al guardar el perfil.", false);
            });
        });
    }    

    // Función para mostrar mensajes
    function mostrarMensaje(mensaje, exito) {
        const mensajeDiv = document.getElementById('mensajePerfil');
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.display = 'block';
        mensajeDiv.style.padding = '10px';
        mensajeDiv.style.borderRadius = '5px';
        mensajeDiv.style.marginTop = '10px';

        if (exito) {
            mensajeDiv.style.backgroundColor = 'green';
            mensajeDiv.style.color = 'white';
        } else {
            mensajeDiv.style.backgroundColor = 'red';
            mensajeDiv.style.color = 'white';
        }

        // Ocultar el mensaje después de 4 segundos
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
        }, 4000);
    }

    document.getElementById("testCASM85Btn").addEventListener("click", () => {
        fetch("../Controlador/obtenerResultadosCASM85.php")
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    const resultados = data.resultados;
                    const contenedor = document.getElementById("resultados");
                    contenedor.innerHTML = "<h3>Resultados del Test CASM-85:</h3>";

                    if (resultados.length === 0) {
                        contenedor.innerHTML += "<p>No se encontraron resultados.</p>";
                        return;
                    }

                    const grupos = [];
                    for (let i = 0; i < resultados.length; i += 5) {
                        grupos.push(resultados.slice(i, i + 5));
                    }

                    // Array para almacenar el HTML de cada prueba
                    const pruebasHTML = [];
                    // Variable para rastrear la prueba seleccionada
                    let pruebaActual = 0;

                    const enviarSolicitudConReintentos = async (grupo, index, intentos = 3, esperaInicial = 1000) => {
                        try {
                            const response = await fetch("../Controlador/analizarResultados.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ resultados: grupo })
                            });
                            const data = await response.json();
                            const analisisSpan = document.getElementById(`analisis-${index}`);
                            if (!analisisSpan) {
                                console.error(`No se encontró el elemento analisis-${index} en el DOM`);
                                return;
                            }
                            if (data.exito) {
                                analisisSpan.innerHTML = data.analisis;
                            } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                                await new Promise(resolve => setTimeout(resolve, esperaInicial));
                                return enviarSolicitudConReintentos(grupo, index, intentos - 1, esperaInicial * 2);
                            } else {
                                analisisSpan.innerHTML = `Error: ${data.mensaje}`;
                            }
                        } catch (error) {
                            console.error(`Error al obtener análisis para el grupo ${index + 1}:`, error);
                            const analisisSpan = document.getElementById(`analisis-${index}`);
                            if (analisisSpan) {
                                analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
                            }
                        }
                    };

                    const generarHTMLPrueba = (grupo, index) => {
                        let tabla = `
                            <div class="card" style="margin: 0; padding: 0; border: none;">
                                <div class="card-body" style="padding: 0;">
                                    <h3>📈 Resultados del test N° ${index + 1}</h4>
                                    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                        <thead>
                                            <tr>
                                                <th>Área</th>
                                                <th>Puntaje</th>
                                                <th>Categoría</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                        `;
                        grupo.forEach(fila => {
                            tabla += `
                                <tr>
                                    <td>${fila.area}</td>
                                    <td>${fila.puntaje}</td>
                                    <td>${fila.categoria}</td>
                                </tr>
                            `;
                        });
                        tabla += `
                                        </tbody>
                                    </table>
                                    <p><strong>Análisis de resultados:</strong> <span id="analisis-${index}" class="loading">Cargando análisis</span></p>
                                </div>
                            </div>
                        `;
                        return tabla;
                    };

                    const procesarGrupos = async () => {
                        for (let index = 0; index < grupos.length; index++) {
                            const grupo = grupos[index];
                            // Generar y almacenar el HTML para cada prueba
                            const tablaHTML = generarHTMLPrueba(grupo, index);
                            pruebasHTML[index] = tablaHTML;
                        }

                        // Crear el selector de pruebas
                        if (pruebasHTML.length > 0) {
                            const selectorHTML = `
                                <select id="selector-pruebas" style="margin-bottom: 10px;">
                                    ${pruebasHTML.map((_, i) => `<option value="${i}">Prueba ${i + 1} (${grupos[i][0].fecha})</option>`).join('')}
                                </select>
                            `;
                            contenedor.innerHTML += selectorHTML;

                            // Mostrar la primera prueba por defecto
                            contenedor.innerHTML += `<div id="prueba-contenido-casm85"></div>`;
                            const pruebaContenido = document.getElementById("prueba-contenido-casm85");
                            pruebaContenido.innerHTML = pruebasHTML[0];

                            // Solicitar análisis para la primera prueba
                            setTimeout(() => {
                                if (grupos[0]) {
                                    enviarSolicitudConReintentos(grupos[0], 0);
                                }
                            }, 0);

                            // Añadir evento al selector para cambiar la prueba
                            const selector = document.getElementById("selector-pruebas");
                            selector.addEventListener("change", async () => {
                                pruebaActual = parseInt(selector.value);
                                pruebaContenido.innerHTML = pruebasHTML[pruebaActual];
                                // Solicitar análisis para la prueba seleccionada
                                setTimeout(() => {
                                    if (grupos[pruebaActual]) {
                                        enviarSolicitudConReintentos(grupos[pruebaActual], pruebaActual);
                                    }
                                }, 0);
                            });
                        } else {
                            contenedor.innerHTML += "<p>No hay pruebas válidas para mostrar.</p>";
                        }
                    };

                    procesarGrupos().catch(error => {
                        console.error("Error en el procesamiento de grupos:", error);
                        contenedor.innerHTML += `<p>Error en el procesamiento de grupos: ${error.message}</p>`;
                    });
                } else {
                    document.getElementById("resultados").innerHTML = "<p>Error: " + data.mensaje + "</p>";
                }
            })
            .catch(error => {
                console.error("Error al obtener resultados:", error);
                document.getElementById("resultados").innerHTML = "<p>Ocurrió un error al obtener los resultados: " + error.message + "</p>";
            });
    });

    // Función de debounce (sin cambios)
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

    // Función para dibujar puntos (modificada para depuración)
    function dibujarPuntos(resultadosCategorias, index) {
        console.log(`Dibujando puntos para grupo ${index + 1}...`);

        // Buscar la tabla dentro de #prueba-contenido
        const tablaActual = document.querySelector(`#prueba-contenido .card`);
        if (!tablaActual) {
            console.error(`No se encontró la tabla (.card) para el grupo ${index + 1} en #prueba-contenido`);
            return;
        }

        // Verificar si .contenedor-tabla existe
        const contenedorTabla = tablaActual.querySelector('.contenedor-tabla');
        if (!contenedorTabla) {
            console.error(`No se encontró .contenedor-tabla dentro de .card para el grupo ${index + 1}`);
            console.log('Contenido de #prueba-contenido:', document.getElementById('prueba-contenido').innerHTML);
            return;
        }

        // Limpiar puntos y clases previas
        tablaActual.querySelectorAll(".punto").forEach(punto => punto.remove());
        tablaActual.querySelectorAll(".punto-marcado").forEach(celda => celda.classList.remove("punto-marcado"));

        const posiciones = [];

        Object.entries(resultadosCategorias).forEach(([categoria, { total }]) => {
            const celdas = tablaActual.querySelectorAll(`.celda-percentil[data-cat="${categoria}"]`);
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

        dibujarLineasEntrePuntos(posiciones, index);
    }

    // Función para dibujar líneas (modificada para depuración y selector robusto)
    function dibujarLineasEntrePuntos(posiciones, index) {
        const svg = document.getElementById(`svg-lineas-${index}`);
        if (!svg) {
            console.error(`❌ No se encontró el elemento SVG con ID svg-lineas-${index}`);
            return;
        }

        // Buscar .contenedor-tabla dentro de #prueba-contenido
        const contenedorTabla = document.querySelector(`#prueba-contenido .contenedor-tabla`);
        if (!contenedorTabla) {
            console.error(`No se encontró .contenedor-tabla en el grupo ${index + 1}`);
            console.log('Contenido de #prueba-contenido:', document.getElementById('prueba-contenido').innerHTML);
            return;
        }

        const contenedorRect = contenedorTabla.getBoundingClientRect();
        svg.setAttribute("width", contenedorRect.width);
        svg.setAttribute("height", contenedorRect.height);

        svg.innerHTML = "";

        console.log(`🔷 Dibujando líneas entre puntos para grupo ${index + 1}...`);
        console.log("📌 Número de puntos:", posiciones.length);

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

        console.log(`✅ Líneas dibujadas para grupo ${index + 1}.`);
    }

    async function enviarSolicitudConReintentos(resultadosCategorias, sexo, index, intentos = 3, esperaInicial = 1000) {
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
                console.error(`Categoría ${categoria} no encontrada en resultados`);
            }
        });

        try {
            const response = await fetch("../Controlador/analizarResultadosCASM83.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resultados: resultadosOrdenados, sexo: sexo })
            });
            const data = await response.json();
            const analisisSpan = document.getElementById(`analisis-${index}`);
            if (!analisisSpan) {
                console.error(`No se encontró el elemento analisis-${index} en el DOM`);
                return;
            }
            if (data.exito) {
                analisisSpan.innerHTML = data.analisis;
            } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                await new Promise(resolve => setTimeout(resolve, esperaInicial));
                return enviarSolicitudConReintentos(resultadosCategorias, sexo, index, intentos - 1, esperaInicial * 2);
            } else {
                analisisSpan.innerHTML = `Error: ${data.mensaje}`;
            }
        } catch (error) {
            console.error(`Error al obtener análisis para el grupo ${index + 1}:`, error);
            const analisisSpan = document.getElementById(`analisis-${index}`);
            if (analisisSpan) {
                analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
            }
        }
    }

    // Evento para el botón testCASM83Btn (modificado para asegurar renderizado antes de dibujar)
    document.getElementById("testCASM83Btn").addEventListener("click", () => {
        fetch("../Controlador/obtenerResultadosCASM83.php")
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    const resultados = data.resultados;
                    const contenedor = document.getElementById("resultados");
                    contenedor.innerHTML = "<h3>Resultados del Test CASM-83:</h3>";

                    if (resultados.length === 0) {
                        contenedor.innerHTML += "<p>No se encontraron resultados.</p>";
                        return;
                    }

                    const grupos = [];
                    for (let i = 0; i < resultados.length; i += 13) {
                        grupos.push(resultados.slice(i, i + 13));
                    }

                    // Array para almacenar el HTML de cada prueba
                    const pruebasHTML = [];
                    // Array para almacenar los datos de cada prueba
                    const pruebasDatos = [];
                    // Variable para rastrear la prueba seleccionada
                    let pruebaActual = 0;

                    const generarHTMLPrueba = (grupo, index, sexo, resultadosCategorias) => {
                        // Evaluación de veracidad
                        const preguntasVeracidadCategorias = [
                            { categoria: "CCSS", pregunta: 25 },
                            { categoria: "CCNA", pregunta: 38 },
                            { categoria: "CCCO", pregunta: 51 },
                            { categoria: "ARTE", pregunta: 64 },
                            { categoria: "BURO", pregunta: 77 },
                            { categoria: "CCEP", pregunta: 90 },
                            { categoria: "HAA", pregunta: 103 },
                            { categoria: "FINA", pregunta: 116 },
                            { categoria: "LING", pregunta: 129 },
                            { categoria: "VERA", preguntas: [12, 142] }
                        ];

                        let conteoVeracidadA = 0;
                        preguntasVeracidadCategorias.forEach(item => {
                            if (item.pregunta) {
                                if (resultadosCategorias[item.categoria]?.A > 0) {
                                    conteoVeracidadA++;
                                }
                            } else if (item.preguntas) {
                                conteoVeracidadA += resultadosCategorias["VERA"]?.A || 0;
                            }
                        });

                        const veracidadMessage = `
                            <p><strong>${conteoVeracidadA > 5 ? '❌ No se cumple la veracidad' : '✅ Se cumple la veracidad'}:</strong> 
                            ${conteoVeracidadA > 5 
                                ? `Se marcaron ${conteoVeracidadA} opciones "A" en las preguntas de veracidad. Respuestas poco relevantes.` 
                                : `Se marcaron ${conteoVeracidadA} opciones "A" en las preguntas de veracidad. Las respuestas son coherentes.`}</p>
                        `;

                        // Evaluación de consistencia
                        const paresConsistentes = [
                            { p1: { num: 13, cat: "CCFM" }, p2: { num: 131, cat: "JURI" } },
                            { p1: { num: 26, cat: "CCSS" }, p2: { num: 132, cat: "CCSS" } },
                            { p1: { num: 39, cat: "CCNA" }, p2: { num: 133, cat: "CCNA" } },
                            { p1: { num: 52, cat: "CCCO" }, p2: { num: 134, cat: "CCCO" } },
                            { p1: { num: 65, cat: "ARTE" }, p2: { num: 135, cat: "ARTE" } },
                            { p1: { num: 78, cat: "BURO" }, p2: { num: 136, cat: "BURO" } },
                            { p1: { num: 91, cat: "CCEP" }, p2: { num: 137, cat: "CCEP" } },
                            { p1: { num: 104, cat: "HAA" }, p2: { num: 138, cat: "HAA" } },
                            { p1: { num: 117, cat: "FINA" }, p2: { num: 139, cat: "FINA" } },
                            { p1: { num: 130, cat: "LING" }, p2: { num: 140, cat: "LING" } },
                            { p1: { num: 143, cat: "JURI" }, p2: { num: 18, cat: "CCFM" } }
                        ];

                        let inconsistencias = 0;
                        paresConsistentes.forEach(({ p1, p2 }) => {
                            const A1 = resultadosCategorias[p1.cat]?.A || 0;
                            const B1 = resultadosCategorias[p1.cat]?.B || 0;
                            const A2 = resultadosCategorias[p2.cat]?.A || 0;
                            const B2 = resultadosCategorias[p2.cat]?.B || 0;
                            if (A1 !== A2 || B1 !== B2) {
                                inconsistencias++;
                            }
                        });

                        const consistenciaMessage = `
                            <p><strong>${inconsistencias > 5 ? '❌ No se cumple la consistencia' : '✅ Se cumple la consistencia'}:</strong> 
                            ${inconsistencias > 5 
                                ? `Se detectaron ${inconsistencias} inconsistencias. Revisa las respuestas.` 
                                : `Se detectaron ${inconsistencias} inconsistencias. Las respuestas son consistentes.`}</p>
                        `;

                        // Determinar si mostrar análisis
                        const mostrarAnalisis = conteoVeracidadA <= 5 && inconsistencias <= 5;
                        const analisisMessage = mostrarAnalisis
                            ? `<p><strong>Análisis de resultados:</strong> <span id="analisis-${index}" class="loading">Cargando análisis...</span></p>`
                            : `<p><strong>⚠️ Análisis no disponible:</strong> Los resultados no cumplen los criterios de veracidad o consistencia.</p>`;

                        const encabezados = ["", "Desinterés", "Bajo", "Promedio Bajo", "Indecisión", "Promedio Alto", "Alto", "Muy Alto", ""];
                        const percentiles = ["1-14", "15-29", "30-39", "40-60", "61-74", "75-89", "90-99"];
                        const categorias = sexo === "Masculino" ? [
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
                            ["JURI", "0-2", "3-4", "5-6", "7-10", "11-13", "14-16", "17-22"],
                            ["VERA", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                            ["CONS", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"]
                        ] : [
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
                            ["JURI", "0-2", "3-4", "5-6", "7-11", "12-13", "14-16", "17-22"],
                            ["VERA", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                            ["CONS", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"]
                        ];

                        return `
                            <div class="card" style="margin: 0; padding: 0; border: none;">
                                <div class="card-body" style="padding: 0;">
                                    <h3 class="card-title" style="margin: 10px 0;">📈 Resultados del test N° ${index + 1} (${sexo})</h3>
                                    <div class="contenedor-tabla" style="position: relative; overflow-x: auto; margin: 0; padding: 0;">
                                        <svg id="svg-lineas-${index}" style="position: absolute; top: 0; left: 0; pointer-events: none; z-index: 10;"></svg>
                                        <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; text-align: center; width: 100%; margin: 0;">
                                            <tr><th colspan="9">${sexo}</th></tr>
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
                                    ${veracidadMessage}
                                    ${consistenciaMessage}
                                    ${analisisMessage}
                                </div>
                            </div>
                        `;
                    };

                    const procesarGrupos = async () => {
                        for (let index = 0; index < grupos.length; index++) {
                            const grupo = grupos[index];
                            if (grupo.length !== 13) {
                                pruebasHTML.push(`<p>Grupo ${index + 1} incompleto (${grupo.length} categorías en lugar de 13).</p>`);
                                pruebasDatos.push(null);
                                continue;
                            }

                            const sexo = grupo[0].sexo;
                            const resultadosCategorias = {};
                            grupo.forEach(fila => {
                                resultadosCategorias[fila.categoria] = {
                                    total: fila.total,
                                    A: fila.count_a,
                                    B: fila.count_b
                                };
                            });

                            // Generar y almacenar el HTML
                            const tablaHTML = generarHTMLPrueba(grupo, index, sexo, resultadosCategorias);
                            pruebasHTML[index] = tablaHTML;
                            pruebasDatos[index] = { sexo, resultadosCategorias };
                        }

                        // Crear el selector de pruebas
                        if (pruebasHTML.length > 0) {
                            const selectorHTML = `
                                <select id="selector-pruebas" style="margin-bottom: 10px;">
                                    ${pruebasHTML.map((_, i) => `<option value="${i}">Prueba ${i + 1} (${grupos[i][0].fecha})</option>`).join('')}
                                </select>
                            `;
                            contenedor.innerHTML += selectorHTML;

                            // Mostrar la primera prueba por defecto
                            contenedor.innerHTML += `<div id="prueba-contenido"></div>`;
                            const pruebaContenido = document.getElementById("prueba-contenido");
                            pruebaContenido.innerHTML = pruebasHTML[0];

                            // Esperar a que el DOM se actualice antes de dibujar
                            setTimeout(() => {
                                if (pruebasDatos[0]) {
                                    requestAnimationFrame(() => dibujarPuntos(pruebasDatos[0].resultadosCategorias, 0));
                                    if (pruebasHTML[0].includes("Cargando análisis")) {
                                        enviarSolicitudConReintentos(pruebasDatos[0].resultadosCategorias, pruebasDatos[0].sexo, 0);
                                    }
                                }
                            }, 0);

                            // Agregar listener para resize con debounce
                            const actualizarGrafico = debounce(() => {
                                console.log("🔄 Ventana redimensionada, actualizando gráfico para prueba", pruebaActual + 1);
                                if (pruebasDatos[pruebaActual]) {
                                    requestAnimationFrame(() => dibujarPuntos(pruebasDatos[pruebaActual].resultadosCategorias, pruebaActual));
                                }
                            }, 100);

                            window.addEventListener('resize', actualizarGrafico);

                            // Añadir evento al selector para cambiar la prueba
                            const selector = document.getElementById("selector-pruebas");
                            selector.addEventListener("change", async () => {
                                pruebaActual = parseInt(selector.value);
                                pruebaContenido.innerHTML = pruebasHTML[pruebaActual];
                                // Esperar a que el DOM se actualice
                                setTimeout(() => {
                                    if (pruebasDatos[pruebaActual]) {
                                        requestAnimationFrame(() => dibujarPuntos(pruebasDatos[pruebaActual].resultadosCategorias, pruebaActual));
                                        if (pruebasHTML[pruebaActual].includes("Cargando análisis")) {
                                            enviarSolicitudConReintentos(pruebasDatos[pruebaActual].resultadosCategorias, pruebasDatos[pruebaActual].sexo, pruebaActual);
                                        }
                                    }
                                }, 0);
                            });
                        } else {
                            contenedor.innerHTML += "<p>No hay pruebas válidas para mostrar.</p>";
                        }
                    };

                    procesarGrupos().catch(error => {
                        console.error("Error en el procesamiento de grupos:", error);
                        contenedor.innerHTML += `<p>Error en el procesamiento de grupos: ${error.message}</p>`;
                    });
                } else {
                    document.getElementById("resultados").innerHTML += "<p>Error: " + data.mensaje + "</p>";
                }
            })
            .catch(error => {
                console.error("Error al obtener resultados:", error);
                document.getElementById("resultados").innerHTML = "<p>Ocurrió un error al obtener los resultados: " + error.message + "</p>";
            });
    });
});