const productos = [
  { id: 1, nombre: "Producto A", precio: 100 },
  { id: 2, nombre: "Producto B", precio: 200 },
  { id: 3, nombre: "Producto X", precio: 999 }
];

const form = document.getElementById("form-producto");

const tbody = document.getElementById("tabla-productos");

for (let producto of productos) {
  const fila = `
    <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
    </tr>
  `;
  tbody.innerHTML += fila;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;

  const nuevoProducto = {
    id: productos.length + 1,
    nombre: nombre,
    precio: precio
  };

  productos.push(nuevoProducto);

  tbody.innerHTML = "";
  for (let producto of productos) {
    const fila = `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
      </tr>
    `;
    tbody.innerHTML += fila;
  }

  form.reset();
});