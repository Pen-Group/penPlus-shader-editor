(function () {
  const customBlockTypeConversionTable = {
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

  Blockly.Extensions.registerMutator(
    "customBlockMutator",
    {
      saveExtraState: function () {
        return {
          customBlockData: this.customBlockData,
        };
      },

      loadExtraState: function (state) {
        this.customBlockData = state["customBlockData"];
        // This is a helper function which adds or removes inputs from the block.
        this.updateShape_();
      },

      mutationToDom: function () {
        // You *must* create a <mutation></mutation> element.
        // This element can have children.
        const container = Blockly.utils.xml.createElement("mutation");
        container.setAttribute(
          "customBlockData",
          JSON.stringify(this.customBlockData)
        );
        return container;
      },

      domToMutation: function (xmlElement) {
        this.customBlockData = JSON.parse(
          xmlElement.getAttribute("customBlockData")
        );
        this.updateShape_();
      },

      updateShape_() {
        if (this.customBlockData) {
          //create Text
          this.inputFromJson_({
            type: "input_dummy",
            name: "blocklyBlockName",
          });
          this.inputList[0].appendField(
            this.fieldFromJson_({
              type: "field_label",
              text: this.customBlockData.mainText,
            })
          );

          //Add inputs
          this.customBlockData.arguments.forEach((argument) => {
            //dummy text
            this.inputFromJson_({
              type: "input_dummy",
              name: "blocklyBlockName",
            });

            this.inputList[this.inputList.length - 1].appendField(
              this.fieldFromJson_({
                type: "field_label",
                text: argument.name + ":",
              })
            );

            if (this.output && argument.type != "void") {
              this.output.check = [argument.type];
            }

            //input thing
            this.inputFromJson_({
              type: "input_value",
              name: argument.name,
              check: customBlockTypeConversionTable[argument.type],
            });

            this.inputList[this.inputList.length - 1].setShadowDom(
              penPlus.stringToDOM(
                `<shadow type="${__getShadowForArgumentType(
                  argument.type
                )}"></shadow>`
              )
            );
          });
        }

        this.setStyle(__colorCustomBlock(this.customBlockData.type));
      },
    },
    undefined
  );
})();
