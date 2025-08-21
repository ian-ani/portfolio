/* DESPLEGABLE NAVEGACION */

const nav = document.getElementById("dropdown");

// Mostrar/ocultar desplegable
function dropdown(status, value, _overflow) {
    nav.style.display = status;
    nav.style.transform = `translateX(${value})`;
    document.body.style.overflow = _overflow;
}

// MAIN
export function setupDropdown() {
    // Abrir desplegable
    document.getElementById("hamburger").addEventListener("click", () => {
        dropdown("block", "0%", "hidden");
    });

    // Cerrar desplegable
    document.getElementById("close-dropdown").addEventListener("click", () => {
        dropdown("none", "100%", "auto");
    });

    // Si se pulsa la tecla ESC mientras el menu de navegacion esta abierto, se cierra
    window.addEventListener("keyup", function (evt) {
        if (nav.style.display === "block" && evt.key === "Escape") {
            dropdown("none", "100%", "auto");
        }
    });
}
