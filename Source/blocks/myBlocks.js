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
              opcode: "customBlockTest",
              type: "hat",
              text: "define %1",
              tooltip: "A Custom Block!",
              arguments: [
                {
                  type: "input_value",
                  name: "statement",
                  check: "myBlock_Input",
                  shadow: {
                    type: "myblocks_customBlockCInline",
                  },
                },
              ],
            },
            {
                opcode: "customBlockCInline",
                type: "myBlockShadow",
                text: "wghat in the fudge",
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
  