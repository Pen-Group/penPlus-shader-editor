{
  penPlus.categories = penPlus.categories || {};

  penPlus.blockIterations = {};

  let customBlockArguments = [];

  let getHatBlockVariables = undefined;

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

  function __getShadowForArgumentType(argumentType) {
    switch (argumentType) {
      case "highp float":
        return "number_reporter";

      case "int":
        return "int_reporter";

      case "highp vec2":
        return "vec2_reporter";

      case "highp vec3":
        return "vec3_reporter";

      case "highp vec4":
        return "vec4_reporter";

      case "highp mat2":
        return "matrix2_reporter";

      case "highp mat3":
        return "matrix3_reporter";

      case "highp mat4":
        return "matrix4_reporter";

      case "void":
        return "blank_reporter";

      default:
        return "number_reporter";
    }
  }

  function __glslifyName(Name) {
    return Name.replaceAll(/([\W\s])+/g, "_");
  }

  class myBlocks_category extends penPlus.penPlusExtension {
    getInfo() {
      getHatBlockVariables = this.getHatBlockVariables;
      return {
        name: "My Blocks",
        id: "myblocks",
        color1: "#FF6680",
        color2: "#FF4D6A",
        color3: "#FF3355",
        dynamic: "createCustomBlocks",
        blocks: [
          {
            opcode: "customBlockDef",
            type: "hat_customBlock",
            text: "define %1 inputs %2 as %3 that returns %4",
            tooltip: "A Custom Block!",
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
                check: "CustomBlockArgument",
              },
              {
                type: "input_statement",
                name: "code",
              },
              penPlus.createMenu(
                [
                  ["nothing", "void"],
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
          //unused afriad of if I delete this whole thing will collaspe upon itself
          //Handle with caution
          {
            opcode: "customBlockPreview",
            type: "myBlockShadow",
            text: "default Custom Block",
            tooltip: "A Custom Block!",
            output: "myBlock_Input",
            hideFromPallete: true,
          },
          {
            opcode: "customBlockArgument",
            type: "command",
            text: "argument %1 of type %2",
            tooltip: "A Custom Block!",
            nextStatement: "CustomBlockArgument",
            previousStatement: "CustomBlockArgument",
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
          {
            opcode: "getArg",
            type: "reporter",
            text: "argument %1",
            tooltip: "Get an argument from a custom block",

            arguments: [
              {
                type: "input_value",
                name: "name",

                shadow: {
                  type: "string_reporter",
                },
              },
            ],
          },
          {
            opcode: "customBlockReturn",
            type: "terminal",
            text: "return %1",
            tooltip: "A Custom Block!",
            //style: "struct_block",
            arguments: [
              {
                type: "input_value",
                name: "return",
              },
            ],
          },
          {
            opcode: "customBlockExecute",
            type: "command",
            text: "",
            tooltip: "your custom block!",
            mutator: "customBlockMutator",
            hideFromPallete: true,
          },
          {
            opcode: "customBlockExecute_Reporter",
            type: "reporter",

            text: "",
            tooltip: "your custom block!",
            mutator: "customBlockMutator",
            hideFromPallete: true,
          },
          //Testing custom block do not use in production
          {
            type: "duplicate",
            of: "customBlockExecute",
            hideFromPallete: true,
            extraData: {
              customBlockData: {
                type: "void",
                mainText: "hello",
                scriptTarget: "noneInParticular",
                arguments: [],
              },
            },
          },
        ],
      };
    }

    customBlockDef(block, generator) {
      //Cheap hack
      const customBlockType = block.getFieldValue("type");
      let name = generator.valueToCode(block, "name", Order.ATOMIC);

      if (name.length == 0) name = "no name!";

      //If lily and or anybody else knows a better solution please commit. I freaking beg
      penPlus.customBlockType = customBlockType;
      customBlockArguments = [];

      const innerCode = generator.statementToCode(block, "code");
      argCount = 0;
      const functionArguments = generator.statementToCode(block, "arguments");

      //Stupid Switch statement prob a way to do this without a switch
      block.setStyle(__colorCustomBlock(customBlockType));

      penPlus.customBlocks.push({
        name: name,
        type: customBlockType,
        arguments: customBlockArguments,
      });

      return `${customBlockType} ${__glslifyName(name)}(${functionArguments}) {\n${getHatBlockVariables()}\n${innerCode}\n}\n`;
    }

    customBlockArgument(block, generator) {
      const customBlockType = block.getFieldValue("type");

      block.setStyle(__colorCustomBlock(customBlockType));

      let argumentName = generator.valueToCode(block, "name", Order.ATOMIC);

      argCount += 1;

      if (argumentName.length == 0) argumentName = `arg${argCount}`;

      customBlockArguments.push({
        name: argumentName,
        type: customBlockType,
      });

      let nextCode = nextBlockToCode(block, generator);

      return `${customBlockType} ${__glslifyName("custom_block_arg_" + argumentName)} ${nextCode ? `, ${nextCode}` : ``}`;
    }

    getArg(block, generator) {
      const name = generator.valueToCode(block, "name", Order.ATOMIC);
      return [`custom_block_arg_${__glslifyName(name)}`, Order.ATOMIC];
    }

    customBlockReturn(block, generator) {
      let returnConversion = "";

      switch (penPlus.customBlockType) {
        case "highp float":
          block.setStyle("variables_blocks");
          block.inputList[0].setCheck();
          returnConversion = "float";
          break;

        case "int":
          block.setStyle("int_blocks");
          block.inputList[0].setCheck();
          returnConversion = "int";
          break;

        case "highp vec2":
          block.setStyle("vector_blocks");
          block.inputList[0].setCheck();
          returnConversion = "vec2";
          break;

        case "highp vec3":
          block.setStyle("vec3_blocks");
          block.inputList[0].setCheck();
          returnConversion = "vec3";
          break;

        case "highp vec4":
          block.setStyle("vec4_blocks");
          block.inputList[0].setCheck();
          returnConversion = "vec4";
          break;

        case "highp mat2":
          block.setStyle("matrix_blocks");
          block.inputList[0].setCheck();
          returnConversion = "mat2";
          break;

        case "highp mat3":
          block.setStyle("matrix_blocks");
          block.inputList[0].setCheck();
          returnConversion = "mat3";
          break;

        case "highp mat4":
          block.setStyle("matrix_blocks");
          block.inputList[0].setCheck();
          returnConversion = "mat4";
          break;

        default:
          block.setStyle("myblocks_blocks");
          block.inputList[0].setCheck();
          break;
      }

      const shadowDeisred = penPlus.stringToDOM(`<shadow type="${__getShadowForArgumentType(penPlus.customBlockType)}"></shadow>`);

      if (block.inputList[0].getShadowDom() == null || block.inputList[0].getShadowDom().getAttribute("type") != shadowDeisred.getAttribute("type")) block.inputList[0].setShadowDom(shadowDeisred);
      if (penPlus.customBlockType == "void") block.inputList[0].setCheck("noInput");

      return penPlus.customBlockType == "void" ? `return;` : `return ${returnConversion}(${generator.valueToCode(block, "return", Order.ATOMIC) || 1});\n`;
    }

    customBlockExecute(block, generator) {
      let argString = "";

      for (let argID = 0; argID < block.customBlockData.arguments.length; argID++) {
        const argument = block.customBlockData.arguments[argID];
        argString += (argID > 0 ? "," : "") + generator.valueToCode(block, argument.name, Order.ATOMIC);
      }

      return `${block.customBlockData.scriptTarget}(${argString});\n ${nextBlockToCode(block, generator)}`;
    }

    customBlockExecute_Reporter(block, generator) {
      let argString = "";

      for (let argID = 0; argID < block.customBlockData.arguments.length; argID++) {
        const argument = block.customBlockData.arguments[argID];
        argString += (argID > 0 ? "," : "") + generator.valueToCode(block, argument.name, Order.ATOMIC);
      }

      return [`${block.customBlockData.scriptTarget}(${argString})`, Order.ATOMIC];
    }

    createCustomBlocks(workspace) {
      let createdBlocks = [];

      let customBlockTypeConversionTable = {
        void: "void",
        "highp float": "float",
        int: "int",
        "highp vec2": "vec2",
        "highp vec3": "vec3",
        "highp vec4": "vec4",
        "highp mat2": "matrix_2x",
        "highp mat3": "matrix_3x",
        "highp mat4": "matrix_4x",
      };

      if (penPlus.customBlocks) {
        penPlus.customBlocks.forEach((block) => {
          if (block.name.length == 0) block.name = "no name!";

          let blockJSON = {
            type: "duplicate",
            of: block.type == "void" ? "customBlockExecute" : "customBlockExecute_Reporter",
            //Probably could improve this line lol
            tooltip: "Your custom block!",
            extraData: {
              customBlockData: {
                type: block.type,
                mainText: block.name,
                scriptTarget: __glslifyName(block.name),
                arguments: block.arguments,
              },
            },
          };

          createdBlocks.push(blockJSON);
        });
        return createdBlocks;
      }
      return [];
    }
  }

  penPlus.categories.myBlocks = myBlocks_category;
}
