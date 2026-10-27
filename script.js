// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


// Close mobile navigation when a link is clicked

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.textContent = "☰";
    });
});


// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// =====================================
// WHATSAPP BOOKING
// =====================================

// Replace this with your WhatsApp number.
// Use your country code and number without + or spaces.
// Example format for Nigeria: 2348012345678

const WHATSAPP_NUMBER = "2348148759938";

let selectedPackage = "";


// Selecting a package automatically prepares its booking message

document.querySelectorAll("[data-package]").forEach(button => {

    button.addEventListener("click", () => {

        selectedPackage = button.dataset.package;

        const bookingSection = document.getElementById("contact");

        bookingSection.dataset.selectedPackage = selectedPackage;

    });

});


// Open WhatsApp with the chosen package

const whatsappButton = document.getElementById("whatsappButton");

whatsappButton.addEventListener("click", event => {

    event.preventDefault();

    const chosenPackage =
        selectedPackage ||
        document.getElementById("contact").dataset.selectedPackage ||
        "I'd like to enquire about your services";

    const message =
        `Hello Lemo Krimmzy! 👋\n\n` +
        `I'm interested in booking your services.\n\n` +
        `Package: ${chosenPackage}\n\n` +
        `Please share your availability and booking details.`;

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

});


// =====================================
// AUTOMATIC FOOTER YEAR
// =====================================

document.getElementById("year").textContent =
    new Date().getFullYear();