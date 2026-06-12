const THEME_STORAGE_KEY = "theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const TOGGLE_CLASS = "md-theme-toggle";

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_DARK
    : THEME_LIGHT;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (typeof refreshMermaidDiagrams === "function") {
    refreshMermaidDiagrams();
  }
}

async function getTheme() {
  const result = await chrome.storage.sync.get(THEME_STORAGE_KEY);
  const stored = result[THEME_STORAGE_KEY];
  if (stored === THEME_LIGHT || stored === THEME_DARK) {
    return stored;
  }
  return systemTheme();
}

async function setTheme(theme) {
  await chrome.storage.sync.set({ [THEME_STORAGE_KEY]: theme });
  applyTheme(theme);
  updateToggleLabel();
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  setTheme(next);
}

const MOON_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

const SUN_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function toggleIcon(theme) {
  return theme === THEME_DARK ? SUN_ICON : MOON_ICON;
}

function setToggleIcon(button, theme) {
  button.innerHTML = toggleIcon(theme);
}

function toggleLabel(theme) {
  return theme === THEME_DARK ? "Switch to light mode" : "Switch to dark mode";
}

function updateToggleLabel() {
  const button = document.querySelector(`.${TOGGLE_CLASS}`);
  if (!button) {
    return;
  }
  const theme = document.documentElement.dataset.theme;
  setToggleIcon(button, theme);
  button.setAttribute("aria-label", toggleLabel(theme));
}

async function initTheme() {
  const theme = await getTheme();
  applyTheme(theme);

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes[THEME_STORAGE_KEY]) {
      return;
    }
    const next = changes[THEME_STORAGE_KEY].newValue;
    if (next === THEME_LIGHT || next === THEME_DARK) {
      applyTheme(next);
      updateToggleLabel();
    }
  });
}

function mountThemeToggle() {
  if (document.querySelector(`.${TOGGLE_CLASS}`)) {
    return;
  }

  const theme = document.documentElement.dataset.theme;
  const button = document.createElement("button");
  button.type = "button";
  button.className = TOGGLE_CLASS;
  setToggleIcon(button, theme);
  button.setAttribute("aria-label", toggleLabel(theme));
  button.addEventListener("click", toggleTheme);
  document.body.appendChild(button);
}
