// Theme management
const DARK_MODE_CLASS = 'dark-mode';
const STORAGE_KEY = 'darkMode';

function setTheme(isDark) {
  document.body.classList.toggle(DARK_MODE_CLASS, isDark);
  localStorage.setItem(STORAGE_KEY, isDark);
  
  // Update meta theme color
  const metaTheme = document.getElementById('theme-color');
  if (metaTheme) {
    metaTheme.content = isDark ? '#1a1a1a' : '#ffffff';
  }

  // Update all themed elements
  const themedElements = document.querySelectorAll('.note-container, .button, .modal, .settings-panel, input, textarea');
  themedElements.forEach(element => {
    element.classList.toggle(DARK_MODE_CLASS, isDark);
  });
}

function initializeTheme() {
  const isDark = localStorage.getItem(STORAGE_KEY) === 'true';
  setTheme(isDark);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.checked = isDark;
  }
}

// Handle theme toggle and initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      setTheme(e.target.checked);
    });
  }
});

// Sync theme across tabs
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    setTheme(e.newValue === 'true');
  }
});
