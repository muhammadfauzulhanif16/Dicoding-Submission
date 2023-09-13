// profile
const profileContainer = document.querySelector("aside");
const profile = document.getElementById("profile");
const toggleProfileContainer = document.getElementById(
  "toggle-profile-container"
);
const toggleProfile = document.getElementById("toggle-profile");

toggleProfile.onclick = function () {
  profileContainer.classList.toggle("active");
  toggleProfile.classList.toggle("open");
};
// profile

// place to live dropdown
const dropdown = document.getElementById("dropdown");
const dropdownMenu = document.getElementById("dropdown-menu");
const chevronDown = document.getElementById("chevron-down");

dropdown.onclick = function () {
  dropdownMenu.classList.toggle("show");
  chevronDown.classList.toggle("open");
};
// place to live dropdown

// hero carousel
let slidePosition = 0;
const slides = document.getElementsByClassName("hero-item");
const totalSlides = slides.length;

document.getElementById("next").addEventListener("click", function () {
  moveToNextSlide();
});
document.getElementById("prev").addEventListener("click", function () {
  moveToPrevSlide();
});

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove("hero-item-visible");
    slide.classList.add("hero-item-hidden");
  }

  slides[slidePosition].classList.add("hero-item-visible");
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}
// hero carousel
