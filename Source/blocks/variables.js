{
  penPlus.categories = penPlus.categories || {};

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

  function __getShadowForArgumentType(argumentType) {
    switch (argumentType) {
      case "float":
        return "number_reporter";

      case "int":
        return "int_reporter";

      case "vec2":
        return "vec2_reporter";

      case "vec3":
        return "vec3_reporter";

      case "vec4":
        return "vec4_reporter";

      case "matrix_2x":
        return "matrix2_reporter";

      case "matrix_3x":
        return "matrix3_reporter";

      case "matrix_4x":
        return "matrix4_reporter";

      default:
        return "number_reporter";
    }
  }

  class variables_category extends penPlus.penPlusExtension {
    getInfo() {
      penPlus.addBlockColorSet("vec3_blocks", "#5BB4B7", "#47AAAF", "#319098");
      penPlus.addBlockColorSet("vec4_blocks", "#59BC77", "#47AB6A", "#359258");
      penPlus.addBlockColorSet("int_blocks", "#FF791A", "#E15D00", "#E15D00");
      penPlus.addBlockColorSet("bool_blocks", "#c2d916", "#adc213", "#a0b312");
      penPlus.addBlockColorSet(
        "matrix_blocks",
        "#737fff",
        "#636ed6",
        "#5560cb"
      );
      return {
        name: "Variables",
        id: "variables",
        color1: "#ff8c1a",
        color2: "#dd8126",
        color3: "#cc7015",
        dynamic: "createVariableReporters",
        blocks: [
          {
            opcode: "createVariable",
            type: "button",
            text: "Make a Variable",
          },
          {
            opcode: "variable_reporter",
            type: "reporter",
            text: "",
            tooltip: "your variable!",
            mutator: "variableMutator",

            hideFromPallete: true,
          },
          {
            opcode: "variable_set",
            type: "command",
            text: "set %1 to %2",
            tooltip: "sets the desired variable to the value",
            hideFromPallete: true,
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "uniform u_default",
                defaultType: "float",
                variableTypes: [
                  "float",
                  "int",
                  "vec2",
                  "vec3",
                  "vec4",
                  "matrix_2x",
                  "matrix_3x",
                  "matrix_4x",
                ],
              },
              {
                type: "input_value",
                name: "VALUE",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "variable_change",
            type: "command",
            text: "change %1 by %2",
            tooltip: "changes the desired variable by the value",
            hideFromPallete: true,
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "uniform u_default",
                defaultType: "float",
                variableTypes: [
                  "float",
                  "int",
                  "vec2",
                  "vec3",
                  "vec4",
                  "matrix_2x",
                  "matrix_3x",
                  "matrix_4x",
                ],
              },
              {
                type: "input_value",
                name: "VALUE",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "variable_multiply",
            type: "command",
            text: "multiply %1 by %2",
            tooltip: "multiplies the desired variable by the value",
            hideFromPallete: true,
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "uniform u_default",
                defaultType: "float",
                variableTypes: [
                  "float",
                  "int",
                  "vec2",
                  "vec3",
                  "vec4",
                  "matrix_2x",
                  "matrix_3x",
                  "matrix_4x",
                ],
              },
              {
                type: "input_value",
                name: "VALUE",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "variable_divide",
            type: "command",
            text: "divide %1 by %2",
            tooltip: "divides the desired variable by the value",
            hideFromPallete: true,
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "uniform u_default",
                defaultType: "float",
                variableTypes: [
                  "float",
                  "int",
                  "vec2",
                  "vec3",
                  "vec4",
                  "matrix_2x",
                  "matrix_3x",
                  "matrix_4x",
                ],
              },
              {
                type: "input_value",
                name: "VALUE",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "variable_item",
            type: "reporter",
            text: "item %1 of %2",
            tooltip: "get an item from an array",

            hideFromPallete: true,
            arguments: [
              {
                type: "input_value",
                name: "VALUE",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "field_variable",
                name: "VAR",
                variable: "array[1] a_default",
                defaultType: "float",
                variableTypes: [
                  "float",
                  "int",
                  "vec2",
                  "vec3",
                  "vec4",
                  "matrix_2x",
                  "matrix_3x",
                  "matrix_4x",
                ],
              },
            ],
          },
        ],
      };
    }

    variable_reporter(block, generator) {
      return [`${block.variableData.mainText.split(" ")[1]}`, Order.ATOMIC];
    }

    variable_set(block, generator) {
      const variable = Blockly.Variables.getVariable(
        penPlus.workspace,
        block.getFieldValue("VAR")
      );

      const variableName = variable.name;
      const variableType = variable.type;

      if (variableType == "matrix_2x") variableType = "mat2";
      if (variableType == "matrix_3x") variableType = "mat3";
      if (variableType == "matrix_4x") variableType = "mat4";

      const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);

      let shadowDeisred = penPlus.stringToDOM(
        `<shadow type="${__getShadowForArgumentType(variableType)}"></shadow>`
      );

      if (
        block.inputList[0].getShadowDom() == null ||
        block.inputList[0].getShadowDom().getAttribute("type") !=
          shadowDeisred.getAttribute("type")
      )
        this.inputList[this.inputList.length - 1].setShadowDom(shadowDeisred);

      block.setStyle(__colorVariableBlock(variableType));

      return (
        `${variableName.split(" ")[1]} = ${variableType}(${value});\n` +
        nextBlockToCode(block, generator)
      );
    }

    variable_change(block, generator) {
      const variable = Blockly.Variables.getVariable(
        penPlus.workspace,
        block.getFieldValue("VAR")
      );

      const variableName = variable.name;
      const variableType = variable.type;

      const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);

      let shadowDeisred = penPlus.stringToDOM(
        `<shadow type="${__getShadowForArgumentType(variableType)}"></shadow>`
      );

      if (
        block.inputList[0].getShadowDom() == null ||
        block.inputList[0].getShadowDom().getAttribute("type") !=
          shadowDeisred.getAttribute("type")
      )
        this.inputList[this.inputList.length - 1].setShadowDom(shadowDeisred);

      block.setStyle(__colorVariableBlock(variableType));

      return (
        `${variableName.split(" ")[1]} += ${value};\n` +
        nextBlockToCode(block, generator)
      );
    }

    variable_multiply(block, generator) {
      const variable = Blockly.Variables.getVariable(
        penPlus.workspace,
        block.getFieldValue("VAR")
      );

      const variableName = variable.name;
      const variableType = variable.type;

      const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);

      let shadowDeisred = penPlus.stringToDOM(
        `<shadow type="${__getShadowForArgumentType(variableType)}"></shadow>`
      );

      if (
        block.inputList[0].getShadowDom() == null ||
        block.inputList[0].getShadowDom().getAttribute("type") !=
          shadowDeisred.getAttribute("type")
      )
        this.inputList[this.inputList.length - 1].setShadowDom(shadowDeisred);

      block.setStyle(__colorVariableBlock(variableType));

      return (
        `${variableName.split(" ")[1]} *= ${value};\n` +
        nextBlockToCode(block, generator)
      );
    }

    variable_divide(block, generator) {
      const variable = Blockly.Variables.getVariable(
        penPlus.workspace,
        block.getFieldValue("VAR")
      );

      const variableName = variable.name;
      const variableType = variable.type;

      const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);

      let shadowDeisred = penPlus.stringToDOM(
        `<shadow type="${__getShadowForArgumentType(variableType)}"></shadow>`
      );

      if (
        block.inputList[0].getShadowDom() == null ||
        block.inputList[0].getShadowDom().getAttribute("type") !=
          shadowDeisred.getAttribute("type")
      )
        this.inputList[this.inputList.length - 1].setShadowDom(shadowDeisred);

      block.setStyle(__colorVariableBlock(variableType));

      return (
        `${variableName.split(" ")[1]} /= ${value};\n` +
        nextBlockToCode(block, generator)
      );
    }

    variable_item(block, generator) {
      const variable = Blockly.Variables.getVariable(
        penPlus.workspace,
        block.getFieldValue("VAR")
      );

      const variableName = variable.name;
      const variableType = variable.type;

      let shadowDeisred = penPlus.stringToDOM(
        '<shadow type="number_reporter"></shadow>'
      );

      if (
        block.inputList[0].getShadowDom() == null ||
        block.inputList[0].getShadowDom().getAttribute("type") !=
          shadowDeisred.getAttribute("type")
      ) {
        this.inputList[0].setShadowDom(shadowDeisred);
      }

      const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);

      block.setStyle(__colorVariableBlock(variableType));

      return [`${variableName.split(" ")[1]}[int(${value})]`, Order.ATOMIC];
    }

    createVariableReporters(workspace) {
      let returnedBlocks = [];

      const variables = workspace.getAllVariables();

      //iterate through variables adding the needed reporters
      variables.forEach((variable) => {
        let type = variable.type;

        returnedBlocks.push({
          type: "duplicate",
          of: "variable_reporter",
          extraData: {
            variableData: {
              type: type,
              mainText: variable.name,
            },
          },
        });
      });

      //if variables is more than 0 check for valid setters
      if (variables.length > 0) {
        let validVariables = [];
        let hasArrayScope = false;
        let hasNormalScope = false;
        variables.forEach((variable) => {
          if (variable.type != "texture" && variable.type != "cubemap") {
            validVariables.push(variable);
          }

          if (variable.name.split(" ")[0].split("[")[0] == "array") {
            hasArrayScope = true;
          } else {
            hasNormalScope = true;
          }
        });

        //Then check for if the valid setters length is more than 0
        if (validVariables.length > 0) {
          if (hasNormalScope) {
            //Add the set change multiply and divide blocks with the needed color for the most correctness
            returnedBlocks.push({
              type: "duplicate",
              of: "variable_set",
            });

            returnedBlocks.push({
              type: "duplicate",
              of: "variable_change",
            });

            returnedBlocks.push({
              type: "duplicate",
              of: "variable_multiply",
            });

            returnedBlocks.push({
              type: "duplicate",
              of: "variable_divide",
            });
          }
          if (hasArrayScope) {
            returnedBlocks.push({
              type: "duplicate",
              of: "variable_item",
            });
          }
        }
      }

      return returnedBlocks;
    }

    createVariable(button) {
      //Html Modal Mess
      const varModal = penPlus.createModal(`
          <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
            <div style="position:absolute;left:0px;top:0px; width:100%; height:40%; background-color: var(--EditorTheme_Theme_4);">
              <input id="VarName" placeholder="Variable Name" style="position:absolute;left:50%;top:50%;Transform:Translate(-50%,-50%); width:50%; height:20%;" type="text"></input>
              <p class="noSelect" style="position:absolute;left:50%;top:75%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Only use A-Z and _</p>
            </div>
            <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:48px; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 32px;">
              New Variable  
              <div id="closeButton" aria-label="Close" style="cursor:pointer; transform:translate(-110%,0%);aspect-ratio:1 / 1;background-color: var(--EditorTheme_Color_2); width:auto; height:80%; position:absolute; left:100%; top:10%; border-radius:100%;" role="button" tabindex="0">
                <img style="top:25%; width:50%; height:50%; left:25%; position:absolute; transform:rotate(45deg)" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==" draggable="false">
              </div>
            </div>
            <div style="position:absolute; top:40%; width:100%; height:40%; color:var(--EditorTheme_Text_1);">
              <p class="noSelect" style="position:absolute;left:50%;top:75%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Variable Type</p>
              <!--Variable Types-->
              <div style="overflow-x:scroll; overflow-y:hidden; position:absolute; width:100%; height: 75%;text-align: center;">
                <!--Float-->
                <div id="float" style="position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6;justify-content: center;">
                  <div style="background-color:var(--variables_blocks); position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Float</p>
                </div>
                <!--Int-->
                <div id="int" style="left:25%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--int_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Int</p>
                </div>
                <!--Vec 2-->
                <div id="vec2" style="left:50%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--vector_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 2</p>
                </div>
                <!--Vec 3-->
                <div id="vec3" style="left:75%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--vec3_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 3</p>
                </div>
                <!--Vec 4-->
                <div id="vec4" style="left:100%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--vec4_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 4</p>
                </div>
                <!--Texture-->
                <div id="texture" style="left:125%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--texture_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Texture</p>
                </div>
                <!--Cubemap-->
                <div id="cubemap" style="left:150%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--cubemap_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Cubemap</p>
                </div>
                <!--Matrix-->
                <div id="matrix" style="left:175%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:var(--matrix_blocks);position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Matrix</p>
                </div>
              </div>
              </div>
              <div style="top:80%;height:20%;width:100%;position:absolute;">
                <div style="display: flex;position:absolute;left:50%;width:65%;height:80%; font-size: 1.125em;  color:var(--EditorTheme_Text_1); transform: translate(-50%);">
                  <div style="display: flex; width:33.3333%" id="ArrayHolder">
                    <input type="checkbox" id="Array"></input>
                    <p style="transform:translate(0%,-1em);">Array</p>
                  </div>
                  <div style="display: flex; width:33.3333%" id="UniformHolder">
                    <input type="checkbox" checked id="Uniform"></input>
                    <p style="transform:translate(0%,-1em);">Uniform</p>
                  </div>
                  <div style="display: flex; width:33.3333%" id="VertexHolder">
                    <input type="checkbox" id="Attribute"></input>
                    <p style="transform:translate(0%,-1em);">Attribute</p>
                  </div>
                  <div style="display: flex; width:33.3333%" id="PixelHolder">
                    <input type="checkbox" id="Varying"></input>
                    <p style="transform:translate(0%,-1em);">Varying</p>
                  </div>
                  <div style="display: flex; width:33.3333%" id="HatHolder">
                    <input type="checkbox" id="Hat"></input>
                    <p style="transform:translate(0%,-1em);">Hat</p>
                  </div>
                </div>
                <p class="noSelect" style="position:absolute;left:50%;top:20%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Variable Scope</p>
                <button id="createVariable" style="position:absolute; left:95%; top:90%; transform: translate(-100%,-100%); background-color:var(--EditorTheme_Color_1); border-width: 0px; border-radius: 0.25rem; width:4em; height:1.5em;font-size: 1.125em; color:var(--EditorTheme_Text_1);">OK</button>
                <select id="matrixSizes" name="Matrix Sizes" style="position:absolute; left:15%; top:90%; transform: translate(-100%,-100%); background-color:var(--EditorTheme_Color_1); border-width: 0px; border-radius: 0.25rem; width:4em; height:3em;font-size: 1.125em; color:var(--EditorTheme_Text_1); visibility:hidden;">
                  <option value="2x">2x2</option>
                  <option value="3x">3x3</option>
                  <option value="4x">4x4</option>
                </select>
                <input id="ArraySize" placeholder="10" style="visibility:hidden;position:absolute;left:50%;top:100%;Transform:Translate(-50%,-150%); width:50%; height:20%;" type="number" min="2" max="100" value="10"></input>
              </div>
            </div>
          </div>
          `);

      const variableTypeChangers = {
        float: document.getElementById("float"),
        int: document.getElementById("int"),
        vec2: document.getElementById("vec2"),
        vec3: document.getElementById("vec3"),
        vec4: document.getElementById("vec4"),
        texture: document.getElementById("texture"),
        cubemap: document.getElementById("cubemap"),
        matrix: document.getElementById("matrix"),
      };

      const matrixSizeChanger = document.getElementById("matrixSizes");
      const arraySizeChanger = document.getElementById("ArraySize");

      let currentType = variableTypeChangers.float;
      let typeName = "float";

      let variableModalElement = document.getElementById("variableModal");

      //Short function to cycle types
      const cycleVariable = (type) => {
        typeName = type;
        currentType.style.backgroundColor = "var(--EditorTheme_Theme_3)";
        variableTypeChangers[type].style.backgroundColor =
          "var(--EditorTheme_Theme_4)";
        currentType = variableTypeChangers[type];
        if (type == "matrix") {
          matrixSizeChanger.style.visibility = "visible";
        } else {
          matrixSizeChanger.style.visibility = "hidden";
        }
      };
      cycleVariable("float");

      const Array = document.getElementById("Array");
      const Uniform = document.getElementById("Uniform");
      const Attribute = document.getElementById("Attribute");
      const Varying = document.getElementById("Varying");
      const Hat = document.getElementById("Hat");

      const ArrayHolder = document.getElementById("ArrayHolder");
      const UniformHolder = document.getElementById("UniformHolder");
      const AttributeHolder = document.getElementById("VertexHolder");
      const VaryingHolder = document.getElementById("PixelHolder");
      const HatHolder = document.getElementById("HatHolder");

      const setScopeVisibilities = (Arr, Uni, Art, Vary, HatH) => {
        ArrayHolder.style.visibility = Arr ? "visible" : "hidden";
        UniformHolder.style.visibility = Uni ? "visible" : "hidden";
        AttributeHolder.style.visibility = Art ? "visible" : "hidden";
        VaryingHolder.style.visibility = Vary ? "visible" : "hidden";
        HatHolder.style.visibility = HatH ? "visible" : "hidden";
      };

      variableTypeChangers.float.onclick = () => {
        cycleVariable("float");
        setScopeVisibilities(true, true, true, true, true);
      };
      variableTypeChangers.int.onclick = () => {
        cycleVariable("int");
        setScopeVisibilities(true, true, true, true, true);
      };
      variableTypeChangers.vec2.onclick = () => {
        cycleVariable("vec2");
        setScopeVisibilities(true, true, true, true, true);
      };
      variableTypeChangers.vec3.onclick = () => {
        cycleVariable("vec3");
        setScopeVisibilities(true, true, true, true, true);
      };
      variableTypeChangers.vec4.onclick = () => {
        cycleVariable("vec4");
        setScopeVisibilities(true, true, true, true, true);
      };
      variableTypeChangers.texture.onclick = () => {
        cycleVariable("texture");
        setScopeVisibilities(false, true, false, false, false);

        Uniform.onclick();
      };
      variableTypeChangers.cubemap.onclick = () => {
        cycleVariable("cubemap");
        setScopeVisibilities(false, true, false, false, false);

        Uniform.onclick();
      };
      variableTypeChangers.matrix.onclick = () => {
        cycleVariable("matrix");
        //I don't want to handle arrays for this imma be honest
        setScopeVisibilities(false, true, false, false, true);
      };

      Array.onclick = () => {
        Attribute.checked = false;
        Varying.checked = false;
        Uniform.checked = false;
        Hat.checked = false;
        Array.checked = true;
        arraySizeChanger.style.visibility = "visible";
      };

      Uniform.onclick = () => {
        Attribute.checked = false;
        Varying.checked = false;
        Array.checked = false;
        Hat.checked = false;
        Uniform.checked = true;
        arraySizeChanger.style.visibility = "hidden";
      };

      Attribute.onclick = () => {
        Uniform.checked = false;
        Varying.checked = false;
        Array.checked = false;
        Hat.checked = false;
        Attribute.checked = true;
        arraySizeChanger.style.visibility = "hidden";
      };

      Varying.onclick = () => {
        Uniform.checked = false;
        Attribute.checked = false;
        Array.checked = false;
        Hat.checked = false;
        Varying.checked = true;
        arraySizeChanger.style.visibility = "hidden";
      };

      Hat.onclick = () => {
        Uniform.checked = false;
        Attribute.checked = false;
        Array.checked = false;
        Varying.checked = false;
        Hat.checked = true;
        arraySizeChanger.style.visibility = "hidden";
      };

      const createVariableButton = document.getElementById("createVariable");
      const variableNameInput = document.getElementById("VarName");

      const doesVariableExist = (variablename) => {
        const variables = workspace.getAllVariables();
        if (!variablename.match(/^[a-zA-Z_]+$/)) return ["stringInvalid"];
        for (let varIndex = 0; varIndex < variables.length; varIndex++) {
          const curVar = variables[varIndex];
          if (curVar.name == variablename) {
            return ["varExists", curVar.name, curVar.type];
          }
        }

        return false;
      };

      let errorPopup = null;

      createVariableButton.onclick = () => {
        let variable_Exists = doesVariableExist(variableNameInput.value);

        if (errorPopup) {
          variableModalElement.removeChild(errorPopup);
        }

        //Switch for variable name errors
        if (variable_Exists) {
          errorPopup = document.createElement("div");
          let text = document.createElement("p");

          text.style.color = "var(--EditorTheme_Text_3)";

          text.style.textAlign = "center";

          text.style.fontSize = "1.5em";

          text.style.transform = "translate(0%,-75%)";

          errorPopup.appendChild(text);

          switch (variable_Exists[0]) {
            case "stringInvalid":
              text.innerHTML = "Desired variable name is invalid.";
              break;

            case "varExists":
              text.innerHTML =
                "variable " +
                variable_Exists[1] +
                " exists as a " +
                variable_Exists[2];
              break;

            default:
              text.innerHTML =
                "Honestly I dunno why you got this. Check the console";
              break;
          }
          errorPopup.style.width = "80%";
          errorPopup.style.transform = "translate(-50%,50%)";
          errorPopup.style.position = "absolute";
          errorPopup.style.top = "0%";
          errorPopup.style.left = "50%";

          errorPopup.style.height = "7.5%";

          errorPopup.style.backgroundColor = "#990404";
          errorPopup.style.borderWidth = "4rem";
          errorPopup.style.borderRadius = "0.375rem";

          errorPopup.style.alignItems = "center";

          variableModalElement.appendChild(errorPopup);
          return;
        }

        //Close the modal
        //Have to do some yandere dev type schieße for this.
        let scope = "uniform";
        if (Attribute.checked) {
          scope = "attribute";
        } else if (Varying.checked) {
          scope = "varying";
        } else if (Array.checked) {
          scope = `array[${arraySizeChanger.value}]`;
        } else if (Hat.checked) {
          scope = "hat";
        }

        if (typeName == "matrix") {
          penPlus.workspace.createVariable(
            scope + " " + variableNameInput.value,
            currentType.id + "_" + matrixSizeChanger.value,
            //This is going to be random anyways
            scope + "_" + variableNameInput.value
          );
        } else {
          penPlus.workspace.createVariable(
            scope + " " + variableNameInput.value,
            currentType.id,
            //This is going to be random anyways
            scope + "_" + variableNameInput.value
          );
        }

        varModal.close();
      };

      document.getElementById("closeButton").onclick = () => {
        varModal.close();
      };
    }
  }

  penPlus.categories.variables = variables_category;
}
