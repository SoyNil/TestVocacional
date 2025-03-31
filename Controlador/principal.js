document.addEventListener("DOMContentLoaded", function () {
    const btnApoyoVocacional = document.getElementById("btnApoyoVocacional");
    const modal = document.getElementById("contenidoAjax");
    const tabButtons = document.querySelectorAll(".tab-button");
    const contenidoTab = document.getElementById("contenidoTab");

    btnApoyoVocacional.addEventListener("click", function (e) {
        e.preventDefault();
        if (modal.classList.contains("show")) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        } else {
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const contentType = this.getAttribute("data-content");
            cargarContenido(contentType);
        });
    });

    function cargarContenido(tipo) {
        let contenido = "";
        switch (tipo) {
            case "test":
                contenido = "<h2>Test Psicológico</h2><button style=\"background-color: #007BFF; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s;\" onmouseover=\"this.style.backgroundColor='#0056b3'\" onmouseout=\"this.style.backgroundColor='#007BFF'\" onclick=\"window.location.href='testinventario.html'\">INVENTARIO DE HÁBITOS DE ESTUDIO CASM-85-R 2005</button>";
                break;
            case "consejos":
                contenido = "<h2>Consejos</h2><p>Algunos consejos para elegir una carrera profesional adecuada.</p>";
                break;
            case "orientacion":
                contenido = "<h2>Orientación Vocacional</h2><p>Información sobre orientación vocacional y cómo puede ayudarte.</p>";
                break;
        }
        contenidoTab.innerHTML = contenido;
    }
});