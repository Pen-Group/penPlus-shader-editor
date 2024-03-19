(function () {
  const fullScreen = document.getElementById("FullScreen");
  const squareButton = document.getElementById("SquareButton");
  const triangleButton = document.getElementById("TriangleButton");

  penPlus.previewMode =
    localStorage.getItem("preferredPreviewMode") === null
      ? "triangle"
      : localStorage.getItem("preferredPreviewMode");

  fullScreen.onclick = () => {
    penPlus.previewMode = "fullscreen";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
  };

  squareButton.onclick = () => {
    penPlus.previewMode = "square";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
  };

  triangleButton.onclick = () => {
    penPlus.previewMode = "triangle";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
  };
})();
