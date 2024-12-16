const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
let angle = 0;
let spinning = false;
let names = []; // Lista de nombres

// Función para dibujar la ruleta
function drawWheel() {
  const numSegments = names.length > 0 ? names.length : 1; // Asegura que al menos un segmento esté presente
  const segmentAngle = (2 * Math.PI) / numSegments;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

  // Dibuja cada segmento
  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff6600"; // Colores alternados
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(names.length > 0 ? names[i] : "Espai buit", 150, 10); // Mostrar "Espai buit" si no hay nombres
    ctx.restore();
  }
}

function spinWheel() {
  if (spinning || names.length === 0) return; // No girar si ya está girando o no hay nombres

  spinning = true;
  const spinTime = Math.random() * 3000 + 2000; // Entre 2 i 5 segons
  const spinSpeed = Math.random() * 10 + 5; // Velocitat inicial

  let currentSpeed = spinSpeed;

  const spinInterval = setInterval(() => {
    angle += currentSpeed;
    currentSpeed *= 0.98; // Redueix la velocitat gradualment

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-250, -250);
    drawWheel(); // Dibuja la ruleta girada
    ctx.restore();

    if (currentSpeed < 0.1) {
      clearInterval(spinInterval);
      spinning = false;

      const selectedSegment = Math.floor(
        ((360 - (angle % 360)) / 360) * names.length
      );
      document.getElementById("selectedName").textContent =
        "Nom seleccionat: " + names[selectedSegment];
    }
  }, 30);
}

// Función para cargar nombres desde noms.txt
function loadNamesFromFile() {
  fetch('noms.txt')
    .then(response => response.text())
    .then(data => {
      names = data.split('\n').filter(name => name.trim() !== ''); // Filtra nombres no vacíos
      drawWheel(); // Dibuja la ruleta con los nombres cargados
    })
    .catch(error => console.error('Error al cargar noms:', error));
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar la ruleta con nombres aleatorios si está vacío
  if (names.length === 0) {
    names = Array.from({ length: 10 }, (_, i) => `Nom ${i + 1}`); // Nombres predeterminados
    drawWheel(); // Dibujar con nombres predeterminados
  } else {
    drawWheel(); // Dibujar siempre si hay nombres cargados
  }
});


// Event listeners
document.getElementById("spinButton").addEventListener("click", spinWheel);
document.getElementById("loadNamesButton").addEventListener("click", loadNamesFromFile); // Botón para cargar nombres
