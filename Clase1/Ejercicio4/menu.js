function abrirModal(seccion) {
  const modal = document.getElementById("modal");
  const contenido = document.getElementById("contenido-modal");
  let html = "";

  if (seccion === "inicio") {
    html = `
      <h3>Inicio</h3>
      <p>Bienvenido al sitio web. Este es el módulo de inicio.</p>
    `;
  } else if (seccion === "sobremi") {
    html = `
      <h3>Sobre mí</h3>
      <p>Mi nombre es Carlos Orozco, Estudiante de Sistemas Informáticos. Apasionado por la tecnología y el desarrollo web.</p>
    `;
  } else if (seccion === "contacto") {
    html = `
      <h3>Contacto</h3>
      <p>Para dudas o sugerencias, escríbeme al correo: <h1>tuprogra@gmail.com</h1></p>
    `;
  }

  html += `<button onclick="cerrarModal()">Cerrar</button>`;
  contenido.innerHTML = html;
  modal.classList.add("mostrar");
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("mostrar");
  modal.classList.add("oculto");
}
