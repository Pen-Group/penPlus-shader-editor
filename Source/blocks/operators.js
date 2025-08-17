{
  penPlus.categories = penPlus.categories || {};

  class operators_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Operators",
        id: "operators",
        color1: "#59c059",
        color2: "#46b946",
        color3: "#389438",
        blocks: [
          {
            opcode: "add",
            type: "reporter",
            text: "%1+%2",
            tooltip: "Add two numbers together",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "sub",
            type: "reporter",
            text: "%1-%2",
            tooltip: "Subtract 2 numbers from each other",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "mul",
            type: "reporter",
            text: "%1*%2",
            tooltip: "Multiplies two numbers together",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "div",
            type: "reporter",
            text: "%1/%2",
            tooltip: "Divide 2 numbers from each other",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "pow",
            type: "reporter",
            text: "%1^%2",
            tooltip: "Puts the first number to the power of the second number",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          "---",
          {
            opcode: "equal",
            type: "boolean",
            text: "%1=%2",
            tooltip: "Returns true if two numbers are equal.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "notequal",
            text: "%1≠%2",
            type: "boolean",
            tooltip: "Returns true if two numbers are not equal.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "less",
            type: "boolean",
            text: "%1<%2",
            tooltip: "Returns true if the first number is less than the second.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "equalLess",
            type: "boolean",
            text: "%1≤%2",
            tooltip: "Returns true if the first number is less than or equal to the second.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "more",
            type: "boolean",
            text: "%1>%2",
            tooltip: "Returns true if the first number is more than the second.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "equalMore",
            type: "boolean",
            text: "%1≥%2",
            tooltip: "Returns true if the first number is more than or equal to the second.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          "---",
          {
            opcode: "and",
            type: "boolean",
            text: "%1and%2",
            tooltip: "Returns true if and only if both are true.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                check: "Boolean",
              },
              {
                type: "input_value",
                name: "B",
                check: "Boolean",
              },
            ],
          },
          {
            opcode: "or",
            type: "boolean",
            text: "%1or%2",
            tooltip: "Returns true if one is true.",
            arguments: [
              {
                type: "input_value",
                name: "A",
                check: "Boolean",
              },
              {
                type: "input_value",
                name: "B",
                check: "Boolean",
              },
            ],
          },
          {
            opcode: "not",
            type: "boolean",
            text: "not%1",
            tooltip: "Opposite of the input",
            arguments: [
              {
                type: "input_value",
                name: "A",
                check: "Boolean",
              },
            ],
          },
          "---",
          {
            opcode: "true",
            type: "boolean",
            text: "true",
            tooltip: "Always true",
          },
          {
            opcode: "false",
            type: "boolean",
            text: "false",
            tooltip: "Always false",
          },
          "---",
          {
            opcode: "fract",
            type: "reporter",
            text: "fractional %1",
            tooltip: "get the decimal part of a number",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "mod",
            type: "reporter",
            text: "%1mod%2",
            tooltip: "Get the remainder of the division of the two numbers",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "arith",
            type: "reporter",
            text: "%1 of %2",
            tooltip: "Performs the desired arithmatic operation",

            arguments: [
              penPlus.createMenu(
                [
                  ["abs", "abs"],
                  ["floor", "floor"],
                  ["ceiling", "ceil"],
                  ["sqrt", "sqrt"],
                  ["sin", "sin"],
                  ["cos", "cos"],
                  ["tan", "tan"],
                  ["asin", "asin"],
                  ["acos", "acos"],
                  ["atan", "atan"],
                  ["ln", "log"],
                  ["log", "log10"],
                  ["e^", "exp"],
                  ["10^", "tenpow"],
                ],
                "arithmatic"
              ),
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "atan2",
            type: "reporter",
            text: "atan2 x: %1 y: %2",
            tooltip: "atan(Y/X)",
            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "smoothstep",
            type: "reporter",
            text: "smooth %1 and %2 by %3",
            tooltip: "Uses the smooth step operator and steps by the third number",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "C",

                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          "---",
          {
            opcode: "min",
            type: "reporter",
            text: "%1min%2",
            tooltip: "if A > B then B = A",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "max",
            type: "reporter",
            text: "%1max%2",
            tooltip: "if A > B then A = B",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode:"clamp",
            type: "reporter",
            text: "clamp %1 between %2 and %3",
            tooltip: "if A < B then A = B, if A > C then A = C",

            arguments: [
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "C",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          "---",
          {
            opcode:"random",
            type: "reporter",
            text: "random %1 between %2 and %3",
            tooltip: "if A < B then A = B, if A > C then A = C",

            arguments: [
              penPlus.createMenu(
                [
                  ["float", "x"],
                  ["vector 2", "xy"],
                  ["vector 3", "xyz"],
                  ["vector 4", "xyzw"],
                ],
                "A"
              ),
              {
                type: "input_value",
                name: "B",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "C",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },          
          "---",
          {
            opcode: "cast",
            type: "reporter",
            text: "cast %2 to %1",
            tooltip: "Cast something to be another value",
            arguments: [
              penPlus.createMenu(
                [
                  ["float", "float"],
                  ["integer", "int"],
                  ["vector 2", "vec2"],
                  ["vector 3", "vec3"],
                  ["vector 4", "vec4"],
                  ["matrix 2x2", "mat2"],
                  ["matrix 3x3", "mat3"],
                  ["matrix 4x4", "mat4"],
                ],
                "to"
              ),
              {
                type: "input_value",
                name: "A",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
        ],
      };
    }

    add(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} + ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    sub(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} - ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    mul(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} * ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    div(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} / ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    pow(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`pow(${A}, ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    equal(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} == ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    notequal(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} != ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    less(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} < ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    equalLess(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} <= ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    more(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} > ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    equalMore(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} >= ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    and(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} && ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    or(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`(${A} || ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    not(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      return [`(!${A})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    true(block, generator) {
      return [`true` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    false(block, generator) {
      return [`false` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    mod(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`mod(${A},${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    arith(block, generator) {
      const arith = block.getFieldValue("arithmatic");
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      return [`${arith}(${A})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    atan2(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`atan(${A}, ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    smoothstep(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      const C = generator.valueToCode(block, "C", Order.ATOMIC);
      return [`smoothstep(${A}, ${B}, ${C})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    min(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`min(${A},${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    max(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      return [`max(${A},${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    clamp(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      const C = generator.valueToCode(block, "C", Order.ATOMIC);
      return [`clamp(${A},${B},${C})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    random(block, generator) {
      const A = block.getFieldValue("A");
      const B = generator.valueToCode(block, "B", Order.ATOMIC);
      const C = generator.valueToCode(block, "C", Order.ATOMIC);
      return [`daveRandomRange(${B},${C}).${A}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    cast(block, generator) {
      const to = block.getFieldValue("to");
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      return [`${to}(${A})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    fract(block, generator) {
      const A = generator.valueToCode(block, "A", Order.ATOMIC);
      return [`fract(${A})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }
  }

  penPlus.categories.operators = operators_category;
}
