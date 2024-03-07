(function () {
  document
    .getElementById("prevAndConsole")
    .addEventListener("mouseover", () => {
      document.body.style.setProperty("--PreviewStylesPopout", "8px");
    });

  document.getElementById("prevAndConsole").addEventListener("mouseout", () => {
    document.body.style.setProperty("--PreviewStylesPopout", "-48px");
  });
})();
