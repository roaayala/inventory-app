export const mobileNavToggle = () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const menuIcon = document.getElementById("showMenuIcon");
  const closeIcon = document.getElementById("closeMenuIcon");

  mobileMenuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
};
