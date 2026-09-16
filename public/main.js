const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileNav = document.getElementById("mobileNav");
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");

mobileMenuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

const toggleFilter = document.getElementById("toggleFilter");
const toggleFilterIcon = document.getElementById("toggleFilterIcon");
const dashboardFilterForm = document.getElementById("dashboardFilterForm");

toggleFilter.addEventListener("click", () => {
  toggleFilterIcon.className =
    toggleFilterIcon.className === "icon-button icon-eye"
      ? "icon-button icon-eye-off"
      : "icon-button icon-eye";

  dashboardFilterForm.classList.toggle("none");
});
