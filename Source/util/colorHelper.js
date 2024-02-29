(function () {
  penPlus.hexToRgb = (hex) => {
    if (typeof hex === "string") {
      const splitHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return {
        r: parseInt(splitHex[1], 16),
        g: parseInt(splitHex[2], 16),
        b: parseInt(splitHex[3], 16),
      };
    }
    return {
      r: Math.floor(hex / 65536),
      g: Math.floor(hex / 256) % 256,
      b: hex % 256,
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

    modal.background.style.zIndex = "500";

    document.body.appendChild(modal.background);

    modal.close = () => {
      document.body.removeChild(modal.background);
    };

    return modal;
  };

  penPlus.addBlockColorSet = (name, color1, color2, color3) => {
    window.penPlusTheme.blockStyles[name] = {
      colourPrimary: color1,
      colourSecondary: color2,
      colourTertiary: color3,
    };

    workspace.getToolbox().refreshSelection();

    window.refreshTheme();
  };
})();
