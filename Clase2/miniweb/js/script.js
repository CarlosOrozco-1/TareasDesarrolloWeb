// Muestra un mensaje de bienvenida y una imagen aleatoria al cargar la página
function bienvenida() {
  alert("Bienvenido a la Mini Web de Sitios Turísticos de Guatemala");

  // Lista de imágenes disponibles para el banner
  const imagenes = ["img/atitlan.jpg", "img/tikal.jpg"];

  // Selecciona una imagen aleatoria
  const aleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

  // Cambia la imagen del banner de bienvenida
  document.getElementById("imagen-aleatoria").src = aleatoria;
}

// Cuando el documento esté listo (DOM cargado)
document.addEventListener("DOMContentLoaded", () => {
  // Agrega evento al botón para contraer o expandir el menú lateral
  document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
  });
});

// Carga contenido externo (como atitlan.html o tikal.html) dentro del div #contenido
function cargarContenido(ruta, boton) {
  // Usa fetch para traer el contenido del archivo HTML
  fetch(ruta)
    .then(resp => resp.text()) // Convierte la respuesta a texto HTML
    .then(html => {
      // Inserta el contenido HTML en el div "contenido"
      document.getElementById("contenido").innerHTML = html;

      // Oculta el banner de bienvenida
      document.getElementById("banner-bienvenida").style.display = "none";

      // Remueve la clase 'active' de todos los botones del menú
      document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));

      // Agrega la clase 'active' solo al botón que fue presionado
      if (boton) boton.classList.add("active");
    })
    .catch(err => {
      // Muestra un mensaje de error si falla la carga del archivo
      document.getElementById("contenido").innerHTML = "<p>Error al cargar el contenido.</p>";
      console.error(err);
    });
}

// Muestra el contenido de bienvenida nuevamente
function mostrarInicio(boton) {
  // Muestra el banner
  document.getElementById("banner-bienvenida").style.display = "block";

  // Restaura el contenido inicial del área dinámica
  document.getElementById("contenido").innerHTML = `
    <p class="text-muted">Selecciona un sitio del menú para ver su información aquí.</p>
  `;

  // Quita la clase 'active' de todos los botones del menú
  document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));

  // Marca el botón de "Inicio" como activo
  if (boton) boton.classList.add("active");

  // Vuelve a elegir una imagen aleatoria
  const imagenes = ["img/atitlan.jpg", "img/tikal.jpg"];
  const aleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
  document.getElementById("imagen-aleatoria").src = aleatoria;

  // Contrae automáticamente el menú lateral si no está contraído
  const sidebar = document.getElementById("sidebar");
  if (!sidebar.classList.contains("collapsed")) {
    sidebar.classList.add("collapsed");
  }
}
