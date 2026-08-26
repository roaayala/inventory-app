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
