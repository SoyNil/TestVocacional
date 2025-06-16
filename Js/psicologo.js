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

                // Mostrar botón "Crear Psicólogos" solo para admin
                if (data.jerarquia === 'admin' && btnCrearPsicologos) {
                    btnCrearPsicologos.style.display = "block";
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

        contenido.innerHTML = `<h2>Lista de Pacientes</h2><div id="lista-pacientes">Cargando...</div>`;

        fetch("../Controlador/obtenerUsuarios.php", { credentials: "include" })
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
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.usuarios.map(user => `
                                <tr>
                                    <td>${user.nombre_usuario}</td>
                                    <td>${user.nombre}</td>
                                    <td>${user.apellido}</td>
                                    <td>${user.correo}</td>
                                    <td>
                                        <button class="btn-ver-paciente" data-id="${user.id}" title="Ver paciente">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-eliminar-usuario" data-id="${user.id}" title="Eliminar usuario">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    `;

                    const lista = document.getElementById("lista-pacientes");
                    lista.innerHTML = "";
                    lista.appendChild(tabla);

                    // Evento para "Ver paciente"
                    document.querySelectorAll(".btn-ver-paciente").forEach(boton => {
                        boton.addEventListener("click", () => {
                            const idPaciente = boton.getAttribute("data-id");
                            verPaciente(idPaciente);
                        });
                    });

                    // Evento para "Eliminar usuario"
                    document.querySelectorAll(".btn-eliminar-usuario").forEach(boton => {
                        boton.addEventListener("click", () => {
                            const idUsuario = boton.getAttribute("data-id");
                            if (confirm(`¿Estás seguro de eliminar al usuario con ID ${idUsuario}? Esta acción eliminará su cuenta, tests y análisis asociados.`)) {
                                fetch(`../Controlador/eliminarUsuario.php?id_usuario=${idUsuario}`, {
                                    method: "GET",
                                    credentials: "include"
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.exito) {
                                            alert("Usuario eliminado correctamente.");
                                            mostrarPacientes(); // Refrescar la tabla
                                        } else {
                                            alert(`Error: ${data.mensaje}`);
                                        }
                                    })
                                    .catch(err => {
                                        console.error("Error al eliminar usuario:", err);
                                        alert("Error al eliminar usuario.");
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

    function verPaciente(idPaciente) {
        contenido.innerHTML = `<h2>Detalles del Paciente</h2><div id="detalles-paciente">Cargando...</div>`;

        fetch(`../Controlador/obtenerTestsPaciente.php?id=${idPaciente}`, { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor: " + res.status);
                return res.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
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
                        <p><strong>Fecha de Nacimiento:</strong> ${paciente.fecha_nacimiento}</p>
                        <p><strong>Tipo de Cuenta:</strong> ${paciente.tipo_cuenta}</p>
                    `;
                    detalles.appendChild(infoPaciente);

                    const volverBtn = document.createElement("button");
                    volverBtn.classList.add("btn-volver");
                    volverBtn.textContent = "Volver a la lista de pacientes";
                    volverBtn.addEventListener("click", () => mostrarPacientes());
                    detalles.appendChild(volverBtn);

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

                    detalles.appendChild(testsContainer);
                } catch (e) {
                    console.error("Error al parsear JSON:", e, "Respuesta:", text);
                    document.getElementById("detalles-paciente").innerHTML = `<p>Error al cargar detalles del paciente.</p>`;
                }
            })
            .catch(err => {
                document.getElementById("detalles-paciente").innerHTML = `<p>Error al cargar detalles del paciente.</p>`;
                console.error("Error al obtener detalles del paciente:", err);
            });
    }

    function cargarResultadosCASM83(idInicio, contenedor) {
        contenedor.innerHTML = "<p>Cargando resultados...</p>";

        fetch(`../Controlador/obtenerResultadosCASM83PorTest.php?id_inicio=${idInicio}`, { credentials: "include" })
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

        fetch(`../Controlador/obtenerResultadosCASM85PorTest.php?id_inicio=${idInicio}`, { credentials: "include" })
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
        fetch(`../Controlador/eliminarTestCASM83.php?id_inicio=${idInicio}`, { 
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
                console.error("Error al eliminar el test:", error);
                alert("Ocurrió un error al eliminar el test.");
            });
    }

    function eliminarTestCASM85(idInicio, idPaciente, casm85Section) {
        fetch(`../Controlador/eliminarTestCASM85.php?id_inicio=${idInicio}`, { 
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
                console.error("Error al eliminar el test:", error);
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