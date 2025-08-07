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
      penPlus.compileFunction = "vertex";
      return `//Vertex Shader
void vertex() {
  ${getHatBlockVariables()}
  gl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);
  v_texCoord = a_texCoord;
  v_color = a_color;
  ${nextBlockToCode(block, generator)}
}`;
    }

    pixel(block, generator) {
      penPlus.compileFunction = "fragment";
      return `//Fragment Shader
void fragment() {
  gl_FragColor = v_color;
  ${getHatBlockVariables()}
  ${nextBlockToCode(block, generator)}
}`;
    }
  }

  penPlus.categories.events = events_category;
}
