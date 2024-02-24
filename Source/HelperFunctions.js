const addBlocklyBlock = (blockName, type, BlockJson, inline) => {
  inline = inline || true;
  switch (type) {
    case "hat":
      BlockJson.nextStatement = null;
      break;

    case "hat_customBlock":
      break;

    case "reporter":
      BlockJson.output |= "Number";
      break;

    case "myBlockShadow":
      BlockJson.output = "myBlock_Input";
      break;

    case "boolean":
      BlockJson.output = "Boolean";
      break;

    case "command":
      BlockJson.nextStatement |= "Action";
      BlockJson.previousStatement |= "Action";
      break;

    case "terminal":
      BlockJson.previousStatement |= "Action";
      break;

    default:
      BlockJson.nextStatement = null;
      BlockJson.previousStatement = null;
      break;
  }
  Blockly.Blocks[blockName] = {
    init: function () {
      this.setInputsInline(inline);
      this.jsonInit(BlockJson);
    },
  };
};

window.variableTypes = [];

const addVariableType = (variableType, style, check, isBool, shadowDat) => {
  var blockType = isBool ? "boolean" : "reporter";
  style = style || "variable_blocks";

  addBlocklyBlock("variables_get_" + variableType, blockType, {
    type: "variables_get",
    message0: "%1",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
        variableTypes: [variableType], // Specifies what types to put in the dropdown
        defaultType: variableType, //The default type of the variable
      },
    ],
    style: style,
    output: typeof check == "object" && check != null ? check[0] : check,
  });

  shadowDat = shadowDat || { madeUp: true };

  if (!shadowDat.noSet) {
    addBlocklyBlock("variables_set_" + variableType, "command", {
      type: "variables_set",
      message0: "set %1 to %2",
      args0: [
        {
          type: "field_variable",
          name: "VAR",
          variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
          variableTypes: [variableType], // Specifies what types to put in the dropdown
          defaultType: variableType, //The default type of the variable
        },
        {
          type: "input_value", // This expects an input of any type
          name: "VALUE",
          check: check,
        },
      ],
      style: style,
    });
  }
  window.variableTypes.push({ kind: "label", text: variableType });
  if (!shadowDat.noSet) {
    if (!shadowDat.madeUp) {
      window.variableTypes.push({
        kind: "block",
        type: "variables_set_" + variableType,
        inputs: shadowDat,
      });
    } else {
      window.variableTypes.push({
        kind: "block",
        type: "variables_set_" + variableType,
      });
    }
  }
  window.variableTypes.push({
    kind: "block",
    type: "variables_get_" + variableType,
  });
};

function hexToRgb(hex) {
  if (typeof hex === "string") {
    const splitHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(splitHex[1], 16),
      g: parseInt(splitHex[2], 16),
      b: parseInt(splitHex[3], 16),
    };
  }
  return {
    r: Math.floor(hex / 65536),
    g: Math.floor(hex / 256) % 256,
    b: hex % 256,
  };
}

function createMenu(contents, named) {
  return {
    type: "field_dropdown",
    name: named,
    options: contents,
  };
}

function createModal(HTML) {
  const modal = {
    background: document.createElement("div"),
  };

  modal.background.style.backgroundColor = "#00000066";
  modal.background.style.width = "100%";
  modal.background.style.height = "100%";
  modal.background.style.position = "absolute";
  modal.background.style.left = "0px";
  modal.background.style.top = "0px";

  modal.background.innerHTML = HTML;

  modal.background.style.zIndex = "500";

  document.body.appendChild(modal.background);

  modal.close = () => {
    document.body.removeChild(modal.background);
  };

  return modal;
}

function addBlockColorSet(name, color1, color2, color3) {
  window.penPlusTheme.blockStyles[name] = {
    colourPrimary: color1,
    colourSecondary: color2,
    colourTertiary: color3,
  };

  workspace.getToolbox().refreshSelection();

  window.refreshTheme();
}

//DO NOT STEAL! ORIGINAL BLOCK format.
window.penPlusExtension = class {
  constructor() {
    const myInfo = this.getInfo();

    //Snatch the extension's ID
    const id = myInfo.id + "_";

    //Check if style data exists.
    if (!window.blockStyles) {
      window.blockStyles = {};
    }

    //Add the block styles for this category. Each block can have its own override.
    window.penPlusTheme.blockStyles[id + "blocks"] = {
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

    const addBlock = (block,dynamicBlock) => {
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
            window.workspace.registerButtonCallback(id + opcode, this[opcode]);
            break;

          default:
            //Declare the function to convert to
            if (dynamicBlock) {
              window.GLSL_GEN.forBlock[id + opcode] = block.operation;
            }
            else {
              window.GLSL_GEN.forBlock[id + opcode] = this[opcode];
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
            };

            //If there is an output or tooltop add them to the block definition
            //Note that output only determines what the block puts out.
            if (block.output) {
              blockDef.output = block.output;
            }

            if (block.output) {
              blockDef.output = block.output;
            }

            if (block.nextStatement) {
              blockDef.nextStatement = block.nextStatement;
            }

            if (block.previousStatement) {
              blockDef.previousStatement = block.previousStatement;
            }

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
                blockDef.args0.push(argument);
              });
            }
            //Add the blockly block definition
            if (dynamicBlock) delete Blockly.Blocks[id + opcode];
            addBlocklyBlock(id + opcode, type, blockDef);
            //Dynamic blocks don't like reinilization so we do this to spite them

            blockData = defArgs;
            break;
        }
      }

      if (!block.hideFromPallete) {
        if (dynamicBlock) return blockData;
        createdContentData.contents.push(blockData);
      }
    }
    
    myInfo.blocks.forEach((block) => {
      addBlock(block);
    });

    this.defaultBlockInfo = createdContentData.contents;

    //Check for a dynamic function
    if (myInfo.dynamic) {
      //Create the custom function
      createdContentData.custom = 'dynamic_'+myInfo.id;
      //Add the callback
      window.workspace.registerToolboxCategoryCallback('dynamic_'+myInfo.id, (workspace) => {
        //create data holders
        let createdBlockData = this[myInfo.dynamic](workspace);
        let formattedDynamic = [];

        //Loop through and gather compiled data
        createdBlockData.forEach(block => {
          formattedDynamic.push(addBlock(block,true));
        })

        //Concatanate the blocks
        //Did I spell that right?
        return this.defaultBlockInfo.concat(formattedDynamic);
      });  
    }

    window.toolbox.contents.push(createdContentData);

    window.workspace.updateToolbox(window.toolbox);

    workspace.getToolbox().refreshSelection();

    window.refreshTheme();
  }

  getInfo() {
    console.log("Category has no info");
  }
};
