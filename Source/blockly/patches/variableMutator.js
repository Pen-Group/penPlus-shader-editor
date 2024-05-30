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

  function __colorVariableBlock(variableType) {
    switch (variableType) {
      case "float":
        return "variables_blocks";

      case "matrix_2x" || "matrix_3x" || "matrix_4x":
        return "matrix_blocks";

      case "matrix_3x":
        return "matrix_blocks";

      case "matrix_4x":
        return "matrix_blocks";

      case "vec2":
        return "vector_blocks";

      default:
        return `${variableType}_blocks`;
    }
  }

  Blockly.Extensions.registerMutator(
    "variableMutator",
    {
      saveExtraState: function () {
        return {
          variableData: this.variableData,
        };
      },

      loadExtraState: function (state) {
        this.variableData = state["variableData"];
        // This is a helper function which adds or removes inputs from the block.
        this.updateShape_();
      },

      mutationToDom: function () {
        // You *must* create a <mutation></mutation> element.
        // This element can have children.
        const container = Blockly.utils.xml.createElement("mutation");
        container.setAttribute("variableData", JSON.stringify(this.variableData));
        return container;
      },

      domToMutation: function (xmlElement) {
        this.variableData = JSON.parse(xmlElement.getAttribute("variableData"));
        this.updateShape_();
      },

      updateShape_() {
        if (this.variableData) {
          //create Text
          this.inputFromJson_({
            type: "input_dummy",
            name: "blocklyBlockName",
          });

          this.inputList[0].appendField(
            this.fieldFromJson_({
              type: "field_label",
              text: this.variableData.mainText,
            })
          );

          this.outputConnection.check.push(this.variableData.type);

          this.setStyle(__colorVariableBlock(this.variableData.type));
        }
      },
    },
    undefined
  );
})();
