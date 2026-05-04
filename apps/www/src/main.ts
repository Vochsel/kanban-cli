// Entry point for the kanban-md explainer site. The page is mostly static;
// this file exists so Vite has a module to attach to and so we have a place
// to add interactivity later.

const year = new Date().getFullYear();
const footerYearEl = document.querySelector("[data-year]");
if (footerYearEl) {
  footerYearEl.textContent = String(year);
}
