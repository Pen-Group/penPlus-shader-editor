{
  penPlus.categories = penPlus.categories || {};

  class looks_category extends penPlus.penPlusExtension {
    getInfo() {
      penPlus.addBlockColorSet("texture_blocks", "#b464e7", "#a755cf", "#9a48c4");
      penPlus.addBlockColorSet("cubemap_blocks", "#8672ff", "#7465d6", "#6657cb");
      return {
        name: "Looks",
        id: "looks",
        color1: "#9966ff",
        color2: "#855cd6",
        color3: "#774dcb",
        blocks: [
          "---",
          {
            opcode: "setVertColor",
            type: "command",
            text: "set vertex colour to %1",
            tooltip: "Changes the vertex's color value a desired color.",
            arguments: [
              {
                type: "input_value",
                name: "COLOR",
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
          },
          {
            opcode: "mulBlending",
            type: "command",
            text: "apply multiplicative blending",
            tooltip: "Does the operation RGB * A",
          },
          "---",
          {
            opcode: "setPixU",
            type: "command",
            text: "set u to %1",
            tooltip: "Sets the current U position",
            arguments: [
              {
                type: "input_value",
                name: "U",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "setPixV",
            type: "command",
            text: "set v to %1",
            tooltip: "Sets the current V coordinate",
            arguments: [
              {
                type: "input_value",
                name: "V",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "changePixU",
            type: "command",
            text: "change u by %1",
            tooltip: "changes the current U coordinate by a value",
            arguments: [
              {
                type: "input_value",
                name: "U",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "changePixV",
            type: "command",
            text: "change v by %1",
            tooltip: "changes the current V coordinate by a value",
            arguments: [
              {
                type: "input_value",
                name: "V",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "pixUV",
            type: "reporter",
            text: "current uv",
            output: "vec2",
            tooltip: "The current U position",
          },
          {
            opcode: "pixU",
            type: "reporter",
            text: "u coordinate",
            tooltip: "The current U position",
          },
          {
            opcode: "pixV",
            type: "reporter",
            text: "v coordinate",
            tooltip: "The current V coordinate",
          },
          "---",
          "Sampling",
          /*{
            opcode: "mainTex",
            type: "reporter",
            output: "texture",
            text: "main texture",
            style: "texture_blocks",
            tooltip: "The main texture of the triangle",
          },*/
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

                shadow: {
                  type: "looks_pixUV",
                },
              },
              {
                type: "input_value",
                name: "TEXTURE",
              },
            ],
          },
          {
            opcode: "sample_cubemap",
            type: "reporter",
            text: "color at %1 of cubemap %2",
            tooltip: "Sample the pixel at the UV coordinates desired",
            style: "cubemap_blocks",

            arguments: [
              {
                type: "input_value",
                name: "UVW",
                shadow: {
                  type: "vec3_reporter",
                },
              },
              {
                type: "input_value",
                name: "TEXTURE",
              },
            ],
          },
        ],
      };
    }

    setPixColor(block, generator) {
      const colour = generator.valueToCode(block, "COLOR", Order.ATOMIC);
      return `${penPlus.colorVariable} = ${colour};` + nextBlockToCode(block, generator);
    }

    getPixColor() {
      return [`${penPlus.colorVariable}`, Order.ATOMIC];
    }

    mulBlending(block, generator) {
      return `${penPlus.colorVariable}.rgb *= vec3(${penPlus.colorVariable}.a);` + nextBlockToCode(block, generator);
    }

    setVertColor(block, generator) {
      const colour = generator.valueToCode(block, "COLOR", Order.ATOMIC);
      return `v_color = ${colour};` + nextBlockToCode(block, generator);
    }

    getVertColor() {
      return [`v_color`, Order.ATOMIC];
    }

    setPixU(block, generator) {
      const U = generator.valueToCode(block, "U", Order.ATOMIC);
      return `v_texCoord.x = float(${U});` + nextBlockToCode(block, generator);
    }

    setPixV(block, generator) {
      const V = generator.valueToCode(block, "V", Order.ATOMIC);
      return `v_texCoord.y = float(${V});` + nextBlockToCode(block, generator);
    }

    changePixU(block, generator) {
      const U = generator.valueToCode(block, "U", Order.ATOMIC);
      return `v_texCoord.x += float(${U});` + nextBlockToCode(block, generator);
    }

    changePixV(block, generator) {
      const V = generator.valueToCode(block, "V", Order.ATOMIC);
      return `v_texCoord.y += float(${V});` + nextBlockToCode(block, generator);
    }

    pixUV() {
      return [`v_texCoord`, Order.ATOMIC];
    }

    pixU() {
      return [`v_texCoord.x`, Order.ATOMIC];
    }

    pixV() {
      return [`v_texCoord.y`, Order.ATOMIC];
    }

    mainTex() {
      return [`u_texture`, Order.ATOMIC];
    }

    sample_texture(block, generator) {
      const TEXTURE = generator.valueToCode(block, "TEXTURE", Order.ATOMIC);
      const UV = generator.valueToCode(block, "UV", Order.ATOMIC);
      return [`texture${penPlus.is300Version ? "" : "2D"}(${TEXTURE},${UV})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    sample_cubemap(block, generator) {
      const TEXTURE = generator.valueToCode(block, "TEXTURE", Order.ATOMIC);
      const UVW = generator.valueToCode(block, "UVW", Order.ATOMIC);
      return [`texture${penPlus.is300Version ? "" : "Cube"}(${TEXTURE},${UVW})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }
  }

  penPlus.categories.looks = looks_category;
}
