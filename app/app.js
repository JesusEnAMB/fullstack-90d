const titulo = document.getElementById("titulo");
const boton = document.getElementById("btnCambiar");

boton.addEventListener("click", () => {
  titulo.textContent = "Texto cambiado con JavaScript 🚀";
});