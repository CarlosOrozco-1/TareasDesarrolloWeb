function mostrarNoticia(id) {
  const contenido = document.getElementById(id);
  contenido.style.display = contenido.style.display === 'none' ? 'block' : 'none';
}

function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  if (nombre.trim() === "") {
    alert("Por favor, ingresa tu nombre.");
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('.carousel-images');
  const images = document.querySelectorAll('.carousel-images img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 0;

  function showImage(i) {
    const width = images[0].clientWidth;
    carousel.style.transform = `translateX(${-width * i}px)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  window.addEventListener('resize', () => showImage(index));

  //transición automatica.
  let autoSlide = setInterval(() => {
    index = (index + 1) % images.length;
    showImage(index);
  }, 4000);
});

//cargar contenido de las otras paginas.

function cargarSeccion(url) {
  const contenedor = document.getElementById('vista-principal');

  fetch(url)
    .then(res => res.text())
    .then(html => {
      contenedor.innerHTML = html; // Reemplaza TODO
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    })
    .catch(err => {
      contenedor.innerHTML = `<p class="text-center text-danger">Error al cargar la sección.</p>`;
      console.error(err);
    });
}

//guardado y carga del contenido principal
let vistaInicio = '';

document.addEventListener("DOMContentLoaded", () => {
  // Guardamos el contenido original
  vistaInicio = document.getElementById('vista-principal').innerHTML;
});

function mostrarInicio() {
  const contenedor = document.getElementById('vista-principal');
  contenedor.innerHTML = vistaInicio;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}