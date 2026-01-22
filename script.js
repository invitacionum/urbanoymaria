const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const app = document.getElementById("app");

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuOverlay = document.getElementById("menuOverlay");

const pageEls = Array.from(document.querySelectorAll(".page"));

let activePage = "inicio";
let started = false;

/* Intro -> reproducir una vez */
intro.addEventListener("click", async () => {
  if (started) return;
  started = true;

  try {
    video.currentTime = 0;
    await video.play();
  } catch (e) {
    showApp();
  }
});

/* Termina vídeo -> mostrar app */
video.addEventListener("ended", () => {
  intro.classList.add("fadeOut");
  setTimeout(showApp, 620);
});

function showApp(){
  intro.style.display = "none";
  app.classList.add("show");
  app.setAttribute("aria-hidden", "false");
  window.scrollTo(0, 0);

  const first = getPageEl(activePage);
  first.classList.add("is-active");
  requestAnimationFrame(() => first.classList.add("is-visible"));
}

/* Menú */
menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) closeMenu();
});

function openMenu(){
  menuOverlay.classList.add("show");
  menuOverlay.setAttribute("aria-hidden", "false");
}
function closeMenu(){
  menuOverlay.classList.remove("show");
  menuOverlay.setAttribute("aria-hidden", "true");
}

/* Navegación por páginas (fade) */
document.querySelectorAll(".menuItem").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-page");
    closeMenu();
    navigateTo(target);
  });
});

function getPageEl(name){
  return pageEls.find(p => p.getAttribute("data-page") === name);
}

function navigateTo(target){
  if (!target || target === activePage) return;

  const current = getPageEl(activePage);
  const next = getPageEl(target);

  current.classList.remove("is-visible");

  setTimeout(() => {
    current.classList.remove("is-active");

    next.classList.add("is-active");
    requestAnimationFrame(() => {
      next.classList.add("is-visible");
      window.scrollTo(0, 0);
    });

    activePage = target;
  }, 430);
}


