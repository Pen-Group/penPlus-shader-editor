{
    window.categories = window.categories || {};
  
    class myBlocks_category extends window.penPlusExtension {
      getInfo() {
        return {
          name: "My Blocks",
          id: "myblocks",
          color1: "#FF6680",
          color2: "#FF4D6A",
          color3: "#FF3355",
          blocks: [
            {
              opcode: "customBlockDef",
              type: "hat",
              text: "define %1",
              tooltip: "A Custom Block!",
              arguments: [
                {
                  type: "input_value",
                  name: "statement",
                  check: "myBlock_Input",
                  shadow: {
                    type: "myblocks_customBlockPreview",
                  },
                },
              ],
            },
            {
              opcode: "customBlockReturnDef",
              type: "hat_return",
              text: "define %1 %2 %3 return %4",
              tooltip: "A Custom Block that returns a [insert type here]!",
              arguments: [
                {
                  type: "input_value",
                  name: "statement",
                  check: "myBlock_Input",
                  shadow: {
                    type: "myblocks_customBlockPreview",
                  },
                },
                {
                  type: "input_dummy",
                },
                {
                  type: "input_statement",
                  name: "code",
                },
                {
                  type: "input_value",
                  name: "return",
                },
              ],
            },
            {
                opcode: "customBlockPreview",
                type: "myBlockShadow",
                text: "default Custom Block",
                tooltip: "A Custom Block!",
                output: "myBlock_Input",
                hideFromPallete: true
              }
          ],
        };
      }
  
      vertex(block, generator) {
        return `\n//hello world\n`;
      }
    }
  
    window.categories.myBlocks = myBlocks_category;
  }
  