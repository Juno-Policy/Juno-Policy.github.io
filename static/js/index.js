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

  // Intro video language toggle (local English and Chinese videos).
  const introEn = document.getElementById("intro-video-en");
  const introZh = document.getElementById("intro-video-zh");
  document.querySelectorAll(".intro-lang-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      document.querySelectorAll(".intro-lang-btn").forEach((b) => {
        const active = b === button;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      if (introEn && introZh) {
        const showEn = lang === "en";
        introEn.hidden = !showEn;
        introZh.hidden = showEn;
        // Pause whichever video is now hidden so it stops downloading/playing.
        (showEn ? introZh : introEn).pause();
      }
    });
  });

  // Some browsers defer muted autoplay until the media is ready. Retry once
  // after metadata has loaded while keeping the video free of native controls.
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    const startVideo = () => {
      video.muted = true;
      const playRequest = video.play();
      if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(() => {});
      }
    };
    startVideo();
    video.addEventListener("canplay", startVideo, { once: true });
    window.setTimeout(startVideo, 250);
  });
});
