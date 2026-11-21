// Скрипти сайту ГО «МИ»

// Підганяє кожен рядок заголовка під ширину екрана, як у референсі.
// На телефоні слова розбиваються на склади, і під ширину підганяється кожен склад.
const mobileQuery = window.matchMedia("(max-width: 760px)");

function fitHeroLines() {
  const mobile = mobileQuery.matches;
  document.querySelectorAll(".hero__line[data-fit], .hero__part").forEach((el) => {
    el.style.fontSize = "";
  });

  const lines = document.querySelectorAll(mobile ? ".hero__part" : ".hero__line[data-fit]");
  const last = document.querySelector(".hero__line--last");
  const title = document.querySelector(".hero__title");
  if (!title || !lines.length) return;

  const width = title.clientWidth;
  let minSize = Infinity;

  lines.forEach((line) => {
    line.style.fontSize = "100px";
    const natural = line.scrollWidth;
    const size = (100 * width) / natural;
    line.style.fontSize = size + "px";
    minSize = Math.min(minSize, size);
  });

  // Останній рядок («МИ» + кнопка) — того ж розміру, що й найменший рядок.
  if (last) last.style.fontSize = minSize + "px";

  // Якщо заголовок вищий за екран — пропорційно зменшуємо всі рядки.
  const header = document.querySelector(".topbar");
  const available = window.innerHeight - (header ? header.offsetHeight : 0) - 48;
  const height = title.offsetHeight;
  if (height > available && available > 0) {
    const k = available / height;
    [...lines, last].forEach((el) => {
      if (el) el.style.fontSize = parseFloat(el.style.fontSize) * k + "px";
    });
  }
}

// Меню на телефоні
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

fitHeroLines();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitHeroLines);
}
window.addEventListener("resize", fitHeroLines);
mobileQuery.addEventListener("change", fitHeroLines);
