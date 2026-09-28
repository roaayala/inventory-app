export const toggleFilter = () => {
  const dashboardFilterForm = document.getElementById("dashboardFilterForm");

  if (!dashboardFilterForm) return;

  const toggleFilter = document.getElementById("toggleFilter");
  const toggleFilterIcon = document.getElementById("toggleFilterIcon");

  toggleFilter.addEventListener("click", () => {
    toggleFilterIcon.className =
      toggleFilterIcon.className === "btn-icon icon-eye"
        ? "btn-icon icon-eye-off"
        : "btn-icon icon-eye";

    dashboardFilterForm.classList.toggle("hidden");
  });
};
