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
        fetch("../Controlador/preguntas.json") // Carga el archivo JSON
            .then(response => response.json()) // Convierte la respuesta en JSON
            .then(data => {
                let cuestionarioHTML = "";
                let tablaCuestionario = document.querySelector("#tablaCuestionario tbody");
    
                // Verificamos que el JSON tenga secciones
                if (!data.secciones) {
                    console.error("El JSON no tiene la estructura esperada");
                    return;
                }
    
                // Variable para mantener la numeración continua
                let preguntaNumero = 1;
    
                // Función para convertir números a romanos
                function toRoman(num) {
                    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
                    return romanNumerals[num - 1] || num;
                }
    
                // Iterar sobre cada sección
                data.secciones.forEach((seccion, sectionIndex) => {
                    // Agregar la fila de título de la sección
                    let numeroRomano = toRoman(sectionIndex + 1); // Convertir a número romano
                    cuestionarioHTML += `
                        <thead>
                            <tr>
                                <th>${numeroRomano}</th>
                                <th>${seccion.titulo}</th>
                                <th>SIEMPRE</th>
                                <th>NUNCA</th>
                            </tr>
                        </thead>
                    `;
    
                    // Agregar las preguntas de la sección
                    cuestionarioHTML += `<tbody>`; // Abrimos el tbody para las preguntas
    
                    seccion.preguntas.forEach(() => {
                        cuestionarioHTML += `
                            <tr>
                                <td>${preguntaNumero}</td>
                                <td style="text-align: left;">Pregunta</td>
                                <td><input type="radio" name="pregunta${preguntaNumero}" value="siempre"></td>
                                <td><input type="radio" name="pregunta${preguntaNumero}" value="nunca"></td>
                            </tr>
                        `;
                        preguntaNumero++; // Incrementar el número de la pregunta para que sea continuo
                    });
    
                    cuestionarioHTML += `</tbody>`; // Cerramos el tbody después de las preguntas
                });
    
                // Insertar en la tabla
                tablaCuestionario.innerHTML = cuestionarioHTML;
            })
            .catch(error => console.error("Error al cargar las preguntas:", error));
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
