{
  penPlus.categories = penPlus.categories || {};

  class color_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Colors",
        id: "colors",
        color1: "#CF63CF",
        color2: "#C94FC9",
        color3: "#BD42BD",
        blocks: [
          {
            opcode: "hsv",
            type: "reporter",
            text: "hue:%1 saturation:%2 value:%3",
            tooltip: "An HSV block simple",
            output: "vec4",
            arguments: [
              {
                type: "input_value",
                name: "hue",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "sat",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "val",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "hsva",
            type: "reporter",
            text: "hue:%1 saturation:%2 value:%3 alpha:%4",
            tooltip: "An HSV block simple",
            output: "vec4",
            arguments: [
              {
                type: "input_value",
                name: "hue",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "sat",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "val",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "a",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
            ],
          },
          "---",
          "range is 0-255",
          {
            opcode: "rgb",
            type: "reporter",
            text: "red:%1 green:%2 blue:%3",
            tooltip: "An HSV block simple",
            output: "vec4",
            arguments: [
              {
                type: "input_value",
                name: "r",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
              {
                type: "input_value",
                name: "g",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
              {
                type: "input_value",
                name: "b",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
            ],
          },
          {
            opcode: "rgba",
            type: "reporter",
            text: "red:%1 green:%2 blue:%3 alpha:%4",
            tooltip: "An HSV block simple",
            output: "vec4",
            arguments: [
              {
                type: "input_value",
                name: "r",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
              {
                type: "input_value",
                name: "g",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
              {
                type: "input_value",
                name: "b",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
              {
                type: "input_value",
                name: "a",
                shadow: {
                  type: "number_NOFLOAT_reporter",
                },
              },
            ],
          },
        ],
      };
    }

    hsv(block, generator) {
      const hue = generator.valueToCode(block, "hue", Order.ATOMIC);
      const sat = generator.valueToCode(block, "sat", Order.ATOMIC);
      const val = generator.valueToCode(block, "val", Order.ATOMIC);
      return [`HSVToRGB(${hue},${sat},${val},1.0)`, Order.ATOMIC];
    }

    hsva(block, generator) {
      const hue = generator.valueToCode(block, "hue", Order.ATOMIC);
      const sat = generator.valueToCode(block, "sat", Order.ATOMIC);
      const val = generator.valueToCode(block, "val", Order.ATOMIC);
      const a = Number(generator.valueToCode(block, "a", Order.ATOMIC));
      return [
        `HSVToRGB(${hue},${sat},${val},float(${a * 0.00392156862}))`,
        Order.ATOMIC,
      ];
    }

    rgb(block, generator) {
      const r = Number(generator.valueToCode(block, "r", Order.ATOMIC));
      const g = Number(generator.valueToCode(block, "g", Order.ATOMIC));
      const b = Number(generator.valueToCode(block, "b", Order.ATOMIC));
      console.log(r, g, b);
      return [
        `vec4(${r * 0.00392156862},${g * 0.00392156862},${
          b * 0.00392156862
        },1.0)`,
        Order.ATOMIC,
      ];
    }

    rgba(block, generator) {
      const r = Number(generator.valueToCode(block, "r", Order.ATOMIC));
      const g = Number(generator.valueToCode(block, "g", Order.ATOMIC));
      const b = Number(generator.valueToCode(block, "b", Order.ATOMIC));
      const a = Number(generator.valueToCode(block, "a", Order.ATOMIC));
      return [
        `vec4(${r * 0.00392156862},${g * 0.00392156862},${b * 0.00392156862},${
          a * 0.00392156862
        })`,
        Order.ATOMIC,
      ];
    }
  }

  penPlus.categories.color = color_category;
}
