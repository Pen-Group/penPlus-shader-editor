{
  window.categories = window.categories || {};

  class looks_category extends window.penPlusExtension {
    getInfo() {
      addBlockColorSet("texture_blocks", "#b464e7", "#a755cf", "#9a48c4");
      addBlockColorSet("cubemap_blocks", "#8672ff", "#7465d6", "#6657cb");
      return {
        name: "Looks",
        id: "looks",
        color1: "#9966ff",
        color2: "#855cd6",
        color3: "#774dcb",
        blocks: [
          {
            opcode: "setVertColor",
            type: "command",
            text: "set vertex colour to %1",
            tooltip: "Changes the vertex's color value a desired color.",
            arguments: [
              {
                type: "input_value",
                name: "COLOR",
                check: ["vec4", "vector", "arithmatic"],
                shadow: {
                  type: "color_reporter",
                },
              },
            ],
          },
          {
            opcode: "getVertColor",
            type: "reporter",
            text: "vertex colour",
            tooltip: "Vertex Color",
            output: "vec4",
          },
          "---",
          {
            opcode: "setPixColor",
            type: "command",
            text: "set pixel colour to %1",
            tooltip: "Changes the pixel's color value a desired color.",
            arguments: [
              {
                type: "input_value",
                name: "COLOR",
                check: ["vec4", "vector", "arithmatic"],
                shadow: {
                  type: "color_reporter",
                },
              },
            ],
          },
          {
            opcode: "getPixColor",
            type: "reporter",
            text: "pixel colour",
            tooltip: "Pixel color",
            output: "vec4",
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
          {
            opcode: "pixZ",
            type: "reporter",
            text: "pixel depth",
            tooltip: "The pixel's Y position",
          },
          "---",
          {
            opcode: "resX",
            type: "reporter",
            text: "resolution width",
            tooltip: "The render's width",
          },
          {
            opcode: "resY",
            type: "reporter",
            text: "resolution height",
            tooltip: "The render's height",
          },
          "---",
          "Sampling",
          {
            opcode: "mainTex",
            type: "reporter",
            output:"texture",
            text: "main texture",
            style: "texture_blocks",
            tooltip: "The main texture of the triangle",
          },
          {
            opcode: "sample_texture",
            type: "reporter",
            text: "color at %1 of texture %2",
            tooltip: "Sample the pixel at the UV coordinates desired",
            style: "texture_blocks",
            output: ["vec4", "vector", "arithmatic"],
            arguments: [
              {
                type: "input_value",
                name: "UV",
                check: "vec2",
                shadow: {
                  type: "vec2_reporter",
                },
              },
              {
                type: "input_value",
                name: "TEXTURE",
                check: "texture",
                shadow: {
                  type: "looks_mainTex"
                }
              },
            ],
          },
          {
            opcode: "sample_cubemap",
            type: "reporter",
            text: "color at %1 of cubemap %2",
            tooltip: "Sample the pixel at the UV coordinates desired",
            style: "cubemap_blocks",
            output: "vec4",
            arguments: [
              {
                type: "input_value",
                name: "UVW",
                check: ["vec3", "vector", "arithmatic"],
                shadow: {
                  type: "vec3_reporter",
                },
              },
              {
                type: "input_value",
                name: "TEXTURE",
                check: "cubemap",
              },
            ],
          },
        ],
      };
    }

    setPixColor(block, generator) {
      const colour = generator.valueToCode(block, "COLOR", Order.ATOMIC);
      return `gl_FragColor = ${colour};` + nextBlockToCode(block, generator);
    }

    getPixColor() {
      return [`gl_FragColor`, Order.ATOMIC];
    }

    setVertColor(block, generator) {
      const colour = generator.valueToCode(block, "COLOR", Order.ATOMIC);
      return `v_color = ${colour};` + nextBlockToCode(block, generator);
    }

    getVertColor() {
      return [`v_color`, Order.ATOMIC];
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

    resX() {
      return [`u_res.x`, Order.ATOMIC];
    }

    resY() {
      return [`u_res.y`, Order.ATOMIC];
    }

    mainTex() {
      return [`u_texture`, Order.ATOMIC];
    }

    sample_texture(block, generator) {
      const TEXTURE = generator.valueToCode(block, "TEXTURE", Order.ATOMIC);
      const UV = generator.valueToCode(block, "UV", Order.ATOMIC);
      return `texture2D(${TEXTURE},${UV})` + nextBlockToCode(block, generator);
    }

    sample_cubemap(block, generator) {
      const TEXTURE = generator.valueToCode(block, "TEXTURE", Order.ATOMIC);
      const UVW = generator.valueToCode(block, "UVW", Order.ATOMIC);
      return (
        `textureCube(${TEXTURE},${UVW})` + nextBlockToCode(block, generator)
      );
    }
  }

  window.categories.looks = looks_category;
}
