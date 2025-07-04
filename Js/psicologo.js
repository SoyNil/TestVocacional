import tiposCaracterologicos from './infoGaston.js';
document.addEventListener("DOMContentLoaded", function () {
    let intervaloReloj = null;
    let mostrandoCodigos = false;
    let datosOriginales = {};

    // Selección de elementos
    const contenido = document.getElementById("contenido");
    const btnInicio = document.getElementById("btn-inicio");
    const btnPacientes = document.getElementById("btn-pacientes");
    const btnCrearPsicologos = document.getElementById("btn-crear-psicologos");
    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");
    const imgElement = document.getElementById("foto-perfil");
    const nombreElement = document.getElementById("profile-name");
    const inputFoto = document.getElementById("input-foto");
    const btnEliminarCuenta = document.getElementById("btn-eliminar-cuenta");
    const btnPerfil = document.querySelector(".icon-buttons button[title='Perfil']");
    const btnImportarDatos = document.getElementById("btn-importar-datos");

    // Verificar sesión y cargar datos del psicólogo
    fetch("../Controlador/verificarSesionJSON.php", {
        credentials: "include"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " + response.status);
            }
            return response.text();
        })
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (!data.logueado) {
                    window.location.href = "../Vista/login.html";
                    return;
                }

                // Verificar que el usuario sea psicólogo y tenga jerarquía válida
                if (data.tipo_usuario !== 'psicologo' || (data.jerarquia !== 'admin' && data.jerarquia !== 'psicologo')) {
                    window.location.href = "../Vista/principal.html";
                    return;
                }

                const fotoPerfil = data.foto_perfil && data.foto_perfil.trim() !== ""
                    ? `${data.foto_perfil}?t=${new Date().getTime()}`
                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png";

                console.log("Intentando cargar imagen:", fotoPerfil);
                imgElement.src = fotoPerfil;
                imgElement.onerror = () => {
                    console.error("Error al cargar la imagen, usando predeterminada:", fotoPerfil);
                    imgElement.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
                };

                nombreElement.textContent = `${data.nombre} ${data.apellido}`;

                // Mostrar botones "Crear Psicólogos" y "Importar datos" solo para admin
                if (data.jerarquia === 'admin') {
                    if (btnCrearPsicologos) btnCrearPsicologos.style.display = "block";
                    if (btnImportarDatos) btnImportarDatos.style.display = "block";
                }

                // Inicializar la página
                mostrarContenidoInicio();
            } catch (e) {
                console.error("Error al parsear JSON:", e, "Respuesta:", text);
                window.location.href = "../Vista/login.html";
            }
        })
        .catch(error => {
            console.error("Error al verificar la sesión:", error);
            window.location.href = "../Vista/login.html";
        });

    // Botón Cerrar Sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", () => {
            window.location.href = "../Controlador/logout.php";
        });
    }

    // Botón Inicio
    if (btnInicio) {
        btnInicio.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarContenidoInicio();
        });
    }

    // Botón Pacientes
    if (btnPacientes) {
        btnPacientes.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarPacientes();
        });
    }

    // Botón Perfil
    if (btnPerfil) {
        btnPerfil.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarPerfilPsicologo();
        });
    }

    // Botón Crear Psicólogos
    if (btnCrearPsicologos) {
        btnCrearPsicologos.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarCrearPsicologo();
        });
    }

    // Botón Eliminar Cuenta
    if (btnEliminarCuenta) {
        btnEliminarCuenta.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
                fetch("../Controlador/verificarSesionJSON.php", { credentials: "include" })
                    .then(res => {
                        if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                        return res.json();
                    })
                    .then(data => {
                        if (!data.logueado) throw new Error("Sesión no activa");
                        const idUsuario = data.id_usuario;
                        return fetch(`../Controlador/eliminarUsuario.php?id_usuario=${idUsuario}`, {
                            method: "GET",
                            credentials: "include"
                        });
                    })
                    .then(res => {
                        if (!res.ok) throw new Error("Error al eliminar cuenta: " + res.status);
                        return res.json();
                    })
                    .then(data => {
                        if (data.exito) {
                            alert("Cuenta eliminada correctamente.");
                            window.location.href = "../Vista/login.html";
                        } else {
                            alert(`Error al eliminar cuenta: ${data.mensaje}`);
                        }
                    })
                    .catch(err => {
                        console.error("Error al eliminar cuenta:", err);
                        alert("Error al eliminar cuenta: " + err.message);
                    });
            }
        });
    }

    // Subir foto de perfil
    if (inputFoto) {
        inputFoto.addEventListener("change", async function () {
            const file = inputFoto.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("foto_perfil", file);

            try {
                const response = await fetch("../Controlador/guardarPsicologo.php", {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor: " + response.status);
                }

                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    if (data.exito) {
                        document.getElementById("foto-perfil").src = `${data.nueva_ruta}?t=${new Date().getTime()}`;
                        console.log("Imagen actualizada:", data.nueva_ruta);
                    } else {
                        alert("Error al subir la imagen: " + data.error);
                    }
                } catch (e) {
                    console.error("Error al parsear JSON:", e, "Respuesta:", text);
                    alert("Error al procesar la respuesta del servidor.");
                }
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Error al conectar con el servidor.");
            }
        });
    }

    // Botón Importar Datos
    if (btnImportarDatos) {
        btnImportarDatos.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarImportarDatos();
        });
    }

    // Función para mostrar el formulario de importar datos
    function mostrarImportarDatos() {
        contenido.innerHTML = `
            <div class="card">
                <h2>Importar Datos de Institución</h2>
                <form id="form-importar-datos">
                    <label for="archivo-datos">Seleccione un archivo CSV (Nombre, Apellido, DNI, Fecha_Nacimiento, Sexo, Institucion, Nombre_Apoderado, Telefono_Apoderado, Correo_Apoderado):</label>
                    <input type="file" id="archivo-datos" name="archivo-datos" accept=".csv" required />
                    <button type="submit">Importar</button>
                </form>
            </div>
        `;

        const formImportarDatos = document.getElementById("form-importar-datos");
        const loadingModal = document.getElementById('loadingModal');
        const loadingMessage = document.getElementById('loadingMessage');

        formImportarDatos.addEventListener("submit", (e) => {
            e.preventDefault();

            // Validar que se haya seleccionado un archivo
            const fileInput = document.getElementById('archivo-datos');
            if (!fileInput.files || fileInput.files.length === 0) {
                alert("Por favor, seleccione un archivo CSV.");
                return;
            }

            // Validar extensión del archivo
            const fileName = fileInput.files[0].name;
            if (!fileName.endsWith('.csv')) {
                alert("El archivo debe tener extensión .csv");
                return;
            }

            // Mostrar modal de carga
            loadingModal.style.display = 'flex';
            loadingMessage.textContent = 'Importando datos...';

            const formData = new FormData(formImportarDatos);
            fetch("../Controlador/importarDatos.php", {
                method: "POST",
                body: formData,
                credentials: "include"
            })
                .then(res => {
                    if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                    return res.json();
                })
                .then(data => {
                    loadingModal.style.display = 'none';
                    if (data.exito) {
                        alert(data.mensaje);
                        formImportarDatos.reset();
                    } else {
                        alert(data.mensaje);
                    }
                })
                .catch(err => {
                    console.error("Error al importar datos:", err);
                    loadingMessage.textContent = `Error al importar datos: ${err.message}`;
                    loadingMessage.style.color = 'red';
                    setTimeout(() => {
                        loadingModal.style.display = 'none';
                    }, 3000);
                });
        });
    }

    // Manejador de eventos para botones de códigos
    document.addEventListener("click", (e) => {
        if (e.target.id === "btn-generar-codigos") {
            generarCodigoInvitacion();
        } else if (e.target.id === "btn-ver-codigos") {
            const contenedor = document.getElementById("codigos-container");
            if (!contenedor) {
                console.error("Contenedor de códigos no encontrado.");
                return;
            }

            if (mostrandoCodigos) {
                contenedor.innerHTML = "";
                mostrandoCodigos = false;
                e.target.textContent = "Lista";
            } else {
                verCodigosGenerados();
                mostrandoCodigos = true;
                e.target.textContent = "Ocultar";
            }
        }
    });

    // Función para mostrar el formulario de perfil del psicólogo
    function mostrarPerfilPsicologo() {
        contenido.innerHTML = `
            <div class="card">
                <h2>Editar Perfil</h2>
                <form id="form-editar-perfil-psicologo">
                    <label for="nombre_usuario">Nombre de usuario:</label>
                    <input type="text" id="nombre_usuario" name="nombre_usuario" required />

                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />

                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required />

                    <label for="correo">Correo:</label>
                    <input type="email" id="correo" name="correo" required />

                    <label for="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" placeholder="Dejar en blanco para no cambiar" />

                    <label for="jerarquia">Jerarquía:</label>
                    <input type="text" id="jerarquia" name="jerarquia" readonly />

                    <label for="sexo">Sexo:</label>
                    <select id="sexo" name="sexo">
                        <option value="">Seleccione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label for="fecha_nacimiento">Fecha de nacimiento:</label>
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" />

                    <button type="submit">Guardar Cambios</button>
                </form>
                <div id="mensaje-perfil" style="display: none; margin-top: 1rem;"></div>
            </div>
        `;

        // Cargar datos del perfil
        fetch("../Controlador/verificarSesionJSON.php", {
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor: " + response.status);
                return response.json();
            })
            .then(data => {
                if (data.logueado) {
                    datosOriginales = data;

                    document.getElementById("nombre_usuario").value = data.nombre_usuario || '';
                    document.getElementById("nombre").value = data.nombre || '';
                    document.getElementById("apellido").value = data.apellido || '';
                    document.getElementById("correo").value = data.correo || '';
                    document.getElementById("jerarquia").value = data.jerarquia || '';
                    document.getElementById("sexo").value = data.sexo || '';
                    document.getElementById("fecha_nacimiento").value = data.fecha_nacimiento || '';
                } else {
                    window.location.href = "../Vista/login.html";
                }
            })
            .catch(error => {
                console.error("Error al verificar la sesión:", error);
                window.location.href = "../Vista/login.html";
            });

        // Guardar cambios
        const formEditarPerfil = document.getElementById("form-editar-perfil-psicologo");
        formEditarPerfil.addEventListener("submit", function (event) {
            event.preventDefault();

            const contrasena = document.getElementById("contrasena").value.trim();
            if (contrasena && contrasena.length < 8) {
                mostrarMensaje("La contraseña debe tener al menos 8 caracteres.", false);
                return;
            }

            const campos = ["nombre_usuario", "nombre", "apellido", "correo", "contrasena", "sexo", "fecha_nacimiento"];
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
                body: JSON.stringify(datosActualizados),
                credentials: "include"
            })
                .then(res => {
                    if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                    return res.json();
                })
                .then(data => {
                    if (data.exito) {
                        mostrarMensaje("¡Perfil guardado con éxito!", true);
                        // Recargar datos de la sesión
                        fetch("../Controlador/verificarSesionJSON.php", {
                            credentials: "include"
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.logueado) {
                                    datosOriginales = data;
                                    document.getElementById("nombre_usuario").value = data.nombre_usuario || '';
                                    document.getElementById("nombre").value = data.nombre || '';
                                    document.getElementById("apellido").value = data.apellido || '';
                                    document.getElementById("correo").value = data.correo || '';
                                    document.getElementById("jerarquia").value = data.jerarquia || '';
                                    document.getElementById("sexo").value = data.sexo || '';
                                    document.getElementById("fecha_nacimiento").value = data.fecha_nacimiento || '';
                                    nombreElement.textContent = `${data.nombre} ${data.apellido}`;
                                }
                            });
                    } else {
                        mostrarMensaje(`Error: ${data.mensaje}`, false);
                    }
                })
                .catch(error => {
                    console.error("Error al guardar el perfil:", error);
                    mostrarMensaje("Hubo un problema al guardar el perfil.", false);
                });
        });

        // Función para mostrar mensajes
        function mostrarMensaje(mensaje, exito) {
            const mensajeDiv = document.getElementById("mensaje-perfil");
            mensajeDiv.textContent = mensaje;
            mensajeDiv.style.display = "block";
            mensajeDiv.style.color = exito ? "#4caf50" : "#ff4d4d";
            setTimeout(() => {
                mensajeDiv.style.display = "none";
            }, 3000);
        }
    }

    // Función para mostrar el formulario de crear psicólogo
    function mostrarCrearPsicologo() {
        contenido.innerHTML = `
            <div class="card">
                <h2>Crear Nuevo Psicólogo</h2>
                <form id="form-crear-psicologo">
                    <label for="nombre_usuario">Nombre de usuario:</label>
                    <input type="text" id="nombre_usuario" name="nombre_usuario" required />

                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />

                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required />

                    <label for="correo">Correo:</label>
                    <input type="email" id="correo" name="correo" required />

                    <label for="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required />

                    <label for="jerarquia">Jerarquía:</label>
                    <select id="jerarquia" name="jerarquia" required>
                        <option value="psicologo">Psicólogo</option>
                        <option value="admin">Admin</option>
                    </select>

                    <label for="sexo">Sexo:</label>
                    <select id="sexo" name="sexo">
                        <option value="">Seleccione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label for="fecha_nacimiento">Fecha de nacimiento:</label>
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" />

                    <button type="submit">Crear Psicólogo</button>
                </form>
            </div>
        `;

        const formCrearPsicologo = document.getElementById("form-crear-psicologo");
        formCrearPsicologo.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(formCrearPsicologo);
            fetch("../Controlador/crearPsicologo.php", {
                method: "POST",
                body: formData,
                credentials: "include"
            })
                .then(res => {
                    if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                    return res.json();
                })
                .then(data => {
                    if (data.exito) {
                        alert("Psicólogo creado correctamente.");
                        formCrearPsicologo.reset();
                    } else {
                        alert(`Error: ${data.mensaje}`);
                    }
                })
                .catch(err => {
                    console.error("Error al crear psicólogo:", err);
                    alert("Error al crear psicólogo: " + err.message);
                });
        });
    }

    function mostrarContenidoInicio() {
        contenido.innerHTML = `
            <div class="inicio-container">
                <div class="card card-reloj">
                    <i class="fas fa-clock icono-clock"></i>
                    <div class="hora" id="reloj-hora">--:--:--</div>
                    <div class="fecha" id="reloj-fecha">--/--/----</div>
                </div>

                <div class="card card-codigos" id="card-generar-codigos">
                    <i class="fas fa-key icono-card"></i>
                    <p>Generar Código de Invitación</p>
                    <button id="btn-generar-codigos" class="btn-generar">Generar</button>
                </div>

                <div class="card card-codigos" id="card-ver-codigos">
                    <i class="fas fa-list icono-card"></i>
                    <p>Ver Códigos Generados</p>
                    <button id="btn-ver-codigos" class="btn-ver">Lista</button>
                </div>
            </div>
            <div id="codigos-container"></div>
        `;

        function actualizarReloj() {
            const relojHora = document.getElementById("reloj-hora");
            const relojFecha = document.getElementById("reloj-fecha");

            if (!relojHora || !relojFecha) {
                return;
            }

            const ahora = new Date();
            let horas = ahora.getHours();
            const minutos = ahora.getMinutes().toString().padStart(2, '0');
            const segundos = ahora.getSeconds().toString().padStart(2, '0');
            const ampm = horas >= 12 ? 'PM' : 'AM';
            horas = horas % 12 || 12;

            const dia = ahora.getDate().toString().padStart(2, '0');
            const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
            const ano = ahora.getFullYear();

            relojHora.textContent = `${horas}:${minutos}:${segundos} ${ampm}`;
            relojFecha.textContent = `${dia}/${mes}/${ano}`;
        }

        if (intervaloReloj) {
            clearInterval(intervaloReloj);
        }

        actualizarReloj();
        intervaloReloj = setInterval(actualizarReloj, 1000);
    }

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

    function dibujarPuntos(resultadosCategorias, index, contenedorTabla) {
        const tablaActual = contenedorTabla.querySelector('.card-table');
        if (!tablaActual) {
            console.error(`No se encontró la tabla (.card) para el grupo ${index + 1}`);
            return;
        }

        const contenedorTablaInner = tablaActual.querySelector('.contenedor-tabla');
        if (!contenedorTablaInner) {
            console.error(`No se encontró .contenedor-tabla para el grupo ${index + 1}`);
            return;
        }

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
                const contenedorRect = contenedorTablaInner.getBoundingClientRect();

                const coordenada = {
                    x: celdaRect.left + celdaRect.width / 2 - contenedorRect.left,
                    y: celdaRect.top + celdaRect.height / 2 - contenedorRect.top
                };

                posiciones.push(coordenada);
            }
        });

        dibujarLineasEntrePuntos(posiciones, index, contenedorTablaInner);
    }

    function dibujarLineasEntrePuntos(posiciones, index, contenedorTabla) {
        const svg = contenedorTabla.querySelector(`#svg-lineas-${index}`);
        if (!svg) {
            console.error(`No se encontró el elemento SVG con ID svg-lineas-${index}`);
            return;
        }

        const contenedorRect = contenedorTabla.getBoundingClientRect();
        svg.setAttribute("width", contenedorRect.width);
        svg.setAttribute("height", contenedorRect.height);

        svg.innerHTML = "";

        for (let i = 0; i < posiciones.length - 1; i++) {
            const { x: x1, y: y1 } = posiciones[i];
            const { x: x2, y: y2 } = posiciones[i + 1];

            const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
            linea.setAttribute("x1", x1.toString());
            linea.setAttribute("y1", y1.toString());
            linea.setAttribute("x2", x2.toString());
            linea.setAttribute("y2", y2.toString());
            linea.setAttribute("stroke", "blue");
            linea.setAttribute("stroke-width", "2");

            svg.appendChild(linea);
        }
    }

    async function enviarSolicitudConReintentosCASM83(resultadosCategorias, sexo, index, intentos = 3, esperaInicial = 1000) {
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
            const analisisSpan = document.getElementById(`analisis-casm83-${index}`);
            if (!analisisSpan) {
                console.error(`No se encontró el elemento analisis-casm83-${index}`);
                return;
            }
            if (data.exito) {
                analisisSpan.innerHTML = data.analisis;
            } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                await new Promise(resolve => setTimeout(resolve, esperaInicial));
                return enviarSolicitudConReintentosCASM83(resultadosCategorias, sexo, index, intentos - 1, esperaInicial * 2);
            } else {
                analisisSpan.innerHTML = `Error: ${data.mensaje}`;
            }
        } catch (error) {
            console.error(`Error al obtener análisis CASM-83:`, error);
            const analisisSpan = document.getElementById(`analisis-casm83-${index}`);
            if (analisisSpan) {
                analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
            }
        }
    }

    function mostrarPacientes() {
        if (intervaloReloj) {
            clearInterval(intervaloReloj);
            intervaloReloj = null;
        }

        contenido.innerHTML = `<h2>Lista de Pacientes</h2>
                            <div>
                                <label>Filtrar por tipo:</label>
                                <select id="filtro-tipo-usuario" class="selector-detalles">
                                    <option value="">Todos</option>
                                    <option value="usuario">Usuarios</option>
                                    <option value="institucion">Instituciones</option>
                                </select>
                            </div>
                            <div id="lista-pacientes">Cargando...</div>`;

        const filtroTipoUsuario = document.getElementById("filtro-tipo-usuario");
        filtroTipoUsuario.addEventListener("change", () => {
            cargarPacientes(filtroTipoUsuario.value);
        });

        cargarPacientes("");
    }

    function cargarPacientes(tipoUsuario) {
        const url = tipoUsuario ? `../Controlador/obtenerUsuarios.php?tipo_usuario=${tipoUsuario}` : "../Controlador/obtenerUsuarios.php";
        fetch(url, { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                return res.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    if (!data.exito) {
                        document.getElementById("lista-pacientes").innerHTML = `<p>Error: ${data.error}</p>`;
                        return;
                    }

                    if (data.usuarios.length === 0) {
                        document.getElementById("lista-pacientes").innerHTML = `<p>No hay usuarios registrados.</p>`;
                        return;
                    }

                    const tabla = document.createElement("table");
                    tabla.classList.add("tabla-usuarios");
                    tabla.innerHTML = `
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Tipo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.usuarios.map(user => {
                                const tipoUsuario = user.tipo_cuenta === "Institucion" ? "institucion" : "usuario";
                                return `
                                    <tr>
                                        <td>${user.nombre_usuario}</td>
                                        <td>${user.nombre}</td>
                                        <td>${user.apellido}</td>
                                        <td>${user.correo}</td>
                                        <td>${user.tipo_cuenta}</td>
                                        <td>
                                            <button class="btn-ver-paciente" data-id="${user.id}" data-tipo="${tipoUsuario}" title="Ver paciente">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn-eliminar-usuario" data-id="${user.id}" data-tipo="${tipoUsuario}" title="Eliminar usuario">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                        </tbody>
                    `;

                    const lista = document.getElementById("lista-pacientes");
                    lista.innerHTML = "";
                    lista.appendChild(tabla);

                    // Evento para "Ver paciente"
                    document.querySelectorAll(".btn-ver-paciente").forEach(boton => {
                        boton.addEventListener("click", () => {
                            const idPaciente = boton.getAttribute("data-id");
                            const tipoUsuario = boton.getAttribute("data-tipo");
                            console.log("Ver paciente - ID:", idPaciente, "Tipo:", tipoUsuario); // Depuración
                            verPaciente(idPaciente, tipoUsuario);
                        });
                    });

                    // Evento para "Eliminar usuario"
                    document.querySelectorAll(".btn-eliminar-usuario").forEach(boton => {
                        boton.addEventListener("click", () => {
                            const idUsuario = boton.getAttribute("data-id");
                            const tipoUsuario = boton.getAttribute("data-tipo");
                            console.log("Eliminar - ID:", idUsuario, "Tipo:", tipoUsuario); // Depuración
                            if (confirm(`¿Estás seguro de eliminar al ${tipoUsuario === 'institucion' ? 'institución' : 'usuario'} con ID ${idUsuario}? Esta acción eliminará su cuenta, tests y análisis asociados.`)) {
                                fetch(`../Controlador/eliminarUsuario.php?id_usuario=${idUsuario}&tipo_usuario=${tipoUsuario}`, {
                                    method: "GET",
                                    credentials: "include"
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.exito) {
                                            alert(`${tipoUsuario === 'institucion' ? 'Institución' : 'Usuario'} eliminado correctamente.`);
                                            cargarPacientes(filtroTipoUsuario.value);
                                        } else {
                                            alert(`Error: ${data.mensaje}`);
                                        }
                                    })
                                    .catch(err => {
                                        console.error("Error al eliminar:", err);
                                        alert("Error al eliminar.");
                                    });
                            }
                        });
                    });
                } catch (e) {
                    console.error("Error al parsear JSON:", e, "Respuesta:", text);
                    document.getElementById("lista-pacientes").innerHTML = `<p>Error al cargar usuarios.</p>`;
                }
            })
            .catch(err => {
                document.getElementById("lista-pacientes").innerHTML = `<p>Error al cargar usuarios.</p>`;
                console.error("Error al obtener usuarios:", err);
            });
    }

    function verPaciente(idPaciente, tipoUsuario) {
        const contenido = document.getElementById("contenido");
        contenido.innerHTML = `<h2>Detalles del Paciente</h2><div id="detalles-paciente">Cargando...</div>`;

        const url = `../Controlador/obtenerTestsPaciente.php?id=${idPaciente}&tipo_usuario=${tipoUsuario}`;
        fetch(url, { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                return res.json();
            })
            .then(data => {
                const detalles = document.getElementById("detalles-paciente");
                detalles.innerHTML = "";

                if (!data.exito) {
                    detalles.innerHTML = `<p>Error: ${data.error}</p>`;
                    return;
                }

                const paciente = data.paciente;
                const infoPaciente = document.createElement("div");
                infoPaciente.classList.add("info-paciente");
                infoPaciente.innerHTML = `
                    <h3>${paciente.nombre_usuario}</h3>
                    <p><strong>Nombre:</strong> ${paciente.nombre} ${paciente.apellido}</p>
                    <p><strong>Correo:</strong> ${paciente.correo}</p>
                    <p><strong>Sexo:</strong> ${paciente.sexo}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${paciente.fecha_nacimiento || 'No disponible'}</p>
                    <p><strong>Tipo de Cuenta:</strong> ${paciente.tipo_cuenta}</p>
                `;
                detalles.appendChild(infoPaciente);

                const botonesDiv = document.createElement("div");
                botonesDiv.style.display = "flex";
                botonesDiv.style.gap = "10px";
                botonesDiv.style.marginTop = "1rem";

                const volverBtn = document.createElement("button");
                volverBtn.classList.add("btn-volver", "modal-button");
                volverBtn.textContent = "Volver a la lista de pacientes";
                volverBtn.addEventListener("click", () => mostrarPacientes());

                const informeBtn = document.createElement("button");
                informeBtn.classList.add("btn-informe", "modal-button");
                informeBtn.textContent = "Generar Informe";
                informeBtn.addEventListener("click", () => mostrarModalInforme(idPaciente, data.tests, tipoUsuario));

                botonesDiv.appendChild(volverBtn);
                botonesDiv.appendChild(informeBtn);
                detalles.appendChild(botonesDiv);

                const testsContainer = document.createElement("div");
                testsContainer.classList.add("tests-container");

                // Sección CASM-83
                const casm83Section = document.createElement("div");
                casm83Section.classList.add("test-section");
                casm83Section.innerHTML = `<h4>Test CASM-83</h4>`;
                if (data.tests.casm83.length > 0) {
                    const count = data.tests.casm83.length;
                    casm83Section.innerHTML += `<p><strong>Cantidad de tests realizados:</strong> ${count}</p>`;
                    const selectContainer = document.createElement("div");
                    selectContainer.classList.add("select-container");
                    const select = document.createElement("select");
                    select.classList.add("select-test", "select-casm83");
                    select.innerHTML = data.tests.casm83.map(test => `
                        <option value="${test.id_inicio}">Test ${test.test_number} - ${test.fecha}</option>
                    `).join("");
                    selectContainer.appendChild(select);

                    const eliminarBtn = document.createElement("button");
                    eliminarBtn.classList.add("btn-eliminar-test");
                    eliminarBtn.textContent = "Eliminar test";
                    eliminarBtn.addEventListener("click", () => {
                        const idInicio = select.value;
                        if (confirm("¿Estás seguro de que deseas eliminar este test y su análisis? Esta acción no se puede deshacer.")) {
                            eliminarTestCASM83(idInicio, idPaciente, casm83Section);
                        }
                    });
                    selectContainer.appendChild(eliminarBtn);
                    casm83Section.appendChild(selectContainer);

                    const resultadosContainer = document.createElement("div");
                    resultadosContainer.classList.add("resultados-casm83");
                    resultadosContainer.id = "resultados-casm83";
                    casm83Section.appendChild(resultadosContainer);

                    select.addEventListener("change", () => {
                        const idInicio = select.value;
                        cargarResultadosCASM83(idInicio, resultadosContainer);
                    });

                    cargarResultadosCASM83(data.tests.casm83[0].id_inicio, resultadosContainer);
                } else {
                    casm83Section.innerHTML += `<p>No se encontraron tests CASM-83.</p>`;
                }
                testsContainer.appendChild(casm83Section);

                // Sección CASM-85
                const casm85Section = document.createElement("div");
                casm85Section.classList.add("test-section");
                casm85Section.innerHTML = `<h4>Test CASM-85</h4>`;
                if (data.tests.casm85.length > 0) {
                    const count = data.tests.casm85.length;
                    casm85Section.innerHTML += `<p><strong>Cantidad de tests realizados:</strong> ${count}</p>`;
                    const selectContainer = document.createElement("div");
                    selectContainer.classList.add("select-container");
                    const select = document.createElement("select");
                    select.classList.add("select-test", "select-casm85");
                    select.innerHTML = data.tests.casm85.map(test => `
                        <option value="${test.id_inicio}">Test ${test.test_number} - ${test.fecha}</option>
                    `).join("");
                    selectContainer.appendChild(select);

                    const eliminarBtn = document.createElement("button");
                    eliminarBtn.classList.add("btn-eliminar-test");
                    eliminarBtn.textContent = "Eliminar test";
                    eliminarBtn.addEventListener("click", () => {
                        const idInicio = select.value;
                        if (confirm("¿Estás seguro de que deseas eliminar este test y su análisis? Esta acción no se puede deshacer.")) {
                            eliminarTestCASM85(idInicio, idPaciente, casm85Section);
                        }
                    });
                    selectContainer.appendChild(eliminarBtn);
                    casm85Section.appendChild(selectContainer);

                    const resultadosContainer = document.createElement("div");
                    resultadosContainer.classList.add("resultados-casm85");
                    resultadosContainer.id = "resultados-casm85";
                    casm85Section.appendChild(resultadosContainer);

                    select.addEventListener("change", () => {
                        const idInicio = select.value;
                        cargarResultadosCASM85(idInicio, resultadosContainer);
                    });

                    cargarResultadosCASM85(data.tests.casm85[0].id_inicio, resultadosContainer);
                } else {
                    casm85Section.innerHTML += `<p>No se encontraron tests CASM-85.</p>`;
                }
                testsContainer.appendChild(casm85Section);

                // Sección PMA
                const pmaSection = document.createElement("div");
                pmaSection.classList.add("test-section");
                pmaSection.innerHTML = `<h4>Test PMA</h4>`;
                if (data.tests.pma && data.tests.pma.length > 0) {
                    const count = data.tests.pma.length;
                    pmaSection.innerHTML += `<p><strong>Cantidad de tests realizados:</strong> ${count}</p>`;
                    const selectContainer = document.createElement("div");
                    selectContainer.classList.add("select-container");
                    const select = document.createElement("select");
                    select.classList.add("select-test", "select-pma");
                    select.innerHTML = data.tests.pma.map((test, index) => `
                        <option value="${test.id_inicio}">Test ${index + 1} - ${test.fecha}</option>
                    `).join("");
                    selectContainer.appendChild(select);

                    const eliminarBtn = document.createElement("button");
                    eliminarBtn.classList.add("btn-eliminar-test");
                    eliminarBtn.textContent = "Eliminar test";
                    eliminarBtn.addEventListener("click", () => {
                        const idTest = select.value;
                        if (confirm("¿Estás seguro de que deseas eliminar este test PMA y su análisis? Esta acción no se puede deshacer.")) {
                            eliminarTestPMA(idTest, idPaciente, pmaSection);
                        }
                    });
                    selectContainer.appendChild(eliminarBtn);
                    pmaSection.appendChild(selectContainer);

                    const resultadosContainer = document.createElement("div");
                    resultadosContainer.classList.add("resultados-pma");
                    resultadosContainer.id = "resultados-pma";
                    pmaSection.appendChild(resultadosContainer);

                    select.addEventListener("change", () => {
                        const idTest = select.value;
                        cargarResultadosPMA(idTest, resultadosContainer);
                    });

                    cargarResultadosPMA(data.tests.pma[0].id_inicio, resultadosContainer);
                } else {
                    pmaSection.innerHTML += `<p>No se encontraron tests PMA.</p>`;
                }
                testsContainer.appendChild(pmaSection);

                // Sección Test Gastón
                const gastonSection = document.createElement("div");
                gastonSection.classList.add("test-section");
                gastonSection.innerHTML = `<h4>Test Gastón</h4>`;

                if (data.tests.gaston && data.tests.gaston.length > 0) {
                    const count = data.tests.gaston.length;
                    gastonSection.innerHTML += `<p><strong>Cantidad de tests realizados:</strong> ${count}</p>`;

                    const selectContainer = document.createElement("div");
                    selectContainer.classList.add("select-container");

                    const select = document.createElement("select");
                    select.classList.add("select-test", "select-gaston");
                    select.innerHTML = data.tests.gaston.map((test, index) => `
                        <option value="${test.id_inicio}">Test ${index + 1} - ${test.fecha}</option>
                    `).join("");

                    selectContainer.appendChild(select);

                    const eliminarBtn = document.createElement("button");
                    eliminarBtn.classList.add("btn-eliminar-test");
                    eliminarBtn.textContent = "Eliminar test";
                    eliminarBtn.addEventListener("click", () => {
                        const idTest = select.value;
                        if (confirm("¿Estás seguro de que deseas eliminar este test Gastón? Esta acción no se puede deshacer.")) {
                            eliminarTestGaston(idTest, idPaciente, gastonSection);
                        }
                    });

                    selectContainer.appendChild(eliminarBtn);
                    gastonSection.appendChild(selectContainer);

                    const resultadosContainer = document.createElement("div");
                    resultadosContainer.classList.add("resultados-gaston");
                    resultadosContainer.id = "resultados-gaston";
                    gastonSection.appendChild(resultadosContainer);

                    select.addEventListener("change", () => {
                        const idTest = select.value;
                        cargarResultadosGaston(idTest, resultadosContainer);
                    });

                    cargarResultadosGaston(data.tests.gaston[0].id_inicio, resultadosContainer);
                } else {
                    gastonSection.innerHTML += `<p>No se encontraron tests Gastón.</p>`;
                }

                testsContainer.appendChild(gastonSection);

                detalles.appendChild(testsContainer);
            })
            .catch(err => {
                document.getElementById("detalles-paciente").innerHTML = `<p>Error al cargar detalles del paciente.</p>`;
                console.error("Error al obtener detalles del paciente:", err);
            });
    }

    function mostrarModalInforme(idPaciente, tests, tipoUsuario) {
        console.log("mostrarModalInforme llamado con:", { idPaciente, tests, tipoUsuario });

        // Validar tests
        if (!tests || !Array.isArray(tests.casm83) || !Array.isArray(tests.casm85) || !Array.isArray(tests.pma) || !Array.isArray(tests.gaston)) {
            console.error("Tests inválidos:", tests);
            alert("Error: No se proporcionaron datos válidos de los tests.");
            return;
        }

        // Eliminar modal existente
        let modal = document.getElementById("modal-informe-container");
        if (modal) modal.remove();

        // Crear modal
        const modalHTML = `
            <div id="modal-informe-container" class="modal-adv">
                <div class="modal-content-adv">
                    <span id="modal-close-informe" class="modal-close">×</span>
                    <h3>Generar Informe</h3>
                    <p>Selecciona un intento para cada test:</p>
                    <div id="modal-error-informe" style="color: #a94442; display: none; margin-bottom: 1rem;"></div>

                    <label for="select-casm83">CASM-83:</label>
                    <select id="select-casm83" class="modal-select">
                        <option value="">Selecciona un intento</option>
                        ${tests.casm83.map(test => `<option value="${test.id_inicio}">Test ${test.test_number} - ${test.fecha}</option>`).join("")}
                    </select>

                    <label for="select-casm85">CASM-85:</label>
                    <select id="select-casm85" class="modal-select">
                        <option value="">Selecciona un intento</option>
                        ${tests.casm85.map(test => `<option value="${test.id_inicio}">Test ${test.test_number} - ${test.fecha}</option>`).join("")}
                    </select>

                    <label for="select-pma">PMA:</label>
                    <select id="select-pma" class="modal-select">
                        <option value="">Selecciona un intento</option>
                        ${tests.pma.map(test => `<option value="${test.id_inicio}">Test ${test.test_number} - ${test.fecha}</option>`).join("")}
                    </select>

                    <label for="select-gaston">Gastón:</label>
                    <select id="select-gaston" class="modal-select">
                        <option value="">Selecciona un intento</option>
                        ${tests.gaston.map(test => `<option value="${test.id_inicio}">Test ${test.test_number} - ${test.fecha}</option>`).join("")}
                    </select>

                    <div class="modal-buttons">
                        <button id="modal-generar-informe-btn" class="modal-button">Generar</button>
                        <button id="modal-cancelar-informe" class="modal-button">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", modalHTML);
        modal = document.getElementById("modal-informe-container");

        // Elementos
        const closeBtn = document.getElementById("modal-close-informe");
        const generarBtn = document.getElementById("modal-generar-informe-btn");
        const cancelarBtn = document.getElementById("modal-cancelar-informe");
        const select83 = document.getElementById("select-casm83");
        const select85 = document.getElementById("select-casm85");
        const selectPMA = document.getElementById("select-pma");
        const selectGaston = document.getElementById("select-gaston");
        const errorDiv = document.getElementById("modal-error-informe");

        // Eventos de cambio
        [select83, select85, selectPMA, selectGaston].forEach(select => {
            select.addEventListener("change", e => e.stopPropagation());
        });

        // Cerrar modal
        [closeBtn, cancelarBtn].forEach(btn => btn.addEventListener("click", () => cerrarModal(modal)));

        // Botón generar
        generarBtn.addEventListener("click", e => {
            e.stopPropagation();
            const intento83 = select83.value;
            const intento85 = select85.value;
            const intentoPMA = selectPMA.value;
            const intentoGaston = selectGaston.value;

            if (!intento83 || !intento85 || !intentoPMA || !intentoGaston) {
                errorDiv.textContent = "Debes seleccionar un intento para cada test.";
                errorDiv.style.display = "block";
                return;
            }

            // Validar existencia real
            const test83 = tests.casm83.find(t => t.id_inicio === Number(intento83));
            const test85 = tests.casm85.find(t => t.id_inicio === Number(intento85));
            const testPMA = tests.pma.find(t => t.id_inicio === Number(intentoPMA));
            const testGaston = tests.gaston.find(t => t.id_inicio === Number(intentoGaston));

            if (!test83 || !test85 || !testPMA || !testGaston) {
                errorDiv.textContent = "Intento seleccionado no válido.";
                errorDiv.style.display = "block";
                return;
            }

            // Generar informe
            errorDiv.style.display = "none";
            generarBtn.disabled = true;
            generarBtn.textContent = "Generando...";

            generarInforme(idPaciente, intento83, intento85, intentoPMA, intentoGaston, tipoUsuario)
                .finally(() => {
                    generarBtn.disabled = false;
                    generarBtn.textContent = "Generar";
                });

            cerrarModal(modal);
        });

        // Clic fuera del modal
        modal.addEventListener("click", e => {
            if (e.target === modal) cerrarModal(modal);
        });

        modal.style.display = "flex";
        setTimeout(() => modal.classList.add("show"), 10);
    }

    function cerrarModal(modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }

    async function generarInforme(idPaciente, idInicio83, idInicio85, idInicioPMA, idInicioGaston, tipoUsuario) {
        // Mostrar modal de carga
        const loadingModal = document.getElementById('loadingModal');
        const loadingMessage = document.getElementById('loadingMessage');
        loadingModal.style.display = 'flex';
        loadingMessage.textContent = 'Generando informe...';
        console.log("generarInforme llamado con:", { idPaciente, idInicio83, idInicio85, idInicioPMA, idInicioGaston, tipoUsuario  });

        try {
            const { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, Header } = await import("https://cdn.jsdelivr.net/npm/docx@8.5.0/+esm");

            if (!idPaciente || !idInicio83 || !idInicio85 || !idInicioPMA || !idInicioGaston || !tipoUsuario) {
                throw new Error("Faltan parámetros requeridos.");
            }

            // Datos del paciente
            const resPaciente = await fetch(`../Controlador/obtenerTestsPaciente.php?id=${idPaciente}&tipo_usuario=${tipoUsuario}`, { credentials: "include" }).then(res => res.json());
            if (!resPaciente.exito) throw new Error(resPaciente.mensaje || "Error al obtener datos del paciente.");
            const paciente = resPaciente.paciente;
            if (!paciente || !paciente.nombre || !paciente.apellido || !paciente.sexo || !paciente.fecha_nacimiento) {
                throw new Error("Datos del paciente incompletos.");
            }

            // Calcular edad
            const fechaNac = new Date(paciente.fecha_nacimiento);
            if (isNaN(fechaNac)) throw new Error("Fecha de nacimiento inválida.");
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            if (hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
                edad--;
            }

            // Obtener resultados
            const [res83, res85, respma, resGaston] = await Promise.all([
                fetch(`../Controlador/obtenerResultadosCASM83General.php?id_inicio=${idInicio83}`, { credentials: "include" }).then(res => res.json()),
                fetch(`../Controlador/obtenerResultadosCASM85General.php?id_inicio=${idInicio85}`, { credentials: "include" }).then(res => res.json()),
                fetch(`../Controlador/obtenerResultadosPMAGeneral.php?id_inicio=${idInicioPMA}`, { credentials: "include" }).then(res => res.json()),
                fetch(`../Controlador/obtenerResultadosGastonGeneral.php?id_inicio=${idInicioGaston}`, { credentials: "include" }).then(res => res.json())
            ]);

            // Validar resultados
            if (!res83.exito || !Array.isArray(res83.resultados) || res83.resultados.length === 0) {
                throw new Error("No se encontraron resultados para CASM-83.");
            }
            if (!res85.exito || !Array.isArray(res85.resultados) || res85.resultados.length === 0) {
                throw new Error("No se encontraron resultados para CASM-85.");
            }
            if (!respma.exito || !respma.resultados || Object.keys(respma.resultados).length === 0) {
                throw new Error("No se encontraron resultados para PMA.");
            }
            if (!resGaston.exito || !resGaston.resultado || Object.keys(resGaston.resultado).length === 0) {
                throw new Error("No se encontraron resultados para Gastón.");
            }

            const resultado83 = res83.resultados;
            const resultado85 = res85.resultados;
            const resultadoPMA = respma.resultados;
            const resultadoGaston = resGaston.resultado;

            // Procesar resultados CASM-83
            const resultadosCategorias83 = {};
            res83.resultados.forEach(fila => {
                if (fila.categoria && typeof fila.total !== 'undefined' && typeof fila.count_a !== 'undefined' && typeof fila.count_b !== 'undefined') {
                    resultadosCategorias83[fila.categoria] = { total: fila.total, A: fila.count_a, B: fila.count_b };
                }
            });

            // Obtener análisis
            const [analisisRespuesta83, analisisRespuesta85, analisisRespuestaPMA, analisisConclusiones] = await Promise.all([
                fetch("../Controlador/analizarResultadosCASM83.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resultados: resultadosCategorias83, sexo: res83.resultados[0].sexo || "Desconocido" }),
                    credentials: "include"
                }).then(res => res.json()),
                fetch("../Controlador/analizarResultados.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resultados: res85.resultados }),
                    credentials: "include"
                }).then(res => res.json()),
                fetch("../Controlador/analizarResultadosPMA.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resultados: respma.resultados }),
                    credentials: "include"
                }).then(res => res.json()),
                fetch("../Controlador/analizarConclusiones.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        resultados83: res83.resultados,
                        resultados85: res85.resultados,
                        resultadosPMA: respma.resultados,
                        resultadoGaston: resGaston.resultado
                    }),
                    credentials: "include"
                }).then(res => res.json())
            ]);

            const analisis83 = analisisRespuesta83.exito ? analisisRespuesta83.analisis : "No hay análisis vinculados a este intento";
            const analisis85 = analisisRespuesta85.exito ? analisisRespuesta85.analisis : "No hay análisis vinculados a este intento";
            const analisisPMA = analisisRespuestaPMA.exito ? analisisRespuestaPMA.analisis : "No hay análisis vinculados a este intento";
            const conclusion = analisisConclusiones.exito ? analisisConclusiones.conclusion : "No se pudo generar la conclusión";
            const recomendaciones = analisisConclusiones.exito ? analisisConclusiones.recomendaciones : "No se pudieron generar las recomendaciones";

            // Obtener característica general para Gastón
            const tipoGaston = resultadoGaston.tipo_caracterologico || "Desconocido";
            const infoGaston = tiposCaracterologicos[tipoGaston] || {
                formula: "Desconocida",
                caracteristicasGenerales: "No disponible",
                aspectosPositivos: "No disponible",
                aspectosNegativos: "No disponible",
                normasAutoeducativas: "No disponible"
            };
            const caracteristicaGeneral = infoGaston.caracteristicasGenerales;

            // Definir rangos de percentiles para CASM-83 según sexo
            const rangosCASM83 = (res83.resultados[0].sexo === "Masculino" ? [
                ["CCFM", "0-4", "5-7", "8-9", "10-12", "14-15", "16-17", "18-22"],
                ["CCSS", "0-3", "4-6", "7-8", "9-12", "13-14", "15-16", "17-22"],
                ["CCNA", "0-4", "5-7", "8-9", "10-13", "14-15", "16-18", "19-22"],
                ["CCCO", "0-2", "3-4", "5-6", "7-10", "11-13", "14-17", "18-22"],
                ["ARTE", "0-2", "3-4", "5-6", "7-10", "11-14", "15-17", "18-22"],
                ["BURO", "0-3", "4-7", "5-6", "8-11", "15-16", "17-19", "20-22"],
                ["CCEP", "0-3", "3-5", "6", "8-12", "13-14", "15-17", "18-20"],
                ["HAA", "0-3", "3-4", "5-6", "8-9", "10-12", "13-15", "16-18"],
                ["FINA", "0-2", "3-4", "5-7", "8-10", "11-12", "14-16", "17-19"],
                ["LING", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-20"],
                ["JURI", "0-2", "3-4", "5-6", "7-10", "11-13", "14-16", "17-22"],
                ["VERA", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                ["CONS", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"]
            ] : [
                ["CCFM", "0-2", "3-4", "5-6", "7-11", "12-14", "15-17", "18-22"],
                ["CCSS", "0-4", "5-7", "8-9", "10-14", "15-16", "17-19", "20-22"],
                ["CCNA", "0-3", "4-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["CCCO", "0-2", "3-4", "5-6", "7-11", "12-13", "14-15", "16-18"],
                ["ARTE", "0-2", "3-4", "5-6", "7-10", "11-13", "14-16", "17-22"],
                ["BURO", "0-4", "5-7", "8-9", "10-14", "15-16", "17-19", "20-22"],
                ["CCEP", "0-2", "3-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["HAA", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                ["FINA", "0-2", "3-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["LING", "0-2", "3-5", "6-7", "8-12", "13-14", "15-17", "18-22"],
                ["JURI", "0-2", "3-4", "5-6", "7-11", "12-13", "14-16", "17-22"],
                ["VERA", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"],
                ["CONS", "0-2", "3-4", "5-6", "7-9", "10-12", "13-15", "16-22"]
            ]);

            // Crear tabla CASM-83
            const encabezadosCASM83 = ["", "Desinterés", "Bajo", "Promedio Bajo", "Indecisión", "Promedio Alto", "Alto", "Muy Alto", "Puntaje"];
            const percentilesCASM83 = ["1-14", "15-29", "30-39", "40-60", "61-74", "75-89", "90-99"];
            const tablaCASM83Rows = [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(res83.resultados[0].sexo || "Desconocido")],
                            columnSpan: 9,
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: encabezadosCASM83.map(h => new TableCell({
                        children: [new Paragraph(h)],
                        borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                    }))
                }),
                ...rangosCASM83.map(fila => {
                    const categoria = fila[0];
                    const puntaje = resultadosCategorias83[categoria]?.total || 0;
                    return new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph(categoria)],
                                borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                            }),
                            ...fila.slice(1).map(rango => {
                                const [min, max] = rango.split("-").map(Number);
                                const isHighlighted = puntaje >= min && puntaje <= max;
                                return new TableCell({
                                    children: [new Paragraph(rango)],
                                    borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } },
                                    shading: isHighlighted ? { fill: "FF0000" } : undefined
                                });
                            }),
                            new TableCell({
                                children: [new Paragraph(puntaje.toString())],
                                borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                            })
                        ]
                    });
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        ...percentilesCASM83.map(p => new TableCell({
                            children: [new Paragraph(p)],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("PERCENTILES")],
                            columnSpan: 9,
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                })
            ];

            // Crear tabla CASM-85
            const encabezadosCASM85 = ["Área", "Puntaje", "Categoría"];
            const tablaCASM85Rows = [
                new TableRow({
                    children: encabezadosCASM85.map(h => new TableCell({
                        children: [new Paragraph(h)],
                        borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                    }))
                }),
                ...res85.resultados.map(fila => new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(fila.area || "Desconocido")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((fila.puntaje ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph(fila.categoria || "Desconocido")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }))
            ];

            // Crear tabla PMA
            const encabezadosPMA = ["Factor", "Puntaje", "Máximo"];
            const tablaPMARows = [
                new TableRow({
                    children: encabezadosPMA.map(h => new TableCell({
                        children: [new Paragraph(h)],
                        borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                    }))
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Comprensión Verbal (V)")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((respma.resultados.factorV ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph("50")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Razonamiento Espacial (E)")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((respma.resultados.factorE ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph("20")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Razonamiento (R)")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((respma.resultados.factorR ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph("30")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Cálculo Numérico (N)")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((respma.resultados.factorN ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph("70")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Fluidez Verbal (F)")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((respma.resultados.factorF ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph("75")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Puntaje Total")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph((respma.resultados.puntajeTotal ?? 0).toString())],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        }),
                        new TableCell({
                            children: [new Paragraph("-")],
                            borders: { top: { style: BorderStyle.SINGLE }, bottom: { style: BorderStyle.SINGLE }, left: { style: BorderStyle.SINGLE }, right: { style: BorderStyle.SINGLE } }
                        })
                    ]
                })
            ];

            const tablaGastonVisual1 = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("Área")], columnSpan: 1, borders: {} }),
                            new TableCell({ children: [new Paragraph("Puntaje")], columnSpan: 1, borders: {} }),
                            new TableCell({ children: [new Paragraph("Tipo Caracterológico")], columnSpan: 1, borders: {} }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("Emotividad (1–10)")], borders: {} }),
                            new TableCell({ children: [new Paragraph((resGaston.resultado.emotividad ?? "").toString())], borders: {} }),
                            new TableCell({
                                children: [new Paragraph(resGaston.resultado.tipo_caracterologico ?? "")],
                                rowSpan: 3,
                                verticalAlign: "center",
                                borders: {}
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("Actividad (11–20)")], borders: {} }),
                            new TableCell({ children: [new Paragraph((resGaston.resultado.actividad ?? "").toString())], borders: {} }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("Resonancia S/P (21–30)")], borders: {} }),
                            new TableCell({ children: [new Paragraph((resGaston.resultado.resonancia ?? "").toString())], borders: {} }),
                        ]
                    })
                ],
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                }
            });

            const tablaGastonVisual2 = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("LECTURA POR FACTORES")], borders: {} }),
                            new TableCell({ children: [new Paragraph("FÓRMULA CARACTEROLOGICA")], borders: {} }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph(resGaston.resultado.lectura_factores ?? "")], borders: {} }),
                            new TableCell({ children: [new Paragraph(resGaston.resultado.formula_caracterologica ?? "")], borders: {} }),
                        ]
                    })
                ],
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                }
            });

            // Manejar imagen del encabezado
            let imageData = null;
            try {
                const response = await fetch("../Modelo/img/Encabezado.png");
                if (!response.ok) throw new Error("No se pudo cargar la imagen del encabezado.");
                imageData = await response.arrayBuffer();
            } catch (imgError) {
                console.warn("Error al cargar la imagen del encabezado:", imgError.message);
            }

            // Crear documento
            const doc = new Document({
                sections: [{
                    ...(imageData && {
                        headers: {
                            default: new Header({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new ImageRun({
                                                data: imageData,
                                                transformation: { width: 600, height: 100 }
                                            })
                                        ],
                                        alignment: AlignmentType.CENTER
                                    })
                                ]
                            })
                        }
                    }),
                    properties: {},
                    children: [
                        new Paragraph({
                            text: "Informe de Orientación Vocacional",
                            heading: HeadingLevel.HEADING_1,
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 }
                        }),
                        new Paragraph({
                            text: "I. Datos de Filiación",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph(`Nombres y Apellidos: ${paciente.nombre} ${paciente.apellido}`),
                        new Paragraph(`Edad: ${edad} años`),
                        new Paragraph(`Sexo: ${paciente.sexo}`),
                        new Paragraph(`Fecha de Informe: ${hoy.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`),
                        new Paragraph({
                            text: "II. Motivo de Consulta",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: "Completar los motivos de la consulta",
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: "III. Antecedentes",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: "Completar antecedentes",
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: "IV. Técnicas e Instrumentos Aplicados",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph("Técnicas aplicadas:"),
                        new Paragraph("- Observación"),
                        new Paragraph("- Entrevista psicológica"),
                        new Paragraph("Instrumentos aplicados:"),
                        new Paragraph("- Inventario de hábitos de estudio CASM-85"),
                        new Paragraph("- Inventario de intereses vocacionales CASM-83"),
                        new Paragraph("- Test de Aptitudes Mentales Primarias (PMA)"),
                        new Paragraph("- Test Gastón"),
                        new Paragraph({
                            text: "V. Resultados Obtenidos",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: "Hábitos de Estudio (CASM-85)",
                            heading: HeadingLevel.HEADING_3
                        }),
                        new Paragraph({
                            text: analisis85,
                            spacing: { after: 100 },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new Table({
                            rows: tablaCASM85Rows,
                            width: { size: "100%", type: WidthType.PERCENTAGE },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new Paragraph({
                            text: "Intereses Vocacionales y Ocupacionales (CASM-83)",
                            heading: HeadingLevel.HEADING_3,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: analisis83,
                            spacing: { after: 100 },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new Table({
                            rows: tablaCASM83Rows,
                            width: { size: "100%", type: WidthType.PERCENTAGE },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new Paragraph({
                            text: "Aptitudes Mentales Primarias (PMA)",
                            heading: HeadingLevel.HEADING_3,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: analisisPMA,
                            spacing: { after: 100 },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new Table({
                            rows: tablaPMARows,
                            width: { size: "100%", type: WidthType.PERCENTAGE }
                        }),
                        new Paragraph({
                            text: "Características de la Personalidad (Test Gastón)",
                            heading: HeadingLevel.HEADING_3,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: caracteristicaGeneral,
                            spacing: { after: 100 },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        tablaGastonVisual1,
                        new Paragraph({
                            text: "",
                            spacing: { after: 100 }
                        }),
                        tablaGastonVisual2,
                        new Paragraph({
                            text: "VI. Conclusión",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: conclusion,
                            spacing: { after: 100 },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new Paragraph({
                            text: "VII. Recomendaciones",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200 }
                        }),
                        new Paragraph({
                            text: recomendaciones,
                            spacing: { after: 100 },
                            alignment: AlignmentType.JUSTIFIED
                        })
                    ]
                }]
            });

            const blob = await Packer.toBlob(doc);
            if (typeof window.saveAs === "function") {
                window.saveAs(blob, `Informe_${paciente.nombre}_${paciente.apellido}.docx`);
            } else {
                console.warn("FileSaver.js no está disponible, usando fallback de descarga.");
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Informe_${paciente.nombre}_${paciente.apellido}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            loadingModal.style.display = 'none';
        } catch (error) {
            console.error("Error al generar el informe:", error);
            // Mostrar mensaje de error en el modal
            loadingMessage.textContent = `Error al generar el informe: ${error.message}`;
            loadingMessage.style.color = 'red';
            // Ocultar modal después de 3 segundos
            setTimeout(() => {
                loadingModal.style.display = 'none';
            }, 3000);
        }
    }

    function cargarResultadosGaston(idTest, container) {
        console.log("🧪 ID recibido para cargar Gastón:", idTest);
        container.innerHTML = `<p>Cargando resultados...</p>`;

        fetch(`../Controlador/obtenerResultadosGastonGeneral.php?id_inicio=${idTest}`, { credentials: "include" })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener resultados: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (!data.exito || !data.resultado) {
                    container.innerHTML = `<p>No se encontraron resultados para este test.</p>`;
                    return;
                }

                const r = data.resultado;
                const tipo = r.tipo_caracterologico;
                const info = tiposCaracterologicos[tipo] || {
                    formula: "Desconocida",
                    caracteristicasGenerales: "No disponible",
                    aspectosPositivos: "No disponible",
                    aspectosNegativos: "No disponible",
                    normasAutoeducativas: "No disponible"
                };

                const factores = [
                    r.emotividad >= (r.sexo.toLowerCase() === 'masculino' ? 48 : 51) ? 'Emotivo' : 'No Emotivo',
                    r.actividad >= 55 ? 'Activo' : 'No Activo',
                    r.resonancia >= 55 ? 'Secundario' : 'Primario'
                ];

                container.innerHTML = `
                    <div class="card-table" style="margin: 0; padding: 0; border: none;">
                        <div class="card-body" style="padding: 0;">
                            <h3>📋 Resultados del test Gastón</h3>
                            <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>Puntaje</th>
                                        <th>Tipo Caracterológico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Emotividad</td>
                                        <td>${r.emotividad}</td>
                                        <td rowspan="3">${r.tipo_caracterologico}</td>
                                    </tr>
                                    <tr>
                                        <td>Actividad</td>
                                        <td>${r.actividad}</td>
                                    </tr>
                                    <tr>
                                        <td>Resonancia</td>
                                        <td>${r.resonancia}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-top: 15px;">
                                <thead>
                                    <tr>
                                        <th>Lectura por Factores</th>
                                        <th>Fórmula Caracterológica</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${factores.join(', ')}</td>
                                        <td>${r.formula_caracterologica}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p><strong>Sexo:</strong> ${r.sexo}</p>
                            <div style="margin-top: 20px;">
                                <label for="selector-detalles">Detalles del tipo caracterológico:</label>
                                <select id="selector-detalles" class ="selector-detalles" style="margin-bottom: 10px;">
                                    <option value="caracteristicasGenerales">Características Generales</option>
                                    <option value="aspectosPositivos">Aspectos Tendenciales Positivos</option>
                                    <option value="aspectosNegativos">Aspectos Tendenciales Negativos</option>
                                    <option value="normasAutoeducativas">Normas Autoeducativas</option>
                                </select>
                                <div id="detalles-contenido">${info.caracteristicasGenerales}</div>
                            </div>
                        </div>
                    </div>
                `;

                const selectorDetalles = container.querySelector("#selector-detalles");
                const detallesContenido = container.querySelector("#detalles-contenido");
                selectorDetalles.addEventListener("change", () => {
                    detallesContenido.innerHTML = info[selectorDetalles.value];
                });
            })
            .catch(error => {
                console.error("Error al cargar resultados del test Gastón:", error);
                container.innerHTML = `<p>Error al cargar resultados: ${error.message}</p>`;
            });
    }

    function cargarResultadosPMA(idTest, container) {
        container.innerHTML = `<p>Cargando resultados...</p>`;

        fetch(`../Controlador/obtenerResultadosPMAGeneral.php?id_inicio=${idTest}`, { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar resultados: " + res.status);
                return res.json();
            })
            .then(data => {
                console.log("✅ Datos recibidos del backend:", data);
                if (!data.exito) {
                    container.innerHTML = `<p>Error: ${data.mensaje || "No se pudieron cargar los resultados"}</p>`;
                    return;
                }

                const resultados = data.resultados;
                if (!resultados) {
                    container.innerHTML = `<p>Error: No se encontraron resultados para el test seleccionado</p>`;
                    return;
                }

                container.innerHTML = `
                    <div class="card-table" style="margin: 0; padding: 0; border: none;">
                        <div class="card-body" style="padding: 0;">
                            <h3>📊 Resultados del Test PMA</h3>
                            <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                <thead>
                                    <tr>
                                        <th>Factor</th>
                                        <th>Puntaje</th>
                                        <th>Máximo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Comprensión Verbal (V)</td><td>${resultados.factorV}</td><td>50</td></tr>
                                    <tr><td>Razonamiento Espacial (E)</td><td>${resultados.factorE}</td><td>20</td></tr>
                                    <tr><td>Razonamiento (R)</td><td>${resultados.factorR}</td><td>30</td></tr>
                                    <tr><td>Cálculo Numérico (N)</td><td>${resultados.factorN}</td><td>70</td></tr>
                                    <tr><td>Fluidez Verbal (F)</td><td>${resultados.factorF}</td><td>75</td></tr>
                                    <tr><td><strong>Puntaje Total</strong></td><td><strong>${parseFloat(resultados.puntajeTotal).toFixed(2)}</strong></td><td>-</td></tr>
                                </tbody>
                            </table>
                            <p><strong>Fecha:</strong> ${resultados.fecha}</p>
                            <p><strong>Análisis:</strong> <span id="analisis-pma" class="loading">Cargando análisis...</span></p>
                        </div>
                    </div>
                `;

                // Redondear puntajeTotal a 2 decimales
                const resultadosRedondeados = {
                    ...resultados,
                    puntajeTotal: Number(parseFloat(resultados.puntajeTotal).toFixed(2))
                };

                // Cargar análisis
                fetch("../Controlador/analizarResultadosPMA.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resultados: resultadosRedondeados })
                })
                    .then(res => res.json())
                    .then(analisisData => {
                        const analisisSpan = container.querySelector("#analisis-pma");
                        if (analisisData.exito) {
                            analisisSpan.innerHTML = analisisData.analisis;
                        } else {
                            analisisSpan.innerHTML = `Error: ${analisisData.mensaje || "No se pudo obtener el análisis"}`;
                        }
                    })
                    .catch(err => {
                        container.querySelector("#analisis-pma").innerHTML = `Error al cargar análisis: ${err.message}`;
                    });
            })
            .catch(err => {
                container.innerHTML = `<p>Error al cargar resultados: ${err.message}</p>`;
            });
    }

    function cargarResultadosCASM83(idInicio, contenedor) {
        contenedor.innerHTML = "<p>Cargando resultados...</p>";

        fetch(`../Controlador/obtenerResultadosCASM83General.php?id_inicio=${idInicio}`, { credentials: "include" })
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    const resultados = data.resultados;
                    contenedor.innerHTML = "";

                    if (resultados.length !== 13) {
                        contenedor.innerHTML = `<p>Error: El test seleccionado tiene ${resultados.length} registros en lugar de 13.</p>`;
                        return;
                    }

                    const sexo = resultados[0].sexo;
                    const resultadosCategorias = {};
                    resultados.forEach(fila => {
                        resultadosCategorias[fila.categoria] = {
                            total: fila.total,
                            A: fila.count_a,
                            B: fila.count_b
                        };
                    });

                    const index = idInicio; // Usamos idInicio como índice único
                    const veracidadMessage = evaluarVeracidad(resultadosCategorias);
                    const consistenciaMessage = evaluarConsistencia(resultadosCategorias);
                    const mostrarAnalisis = veracidadMessage.conteo <= 5 && consistenciaMessage.inconsistencias <= 5;

                    const tablaHTML = generarTablaCASM83(resultadosCategorias, sexo, index, mostrarAnalisis);
                    contenedor.innerHTML = tablaHTML;

                    setTimeout(() => {
                        const contenedorTabla = contenedor.querySelector('.contenedor-tabla');
                        if (contenedorTabla) {
                            requestAnimationFrame(() => dibujarPuntos(resultadosCategorias, index, contenedor));
                            if (mostrarAnalisis) {
                                enviarSolicitudConReintentosCASM83(resultadosCategorias, sexo, index);
                            }
                        }
                    }, 0);

                    const actualizarGrafico = debounce(() => {
                        const contenedorTabla = contenedor.querySelector('.contenedor-tabla');
                        if (contenedorTabla) {
                            requestAnimationFrame(() => dibujarPuntos(resultadosCategorias, index, contenedor));
                        }
                    }, 100);

                    window.removeEventListener('resize', window.currentResizeListenerCASM83);
                    window.currentResizeListenerCASM83 = actualizarGrafico;
                    window.addEventListener('resize', actualizarGrafico);
                } else {
                    contenedor.innerHTML = `<p>Error: ${data.mensaje}</p>`;
                }
            })
            .catch(error => {
                console.error("Error al obtener resultados CASM-83:", error);
                contenedor.innerHTML = `<p>Ocurrió un error al obtener los resultados: ${error.message}</p>`;
            });
    }

    function evaluarVeracidad(resultadosCategorias) {
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

        return {
            conteo: conteoVeracidadA,
            message: `
                <p><strong>${conteoVeracidadA > 5 ? '❌ No se cumple la veracidad' : '✅ Se cumple la veracidad'}:</strong> 
                ${conteoVeracidadA > 5 
                    ? `Se marcaron ${conteoVeracidadA} opciones "A" en las preguntas de veracidad. Respuestas poco relevantes.` 
                    : `Se marcaron ${conteoVeracidadA} opciones "A" en las preguntas de veracidad. Las respuestas son coherentes.`}</p>
            `
        };
    }

    function evaluarConsistencia(resultadosCategorias) {
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

        return {
            inconsistencias: inconsistencias,
            message: `
                <p><strong>${inconsistencias > 5 ? '❌ No se cumple la consistencia' : '✅ Se cumple la consistencia'}:</strong> 
                ${inconsistencias > 5 
                    ? `Se detectaron ${inconsistencias} inconsistencias. Revisa las respuestas.` 
                    : `Se detectaron ${inconsistencias} inconsistencias. Las respuestas son consistentes.`}</p>
            `
        };
    }

    function generarTablaCASM83(resultadosCategorias, sexo, index, mostrarAnalisis) {
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
            <div class="card-table" style="margin: 0; padding: 0; border: none;">
                <div class="card-body" style="padding: 0;">
                    <h3 class="card-title" style="margin: 10px 0;">📈 Resultados del test (${sexo})</h3>
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
                    ${evaluarVeracidad(resultadosCategorias).message}
                    ${evaluarConsistencia(resultadosCategorias).message}
                    ${mostrarAnalisis 
                        ? `<p><strong>Análisis de resultados:</strong> <span id="analisis-casm83-${index}" class="loading">Cargando análisis...</span></p>`
                        : `<p><strong>⚠️ Análisis no disponible:</strong> Los resultados no cumplen los criterios de veracidad o consistencia.</p>`}
                </div>
            </div>
        `;
    }

    function cargarResultadosCASM85(idInicio, contenedor) {
        contenedor.innerHTML = "<p>Cargando resultados...</p>";

        fetch(`../Controlador/obtenerResultadosCASM85General.php?id_inicio=${idInicio}`, { credentials: "include" })
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    const resultados = data.resultados;
                    contenedor.innerHTML = "";

                    if (resultados.length === 0) {
                        contenedor.innerHTML = "<p>No se encontraron resultados para este test.</p>";
                        return;
                    }

                    let tabla = `
                        <div class="card-table" style="margin: 0; padding: 0; border: none;">
                            <div class="card-body" style="padding: 0;">
                                <h3>📈 Resultados del test</h3>
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
                    resultados.forEach(fila => {
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
                                <p><strong>Análisis de resultados:</strong> <span id="analisis-casm85" class="loading">Cargando análisis</span></p>
                            </div>
                        </div>
                    `;
                    contenedor.innerHTML = tabla;

                    enviarSolicitudAnalisisCASM85(resultados, 0);
                } else {
                    contenedor.innerHTML = `<p>Error: ${data.mensaje}</p>`;
                }
            })
            .catch(error => {
                console.error("Error al obtener resultados:", error);
                contenedor.innerHTML = `<p>Ocurrió un error al obtener los resultados: ${error.message}</p>`;
            });
    }

    function enviarSolicitudAnalisisCASM85(grupo, index) {
        const analisisSpan = document.getElementById("analisis-casm85");
        if (!analisisSpan) {
            console.error("No se encontró el elemento analisis-casm85 en el DOM");
            return;
        }

        const enviarConReintentos = async (intentos = 3, esperaInicial = 1000) => {
            try {
                const response = await fetch("../Controlador/analizarResultados.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resultados: grupo })
                });
                const data = await response.json();
                if (data.exito) {
                    analisisSpan.innerHTML = data.analisis;
                } else if (data.mensaje.includes("Límite de solicitudes alcanzado") && intentos > 0) {
                    await new Promise(resolve => setTimeout(resolve, esperaInicial));
                    return enviarConReintentos(intentos - 1, esperaInicial * 2);
                } else {
                    analisisSpan.innerHTML = `Error: ${data.mensaje}`;
                }
            } catch (error) {
                console.error("Error al obtener análisis:", error);
                analisisSpan.innerHTML = `Error al obtener el análisis: ${error.message}`;
            }
        };

        enviarConReintentos();
    }

    function eliminarTestCASM83(idInicio, idPaciente, casm83Section) {
        fetch(`../Controlador/eliminarTest.php?id_inicio=${idInicio}&tipo_test=casm83`, {
            method: "POST",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    alert(data.mensaje);
                    verPaciente(idPaciente);
                } else {
                    alert(`Error al eliminar el test: ${data.mensaje}`);
                }
            })
            .catch(error => {
                console.error("Error al eliminar el test CASM-83:", error);
                alert("Ocurrió un error al eliminar el test.");
            });
    }

    function eliminarTestCASM85(idInicio, idPaciente, casm85Section) {
        fetch(`../Controlador/eliminarTest.php?id_inicio=${idInicio}&tipo_test=casm85`, {
            method: "POST",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    alert(data.mensaje);
                    verPaciente(idPaciente);
                } else {
                    alert(`Error al eliminar el test: ${data.mensaje}`);
                }
            })
            .catch(error => {
                console.error("Error al eliminar el test CASM-85:", error);
                alert("Ocurrió un error al eliminar el test.");
            });
    }

    function eliminarTestPMA(idInicio, idPaciente, pmaSection) {
        fetch(`../Controlador/eliminarTest.php?id_inicio=${idInicio}&tipo_test=pma`, {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                alert(data.mensaje);
                verPaciente(idPaciente);
            } else {
                alert(`Error al eliminar el test PMA: ${data.mensaje}`);
            }
        })
        .catch(error => {
            console.error("Error al eliminar el test PMA:", error);
            alert("Ocurrió un error al eliminar el test.");
        });
    }

    function eliminarTestGaston(idInicio, idPaciente, gastonSection) {
        fetch(`../Controlador/eliminarTest.php?id_inicio=${idInicio}&tipo_test=gaston`, {
            method: "POST",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                alert(data.mensaje);
                verPaciente(idPaciente);
            } else {
                alert(`Error al eliminar el test Gastón: ${data.mensaje}`);
            }
        })
        .catch(error => {
            console.error("Error al eliminar el test Gastón:", error);
            alert("Ocurrió un error al eliminar el test.");
        });
    }

    function generarCodigoInvitacion() {
        const mensaje = document.createElement("div");
        mensaje.id = "mensaje-generacion";
        mensaje.textContent = "Generando código...";
        const codigosContainer = document.getElementById("codigos-container") || contenido;
        codigosContainer.appendChild(mensaje);

        fetch("../Controlador/generarCodigo.php", {
            method: "POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            mensaje.remove();

            if (data.exito) {
                alert("Código generado: " + data.codigo);
                mostrandoCodigos = true;
                verCodigosGenerados();
                const btnVerCodigos = document.getElementById("btn-ver-codigos");
                if (btnVerCodigos) btnVerCodigos.textContent = "Ocultar";
            } else {
                alert("Error al generar el código: " + data.error);
            }
        })
        .catch(err => {
            mensaje.remove();
            console.error("Error al generar código:", err);
            alert("Error en la respuesta del servidor.");
        });
    }

    function verCodigosGenerados() {
        const codigosContainer = document.getElementById("codigos-container");
        if (!codigosContainer) {
            console.error("Contenedor de códigos no encontrado.");
            return;
        }

        codigosContainer.innerHTML = "<p>Cargando códigos...</p>";

        fetch("../Controlador/verCodigos.php", {
            method: "POST",
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error en la respuesta del servidor: ${res.status}`);
            }
            return res.text();
        })
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (!data.exito) {
                    codigosContainer.innerHTML = `<p>Error: ${data.error}</p>`;
                    return;
                }

                if (data.codigos.length === 0) {
                    codigosContainer.innerHTML = "<p>No has generado códigos aún.</p>";
                    return;
                }

                // Elementos de búsqueda
                let html = `
                    <div class="filtros-codigos">
                        <label for="busqueda-codigo"><strong>Buscar código:</strong></label>
                        <input type="text" id="busqueda-codigo" placeholder="Nombre o código...">

                        <label for="filtro-estado"><strong>Filtrar por estado:</strong></label>
                        <select id="filtro-estado">
                            <option value="">Todos</option>
                            <option value="Disponible">Disponible</option>
                            <option value="Usado">Usado</option>
                            <option value="Expirado">Expirado</option>
                        </select>
                    </div>
                    <div class="cards-codigos" id="lista-codigos"></div>
                `;

                codigosContainer.innerHTML = html;

                const lista = document.getElementById("lista-codigos");

                function renderizarCodigos(filtroTexto = "", filtroEstado = "") {
                    lista.innerHTML = "";
                    data.codigos.forEach(c => {
                        let estado = c.expirado
                            ? "Expirado"
                            : c.usado
                                ? "Usado"
                                : "Disponible";

                        if (
                            (filtroEstado && estado !== filtroEstado) ||
                            (filtroTexto &&
                                !c.codigo.toLowerCase().includes(filtroTexto) &&
                                (!c.usuario_asignado || !c.usuario_asignado.toLowerCase().includes(filtroTexto)))
                        ) {
                            return; // Saltar este código si no coincide
                        }

                        let clase = c.expirado
                            ? "expirado"
                            : c.usado
                                ? "usado"
                                : "disponible";

                        lista.innerHTML += `
                            <div class="card-codigo ${clase}">
                                <h3>${c.codigo}</h3>
                                <p><strong>Estado:</strong> ${estado}</p>
                                <p><strong>Fecha de creación:</strong> ${c.fecha_creacion}</p>
                                <p><strong>Vence:</strong> ${c.fecha_expiracion}</p>
                                ${c.usuario_asignado ? `<p><strong>Usuario:</strong> ${c.usuario_asignado}</p>` : ""}
                                <button onclick="eliminarCodigo(${c.id})" class="btn-eliminar">Eliminar</button>
                            </div>
                        `;
                    });

                    if (lista.innerHTML === "") {
                        lista.innerHTML = "<p>No hay códigos que coincidan con la búsqueda.</p>";
                    }
                }

                // Inicial
                renderizarCodigos();

                // Eventos de filtro
                const inputBusqueda = document.getElementById("busqueda-codigo");
                const selectEstado = document.getElementById("filtro-estado");

                inputBusqueda.addEventListener("input", () => {
                    renderizarCodigos(inputBusqueda.value.trim().toLowerCase(), selectEstado.value);
                });

                selectEstado.addEventListener("change", () => {
                    renderizarCodigos(inputBusqueda.value.trim().toLowerCase(), selectEstado.value);
                });

            } catch (e) {
                console.error("Error al analizar JSON:", e, "Respuesta:", text);
                codigosContainer.innerHTML = "<p>Error al cargar los códigos generados.</p>";
            }
        })
        .catch(err => {
            console.error("Error al obtener códigos:", err);
            codigosContainer.innerHTML = "<p>Error al cargar los códigos generados.</p>";
        });
    }

    window.eliminarCodigo = function(idCodigo) {
        if (!confirm("¿Estás seguro de que quieres eliminar este código?")) return;

        fetch("../Controlador/eliminarCodigo.php", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: idCodigo })
        })
        .then(res => res.json())
        .then(data => {
            if (data.exito) {
                alert("Código eliminado correctamente.");
                verCodigosGenerados();
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(err => {
            console.error("Error al eliminar el código:", err);
            alert("Ocurrió un error inesperado.");
        });
    }
});