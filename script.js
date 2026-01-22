const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");

const app = document.getElementById("app");

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuOverlay = document.getElementById("menuOverlay");

let started = false;

/* 1) Tocar intro -> reproducir vídeo (una vez) */
intro.addEventListener("click", async () => {
  if (started) return;
  started = true;

  try {
    video.currentTime = 0;
    await video.play();
  } catch (e) {
    // si falla, saltamos directamente
    showApp();
  }
});

/* 2) Al terminar -> fade suave -> mostrar web */
video.addEventListener("ended", () => {
  intro.classList.add("fadeOut");
  setTimeout(showApp, 620);
});

function showApp(){
  intro.style.display = "none";
  app.classList.add("show");
  app.setAttribute("aria-hidden", "false");
  window.scrollTo(0, 0);
}

/* Menú */
menuBtn.addEventListener("click", () => {
  menuOverlay.classList.add("show");
  menuOverlay.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", closeMenu);

/* Cerrar si tocas fuera del panel */
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) closeMenu();
});

/* Al pulsar un item del menú -> cerrar y hacer scroll suave */
document.querySelectorAll(".menuItem").forEach(a => {
  a.addEventListener("click", () => {
    closeMenu();
  });
});

function closeMenu(){
  menuOverlay.classList.remove("show");
  menuOverlay.setAttribute("aria-hidden", "true");
}

/* Scroll suave (parecido a Sites) */
document.documentElement.style.scrollBehavior = "smooth";

