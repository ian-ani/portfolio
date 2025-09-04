/* MODULOS A IMPORTAR */

import {createContainer} from "./utils.js";

/* SECCIONES */

// General
const sectionTitles = document.getElementsByClassName("section-title");

// Hero
const heroSectionContent = document.getElementById("hero-section-content");
const resume = document.getElementById("resume");

// Habilidades
const skillsSection = document.getElementById("skills");
const skillTitle = document.getElementsByClassName("skill-title");

// Proyectos
const projectSection = document.getElementById("projects");
const projectCategory = document.querySelectorAll("#projects .categories")[0];

// Formacion
const educationSection = document.getElementById("education");
const educationCategory = document.querySelectorAll("#education .categories")[0];

// Experiencia
const workSection = document.getElementById("work-experience");
const workCategory = document.querySelectorAll("#work-experience .categories")[0];

// MAIN - Anadir secciones
export async function addSections(language) {
    const response = await fetch(`locales/${language}.json`);

    if (!response.ok) {
        throw new Error(`No se ha podido cargar el archivo: ${language}.json`);    
    }

    const result = await response.json();

    addHeroSection(result);
    addSkillSection(result);
    addProjectSection(result, language);
    addExpSection(result, 3, "education", educationCategory, educationSection);
    addExpSection(result, 4, "workExperience", workCategory, workSection);
    showCards("projects");
    showCards("education");
    showCards("work-experience");
}

// Cabecera
function renderHeader(key, parent) {
    const header = createContainer("header");

    header.innerHTML = `<img src="${key.image}" alt="${key.title}">
                        <h3>${key.title}</h3>`

    parent.appendChild(header);
}

// Contenido
function renderContent(key, parent) {
    const div = createContainer("div", "project-content");

    div.innerHTML = `<p>${key.description}</p>`;

    parent.appendChild(div);
}

// Footer
function renderFooter(key, parent, language) {
    const footer = createContainer("footer");
    const divProjectTech = createContainer("div", "project-tech");
    const divProjectSource = createContainer("div", "project-source");
    const buttonText = {"en":"View", "es":"Ver"};

    key.tech.forEach(element => {
        divProjectTech.innerHTML += `<img src="${element.image}" alt="${element.title}" title="${element.title}">`;
    });

    if (key.source) {
        divProjectSource.innerHTML = `<a href="${key.source}" target="_blank" rel="noopener noreferrer">${buttonText[language]}</a>`;
    }

    parent.appendChild(footer);
    footer.appendChild(divProjectTech);
    footer.appendChild(divProjectSource);
}

// Seccion hero
function addHeroSection(result) {
    resume.innerText = result.heroSection.resume;

    heroSectionContent.innerHTML = `<div>
                        <h1>${result.heroSection.name}</h1>
                        <h2><i>${result.heroSection.title}</i></h2>
                        <p>${result.heroSection.text}</p>
                    </div>
                    <div>
                        <div>
                            <a href="${result.heroSection.social.linkedin}" class="fa-brands fa-linkedin" target="_blank" rel="noopener noreferrer"></a>
                            <a href="${result.heroSection.social.github}" class="fa-brands fa-github" target="_blank" rel="noopener noreferrer"></a>
                        </div>
                    </div>`;
}

// Seccion de habilidades
function addSkillSection(result) {
    sectionTitles[0].textContent = result.skills.title.toUpperCase();
    result.skills.category.forEach((title, element) => {
        skillTitle[element].textContent = title;
    });
    sectionTitles[1].textContent = result.futureObjectives.title.toUpperCase();
}

// Seccion de proyectos
function addProjectSection(result, language) {
    // Titulo
    sectionTitles[2].textContent = result.projects.title.toUpperCase();

    // Categorias
    addCategories(result, "projects", projectCategory);

    // Cards
    const allProjects = result.projects.cards.flat();

    const fragment = document.createDocumentFragment();
    const divProjectCard = createContainer("div", ["project-card", "lang-text"]);

    for (let i = 0; i < allProjects.length; i+=2) {
        // Articulos
        for (let j = i; j < i + 2 && j < allProjects.length; j++) {
            const projects = allProjects[j];
            const article = createContainer("article", [...projects.category]);

            // Header
            renderHeader(projects, article);
            // Content
            renderContent(projects, article);
            // Footer
            renderFooter(projects, article, language);

            divProjectCard.appendChild(article);
        }

        fragment.appendChild(divProjectCard);
    }

    // Actualiza todo el DOM solo una vez
    projectSection.appendChild(fragment);

    // Anade la clase "no-image" a dichas imagenes para su posterior filtro de color (en CSS)
    document.querySelectorAll(".project-card article header").forEach(header => {
        if (header.innerHTML.includes("no-image")) {
            header.classList.add("no-image");
        }
    });
}

// Seccion de formacion y experiencia laboral
function addExpSection(result, title, section, sectionCategory, sectionContainer) {
    const fragment = document.createDocumentFragment();

    // Titulo
    sectionTitles[title].textContent = result[section].title.toUpperCase();

    // Categorias
    addCategories(result, section, sectionCategory);

    // Articulos
    const allExp = result[section].cards;

    for (let i = 0; i < allExp.length; i++) {
        const cards = allExp[i];
        const article = createContainer("article", ["lang-text", ...cards.category]);

        // Contenedor de imagen
        const divImage = createContainer("div", "exp-icon");
        divImage.innerHTML = `<img src="${cards.image}" alt="${cards.title}" title="${cards.title}">`;
        article.appendChild(divImage);

        // Contenedor de texto
        const divText = createContainer("div");
        divText.innerHTML = `<h2>${cards.title}</h2>
                        <h3>${cards.date}</h3>
                        <p>${cards.description}</p>`;
        article.appendChild(divText);

        fragment.appendChild(article);
    }

    sectionContainer.appendChild(fragment);
}

/* BOTONES DE CATEGORIAS */

// Anadir botones de categorias
function addCategories(result, section, sectionCategory) {
    result[section].category.forEach(title => {
        const button = createContainer("button", "lang-text");
        button.textContent = title;
        sectionCategory.appendChild(button);
    });
}

// Mostrar tarjetas dependiendo de la categoria correspondiente
function showCards(id) {
    const categories = document.querySelectorAll(".categories");
    const cards = document.querySelectorAll(`#${id} article`);

    categories.forEach(btn => {
        btn.addEventListener("click", function(event) {
            if (event.target.closest(`#${id}`)) {
                if (event.target.tagName === "BUTTON") {
                    cards.forEach(card => {
                        card.style.display = card.classList.contains(event.target.textContent) ? "flex" : "none";
                    });
                }
            }
        });
    });
}
