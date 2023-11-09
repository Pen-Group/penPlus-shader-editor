const addBlocklyBlock = (blockName, type, BlockJson, inline) => {
    inline = inline || true;
    switch (type) {
        case "hat":
            BlockJson.nextStatement = null;
            break;

        case "reporter":
            BlockJson.output = BlockJson.output || "Number";
            break;

        case "boolean":
            BlockJson.output = "Boolean";
            break;

        case "command":
            BlockJson.nextStatement = "Action";
            BlockJson.previousStatement = "Action";
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
                variableTypes: [variableType],    // Specifies what types to put in the dropdown
                defaultType: variableType  //The default type of the variable
            }
        ],
        style: style,
        output: (typeof check == "object" && check != null) ? check[0] : check
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
                    variableTypes: [variableType],    // Specifies what types to put in the dropdown
                    defaultType: variableType  //The default type of the variable
                },
                {
                    type: "input_value",    // This expects an input of any type
                    name: "VALUE",
                    check: check
                }
            ],
            style: style
        });
    }
    window.variableTypes.push({ kind: "label", text: variableType, })
    if (!shadowDat.noSet) {
        if (!shadowDat.madeUp) {
            window.variableTypes.push({ kind: "block", type: "variables_set_" + variableType, inputs: shadowDat })
        }
        else {
            window.variableTypes.push({ kind: "block", type: "variables_set_" + variableType, })
        }
    }
    window.variableTypes.push({ kind: "block", type: "variables_get_" + variableType, })
}

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
        "type": "field_dropdown",
        "name": named,
        "options": contents
    }
}

function createModal(HTML) {
    const modal = {
        background: document.createElement("div")
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
    }

    return modal;
}

//DO NOT STEAL! ORIGINAL BLOCK format.
window.penPlusExtension = class {
    constructor(){
        const myInfo = this.getInfo();

        const id = myInfo.id + "_";
        if (!window.blockStyles) {
            window.blockStyles = {};
        }

        window.blockStyles[id+"blocks"] = {
            colourPrimary: myInfo.color1,
            colourSecondary: myInfo.color2,
            colourTertiary: myInfo.color3,
        };

        let createdContentData = {
            kind: "category",
            name: myInfo.name,
            colour: myInfo.color1,
            contents: []
        };

        myInfo.blocks.forEach(block => {
            const type = block.type;
            const opcode = block.opcode;
            const text = block.text;

            //Declare the function to convert to
            window.GLSL_GEN.forBlock[id+opcode] = this[opcode];
            
            let defArgs = {
                kind: "block",
                type: id+opcode,
            };

            let blockDef = {
                message0: text,
                style: id+"blocks",
                args0: []
            };

            if (block.output) {
                blockDef.output = block.output;
            }

            if (block.arguments) {
                block.arguments.forEach(argument => {
                    if (argument.shadow) {
                        if (!defArgs.inputs) {
                            defArgs.inputs = {};
                        }
                        defArgs.inputs[argument.name] = {
                            shadow:argument.shadow
                        };
                        delete argument.shadow;
                    }
                    blockDef.args0.push(argument);
                })
            }
            //Add the blockly block definition
            addBlocklyBlock(id+opcode,type, blockDef);

            createdContentData.contents.push(defArgs);
        });

        window.toolbox.contents.push(createdContentData);
    }

    getInfo() {
        console.log("Category has no info");
    }
}
