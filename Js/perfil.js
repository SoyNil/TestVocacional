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
                <input type="text" id="nombre_usuario" name="nombre_usuario"><br>
    
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre"><br>
    
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido"><br>
    
                <label for="correo">Correo:</label>
                <input type="email" id="correo" name="correo"><br>
    
                <label for="contraseña">Contraseña:</label>
                <input type="password" id="contraseña" name="contraseña"><br>
    
                <label for="sexo">Sexo:</label>
                <select id="sexo" name="sexo">
                    <option value="">Selecciona tu sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select><br>
    
                <label for="fecha_nacimiento">Fecha de nacimiento:</label>
                <input type="date" id="fecha_nacimiento" name="fecha_nacimiento"><br>
    
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

    // Resultados de los tests
    document.getElementById("testCASM85Btn").addEventListener("click", () => {
        fetch("../Controlador/obtenerResultadosCASM85.php")
            .then(response => response.json())
            .then(data => {
                if (data.exito) {
                    const resultados = data.resultados;
                    const contenedor = document.getElementById("resultados");
                    contenedor.innerHTML = "<h3>Resultados del Test CASM85:</h3>";
    
                    if (resultados.length === 0) {
                        contenedor.innerHTML += "<p>No se encontraron resultados.</p>";
                        return;
                    }
    
                    // Dividir en bloques de 5
                    const grupos = [];
                    for (let i = 0; i < resultados.length; i += 5) {
                        grupos.push(resultados.slice(i, i + 5));
                    }
    
                    // Mostrar cada grupo como una tabla
                    grupos.forEach((grupo, index) => {
                        let tabla = `
                            <h4>Resultados ${index * 5 + 1} - ${index * 5 + grupo.length}</h4>
                            <table border="1" cellpadding="5" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>Puntaje</th>
                                        <th>Categoría</th>
                                        <th>Fecha</th>
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
                                    <td>${fila.fecha}</td>
                                </tr>
                            `;
                        });
                        tabla += `
                                </tbody>
                            </table><br/>
                        `;
                        contenedor.innerHTML += tabla;
                    });
                } else {
                    document.getElementById("resultados").innerHTML = "<p>Error: " + data.mensaje + "</p>";
                }
            })
            .catch(error => {
                console.error("Error al obtener resultados:", error);
                document.getElementById("resultados").innerHTML = "<p>Ocurrió un error al obtener los resultados.</p>";
            });
    });    

    document.getElementById("testCASM83Btn").addEventListener("click", () => {
        document.getElementById("resultados").innerHTML = "<p>Resultados del Test CASM83:</p><p>...Aquí se mostrarían los resultados...</p>";
    });
});
