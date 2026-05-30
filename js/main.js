const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".ul-navbar");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});
