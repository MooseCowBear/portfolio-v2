const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const carouselPositions = { 1: 0, 2: 0, 3: 0 };

const updateSlidePosition = (index, carousel, carouselNumber) => {
  const slides = carousel.querySelectorAll(".slide");
  const btns = carousel.querySelectorAll(".button-carousel");

  const otherRemove = getOtherIndex(
    carouselPositions[carouselNumber],
    slides.length
  );

  slides[carouselPositions[carouselNumber]].classList.remove("show");
  slides[otherRemove].classList.remove("show");
  btns[carouselPositions[carouselNumber]].classList.remove("active");

  carouselPositions[carouselNumber] = index;

  const otherAdd = getOtherIndex(index, slides.length);

  slides[carouselPositions[carouselNumber]].classList.add("show");
  slides[otherAdd].classList.add("show");
  btns[carouselPositions[carouselNumber]].classList.add("active");
};

const getOtherIndex = (index, numSlides) => {
  return index <= numSlides / 2 - 1
    ? index + numSlides / 2
    : index - numSlides / 2;
};

const addCarouselListeners = () => {
  const carouselBtns = document.querySelectorAll(".button-carousel");

  carouselBtns.forEach((btn) => {
    const carousel = btn.closest(".carousel");
    const carouselNumber = carousel.id.split("-").pop();

    btn.addEventListener("click", (e) => {
      updateSlidePosition(
        parseInt(e.target.dataset.index, 10),
        carousel,
        parseInt(carouselNumber, 10)
      );
    });
  });
};

const addThemeListener = () => {
  const themeBtn = document.getElementById("theme");

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
  });
};

const setInitialTheme = () => {
  if (prefersDarkScheme) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.add("light-theme");
  }
};

(() => {
  setInitialTheme();
  addThemeListener();
  addCarouselListeners();
})();
