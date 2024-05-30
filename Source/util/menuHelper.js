(function () {
  penPlus.createMenu = (contents, named) => {
    return {
      type: "field_dropdown",
      name: named,
      options: contents,
    };
  };

  penPlus.createGrid = (contents, named, columns) => {
    return {
      type: "field_grid_dropdown",
      name: named,
      columns: columns,
      options: contents,
    };
  };

  penPlus.createModal = (HTML) => {
    const modal = {
      background: document.createElement("div"),
    };

    modal.background.style.backgroundColor = "#00000066";
    modal.background.style.width = "100%";
    modal.background.style.height = "100%";
    modal.background.style.position = "absolute";
    modal.background.style.left = "0px";
    modal.background.style.top = "0px";

    modal.background.innerHTML = HTML;

    modal.background.style.zIndex = "50000";

    document.body.appendChild(modal.background);

    modal.close = () => {
      document.body.removeChild(modal.background);
    };

    return modal;
  };
})();
