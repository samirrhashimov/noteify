
// Theme management
function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('darkMode', isDark);
  
  // Update the toggle switch state
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.checked = isDark;
  }
}

// Initialize theme from localStorage
function initializeTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  setTheme(isDark);
}

// Handle theme toggle
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      setTheme(e.target.checked);
    });
  }
});
