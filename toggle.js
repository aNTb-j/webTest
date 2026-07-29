export function initThemeToggle() {
    const toggle = document.querySelector(".theme-actions");
    const html = document.documentElement;

    const sun = document.getElementById("icon-sun");
    const moon = document.getElementById("icon-moon");

    function setTheme(theme) {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            sun.style.display = "none";
            moon.style.display = "block";
        } else {
            sun.style.display = "block";
            moon.style.display = "none";
        }
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    toggle.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
}