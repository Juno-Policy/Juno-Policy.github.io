document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("[data-copy-target]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText);
        const original = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => { button.textContent = original; }, 1400);
      } catch (error) {
        button.textContent = "Select text";
        window.setTimeout(() => { button.textContent = "Copy"; }, 1400);
      }
    });
  });

  const nav = document.querySelector(".site-nav");
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.add("nav-tapped");
      window.setTimeout(() => nav && nav.classList.remove("nav-tapped"), 450);
    });
  });
});
