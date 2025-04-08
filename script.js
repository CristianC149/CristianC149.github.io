// Efect de fade-in la scroll (dacă vrei)
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("section");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add("appear");
        }
      });
    }, { threshold: 0.3 });
  
    elements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slider-track");
    const slides = Array.from(track.children);
    const prevButton = document.querySelector(".slider-btn.prev");
    const nextButton = document.querySelector(".slider-btn.next");

    let currentIndex = 0;

    const updateSlider = () => {
        const slideWidth = slides[0].getBoundingClientRect().width; // Dimensiunea imaginii
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length; // Trecem la următoarea imagine
        updateSlider();
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Trecem la imaginea anterioară
        updateSlider();
    });

    // Ajustare slider la redimensionarea ferestrei
    window.addEventListener("resize", updateSlider);

    // Inițializare slider
    updateSlider();
});

document.addEventListener("DOMContentLoaded", () => {
    const isAnimatiePage = document.body.classList.contains("animatie-page");

    if (isAnimatiePage) {
        const components = document.querySelectorAll(".telefon-component");
        const [baza, receptor, cablu, final] = components;
        const scrollText = document.querySelector(".scroll-text");

        let isAssembled = false; // Track the state of the animation
        let animationInProgress = false; // Prevent multiple triggers during animation

        window.addEventListener("wheel", (event) => {
            if (animationInProgress) return; // Ignore if animation is ongoing

            if (event.deltaY > 0 && !isAssembled) {
                // Scroll în jos - mutăm componentele în centru și afișăm imaginea finală
                animationInProgress = true;
                baza.style.transform = "translate(0, 0)";
                receptor.style.transform = "translate(0, 0)";
                cablu.style.transform = "translate(0, 0)";
                scrollText.style.opacity = "0";

                setTimeout(() => {
                    baza.style.display = "none";
                    receptor.style.display = "none";
                    cablu.style.display = "none";
                    final.style.display = "block";
                    final.classList.add("explozie");
                    animationInProgress = false;
                }, 2000); // Timp pentru animația de unire

                isAssembled = true;
            } else if (event.deltaY < 0 && isAssembled) {
                // Scroll în sus - resetăm componentele și ascundem imaginea finală
                animationInProgress = true;
                final.style.opacity = "0"; // Ascundem imaginea a 4-a
                setTimeout(() => {
                    final.style.display = "none";
                    final.classList.remove("explozie");
                    baza.style.display = "block";
                    receptor.style.display = "block";
                    cablu.style.display = "block";

                    // Resetăm pozițiile aleatorii
                    baza.style.transform = "translate(-300px, 200px)";
                    receptor.style.transform = "translate(250px, -100px)";
                    cablu.style.transform = "translate(-150px, -200px)";
                    scrollText.style.opacity = "1";

                    animationInProgress = false;
                }, 1000); // Timp pentru resetarea animației

                isAssembled = false;
            }

            event.preventDefault(); // Previne derularea paginii
        });
    }
});
