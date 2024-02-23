{
  window.categories = window.categories || {};

  class myBlocks_category extends window.penPlusExtension {
    getInfo() {
      addBlockColorSet("return_block", "#9CACD3", "#8592B5", "#7683A2");
      return {
        name: "My Blocks",
        id: "myblocks",
        color1: "#FF6680",
        color2: "#FF4D6A",
        color3: "#FF3355",
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
                check: "CustomBlockArgument"
              },
              {
                type: "input_statement",
                name: "code",
                check: "Action"
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
            hideFromPallete: true
          },
          {
            opcode: "customBlockArgument",
            type: "terminal",
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
              )
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
          }
        ],
      };
    }

    customBlockDef(block, generator) {
      //Cheap hack
      const customBlockType = block.getFieldValue("type");
      //If lily and or anybody else knows a better solution please commit. I fucking beg
      window.customBlockType = customBlockType;

      const innerCode = generator.statementToCode(block, "code");
      const functionArguments = generator.statementToCode(block, "arguments");

      //Stupid Switch statement prob a way to do this without a switch
      switch (customBlockType) {
        case "highp float":
          block.setStyle("variables_blocks")
          break;

        case "int":
          block.setStyle("int_blocks")
          break;

        case "highp vec2":
          block.setStyle("vec2_blocks")
          break;

        case "highp vec3":
          block.setStyle("vec3_blocks")
          break;

        case "highp vec4":
          block.setStyle("vec4_blocks")
          break;

        case "highp mat2":
          block.setStyle("matrix_blocks")
          break;

        case "highp mat3":
          block.setStyle("matrix_blocks")
          break;

        case "highp mat4":
          block.setStyle("matrix_blocks")
          break;

        default:
          block.setStyle("myblocks_blocks")
          break;
      }
      //block.applyColour();
      return `${customBlockType} ${generator.valueToCode(block, "name", Order.ATOMIC)}(${functionArguments}) {\n${innerCode}\n}`
    }

    customBlockArgument(block, generator) {
      const customBlockType = block.getFieldValue("type");
      switch (customBlockType) {
        case "highp float":
          block.setStyle("variables_blocks")
          break;

        case "int":
          block.setStyle("int_blocks")
          break;

        case "highp vec2":
          block.setStyle("vec2_blocks")
          break;

        case "highp vec3":
          block.setStyle("vec3_blocks")
          break;

        case "highp vec4":
          block.setStyle("vec4_blocks")
          break;

        case "highp mat2":
          block.setStyle("matrix_blocks")
          break;

        case "highp mat3":
          block.setStyle("matrix_blocks")
          break;

        case "highp mat4":
          block.setStyle("matrix_blocks")
          break;

        default:
          block.setStyle("myblocks_blocks")
          break;
      }

      let nextCode = nextBlockToCode(block, generator);

      return `${customBlockType} ${generator.valueToCode(block, "name", Order.ATOMIC)} ${nextCode ? `, ${nextCode}` : ``}`;
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
          block.setStyle("matrix_blocks")
          returnConversion = "mat3";
          break;

        default:
          block.setStyle("myblocks_blocks")
          block.inputList[0].setCheck("noInput");
          break;
      }
      return `return ${returnConversion}(${generator.valueToCode(block, "return", Order.ATOMIC) || 1});`
    }
  }

  window.categories.myBlocks = myBlocks_category;
}
