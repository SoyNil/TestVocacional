document.addEventListener("DOMContentLoaded", function () {
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

            const imgElement = document.getElementById("foto-perfil");
            const nombreElement = document.getElementById("profile-name");

            // Agregar timestamp para evitar caché
            const fotoPerfil = data.foto_perfil && data.foto_perfil.trim() !== ""
                ? `${data.foto_perfil}?t=${new Date().getTime()}`
                : "https://cdn-icons-png.flaticon.com/512/847/847969.png";

            console.log("Intentando cargar imagen:", fotoPerfil); // Depuración
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

    cerrarSesionBtn.addEventListener("click", () => {
        window.location.href = "../Controlador/logout.php";
    });

    const inputFoto = document.getElementById("input-foto");
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
                    // Agregar timestamp para evitar caché
                    document.getElementById("foto-perfil").src = `${data.nueva_ruta}?t=${new Date().getTime()}`;
                    console.log("Imagen actualizada:", data.nueva_ruta); // Depuración
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
});