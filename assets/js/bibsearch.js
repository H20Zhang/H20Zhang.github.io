// Move existing paper nodes between views: IDs, links and open disclosures survive.
document.addEventListener("DOMContentLoaded", () => {
  const explorer = document.getElementById("publication-explorer");
  const input = document.getElementById("bibsearch");
  if (!explorer || !input) return;
  const host = document.getElementById("publication-groups");
  const sections = Array.from(host.querySelectorAll(".publication-group"));
  const papers = Array.from(host.querySelectorAll("li[data-paper-id]"));
  const byId = new Map(papers.map((paper) => [paper.dataset.paperId, paper]));
  const areaLists = new Map();
  for (const section of sections) {
    for (const list of section.querySelectorAll("ol.bibliography")) {
      areaLists.set(`${section.dataset.area}:${list.previousElementSibling.textContent.trim()}`, list);
    }
  }
  const yearContainer = document.createElement("div");
  yearContainer.className = "publications publication-year-view";
  const yearLists = new Map();
  for (const year of [...new Set(papers.map((paper) => paper.dataset.year))].sort().reverse()) {
    const heading = document.createElement("h2");
    heading.className = "bibliography";
    heading.textContent = year;
    const list = document.createElement("ol");
    list.className = "bibliography";
    yearContainer.append(heading, list);
    yearLists.set(year, list);
  }
  const searchable = new Map(papers.map((paper) => [paper,
    Array.from(paper.querySelectorAll(".title, .author, .periodical, .abstract"))
      .map((node) => node.textContent).join(" ").replace(/\s+/g, " ").toLowerCase()
  ]));
  const controls = explorer.querySelector(".publication-view-controls");
  const viewButtons = Array.from(controls.querySelectorAll("button"));
  const results = document.getElementById("publication-results");
  const reset = document.getElementById("publication-reset");
  const empty = document.getElementById("publication-empty");
  let view = "area";
  let selectedPaper = null;

  function filter() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const paper of papers) {
      const visible = selectedPaper ? paper.dataset.paperId === selectedPaper :
        terms.every((term) => searchable.get(paper).includes(term));
      paper.hidden = !visible;
      if (visible) count++;
    }
    for (const list of host.querySelectorAll("ol.bibliography")) {
      const visible = Array.from(list.children).some((paper) => !paper.hidden);
      list.hidden = !visible;
      list.previousElementSibling.hidden = !visible;
    }
    for (const section of sections) {
      section.hidden = !Array.from(section.querySelectorAll("li[data-paper-id]")).some((paper) => !paper.hidden);
    }
    results.textContent = count === papers.length ? `${count} papers` : `${count} of ${papers.length} papers`;
    reset.hidden = !input.value.trim() && !selectedPaper;
    empty.hidden = count > 0;
  }

  function setView(next) {
    view = next === "year" ? "year" : "area";
    for (const paper of papers) {
      const list = view === "year" ? yearLists.get(paper.dataset.year) :
        areaLists.get(`${paper.dataset.area}:${paper.dataset.year}`);
      list.append(paper);
    }
    host.replaceChildren(...(view === "year" ? [yearContainer] : sections));
    viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.publicationView === view)));
    filter();
  }

  function saveState() {
    const url = new URL(window.location.href);
    if (view === "year") url.searchParams.set("view", "year");
    else url.searchParams.delete("view");
    if (!selectedPaper) {
      url.searchParams.delete("paper");
      let hash = "";
      try { hash = decodeURIComponent(url.hash.slice(1)); } catch (_) { /* malformed link */ }
      if (byId.has(hash)) url.hash = "";
    }
    if (input.value.trim() && !selectedPaper) url.searchParams.set("q", input.value.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }

  function scrollToTarget(id) {
    const target = byId.get(id) || document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const offset = document.getElementById("navbar")?.getBoundingClientRect().height || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 20, behavior: "auto" });
    }));
  }

  function readState() {
    const url = new URL(window.location.href);
    let hash = "";
    try { hash = decodeURIComponent(url.hash.slice(1)); } catch (_) { /* malformed link */ }
    const paperId = url.searchParams.get("paper") || hash;
    selectedPaper = byId.has(paperId) ? paperId : null;
    input.value = selectedPaper ? byId.get(selectedPaper).querySelector(".title").textContent.trim() : url.searchParams.get("q") || "";
    const isArea = sections.some((section) => section.dataset.area === hash);
    setView(isArea ? "area" : url.searchParams.get("view"));
    if (selectedPaper || isArea) scrollToTarget(selectedPaper || hash);
  }

  input.addEventListener("input", () => { selectedPaper = null; filter(); saveState(); });
  reset.addEventListener("click", () => {
    selectedPaper = null;
    input.value = "";
    filter();
    saveState();
    input.focus();
  });
  viewButtons.forEach((button) => button.addEventListener("click", () => {
    setView(button.dataset.publicationView);
    // A topic hash would otherwise force area view on refresh.
    if (view === "year" && sections.some((section) => `#${section.dataset.area}` === location.hash)) {
      const url = new URL(location.href); url.hash = ""; history.replaceState(null, "", url);
    }
    saveState();
  }));
  explorer.querySelectorAll("a[data-research-area]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    selectedPaper = null;
    input.value = "";
    setView("area");
    const url = new URL(location.href);
    url.hash = link.dataset.researchArea;
    url.searchParams.delete("paper");
    url.searchParams.delete("q");
    url.searchParams.delete("view");
    history.pushState(null, "", url);
    scrollToTarget(link.dataset.researchArea);
  }));
  controls.hidden = false;
  window.addEventListener("hashchange", readState);
  window.addEventListener("popstate", readState);
  window.addEventListener("load", () => { if (selectedPaper) scrollToTarget(selectedPaper); });
  readState();
});
