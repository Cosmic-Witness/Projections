const pages = [...document.querySelectorAll(".page")];
const currentPage = document.querySelector("#current-page");
const progressBar = document.querySelector("#progress-bar");

function showPage(pageNumber) {
  currentPage.textContent = String(pageNumber);
  progressBar.style.width = `${(pageNumber / pages.length) * 100}%`;
}

if ("IntersectionObserver" in window) {
  const visiblePages = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visiblePages.set(entry.target, entry.intersectionRatio);
        } else {
          visiblePages.delete(entry.target);
        }
      }

      const mostVisible = [...visiblePages.entries()].sort((a, b) => b[1] - a[1])[0];
      if (mostVisible) {
        showPage(Number(mostVisible[0].dataset.page));
      }
    },
    { threshold: [0.12, 0.25, 0.5, 0.75] },
  );

  pages.forEach((page) => observer.observe(page));
}
