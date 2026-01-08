// =====================
// Referencias al DOM
// =====================
const titulo = document.getElementById("titulo");
const boton = document.getElementById("btnCambiar");
const inputNombre = document.getElementById("nombre");
const btnSaludar = document.getElementById("btnSaludar");
const resultado = document.getElementById("resultado");

const inputTarea = document.getElementById("tarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");

// =====================
// Estado / Datos
// =====================
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Normalizar tareas antiguas
tareas = tareas.map(t =>
  typeof t === "string"
    ? { id: Date.now() + Math.random(), texto: t }
    : t
);

// =====================
// Event Listeners
// =====================
document.addEventListener("DOMContentLoaded", initApp);

// =====================
// Handlers (controladores)
// =====================
function handleCambiarTexto() {
  titulo.textContent = "Texto cambiado con JavaScript 🚀";
}

function handleSaludar() {
  const nombre = inputNombre.value;
  resultado.textContent = nombre
    ? `Hola ${nombre}, bienvenido a Fullstack 90D 🚀`
    : "Por favor escribe tu nombre";
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    handleAgregar();
  }
}

function handleAgregar() {
  agregarTarea();
  renderTareas();
  inputTarea.value = "";
}

function handleListaClick(e) {
  if (e.target.matches(".btn-eliminar")) {
    eliminarTarea(e.target.dataset.id);
    renderTareas();
  }
}

// =====================
// Lógica pura
// =====================
function agregarTarea() {
  const texto = inputTarea.value.trim();
  if (!texto) return;

  const existe = tareas.some(
    t => t.texto.toLowerCase() === texto.toLowerCase()
  );

  if (existe) {
    mostrarMensaje("Esa tarea ya existe");
    return;
  }

  tareas.push({
    id: Date.now(),
    texto
  });

  guardarTareas();
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== Number(id));
  guardarTareas();
}

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  setTimeout(() => (mensaje.textContent = ""), 2000);
}

// =====================
// Render UI
// =====================
function renderTareas() {
  lista.innerHTML = "";

  tareas.forEach(tarea => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.dataset.id = tarea.id;
    btnEliminar.style.marginLeft = "10px";

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// =====================
// Init App
// =====================
function initApp() {
  boton.addEventListener("click", handleCambiarTexto);
  btnSaludar.addEventListener("click", handleSaludar);

  btnAgregar.addEventListener("click", handleAgregar);
  inputTarea.addEventListener("keydown", handleKeyPress);
  lista.addEventListener("click", handleListaClick);

  renderTareas();
}
