/* UTILES */

// Obtener de localStorage
export function getLocalStorage(key) {
    return localStorage.getItem(key);
}

// Guardar en localStorage
export function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// Crear contenedor y asignar clase
export function createContainer(type, classname) {
    const container = document.createElement(type);

    if (typeof classname === "string") {
        container.classList.add(classname);
    } else if (Array.isArray(classname)) {
        container.classList.add(...classname);
    }

    return container;
}
