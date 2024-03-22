(function () {
  const fullScreen = document.getElementById("FullScreen");
  const cubeButton = document.getElementById("CubeButton");
  const squareButton = document.getElementById("SquareButton");
  const triangleButton = document.getElementById("TriangleButton");

  penPlus.pointCount = 3;

  penPlus.attributeSetters = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]

  penPlus.previewMode =
    localStorage.getItem("preferredPreviewMode") === null
      ? "triangle"
      : localStorage.getItem("preferredPreviewMode");

  switch (penPlus.previewMode) {
    case "triangle":
      penPlus.pointCount = 3;
      break;

    case "square":
      penPlus.pointCount = 4;
      break;

    case "fullscreen":
      penPlus.pointCount = 4;
      break;

    case "cube":
      penPlus.pointCount = 8;
      break;
  
    default:
      break;
  }

  fullScreen.onclick = () => {
    penPlus.previewMode = "fullscreen";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
    penPlus.pointCount = 4;
    penPlus.refreshVariableMenu(true);
    penPlus.refreshMesh();
  };

  squareButton.onclick = () => {
    penPlus.previewMode = "square";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
    penPlus.pointCount = 4;
    penPlus.refreshVariableMenu(true);
    penPlus.refreshMesh();
  };

  cubeButton.onclick = () => {
    penPlus.previewMode = "cube";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
    penPlus.pointCount = 8;
    penPlus.refreshVariableMenu(true);
    penPlus.refreshMesh();
  };

  triangleButton.onclick = () => {
    penPlus.previewMode = "triangle";
    localStorage.setItem("preferredPreviewMode", penPlus.previewMode);
    penPlus.pointCount = 3;
    penPlus.refreshVariableMenu(true);
    penPlus.refreshMesh();
  };
})();
