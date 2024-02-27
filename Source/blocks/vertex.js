{
  window.categories = window.categories || {};

  class vertex_category extends window.penPlusExtension {
    getInfo() {
      return {
        name: "Vertex",
        id: "vertex",
        color1: "#4c97ff",
        color2: "#4488e6",
        color3: "#3d79cc",
        blocks: [
          {
            opcode: "gotoPosVec4",
            type: "command",
            text: "go to %1",
            arguments: [
              {
                type: "input_value",
                name: "X",
                check:["vec4", "arithmatic"],
                shadow: {
                  type: "vec4_reporter",
                },
              }
            ],
            tooltip: "Set the vertex's screen position to this",
          },
          {
            opcode: "gotoPos",
            type: "command",
            text: "go to x:%1 y:%2",
            arguments: [
              {
                type: "input_value",
                name: "X",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "Y",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Set the vertex's screen position to this",
          },
          {
            opcode: "setZ",
            type: "command",
            text: "set depth to %1",
            arguments: [
              {
                type: "input_value",
                name: "Z",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Set the vertex's Depth or Z to this",
          },
          {
            opcode: "setW",
            type: "command",
            text: "set w to %1",
            arguments: [
              {
                type: "input_value",
                name: "W",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Set the vertex's corner pinch or W value to this",
          },
          "---",
          {
            opcode: "changeX",
            type: "command",
            text: "change x by %1",
            arguments: [
              {
                type: "input_value",
                name: "X",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Change the vertex's x position by the desired value.",
          },
          {
            opcode: "changeY",
            type: "command",
            text: "change y by %1",
            arguments: [
              {
                type: "input_value",
                name: "Y",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Change the vertex's y position by the desired value.",
          },
          {
            opcode: "changeZ",
            type: "command",
            text: "change depth by %1",
            arguments: [
              {
                type: "input_value",
                name: "Z",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Change the vertex's Depth or Z by this",
          },
          {
            opcode: "changeW",
            type: "command",
            text: "change w by %1",
            arguments: [
              {
                type: "input_value",
                name: "W",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
            tooltip: "Change the vertex's corner pinch or W value by this",
          },
          "---",
          {
            opcode: "getX",
            type: "reporter",
            text: "vertex x",
            tooltip: "Get the vertex's X position",
          },
          {
            opcode: "getY",
            type: "reporter",
            text: "vertex y",
            tooltip: "Get the vertex's Y position",
          },
          {
            opcode: "getZ",
            type: "reporter",
            text: "vertex depth",
            tooltip: "Get the vertex's depth or Z position",
          },
          {
            opcode: "getW",
            type: "reporter",
            text: "vertex w",
            tooltip: "Get the vertex's corner pinch or W position",
          },
        ],
      };
    }

    gotoPosVec4(block, generator) {
      const X = generator.valueToCode(block, "X", Order.ATOMIC);
      const Y = generator.valueToCode(block, "Y", Order.ATOMIC);
      return (
        `gl_Position = vec4(${X});` +
        nextBlockToCode(block, generator)
      );
    }

    gotoPos(block, generator) {
      const X = generator.valueToCode(block, "X", Order.ATOMIC);
      const Y = generator.valueToCode(block, "Y", Order.ATOMIC);
      return (
        `gl_Position.xy = vec2(float(${X}),float(${Y}));` +
        nextBlockToCode(block, generator)
      );
    }

    setZ(block, generator) {
      const Z = generator.valueToCode(block, "Z", Order.ATOMIC);
      return `gl_Position.z = float(${Z});` + nextBlockToCode(block, generator);
    }

    setW(block, generator) {
      const W = generator.valueToCode(block, "W", Order.ATOMIC);
      return `gl_Position.w = float(${W});` + nextBlockToCode(block, generator);
    }

    changeX(block, generator) {
      const X = generator.valueToCode(block, "X", Order.ATOMIC);
      return (
        `gl_Position.x += float(${X});` + nextBlockToCode(block, generator)
      );
    }

    changeY(block, generator) {
      const Y = generator.valueToCode(block, "Y", Order.ATOMIC);
      return (
        `gl_Position.y += float(${Y});` + nextBlockToCode(block, generator)
      );
    }

    changeZ(block, generator) {
      const Z = generator.valueToCode(block, "Z", Order.ATOMIC);
      return (
        `gl_Position.z += float(${Z});` + nextBlockToCode(block, generator)
      );
    }

    changeW(block, generator) {
      const W = generator.valueToCode(block, "W", Order.ATOMIC);
      return (
        `gl_Position.w += float(${W});` + nextBlockToCode(block, generator)
      );
    }

    getX(block, generator) {
      return [
        `gl_Position.x` + nextBlockToCode(block, generator),
        Order.ATOMIC,
      ];
    }

    getY(block, generator) {
      return [
        `gl_Position.y` + nextBlockToCode(block, generator),
        Order.ATOMIC,
      ];
    }

    getZ(block, generator) {
      return [
        `gl_Position.z` + nextBlockToCode(block, generator),
        Order.ATOMIC,
      ];
    }

    getW(block, generator) {
      return [
        `gl_Position.w` + nextBlockToCode(block, generator),
        Order.ATOMIC,
      ];
    }
  }

  window.categories.vertex = vertex_category;
}
