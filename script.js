// theme: "light" | "dark" | "auto"
const THEME_KEY = "site-theme";

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove("theme-light", "theme-dark");

  let finalTheme = theme;

  if (theme === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    finalTheme = prefersDark ? "dark" : "light";
  }

  body.classList.add(`theme-${finalTheme}`);

  // Update button states
  document.querySelectorAll("[data-theme]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem(THEME_KEY) || "auto";
  applyTheme(stored);

  document.querySelectorAll("[data-theme]").forEach(btn => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });

  // React if system theme changes while on "auto"
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const current = localStorage.getItem(THEME_KEY) || "auto";
    if (current === "auto") {
      applyTheme("auto");
    }
  });
});
