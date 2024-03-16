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

  penPlus.rgbToBrightest = (rgb) => {
    if (rgb.r > rgb.g && rgb.r > rgb.b) {
      return rgb.r;
    }
    if (rgb.g > rgb.r && rgb.g > rgb.b) {
      return rgb.g;
    }
    if (rgb.b > rgb.r && rgb.b > rgb.g) {
      return rgb.b;
    }
    return 0;
  };

  penPlus.rgbToBrightest = (rgb) => {
    rgb = penPlus.hexToRgb(rgb);
    if (rgb.r > rgb.g && rgb.r > rgb.b) {
      return rgb.r;
    }
    if (rgb.g > rgb.r && rgb.g > rgb.b) {
      return rgb.g;
    }
    if (rgb.b > rgb.r && rgb.b > rgb.g) {
      return rgb.b;
    }
    return 0;
  };

  penPlus.brightnessByColor = (color) => {
    var color = "" + color,
      isHEX = color.indexOf("#") == 0,
      isRGB = color.indexOf("rgb") == 0;
    if (isHEX) {
      const hasFullSpec = color.length == 7;
      var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
      if (m)
        var r = parseInt(m[0] + (hasFullSpec ? "" : m[0]), 16),
          g = parseInt(m[1] + (hasFullSpec ? "" : m[1]), 16),
          b = parseInt(m[2] + (hasFullSpec ? "" : m[2]), 16);
    }
    if (isRGB) {
      var m = color.match(/(\d+){3}/g);
      if (m)
        var r = m[0],
          g = m[1],
          b = m[2];
    }
    if (typeof r != "undefined") return (r * 299 + g * 587 + b * 114) / 1000;
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

  penPlus.addBlockColorSet = (name, color1, color2, color3, text) => {
    penPlus.penPlusTheme.blockStyles[name] = {
      colourPrimary: penPlus.customBlockColors[name]
        ? penPlus.customBlockColors[name].colourPrimary
        : color1,
      colourSecondary: penPlus.customBlockColors[name]
        ? penPlus.customBlockColors[name].colourSecondary
        : color2,
      colourTertiary: penPlus.customBlockColors[name]
        ? penPlus.customBlockColors[name].colourTertiary
        : color3,
      colorText: penPlus.customBlockColors[name]
        ? penPlus.customBlockColors[name].colorText
        : text || penPlus.brightnessByColor(color1) >= 200
        ? "#000000"
        : "#ffffff",
    };

    document.body.style.setProperty(
      `--${name}`,
      penPlus.customBlockColors[name]
        ? penPlus.customBlockColors[name].colourPrimary
        : color1
    );

    workspace.getToolbox().refreshSelection();

    penPlus.refreshTheme();
  };
})();
