const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const content = document.getElementById("content");

let started = false;

// Tocar el vídeo (o el área) -> reproducir
intro.addEventListener("click", async () => {
  if (started) return;
  started = true;

  try {
    video.currentTime = 0;
    await video.play();
  } catch (e) {
    // Si por cualquier motivo falla, saltamos directo a la invitación
    goToInvitation();
  }
});

// Al terminar el vídeo -> fade suave -> mostrar invitación
video.addEventListener("ended", () => {
  goToInvitation();
});

function goToInvitation(){
  // Fade out del intro
  intro.classList.add("fadeOut");

  // Cuando termine el fade out, ocultamos intro y mostramos content
  setTimeout(() => {
    intro.style.display = "none";

    content.classList.add("show");
    // Pequeño delay para que el navegador aplique display:flex antes del fadeIn
    requestAnimationFrame(() => {
      content.classList.add("fadeIn");
      content.setAttribute("aria-hidden", "false");
      window.scrollTo(0, 0);
    });
  }, 560);
}

