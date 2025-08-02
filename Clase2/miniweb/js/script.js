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
  if (bienvenida) { 
    // Oculta completamente la sección de bienvenida
    bienvenida.classList.add('oculto');
    bienvenida.style.display = 'none';
    bienvenida.style.visibility = 'hidden';
    bienvenida.style.height = '0';
    bienvenida.style.margin = '0';
    bienvenida.style.padding = '0';
  }



  // Limpia el contenido anterior
  const contenedor = document.getElementById('contenido');
  contenedor.innerHTML = "<p>Cargando contenido...</p>";

  // Fetch y parseo del contenido
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const main = doc.querySelector('main');

      if (main) {
        contenedor.innerHTML = ''; // Limpia el contenedor
        contenedor.innerHTML = main.innerHTML; // Inserta solo el contenido
      } else {
        contenedor.innerHTML = "<p class='text-danger'>Lo sentimos!! este sitio aun no esta disponible.</p>";
      }
    })
    .catch(err => {
      console.error("Error al cargar el contenido:", err);
      contenedor.innerHTML = "<p class='text-danger'>No se pudo cargar el sitio turístico.</p>";
    });
}





// Mostrar contenido de inicio
function mostrarInicio(boton) {
  const bienvenida = document.getElementById("video-bienvenida");
  if (bienvenida) {
    // Restaurar la visibilidad de la bienvenida
    bienvenida.style.display = "flex";
    bienvenida.style.visibility = "visible";
    bienvenida.style.height = "auto";
    bienvenida.style.margin = "";
    bienvenida.style.padding = "";
    bienvenida.classList.remove("oculto"); // por si usaste la clase para ocultar
  }

  const contenedor = document.getElementById("contenido");
  contenedor.innerHTML = `
    <p class="frase-inspiradora">Explora y descubre los lugares más hermosos de nuestra bella Guatemala.</p>
  `;

  // Actualiza la imagen aleatoria
  const imagenes = ["img/atitlan.jpg", "img/tikal.jpg"];
  const aleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
  document.getElementById("imagen-aleatoria").src = aleatoria;

  // Marcar botón activo
  document.querySelectorAll(".menu-btn").forEach((btn) =>
    btn.classList.remove("active")
  );
  if (boton) boton.classList.add("active");

  // Recolapsar el menú lateral si lo tenías expandido
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