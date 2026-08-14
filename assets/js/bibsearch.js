import { highlightSearchTerm } from "./highlight-search-term.js";

document.addEventListener("DOMContentLoaded", function () {
  // actual bibsearch logic
  const filterItems = (searchTerm) => {
    document.querySelectorAll(".bibliography, .unloaded").forEach((element) => element.classList.remove("unloaded"));

    // highlight-search-term
    if (CSS.highlights) {
      const nonMatchingElements = highlightSearchTerm({ search: searchTerm, selector: ".bibliography > li" });
      if (nonMatchingElements == null) {
        return;
      }
      nonMatchingElements.forEach((element) => {
        element.classList.add("unloaded");
      });
    } else {
      // Simply add unloaded class to all non-matching items if Browser does not support CSS highlights
      document.querySelectorAll(".bibliography > li").forEach((element) => {
        const text = element.innerText.toLowerCase();
        if (text.indexOf(searchTerm) == -1) {
          element.classList.add("unloaded");
        }
      });
    }

    document.querySelectorAll("h2.bibliography").forEach(function (element) {
      let iterator = element.nextElementSibling; // get next sibling element after h2, which can be h3 or ol
      let hideFirstGroupingElement = true;
      // iterate until next group element (h2), which is already selected by the querySelectorAll(-).forEach(-)
      while (iterator && iterator.tagName !== "H2") {
        if (iterator.tagName === "OL") {
          const ol = iterator;
          const unloadedSiblings = ol.querySelectorAll(":scope > li.unloaded");
          const totalSiblings = ol.querySelectorAll(":scope > li");

          if (unloadedSiblings.length === totalSiblings.length) {
            ol.previousElementSibling.classList.add("unloaded"); // Add the '.unloaded' class to the previous grouping element (e.g. year)
            ol.classList.add("unloaded"); // Add the '.unloaded' class to the OL itself
          } else {
            hideFirstGroupingElement = false; // there is at least some visible entry, don't hide the first grouping element
          }
        }
        iterator = iterator.nextElementSibling;
      }
      // Add unloaded class to first grouping element (e.g. year) if no item left in this group
      if (hideFirstGroupingElement) {
        element.classList.add("unloaded");
      }
    });
  };

  const bibsearch = document.getElementById("bibsearch");
  let activePublicationTarget = null;

  const scrollToPublication = (targetId) => {
    const anchorTarget = targetId ? document.getElementById(targetId) : null;
    const entry = anchorTarget?.closest(".bibliography > li");
    if (!entry) return false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const navbarHeight = document.getElementById("navbar")?.getBoundingClientRect().height || 0;
        const top = entry.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
        window.scrollTo({ top, behavior: "auto" });
      });
    });
    return true;
  };

  const updateInputField = () => {
    const hashValue = decodeURIComponent(window.location.hash.substring(1)); // Remove the '#' character
    const queryTarget = new URLSearchParams(window.location.search).get("paper");
    const publicationTarget = queryTarget || hashValue;
    const anchorTarget = publicationTarget ? document.getElementById(publicationTarget) : null;
    const entry = anchorTarget?.closest(".bibliography > li");

    // BibTeX keys are also used as publication anchors. Prefer anchor navigation
    // when the hash identifies a bibliography entry; otherwise keep hash-as-search.
    if (entry) {
      activePublicationTarget = publicationTarget;
      const title = entry.querySelector(".title")?.innerText.trim() || publicationTarget;
      bibsearch.value = title;
      filterItems(title.toLowerCase());
      scrollToPublication(publicationTarget);
      return;
    }

    activePublicationTarget = null;
    bibsearch.value = hashValue;
    filterItems(hashValue);
  };

  // Sensitive search. Only start searching if there's been no input for 300 ms
  let timeoutId;
  bibsearch.addEventListener("input", function () {
    clearTimeout(timeoutId); // Clear the previous timeout
    activePublicationTarget = null;
    const searchTerm = this.value.toLowerCase();
    timeoutId = setTimeout(() => filterItems(searchTerm), 300);
  });

  window.addEventListener("hashchange", updateInputField); // Update the filter when the hash changes

  // Re-apply anchor positioning after all page assets have loaded, since fonts/images
  // above the bibliography can otherwise shift the target after the initial scroll.
  window.addEventListener("load", () => {
    if (activePublicationTarget) {
      scrollToPublication(activePublicationTarget);
    }
  });

  updateInputField(); // Update filter when page loads
});
