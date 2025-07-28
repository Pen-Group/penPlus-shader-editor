(function () {
  penPlus.addBlocklyBlock = (blockName, type, BlockJson, inline) => {
    inline = inline || true;
    switch (type) {
      case "hat":
        BlockJson.nextStatement = BlockJson.nextStatement || "Action";
        break;

      case "hatNoNext":
        break;

      case "hat_customBlock":
        break;

      case "reporter":
        BlockJson.output = BlockJson.output || "Number";
        break;

      case "myBlockShadow":
        BlockJson.output = "myBlock_Input";
        break;

      case "boolean":
        BlockJson.output = "Boolean";
        break;

      case "command":
        BlockJson.nextStatement = BlockJson.nextStatement || "Action";
        BlockJson.previousStatement = BlockJson.previousStatement || "Action";
        break;

      case "terminal":
        BlockJson.previousStatement = BlockJson.previousStatement || "Action";
        break;

      default:
        BlockJson.nextStatement = BlockJson.nextStatement || "Action";
        BlockJson.previousStatement = BlockJson.previousStatement || "Action";
        break;
    }
    Blockly.Blocks[blockName] = {
      init: function () {
        this.setInputsInline(inline);
        this.jsonInit(BlockJson);
      },
    };
  };
})();
