document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const cuestionarioContainer = document.getElementById("cuestionario"); // Cambié mainContainer a cuestionario
    const formContainer = form.closest('.container'); // Para ocultar todo el contenedor del formulario

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
                if (cuestionarioContainer) { // Verifica que cuestionarioContainer exista
                    // Ocultar el formulario de entrada
                    formContainer.style.display = "none";

                    // Mostrar el cuestionario
                    cargarCuestionario();
                    cuestionarioContainer.style.display = "block"; // Asegúrate de mostrar el cuestionario
                } else {
                    console.error("Elemento #cuestionario no encontrado");
                }
            }
        });
    }

    function cargarCuestionario() {
        let cuestionarioHTML = "";
        const preguntas = [
            "Leo todo lo que tengo que estudiar subrayando los puntos más importantes",
            "Subrayo las palabras cuyo significado no sé",
            "Regreso a los puntos subrayados con el propósito de aclararlo",
            "Busco de inmediato en el diccionario el significado de las palabras que no sé",
            "Me hago preguntas y me respondo en mi propio lenguaje lo que he comprendido",
            "Luego escribo en mi propio lenguaje lo que he comprendido",
            "Doy una leída parte por parte y repito varias veces hasta recitarlo de memoria",
            "Trato de memorizar todo lo que estudio",
            "Repaso lo que he estudiado después de 4 a 8 horas",
            "Me limito a dar una leída general a todo lo que tengo que estudiar",
            "Trato de relacionar el tema que estoy estudiando con otros temas ya estudiados",
            "Estudio sólo para los exámenes"
        ];

        // Sección en romanos
        let seccionRomano = "I";
        
        // Agregar la fila de encabezado
        cuestionarioHTML += `
            <tr>
                <td>${seccionRomano}</td>
                <td>¿Cómo estudia usted?</td>
                <td>SIEMPRE</td>
                <td>NUNCA</td>
            </tr>
        `;

        // Generar preguntas dinámicamente
        preguntas.forEach((pregunta, index) => {
            cuestionarioHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${pregunta}</td>
                    <td><input type="radio" name="pregunta${index + 1}" value="siempre"></td>
                    <td><input type="radio" name="pregunta${index + 1}" value="nunca"></td>
                </tr>
            `;
        });

        // Insertar las preguntas generadas en el cuerpo de la tabla
        const tablaCuestionario = document.getElementById("tablaCuestionario").getElementsByTagName("tbody")[0];
        tablaCuestionario.innerHTML = cuestionarioHTML;
    }

    // Función para mostrar los resultados (aquí puedes procesar las respuestas del cuestionario)
    function mostrarResultados() {
        let resultadosHTML = "<p>Estos son los resultados:</p>";
        resultadosHTML += "<ul>";

        const inputs = formCuestionario.querySelectorAll("input[type='text']");
        inputs.forEach(input => {
            resultadosHTML += `<li>Pregunta: ${input.placeholder} - Respuesta: ${input.value}</li>`;
        });

        resultadosHTML += "</ul>";

        const resultadosContenido = document.querySelector("#resultadosContenido");
        resultadosContenido.innerHTML = resultadosHTML;
    }
});
