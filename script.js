
const nombre = document.getElementById("nombre");
const monto = document.getElementById("monto");
const moneda = document.getElementById("moneda");
const conversion = document.getElementById("conversion");
const agregar = document.getElementById("agregar");

const cuadricula = document.getElementById("cuadricula");
const producto = document.getElementById("producto");
const agregarCompra = document.getElementById("agregar-compra");

// Cotización de ejemplo basada en el boceto
// 20.000 pesos = 13 dólares
const dolar = 20000 / 13;

let notas = 1;

const colores = [
  "azul",
  "celeste",
  "marron",
  "violeta"
];

// Convertir el monto ingresado
function convertir() {
  const cantidad = Number(monto.value);

  if (!monto.value || cantidad < 0) {
    conversion.textContent = "0 U$S";
    return;
  }

  let resultado;

  if (moneda.value === "USD") {
    resultado = cantidad / dolar;
    conversion.textContent =
      resultado.toFixed(2) + " U$S";
  } else {
    resultado = cantidad * dolar;
    conversion.textContent =
      "$" + resultado.toFixed(2);
  }
}

// Actualizar automáticamente
monto.addEventListener("input", convertir);
moneda.addEventListener("change", convertir);

// Agregar una notita
agregar.addEventListener("click", function () {
  const titulo = nombre.value.trim();
  const cantidad = Number(monto.value);

  if (!titulo || !monto.value || cantidad <= 0) {
    alert("Completá el nombre y el monto.");
    return;
  }

  const resultado = moneda.value === "USD"
    ? cantidad / dolar
    : cantidad * dolar;

  const nota = document.createElement("div");

  nota.classList.add(
    "nota",
    colores[notas % colores.length]
  );

  const tituloNota = document.createElement("span");
  tituloNota.textContent = titulo;

  const montoNota = document.createElement("span");
  montoNota.textContent =
    "$" + cantidad.toLocaleString("es-AR");

  const resultadoNota = document.createElement("span");
  resultadoNota.textContent =
    resultado.toFixed(2) +
    (moneda.value === "USD" ? " U$S" : " ARS");

  nota.appendChild(tituloNota);
  nota.appendChild(montoNota);
  nota.appendChild(resultadoNota);

  // Buscar un recuadro vacío
  const vacio = Array.from(
    cuadricula.children
  ).find(elemento => !elemento.textContent.trim());

  if (vacio) {
    vacio.replaceWith(nota);
  } else {
    cuadricula.appendChild(nota);
  }

  notas++;

  nombre.value = "";
  monto.value = "";
  conversion.textContent = "0 U$S";
});

// Agregar una compra
agregarCompra.addEventListener("click", function () {
  const texto = producto.value.trim();

  if (!texto) {
    alert("Escribí una compra.");
    return;
  }

  const nota = document.createElement("div");

  nota.classList.add(
    "nota",
    colores[notas % colores.length]
  );

  nota.textContent = texto;

  const vacio = Array.from(
    cuadricula.children
  ).find(elemento => !elemento.textContent.trim());

  if (vacio) {
    vacio.replaceWith(nota);
  } else {
    cuadricula.appendChild(nota);
  }

  notas++;
  producto.value = "";
});
