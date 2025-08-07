{
  penPlus.categories = penPlus.categories || {};

  class glsl_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Injection",
        id: "injection",
        color1: "#9CACD3",
        color2: "#8592B5",
        color3: "#7683A2",
        blocks: [
          {
            opcode: "hatInjection",
            type: "hatNoNext",
            text: "inject %1 into script",
            tooltip: "A Custom Variable Type!",
            arguments: [
              {
                type: "field_multilinetext",
                name: "code",
                spellcheck: false,
              },
            ],
          },
          {
            opcode: "commandInjection",
            type: "command",
            text: "inject %1 into script",
            tooltip: "A Custom Variable Type!",
            arguments: [
              {
                type: "field_multilinetext",
                name: "code",
                spellcheck: false,
              },
            ],
          },
          {
            opcode: "reporterInjection",
            type: "reporter",
            text: "inject %1 into script",
            tooltip: "A Custom Variable Type!",
            arguments: [
              {
                type: "field_multilinetext",
                name: "code",
                spellcheck: false,
              },
            ],
          },
          {
            opcode: "booleanrInjection",
            type: "boolean",
            text: "inject %1 into script",
            tooltip: "A Custom Variable Type!",
            arguments: [
              {
                type: "field_multilinetext",
                name: "code",
                spellcheck: false,
              },
            ],
          },
        ],
      };
    }

    hatInjection(block, generator) { return `${block.getFieldValue("code")}`; }
    commandInjection(block, generator) { return `${block.getFieldValue("code")}` + nextBlockToCode(block, generator); }
    reporterInjection(block, generator) { return [`${block.getFieldValue("code")}`, Order.ATOMIC]; }
    booleanrInjection(block, generator) { return [`${block.getFieldValue("code")}`, Order.ATOMIC]; }
  }

  penPlus.categories.glsl = glsl_category;
}
