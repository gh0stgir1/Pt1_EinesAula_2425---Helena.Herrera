document.addEventListener("DOMContentLoaded", () => {
    const currentClock = document.getElementById("currentClock");
    const timerDisplay = document.getElementById("timerDisplay");
    const endTimeInput = document.getElementById("endTime");
    const countdownInput = document.getElementById("countdown");
    const startTimerButton = document.getElementById("startTimer");
    const audioSelect = document.getElementById("audioSelect");
    const audioPlayer = document.getElementById("audioPlayer");
  
    let timerInterval;
  
    // Actualitza l'hora actual
    function updateClock() {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("ca-CA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        .padStart(8, "0");
      currentClock.textContent = timeString;
    }
  
    setInterval(updateClock, 1000); // Actualitzar l'hora cada segon
    updateClock();
  
    // Formata el temps en HH:MM:SS
    function formatTime(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
      const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (totalSeconds % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
  
    // Comença el temporitzador
    function startTimer(endTime) {
      clearInterval(timerInterval);
  
      timerInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = endTime - now;
  
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = "00:00:00";
          playAlarm();
        } else {
          timerDisplay.textContent = formatTime(timeLeft);
        }
      }, 1000);
    }
  
    // Reprodueix el so
    function playAlarm() {
      const selectedSound = audioSelect.value;
      audioPlayer.src = selectedSound;
      audioPlayer.play();
    }
  
    startTimerButton.addEventListener("click", () => {
      const endTimeValue = endTimeInput.value;
      const countdownValue = countdownInput.value;
  
      if (endTimeValue) {
        // Opció: Hora exacta
        const [hours, minutes] = endTimeValue.split(":").map(Number);
        const now = new Date();
        const endTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes,
          0
        );
  
        if (endTime > now) {
          startTimer(endTime);
        } else {
          alert("La hora introduïda ha de ser futura.");
        }
      } else if (countdownValue) {
        // Opció: Temps restant
        const [h, m, s] = countdownValue.split(":").map(Number);
        const now = new Date();
        const endTime = new Date(
          now.getTime() + h * 3600000 + m * 60000 + s * 1000
        );
  
        startTimer(endTime);
      } else {
        alert("Introdueix una hora o un temps restant!");
      }
    });
  });
  
