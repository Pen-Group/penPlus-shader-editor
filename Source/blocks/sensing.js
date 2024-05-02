{
  penPlus.categories = penPlus.categories || {};

  class sensing_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Sensing",
        id: "sensing",
        color1: "#5CB1D6",
        color2: "#47A8D1",
        color3: "#2E8EB8",
        blocks: [
          {
            opcode: "resX",
            type: "reporter",
            text: "stage width",
            tooltip: "The render's width",
          },
          {
            opcode: "resY",
            type: "reporter",
            text: "stage height",
            tooltip: "The render's height",
          },
          "---",
          {
            opcode: "screenU",
            type: "reporter",
            text: "screen U",
            tooltip: "The current U coordinate on screen",
          },
          {
            opcode: "screenV",
            type: "reporter",
            text: "screen V",
            tooltip: "The current V coordinate on screen",
          },
          "---",
          {
            opcode: "pixX",
            type: "reporter",
            text: "pixel x",
            tooltip: "The pixel's X position",
          },
          {
            opcode: "pixY",
            type: "reporter",
            text: "pixel y",
            tooltip: "The pixel's Y position",
          },
          "---",
          {
            opcode: "timer",
            type: "reporter",
            text: "timer",
            
            tooltip: "Just a simple timer",
          },
          "---",
          {
            opcode: "isFrag",
            type: "boolean",
            text: "is pixel?",
            tooltip: "Check if the operation is being done on a pixel or not.",
          },
        ],
      };
    }

    resX() {
      return [`u_res.x`, Order.ATOMIC];
    }

    resY() {
      return [`u_res.y`, Order.ATOMIC];
    }

    pixX() {
      return [`gl_FragCoord.x`, Order.ATOMIC];
    }

    pixY() {
      return [`gl_FragCoord.y`, Order.ATOMIC];
    }

    pixZ() {
      return [`gl_FragCoord.z`, Order.ATOMIC];
    }

    screenU() {
      return [`(gl_FragCoord.x / u_res.x)`, Order.ATOMIC];
    }

    screenV() {
      return [`(gl_FragCoord.y / u_res.y)`, Order.ATOMIC];
    }

    timer() {
      return [`u_timer`, Order.ATOMIC];
    }

    isFrag() {
      return [`penPlus_isFragment`, Order.ATOMIC];
    }
  }

  penPlus.categories.sensing = sensing_category;
}
