function toggleTachado(checkbox) {
  const span = checkbox.nextElementSibling;
  span.classList.toggle("tachado", checkbox.checked);
}

document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.getElementById("tablaCuestionario");
  const resultados = document.getElementById("resultado"); // Elemento donde se mostrarán los resultados
  const puntos = {
      "CCFM": 0,
      "CCSS": 0,
      "CCNA": 0,
      "CCCO": 0,
      "ARTE": 0,
      "BURO": 0,
      "CCEP": 0,
      "IIAA": 0,
      "FINA": 0,
      "LING": 0,
      "JURI": 0
  };

  preguntasCASM83.forEach((pregunta, index) => {
      const numero = index + 1;

      const fila1 = document.createElement("tr");
      const celdaPregunta = document.createElement("td");
      celdaPregunta.rowSpan = 2;
      celdaPregunta.textContent = `${numero}`;
      celdaPregunta.style.textAlign = "center";

      const celdaOpcionA = document.createElement("td");
      celdaOpcionA.style.textAlign = "center";
      const checkboxA = document.createElement("input");
      checkboxA.type = "checkbox";
      checkboxA.onchange = function () { toggleTachado(this); };
      checkboxA.dataset.valor = pregunta.valor; // Asignar el valor para cada opción
      checkboxA.dataset.opcion = 'A'; // Identificar si es la opción A
      const spanA = document.createElement("span");
      spanA.textContent = "a";
      celdaOpcionA.appendChild(checkboxA);
      celdaOpcionA.appendChild(spanA);

      const celdaTextoA = document.createElement("td");
      celdaTextoA.textContent = pregunta.opcionA;
      celdaTextoA.style.textAlign = "left";

      fila1.appendChild(celdaPregunta);
      fila1.appendChild(celdaOpcionA);
      fila1.appendChild(celdaTextoA);

      const fila2 = document.createElement("tr");
      const celdaOpcionB = document.createElement("td");
      celdaOpcionB.style.textAlign = "center";
      const checkboxB = document.createElement("input");
      checkboxB.type = "checkbox";
      checkboxB.onchange = function () { toggleTachado(this); };
      checkboxB.dataset.valor = pregunta.valor; // Asignar el valor para cada opción
      checkboxB.dataset.opcion = 'B'; // Identificar si es la opción B
      const spanB = document.createElement("span");
      spanB.textContent = "b";
      celdaOpcionB.appendChild(checkboxB);
      celdaOpcionB.appendChild(spanB);

      const celdaTextoB = document.createElement("td");
      celdaTextoB.textContent = pregunta.opcionB;
      celdaTextoB.style.textAlign = "left";

      fila2.appendChild(celdaOpcionB);
      fila2.appendChild(celdaTextoB);

      tabla.appendChild(fila1);
      tabla.appendChild(fila2);
  });

  // Mostrar el cuestionario
  document.getElementById("cuestionario").style.display = "block";

  // Al hacer clic en el botón de ver resultados
  document.getElementById("verResultados").addEventListener("click", function () {
      // Reiniciar los puntos
      Object.keys(puntos).forEach(key => puntos[key] = 0);

      // Buscar todos los checkboxes marcados
      const checkboxesMarcados = document.querySelectorAll('input[type="checkbox"]:checked');

      checkboxesMarcados.forEach((checkbox) => {
          const valor = checkbox.dataset.valor;
          if (puntos.hasOwnProperty(valor)) {
              puntos[valor] += 1;
          }
      });

      // Mostrar resultados
      let resultadoTexto = "Resultados: <br>";
      Object.keys(puntos).forEach(key => {
          resultadoTexto += `${key}: ${puntos[key]} puntos<br>`;
      });
      resultados.innerHTML = resultadoTexto;
  });
});
