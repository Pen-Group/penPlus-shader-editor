{
  penPlus.categories = penPlus.categories || {};

  penPlus.structs = [];

  penPlus.addEventListener("onCompileStart", () => {
    penPlus.structs = [];
  });

  let argCount = 0;

  function __colorCustomBlock(customBlockType) {
    switch (customBlockType) {
      case "highp float":
        return "variables_blocks";

      case "int":
        return "int_blocks";

      case "highp vec2":
        return "vector_blocks";

      case "highp vec3":
        return "vec3_blocks";

      case "highp vec4":
        return "vec4_blocks";

      case "highp mat2":
        return "matrix_blocks";

      case "highp mat3":
        return "matrix_blocks";

      case "highp mat4":
        return "matrix_blocks";

      default:
        return "myblocks_blocks";
    }
  }

  function __glslifyName(Name) {
    return Name.replaceAll(/([\W\s])+/g, "_");
  }

  class struct_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Structs",
        id: "structs",
        color1: "#9CACD3",
        color2: "#8592B5",
        color3: "#7683A2",
        blocks: [
          {
            opcode: "structDef",
            type: "hat_customBlock",
            text: "define %1 that is made of %2",
            tooltip: "A Custom Variable Type!",
            arguments: [
              {
                type: "input_value",
                name: "name",

                shadow: {
                  type: "string_reporter",
                },
              },
              {
                type: "input_statement",
                name: "arguments",
                check: "StructBlockArgument",
              },
            ],
          },
          {
            opcode: "structComponent",
            type: "command",
            text: "component %1 of type %2",
            tooltip: "A part of a struct",
            nextStatement: "StructBlockArgument",
            previousStatement: "StructBlockArgument",
            //style: "return_block", I somewhat like this gray
            arguments: [
              {
                type: "input_value",
                name: "name",

                shadow: {
                  type: "string_reporter",
                },
              },
              penPlus.createMenu(
                [
                  ["float", "highp float"],
                  ["int", "int"],
                  ["vector 2", "highp vec2"],
                  ["vector 3", "highp vec3"],
                  ["vector 4", "highp vec4"],
                  ["mat2", "highp mat2"],
                  ["mat3", "highp mat3"],
                  ["mat4", "highp mat4"],
                ],
                "type"
              ),
            ],
          },
        ],
      };
    }

    structDef(block, generator) {
      //Cheap hack
      let name = generator.valueToCode(block, "name", Order.ATOMIC);

      if (name.length == 0) name = "no name!";

      argCount = 0;

      const contents = generator.statementToCode(block, "arguments");

      penPlus.structs.push({
        name: name,
        contents: contents,
      });

      return `struct ${__glslifyName(name)}{${contents}\n};\n`;
    }

    structComponent(block, generator) {
      const customBlockType = block.getFieldValue("type");

      block.setStyle(__colorCustomBlock(customBlockType));

      let argumentName = generator.valueToCode(block, "name", Order.ATOMIC);

      argCount += 1;

      if (argumentName.length == 0) argumentName = `arg${argCount}`;

      let nextCode = nextBlockToCode(block, generator);

      return `\n${customBlockType} ${__glslifyName(argumentName)};${nextCode}`;
    }
  }

  penPlus.categories.structs = struct_category;
}
