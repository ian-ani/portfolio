import {setupBackToTop} from "./backtotop.js";
import {setupLanguage} from "./language.js";
import {setupTheme} from "./theme.js";
import {setupDropdown} from "./nav.js";

// Configurar tema claro/oscuro
setupTheme();

// Configurar idioma y anade las secciones correspondientes
setupLanguage();

// Configurar boton de volver arriba
setupBackToTop();

// Configurar desplegable de navegacion
setupDropdown();
