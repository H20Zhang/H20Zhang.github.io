$(document).ready(function () {
  // toggle publication disclosures with native keyboard-accessible buttons
  function togglePublicationPanel(trigger, panelClass) {
    const button = $(trigger);
    const entry = button.closest("[id]");
    const panel = entry.find(`.${panelClass}.hidden`).first();
    const shouldOpen = !panel.hasClass("open");

    entry.find(".hidden.open").removeClass("open").attr("hidden", "");
    entry.find(".links button[aria-expanded='true']").attr("aria-expanded", "false");
    panel.toggleClass("open", shouldOpen).prop("hidden", !shouldOpen);
    button.attr("aria-expanded", shouldOpen ? "true" : "false");
  }

  $(".links button.abstract").click(function () {
    togglePublicationPanel(this, "abstract");
  });
  $(".links button.award").click(function () {
    togglePublicationPanel(this, "award");
  });
  $(".links button.bibtex").click(function () {
    togglePublicationPanel(this, "bibtex");
  });
  $(".links button.video").click(function () {
    togglePublicationPanel(this, "video");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
