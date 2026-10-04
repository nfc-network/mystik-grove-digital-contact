/* ==================== INTRO ANIMATION ==================== */

const enterButton = document.getElementById("enterButton");
const introScreen = document.getElementById("intro");
const contactPage = document.getElementById("contactPage");

enterButton.addEventListener("click", () => {
    introScreen.classList.add("exit");

    setTimeout(() => {
        contactPage.classList.remove("hidden");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 500);
});
