let currentTheme = localStorage.getItem('theme') || 'auto';

function toggleDropdown() {
    const menu = document.getElementById('themeMenu');
    menu.classList.toggle('show');
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    const icon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        icon.textContent = '☽';
    } else if (theme === 'light') {
        icon.textContent = '☀';
    } else {
        icon.textContent = '⚙';
    }
    
    updateActiveOption();
    document.getElementById('themeMenu').classList.remove('show');
}

function updateActiveOption() {
    const options = document.querySelectorAll('.theme-option');
    options.forEach(option => {
        option.classList.remove('active');
        if (option.textContent.includes(
            currentTheme === 'light' ? 'Light' :
            currentTheme === 'dark' ? 'Dark' : 'Auto'
        )) {
            option.classList.add('active');
        }
    });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (currentTheme === 'auto') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    setTheme(currentTheme);
    updateActiveOption();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.theme-dropdown');
    if (!dropdown.contains(event.target)) {
        document.getElementById('themeMenu').classList.remove('show');
    }
});
