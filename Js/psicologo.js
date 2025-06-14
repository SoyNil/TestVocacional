document.addEventListener("DOMContentLoaded", function () {
    let intervaloReloj = null;
    let mostrandoCodigos = false;

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

            const imgElement = document.getElementById("foto-perfil");
            const nombreElement = document.getElementById("profile-name");

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
        } catch (e) {
            console.error("Error al parsear JSON:", e, "Respuesta:", text);
            window.location.href = "../Vista/login.html";
        }
    })
    .catch(error => {
        console.error("Error al verificar la sesión:", error);
        window.location.href = "../Vista/login.html";
    });

    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", () => {
            window.location.href = "../Controlador/logout.php";
        });
    }

    const inputFoto = document.getElementById("input-foto");
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

    const btnInicio = document.getElementById("btn-inicio");
    const btnPacientes = document.getElementById("btn-pacientes");
    const contenido = document.getElementById("contenido");

    // Manejador de eventos para botones
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

    function mostrarPacientes() {
        if (intervaloReloj) {
            clearInterval(intervaloReloj);
            intervaloReloj = null;
        }

        contenido.innerHTML = `<h2>Lista de Pacientes</h2><div id="lista-pacientes">Cargando...</div>`;

        fetch("../Controlador/obtenerUsuarios.php", { credentials: "include" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error en la respuesta del servidor: " + res.status);
                }
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
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Sexo</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.usuarios.map(user => `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.nombre_usuario}</td>
                                    <td>${user.nombre}</td>
                                    <td>${user.apellido}</td>
                                    <td>${user.correo}</td>
                                    <td>${user.sexo}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    `;

                    const lista = document.getElementById("lista-pacientes");
                    lista.innerHTML = "";
                    lista.appendChild(tabla);
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

    // Configurar eventos de navegación
    if (btnInicio) {
        btnInicio.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarContenidoInicio();
        });
    }

    if (btnPacientes) {
        btnPacientes.addEventListener("click", () => {
            mostrandoCodigos = false;
            mostrarPacientes();
        });
    }

    // Manejador alternativo para nav-btn (si usas clase .nav-btn)
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const texto = btn.textContent.trim();
            if (texto === "Inicio") {
                mostrandoCodigos = false;
                mostrarContenidoInicio();
            } else if (texto === "Pacientes") {
                mostrandoCodigos = false;
                mostrarPacientes();
            }
        });
    });

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

    // Inicializar la página
    mostrarContenidoInicio();
});