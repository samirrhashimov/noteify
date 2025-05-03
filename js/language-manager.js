
let currentLanguage = localStorage.getItem('language') || 'tr';
let translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`/lang/${lang}.json`);
        translations = await response.json();
        localStorage.setItem('language', lang);
        localStorage.setItem('translations', JSON.stringify(translations));
        updatePageText();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function updatePageText() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
                element.placeholder = translations[key];
            } else {
                element.textContent = translations[key];
            }
        }
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    loadTranslations(lang);
}

// Initialize translations
document.addEventListener('DOMContentLoaded', () => {
    const savedTranslations = localStorage.getItem('translations');
    if (savedTranslations) {
        translations = JSON.parse(savedTranslations);
        updatePageText();
    } else {
        loadTranslations(currentLanguage);
    }
});
