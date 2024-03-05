penPlus.penPlusExtension = class {
  constructor() {
    const myInfo = this.getInfo();

    //Snatch the extension's ID
    const id = myInfo.id + "_";

    //Check if style data exists.
    if (!penPlus.blockStyles) {
      penPlus.blockStyles = {};
    }

    //Add the block styles for this category. Each block can have its own override.
    penPlus.penPlusTheme.blockStyles[id + "blocks"] = {
      colourPrimary: myInfo.color1,
      colourSecondary: myInfo.color2,
      colourTertiary: myInfo.color3,
    };

    //Define the category definition here
    let createdContentData = {
      kind: "category",
      name: myInfo.name,
      colour: myInfo.color1,
      contents: [],
    };

    //Loop through each block deciding its fate!
    this.defaultBlockInfo = [];

    const addBlock = (block, dynamicBlock) => {
      let blockData = {};
      //Seperator Shorthand
      if (block == "---") {
        blockData = {
          kind: "label",
          text: "",
        };
      }
      //Label Shorthand
      else if (typeof block == "string") {
        blockData = {
          kind: "label",
          text: block,
        };
      }
      //if it is an object (Or anything else really)
      else {
        //Get the type and text
        const type = block.type;
        const text = block.text;

        const opcode = block.opcode;
        switch (type) {
          case "label":
            blockData = {
              kind: "label",
              text: text,
            };
            break;

          case "button":
            //Create button
            blockData = {
              kind: "button",
              text: text,
              callbackKey: id + opcode,
            };

            //Register callback code for the button
            penPlus.workspace.registerButtonCallback(id + opcode, this[opcode]);
            break;

          default:
            //Declare the function to convert to
            if (dynamicBlock) {
              penPlus.GLSL_GEN.forBlock[id + opcode] = block.operation;
            } else {
              penPlus.GLSL_GEN.forBlock[id + opcode] = this[opcode];
            }
            //Define the arguments used in block creation
            let defArgs = {
              kind: "block",
              type: id + opcode,
            };

            //And the toolbox definition
            let blockDef = {
              message0: text,
              style: block.style || id + "blocks",
              args0: [],
              lastDummyAlign0: "LEFT",
            };

            //if our text is an array then we loop over all texts and arguments
            if (typeof text == "object") {
              for (let id = 0; id < text.length; id++) {
                blockDef["message" + id] = text[id];
                blockDef["args" + id] = [];
                blockDef["lastDummyAlign" + id] = "LEFT";

                if (block.arguments) {
                  block.arguments[id].forEach((argument) => {
                    //Check for shadow data if so add it to the toolbox definition and remove it from the block definition
                    if (argument.shadow) {
                      //Check for if the block has inputs if not add them
                      if (!defArgs.inputs) {
                        defArgs.inputs = {};
                      }

                      defArgs.inputs[argument.name] = {
                        shadow: argument.shadow,
                      };
                      delete argument.shadow;
                    }

                    if (argument.type == "input_statement") {
                      argument.check = argument.check || "Action";
                    }

                    blockDef["args" + id].push(argument);
                  });
                }

                if (block.alignment) {
                  blockDef["lastDummyAlign" + id] = block.alignment[id];
                }
              }
            }
            //if not just treat it like normal
            else {
              //If it has arguments loop through those and add them to the args 0
              //Should probably add something for multiline things.
              //Maybe Arrays
              if (block.arguments) {
                block.arguments.forEach((argument) => {
                  //Check for shadow data if so add it to the toolbox definition and remove it from the block definition
                  if (argument.shadow) {
                    //Check for if the block has inputs if not add them
                    if (!defArgs.inputs) {
                      defArgs.inputs = {};
                    }

                    defArgs.inputs[argument.name] = {
                      shadow: argument.shadow,
                    };
                    delete argument.shadow;
                  }

                  if (argument.type == "input_statement") {
                    argument.check = argument.check || "Action";
                  }

                  blockDef.args0.push(argument);
                });
              }

              if (block.alignments) {
                blockDef["lastDummyAlign0"] = block.alignment;
              }
            }

            //If there is an output or tooltop add them to the block definition
            //Note that output only determines what the block puts out.
            if (block.output) {
              blockDef.output = block.output;
            }
            
            if (block.mutator) {
              blockDef.mutator = block.mutator;
            }

            if (block.nextStatement) {
              blockDef.nextStatement = block.nextStatement;
            }

            if (block.previousStatement) {
              blockDef.previousStatement = block.previousStatement;
            }

            //Add the blockly block definition
            penPlus.addBlocklyBlock(id + opcode, type, blockDef);
            //Dynamic blocks don't like reinilization so we do this to spite them

            blockData = defArgs;
            break;
        }
      }

      if (!block.hideFromPallete) {
        if (dynamicBlock) return blockData;
        createdContentData.contents.push(blockData);
      }
    };

    myInfo.blocks.forEach((block) => {
      addBlock(block);
    });

    this.defaultBlockInfo = createdContentData.contents;

    //Check for a dynamic function
    if (myInfo.dynamic) {
      //Create the custom function
      createdContentData.custom = "dynamic_" + myInfo.id;

      penPlus.dynamicallyAdded = penPlus.dynamicallyAdded || {};
      //Add the callback
      penPlus.workspace.registerToolboxCategoryCallback(
        "dynamic_" + myInfo.id,
        (workspace) => {
          //create data holders
          let createdBlockData = this[myInfo.dynamic](workspace);
          let formattedDynamic = [];

          penPlus.dynamicallyAdded["dynamic_" + myInfo.id] = createdBlockData;

          //Loop through and gather compiled data
          createdBlockData.forEach((block) => {
            formattedDynamic.push(addBlock(block, true));
          });

          //Concatanate the blocks
          //Did I spell that right?
          return this.defaultBlockInfo.concat(formattedDynamic);
        }
      );
    }

    penPlus.toolbox.contents.push(createdContentData);

    penPlus.workspace.updateToolbox(penPlus.toolbox);

    workspace.getToolbox().refreshSelection();

    penPlus.refreshTheme();
  }

  addDynamicBlocksPreLoad() {
    
  }

  getHatBlockVariables() {
    let returnedGLSL = "";
    workspace.getAllVariables().forEach((variable) => {
      let type = variable.type;

      if (type == "texture") type = "sampler2D";
      if (type == "cubemap") type = "samplerCube";
      if (type == "matrix_2x") type = "mat2";
      if (type == "matrix_3x") type = "mat3";
      if (type == "matrix_4x") type = "mat4";

      let scope = variable.name.split(" ")[0];
      if (scope != "hat") return;

      if (!variable.name.split(" ")[1]) return;

      //Types that don't have precision
      if (
        variable.type == "texture" ||
        variable.type == "cubemap" ||
        variable.type == "int"
      )
        returnedGLSL += `${type} ${
          variable.name.split(" ")[1]
        } = ${type}(1);\n`;
      else
        returnedGLSL += `highp ${type} ${
          variable.name.split(" ")[1]
        } = ${type}(1);\n`;
    });

    return returnedGLSL;
  }

  getInfo() {
    console.log("Category has no info");
  }
};
