document.addEventListener("DOMContentLoaded", function () {
  const primaryMobileNav = document.querySelector(".primary-hamburger");
  const primaryNavbar = document.querySelector(".primary-menubar");
  const secondaryMobileNav = document.querySelector(".secondary-hamburger");
  const secondaryNavbar = document.querySelector(".secondary-menubar");

  const toggleNav = (navbar, mobileNav) => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("hamburger-active");
  };

  primaryMobileNav.addEventListener("click", function () {
    toggleNav(primaryNavbar, primaryMobileNav);
  });

  secondaryMobileNav.addEventListener("click", function () {
    toggleNav(secondaryNavbar, secondaryMobileNav);
  });
});
