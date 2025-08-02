// Mostrar bienvenida e imagen aleatoria
function bienvenida() {
  alert("Descubre lo mejor de nuestra bella Guatemala!!");

  const imagenes = ["img/atitlan.jpg", "img/tikal.jpg"];
  const aleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
  document.getElementById("imagen-aleatoria").src = aleatoria;
}

// Fondos aleatorios
function fondoAleatorio() {
  const fondos = [
    'img/fondos/fondo1.webp',
    'img/fondos/fondo2.jpg',
    'img/fondos/fondo3.jpg',
    'img/fondos/fondo4.webp',
    'img/fondos/fondo5.jpg'
  ];
  const aleatorio = fondos[Math.floor(Math.random() * fondos.length)];
  document.body.style.backgroundImage = `url('${aleatorio}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
}

// Cambiar modo de visualización
function cambiarModo() {
  const esClaro = document.body.classList.toggle("modo-claro");
  const label = document.querySelector("label[for='modoSwitch']");
  label.textContent = esClaro ? "Modo Oscuro" : "Modo Claro";
  localStorage.setItem("modoClaroActivado", esClaro);
}

// Cargar contenido externo
function cargarContenido(url, boton) {

  // Oculta la sección de bienvenida
  const bienvenida = document.getElementById('video-bienvenida');
  if (bienvenida) bienvenida.style.display = 'none';

  // Limpia el contenido anterior y carga el nuevo
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      //main para cargar contenido
      const nuevoContenido = doc.querySelector('main') || doc.body;

      const contenedor = document.getElementById('contenido');
      contenedor.innerHTML = ''; // Limpia antes de insertar
      contenedor.appendChild(nuevoContenido);
    })
    .catch(err => {
      console.error('Lo sentimos este sitio turistico no esta disponible por el momento:', err);
    });
}



// Mostrar contenido de inicio
function mostrarInicio(boton) {
  const bienvenida = document.getElementById("video-bienvenida");
  if (bienvenida) bienvenida.style.display = "block";

  const contenedor = document.getElementById("contenido");
  contenedor.innerHTML = `
    <p class="text-muted">Selecciona un sitio del menú para ver su información aquí.</p>
  `;

  document.querySelectorAll(".menu-btn").forEach((btn) =>
    btn.classList.remove("active")
  );
  if (boton) boton.classList.add("active");

  const imagenes = ["img/atitlan.jpg", "img/tikal.jpg"];
  const aleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
  document.getElementById("imagen-aleatoria").src = aleatoria;

  const sidebar = document.getElementById("sidebar");
  if (!sidebar.classList.contains("collapsed")) {
    sidebar.classList.add("collapsed");
  }
}


// Funciones relacionadas con el carrusel de videos
document.addEventListener("DOMContentLoaded", () => {
  fondoAleatorio();

  const modoGuardado = localStorage.getItem("modoClaroActivado") === "true";
  if (modoGuardado) {
    document.body.classList.add("modo-claro");
    document.getElementById("modoSwitch").checked = true;
    const label = document.querySelector("label[for='modoSwitch']");
    label.textContent = "Modo oscuro";
  }

  document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
  });

  const videoCarousel = document.getElementById("videoCarousel");

  // Reiniciar el video al cambiar de slide
  if (videoCarousel) {
    videoCarousel.addEventListener("slide.bs.carousel", function () {
      const iframes = videoCarousel.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        const src = iframe.getAttribute("src");
        iframe.setAttribute("src", src);
      });
    });

    // Detener la reproducción automática del carrusel
    new bootstrap.Carousel(videoCarousel, {
      interval: false,
      ride: false
    });
  }
});