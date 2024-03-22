{
  penPlus.categories = penPlus.categories || {};

  let getHatBlockVariables = undefined;

  class events_category extends penPlus.penPlusExtension {
    getInfo() {
      getHatBlockVariables = this.getHatBlockVariables;
      return {
        name: "Events",
        id: "events",
        color1: "#ffbf00",
        color2: "#e6ac00",
        color3: "#cc9900",
        blocks: [
          {
            opcode: "vertex",
            type: "hat",
            text: "for each vertex",
            tooltip: "Will be ran per vertex",
          },
          {
            opcode: "pixel",
            type: "hat",
            text: "for each pixel",
            tooltip: "Will be ran per pixel",
          },
        ],
      };
    }

    vertex(block, generator) {
      return `//Vertex Shader\nvoid vertex() {\n${getHatBlockVariables()}\ngl_Position = a_position;\nv_texCoord = a_texCoord;\nv_color = a_color;${nextBlockToCode(
        block,
        generator
      )}\n}`;
    }

    pixel(block, generator) {
      return `//Fragment Shader\nvoid fragment() {\ngl_FragColor = v_color;\n${getHatBlockVariables()}\n${nextBlockToCode(
        block,
        generator
      )}\n}`;
    }
  }

  penPlus.categories.events = events_category;
}
