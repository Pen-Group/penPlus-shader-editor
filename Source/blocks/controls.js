{
  window.categories = window.categories || {};

  class controls_category extends window.penPlusExtension {
    getInfo() {
      return {
        name: "Controls",
        id: "controls",
        color1: "#ffab19",
        color2: "#ec9c13",
        color3: "#cf8b17",
        blocks: [
          {
            opcode: "if",
            type: "command",
            text: "if %1 then %2 %3",
            tooltip: "If the input is true execute the inline code.",
            arguments: [
              {
                type: "input_value",
                check: "Boolean",
                name: "condition",
              },
              {
                type: "input_dummy",
              },
              {
                type: "input_statement",
                name: "true",
              },
            ],
          },
          {
            opcode: "ifelse",
            type: "command",
            text: "if %1 then %2 %3 else %4 %5",
            tooltip: "If the input is true execute the inline code.",
            arguments: [
              {
                type: "input_value",
                name: "condition",
                check: "Boolean",
              },
              {
                type: "input_dummy",
              },
              {
                type: "input_statement",
                name: "true",
              },
              {
                type: "input_dummy",
              },
              {
                type: "input_statement",
                name: "false",
              },
            ],
          },
          {
            opcode: "repeat",
            type: "command",
            text: "repeat %1 %2",
            tooltip: "Repeats the specified amount of times.",
            arguments: [
              {
                type: "input_value",
                name: "times",
                shadow: {
                  type: "int_reporter",
                },
              },
              {
                type: "input_statement",
                name: "code",
              },
            ],
          },
        ],
      };
    }

    if(block, generator) {
      const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
      const trueExec = generator.statementToCode(block, "true");
      return `if (${condition}) {\n${trueExec}\n}`;
    }

    ifelse(block, generator) {
      const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
      const trueExec = generator.statementToCode(block, "true");
      const falseExec = generator.statementToCode(block, "false");
      return `if (${condition}) {\n${trueExec}\n}\nelse{\n${falseExec}\n}`;
    }

    repeat(block, generator) {
      const times = generator.valueToCode(block, "times", Order.ATOMIC);
      const code = generator.statementToCode(block, "code");
      window.loopID += 1;
      return `for (int penPlusLoop_${loopID}=0;penPlusLoop_${loopID}<${times};penPlusLoop_${loopID}++) {\n${code}\n}`;
    }
  }

  window.categories.controls = controls_category;
}
