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

function renderTareas() {
  lista.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";

    btnEliminar.addEventListener("click", () => {
      eliminarTarea(tarea.id);
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

const titulo = document.getElementById("titulo");
const boton = document.getElementById("btnCambiar");

boton.addEventListener("click", handleCambiarTexto);

function handleCambiarTexto() {
  titulo.textContent = "Texto cambiado con JavaScript 🚀";
}

const inputNombre = document.getElementById("nombre");
const btnSaludar = document.getElementById("btnSaludar");
const resultado = document.getElementById("resultado");

btnSaludar.addEventListener("click", handleSaludar);

function handleSaludar() {
  const nombre = inputNombre.value;

  if (nombre === "") {
    resultado.textContent = "Por favor escribe tu nombre";
  } 
  else {
    resultado.textContent = `Hola ${nombre}, bienvenido a Fullstack 90D 🚀`;
  }
}

const inputTarea = document.getElementById("tarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");

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

btnAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderTareas();
}

const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = "";
  }, 2000);
}

renderTareas();