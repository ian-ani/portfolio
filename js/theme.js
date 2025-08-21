/* MODULOS A IMPORTAR */

import {getLocalStorage, saveLocalStorage} from "./utils.js";

/* TEMA CLARO/TEMA OSCURO */

// Cambiar tema
function changeTheme(showElement, hideElement, theme) {
    showElement.style.display = "flex";
    hideElement.style.display = "none";

    return theme;
}

// Tema inicial: localStorage o el preferido del sistema
function initialTheme(sun, moon, pink, blue) {
    const storageTheme = getLocalStorage("data-theme");

    // Pregunta primero al localStorage
    if (storageTheme) {
        // Cambia el tema
        document.body.setAttribute("data-theme", storageTheme);
        // Cambia el icono
        storageTheme === "dark" ? changeTheme(sun, moon, null) : changeTheme(moon, sun, null);
        // Cambia la imagen de la hero-section
        storageTheme === "dark" ? changeTheme(pink, blue, null) : changeTheme(blue, pink, null);
    } else {
        // Pone automaticamente el tema del sistema
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? changeTheme(sun, moon, "dark") : changeTheme(moon, sun, "light");
        window.matchMedia("(prefers-color-scheme: dark)").matches ? changeTheme(pink, blue, null) : changeTheme(blue, pink, null);
        document.body.setAttribute("data-theme", systemTheme);
    }
}

// Cambiar tema con un clic
function toggleTheme(sun, moon, pink, blue) {
    // Cambia el tema con un clic
    document.getElementById("toggle-theme").addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");

        const newTheme = currentTheme === "dark" ? changeTheme(moon, sun, "light") : changeTheme(sun, moon, "dark");
        currentTheme === "dark" ? changeTheme(blue, pink, null) : changeTheme(pink, blue, null);
        document.body.setAttribute("data-theme", newTheme);

        // Guarda en localStorage la preferencia del usuario
        saveLocalStorage("data-theme", newTheme);
    });
}

// MAIN
export function setupTheme() {
    // Icono temas
    const moon = document.getElementById("dark-theme");
    const sun = document.getElementById("light-theme");

    // Imagenes hero-section
    const pink = document.getElementById("pink-portrait");
    const blue = document.getElementById("blue-portrait");

    document.addEventListener("DOMContentLoaded", () => {
        initialTheme(sun, moon, pink, blue);

        toggleTheme(sun, moon, pink, blue);
    });
}
