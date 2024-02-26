{
  window.categories = window.categories || {};

  window.blockIterations = {};

  let customBlockArguments = [];

  let getHatBlockVariables = undefined;

  let argCount = 0

  function __colorCustomBlock(customBlockType) {
    switch (customBlockType) {
      case "highp float":
        return "variables_blocks";

      case "int":
        return "int_blocks";

      case "highp vec2":
        return "vec2_blocks";

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

      default:
        return "number_reporter";
    }
  }

  function __glslifyName(Name) {
    return Name.replaceAll(/([\W\s\h\v])+/g, "_")
  }

  class myBlocks_category extends window.penPlusExtension {
    getInfo() {
      getHatBlockVariables = this.getHatBlockVariables;
      addBlockColorSet("return_block", "#9CACD3", "#8592B5", "#7683A2");
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
                check: "string",
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
              createMenu(
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
                check: "string",
                shadow: {
                  type: "string_reporter",
                },
              },
              createMenu(
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
            opcode: "customBlockReturn",
            type: "terminal",
            text: "return %1",
            tooltip: "A Custom Block!",
            //style: "return_block", I somewhat like this gray
            arguments: [
              {
                type: "input_value",
                name: "return",
              },
            ],
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
      window.customBlockType = customBlockType;
      customBlockArguments = [];

      const innerCode = generator.statementToCode(block, "code");
      argCount = 0
      const functionArguments = generator.statementToCode(block, "arguments");

      //Stupid Switch statement prob a way to do this without a switch
      block.setStyle(__colorCustomBlock(customBlockType));

      window.customBlocks.push({
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

      return `${customBlockType} ${__glslifyName(argumentName)} ${
        nextCode ? `, ${nextCode}` : ``
      }`;
    }

    customBlockReturn(block, generator) {
      let returnConversion = "";

      switch (window.customBlockType) {
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
          block.setStyle("vec2_blocks");
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
          returnConversion = "mat3";
          break;

        default:
          block.setStyle("myblocks_blocks");
          block.inputList[0].setCheck("noInput");
          break;
      }

      return window.customBlockType == "void"
        ? `return;`
        : `return ${returnConversion}(${
            generator.valueToCode(block, "return", Order.ATOMIC) || 1
          });\n`;
    }

    createCustomBlocks(workspace) {
      let createdBlocks = [];
      if (window.customBlocks) {
        window.customBlocks.forEach((block) => {
          let block_arguments = [];
          let block_arg_count = 0;
          let block_arg_string = "";
          block.arguments.forEach((argument) => {
            block_arguments.push({
              type: "input_value",
              name: `${block_arg_count}`,
              shadow: {
                type: __getShadowForArgumentType(argument.type),
              },
            });
            block_arg_count += 1;
            block_arg_string += ` ${argument.name}:%${block_arg_count}`;
          });

          //Dumb idea. Might work.
          window.blockIterations[block.name] |= 0;
          window.blockIterations[block.name] += 1;

          if (block.name.length == 0) block.name = "noBlockDefined";

          createdBlocks.push({
            opcode: `customBlock_${__glslifyName(block.name)}_${
              window.blockIterations[block.name]
            }`,
            type: customBlockType == "void" ? "command" : "reporter",
            text: block.name + block_arg_string,
            style: __colorCustomBlock(block.type),
            tooltip: "Your custom block!",
            arguments: block_arguments,
            operation: (block_ref, generator) => {
              let argString = "";
              //Using a typical for loop for this one since we need the id somewhat.
              for (let argID = 0; argID < block_arg_count; argID++) {
                const argument = block_arguments[argID];
                argString += `${argID == 0 ? "" : ","}${generator.valueToCode(
                  block_ref,
                  argument.name,
                  Order.ATOMIC
                )}`;
              }
              //If we are a void block we must return the function being executed if we are a reporter of some sort we must report!
              return customBlockType == "void"
                ? `${__glslifyName(block.name)}(${argString});\n`
                : [`${__glslifyName(block.name)}(${argString})`, Order.ATOMIC];
            },
          });
        });
        return createdBlocks;
      }
      return [];
    }
  }

  window.categories.myBlocks = myBlocks_category;
}
