const titulo = document.getElementById("titulo");
const boton = document.getElementById("btnCambiar");

boton.addEventListener("click", () => {
  titulo.textContent = "Texto cambiado con JavaScript 🚀";
});

const inputNombre = document.getElementById("nombre");
const btnSaludar = document.getElementById("btnSaludar");
const resultado = document.getElementById("resultado");

btnSaludar.addEventListener("click", () => {
  const nombre = inputNombre.value;

  if (nombre === "") {
    resultado.textContent = "Por favor escribe tu nombre";
  } else {
    resultado.textContent = `Hola ${nombre}, bienvenido a Fullstack 90D 🚀`;
  }
});

const inputTarea = document.getElementById("tarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");

btnAgregar.addEventListener("click", () => {
  const texto = inputTarea.value;

  if (texto === "") return;

  const li = document.createElement("li");
  li.textContent = texto;

  lista.appendChild(li);
  inputTarea.value = "";
});