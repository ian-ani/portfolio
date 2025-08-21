/* MODULOS A IMPORTAR */

import {getLocalStorage, saveLocalStorage} from "./utils.js";
import {addSections} from "./section.js";

/* CAMBIO DE IDIOMA */

// Borrar secciones
function removeSections() {
    document.querySelectorAll(".lang-text").forEach(element => {
        element.remove();
    })
}

// Atributo de lenguaje para la etiqueta html
function setHTMLTag(language) {
    document.documentElement.lang = language;
}

// Cambiar idioma
function changeLanguage({flag:showElement, content:hideElement}) {
    showElement.style.display = "flex";
    hideElement.style.display = "none";

    // Primero borra las secciones actuales
    removeSections();

    // Atributo de lenguaje para la etiqueta html
    setHTMLTag(hideElement.id);

    // Anade las secciones dependiendo del lenguaje
    addSections(hideElement.id);

    return {
        flag: showElement.id, 
        content: hideElement.id
    }
}

// Idioma inicial: localStorage o el del navegador web
function initialLanguage(currentFlag, currentLanguage, es, en) {
    const storageLanguage = getLocalStorage("language");

    // Pregunta primero al localStorage
    if (storageLanguage) {
        ({flag:currentFlag, content:currentLanguage} = storageLanguage.startsWith("en") ? changeLanguage({flag:es, content:en}) : changeLanguage({flag:en, content:es}));
    } else {
        // Pone automaticamente el lenguage del navegador web
        const browserLanguage = navigator.language.slice(0,2);

        if (browserLanguage === "en") {
            changeLanguage({flag:es, content:en});
        } else if (browserLanguage === "es") {
            changeLanguage({flag:en, content:es});
        } else {
            // Fallback si el usuario no tiene definido ni inglés ni castellano
            changeLanguage({flag:es, content:en});
        }
    }

    return [currentFlag, currentLanguage];
}

// Cambia idioma con un clic
function toggleLanguage(currentFlag, currentLanguage) {
    document.getElementById("toggle-lang").addEventListener("click", () => {
        ({flag:currentFlag, content:currentLanguage} = currentFlag === "en" ? changeLanguage({flag:es, content:en}) : changeLanguage({flag:en, content:es}));

        // Guarda en localStorage la preferencia del usuario
        saveLocalStorage("language", currentLanguage);
    });
}

// MAIN
export function setupLanguage(){
    document.addEventListener("DOMContentLoaded", () => {
        // Banderas de idiomas
        const es = document.getElementById("es");
        const en = document.getElementById("en");

        let currentFlag, currentLanguage;

        // Idioma inicial: localStorage o el del navegador web
        [currentFlag, currentLanguage] = initialLanguage(currentFlag, currentLanguage, es, en);
        
        // Cambia idioma con un clic
        toggleLanguage(currentFlag, currentLanguage);
    });
}
