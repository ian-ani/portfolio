/*  VOLVER ARRIBA */

export function setupBackToTop() {
    const backToTop = document.getElementById("btt");

    // Si el eje Y del scroll es superior a 200, anade una clase
    window.addEventListener("scroll", () => {
        (window.scrollY > 200) ? backToTop.classList.add("show") : backToTop.classList.remove("show");
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    })
}
