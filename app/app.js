// Referencias al DOM
const titulo = document.getElementById("titulo");
const boton = document.getElementById("btnCambiar");
const inputNombre = document.getElementById("nombre");
const btnSaludar = document.getElementById("btnSaludar");
const resultado = document.getElementById("resultado");
const inputTarea = document.getElementById("tarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");

// Estado / datos
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Normalizar tareas antiguas (strings → objetos)
tareas = tareas.map(t => {
  if (typeof t === "string") {
    return {
      id: Date.now() + Math.random(),
      texto: t
    };
  }
  return t;
});

// Event Listeners
boton.addEventListener("click", handleCambiarTexto);
btnSaludar.addEventListener("click", handleSaludar);
//lista.addEventListener("click", handleListaClick);
//btnAgregar.addEventListener("click", agregarTarea);
//inputTarea.addEventListener("keypress", handleKeyPress(e));
document.addEventListener("DOMContentLoaded", initApp);

// Controladores Handle
function handleCambiarTexto() {
  titulo.textContent = "Texto cambiado con JavaScript 🚀";
}

function handleSaludar() {
  const nombre = inputNombre.value;

  if (nombre === "") {
    resultado.textContent = "Por favor escribe tu nombre";
  } 
  else {
    resultado.textContent = `Hola ${nombre}, bienvenido a Fullstack 90D 🚀`;
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
}

function handleListaClick(e) {
  
  if (e.target.matches(".btn-eliminar")) {
    const id = e.target.dataset.id;
    
    eliminarTarea(id);
    renderTareas();
  }
}

// Logica Pura
function agregarTarea() {
  const texto = inputTarea.value.trim();

  if (texto === "") return;

  const existe = tareas.some(t => t.texto.toLowerCase() === texto.toLowerCase());
  if (existe) {
    mostrarMensaje("Esa tarea ya existe");
    return;
  }

  const tarea = {
    id: Date.now(),
    texto: texto
  };

  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  renderTareas();
  inputTarea.value = "";
}

function eliminarTarea(id) {
  const idNum = Number(id);
  tareas = tareas.filter(tarea => tarea.id !== idNum);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderTareas();
}

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = "";
  }, 2000);
}

// Render UI
function renderTareas() {
  lista.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.dataset.id = tarea.id;

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// Init
function initApp(){
  
  btnAgregar.addEventListener("click", agregarTarea);
  inputTarea.addEventListener("keydown", handleKeyPress);
  lista.addEventListener("click", handleListaClick);
  renderTareas()
}
