export const toggleFilter = () => {
  const dashboardFilterForm = document.getElementById("dashboardFilterForm");

  if (!dashboardFilterForm) return;

  const toggleFilter = document.getElementById("toggleFilter");
  const toggleFilterIcon = document.getElementById("toggleFilterIcon");

  toggleFilter.addEventListener("click", () => {
    toggleFilterIcon.className =
      toggleFilterIcon.className === "button-icon icon-eye"
        ? "button-icon icon-eye-off"
        : "button-icon icon-eye";

    dashboardFilterForm.classList.toggle("hidden");
  });
};
