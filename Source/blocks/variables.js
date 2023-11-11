{
  window.categories = window.categories || {};

  class variables_category extends window.penPlusExtension {
    getInfo() {
      addBlockColorSet("vec2_blocks", "#5AB897", "#47AA8C", "#339178");
      addBlockColorSet("vec3_blocks", "#5BB4B7", "#47AAAF", "#319098");
      addBlockColorSet("vec4_blocks", "#59BC77", "#47AB6A", "#359258");
      addBlockColorSet("int_blocks", "#ffde00", "#e6c800", "#ccb100");
      addBlockColorSet("bool_blocks", "#c2d916", "#adc213", "#a0b312");
      addBlockColorSet("matrix_blocks", "#737fff", "#636ed6", "#5560cb");
      return {
        name: "Variables",
        id: "variables",
        color1: "#ff8c1a",
        color2: "#dd8126",
        color3: "#cc7015",
        blocks: [
          {
            opcode: "createVariable",
            type: "button",
            text: "Create Variable",
          },
          "Float",
          {
            opcode: "set_float",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["float"],    // Specifies what types to put in the dropdown
                defaultType: "float"  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
                shadow: {
                  type: "number_reporter",
                },
              }
            ]
          },
          {
            opcode: "get_float",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["float"],    // Specifies what types to put in the dropdown
                defaultType: "float"  //The default type of the variable
              }
            ]
          },
          "Integer",
          {
            opcode: "set_integer",
            type: "command",
            text: "set %1 to %2",
            style: "int_blocks",
            tooltip: "Set the variable to the desired value.",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["int"],    // Specifies what types to put in the dropdown
                defaultType: "int"  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
                shadow: {
                  type: "int_reporter",
                },
              }
            ]
          },
          {
            opcode: "get_integer",
            type: "reporter",
            text: "%1",
            style: "int_blocks",
            tooltip: "Return's the selected variable's value.",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["int"],    // Specifies what types to put in the dropdown
                defaultType: "int"  //The default type of the variable
              }
            ]
          },
          "Vector 2",
          {
            opcode: "set_v2",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "vec2_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                check: ["vec2", "VectorCompliant"],
                variableTypes: ["vec2"],    // Specifies what types to put in the dropdown
                defaultType: "vec2"  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
              }
            ]
          },
          {
            opcode: "get_v2",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            output: "vec2",
            style: "vec2_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["vec2"],    // Specifies what types to put in the dropdown
                defaultType: "vec2",  //The default type of the variable
              }
            ]
          },
          "Vector 3",
          {
            opcode: "set_v3",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "vec3_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                check: ["vec3", "VectorCompliant"],
                variableTypes: ["vec3"],    // Specifies what types to put in the dropdown
                defaultType: "vec3"  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
              }
            ]
          },
          {
            opcode: "get_v3",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            style: "vec3_blocks",
            output: "vec3",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["vec3"],    // Specifies what types to put in the dropdown
                defaultType: "vec3",  //The default type of the variable
              }
            ]
          },
          "Vector 4",
          {
            opcode: "set_v4",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "vec4_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                check: ["vec4", "VectorCompliant"],
                variableTypes: ["vec4"],    // Specifies what types to put in the dropdown
                defaultType: "vec4"  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
              }
            ]
          },
          {
            opcode: "get_v4",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            style: "vec4_blocks",
            output: "vec4",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["vec4"],    // Specifies what types to put in the dropdown
                defaultType: "vec4",  //The default type of the variable
              }
            ]
          },
          "Boolean",
          {
            opcode: "set_bool",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "bool_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["bool"],    // Specifies what types to put in the dropdown
                defaultType: "bool",  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
                check: "Boolean",
              }
            ]
          },
          {
            opcode: "get_bool",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            output: "Boolean",
            style: "bool_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["bool"],    // Specifies what types to put in the dropdown
                defaultType: "bool",  //The default type of the variable
              }
            ]
          },
          "Texture",
          {
            opcode: "set_tex",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "texture_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["texture"],    // Specifies what types to put in the dropdown
                defaultType: "texture",  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
                check: "texture",
              }
            ]
          },
          {
            opcode: "get_tex",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            style: "texture_blocks",
            output: "texture",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["texture"],    // Specifies what types to put in the dropdown
                defaultType: "texture",  //The default type of the variable
              }
            ]
          },
          "Cubemaps",
          {
            opcode: "set_cubemap",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "cubemap_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["cubemap"],    // Specifies what types to put in the dropdown
                defaultType: "cubemap",  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
                check: "cubemap",
              }
            ]
          },
          {
            opcode: "get_cubemap",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            style: "cubemap_blocks",
            output: "cubemap",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["cubemap"],    // Specifies what types to put in the dropdown
                defaultType: "cubemap"  //The default type of the variable
              }
            ]
          },
          "Matricies",
          {
            opcode: "set_matrix",
            type: "command",
            text: "set %1 to %2",
            tooltip: "Set the variable to the desired value.",
            style: "matrix_blocks",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["matrix_2x","matrix_2x3","matrix_2x4","matrix_3x","matrix_3x2","matrix_3x4","matrix_4x","matrix_4x2","matrix_4x3"],    // Specifies what types to put in the dropdown
                defaultType: "matrix_2x",  //The default type of the variable
              },
              {
                type: "input_value",    // This expects an input of any type
                name: "VALUE",
                check: "matrix",
              }
            ]
          },
          {
            opcode: "get_matrix",
            type: "reporter",
            text: "%1",
            tooltip: "Return's the selected variable's value.",
            style: "matrix_blocks",
            output: "matrix",
            arguments: [
              {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                variableTypes: ["matrix_2x","matrix_2x3","matrix_2x4","matrix_3x","matrix_3x2","matrix_3x4","matrix_4x","matrix_4x2","matrix_4x3"],    // Specifies what types to put in the dropdown
                defaultType: "matrix_2x"  //The default type of the variable
              }
            ]
          },
        ],
      }
    }

    createVariable(button) {
      //Html Modal Mess
      const varModal = createModal(`
          <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
            <div style="position:absolute;left:0px;top:0px; width:100%; height:40%; background-color: var(--EditorTheme_Theme_4);">
              <input id="VarName" placeholder="Variable Name" style="position:absolute;left:50%;top:50%;Transform:Translate(-50%,-50%); width:50%; height:20%;" type="text"></input>
              <p class="noSelect" style="position:absolute;left:50%;top:75%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Only use A-Z</p>
            </div>
            <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:1.1em; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 2em;">
              Create Variable  
            </div>
            <div style="position:absolute; top:40%; width:100%; height:40%; color:var(--EditorTheme_Text_1);">
              <p class="noSelect" style="position:absolute;left:50%;top:75%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Variable Type</p>
              <!--Variable Types-->
              <div style="overflow-x:scroll; overflow-y:hidden; position:absolute; width:100%; height: 75%;text-align: center;">
                <!--Float-->
                <div id="float" style="position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6;justify-content: center;">
                  <div style="background-color:#ff8c1a; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Float</p>
                </div>
                <!--Int-->
                <div id="int" style="left:25%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#ffde00;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Int</p>
                </div>
                <!--Vec 2-->
                <div id="vec2" style="left:50%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#5AB897;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 2</p>
                </div>
                <!--Vec 3-->
                <div id="vec3" style="left:75%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#5BB4B7;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 3</p>
                </div>
                <!--Vec 4-->
                <div id="vec4" style="left:100%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#59BC77;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 4</p>
                </div>
                <!--Texture-->
                <div id="texture" style="left:125%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#b464e7;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Texture</p>
                </div>
                <!--Cubemap-->
                <div id="cubemap" style="left:150%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#8672ff;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Cubemap</p>
                </div>
                <!--Matrix-->
                <div id="matrix" style="left:175%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                  <div style="background-color:#737fff;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                  </div>

                  <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Matrix</p>
                </div>
              </div>
              </div>
              <div style="top:80%;height:20%;width:100%;position:absolute;">
                <div style="display: flex;position:absolute;left:50%;width:50%;height:80%; font-size: 1.125em;  color:var(--EditorTheme_Text_1); transform: translate(-50%);">
                  <div style="display: flex; width:33.3333%">
                    <input type="checkbox" checked id="Uniform"></input>
                    <p style="transform:translate(0%,-1em);">Uniform</p>
                  </div>
                  <div style="display: flex; width:33.3333%">
                    <input type="checkbox" id="Attribute"></input>
                    <p style="transform:translate(0%,-1em);">Vertex</p>
                  </div>
                  <div style="display: flex; width:33.3333%">
                    <input type="checkbox" id="Varying"></input>
                    <p style="transform:translate(0%,-1em);">Pixel</p>
                  </div>
                </div>
                <p class="noSelect" style="position:absolute;left:50%;top:20%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Variable Scope</p>
                <button id="createVariable" style="position:absolute; left:95%; top:90%; transform: translate(-100%,-100%); background-color:var(--EditorTheme_Color_1); border-width: 0px; border-radius: 0.25rem; width:4em; height:3em;font-size: 1.125em; color:var(--EditorTheme_Text_1);">OK</button>
                <select id="matrixSizes" name="Matrix Sizes" style="position:absolute; left:15%; top:90%; transform: translate(-100%,-100%); background-color:var(--EditorTheme_Color_1); border-width: 0px; border-radius: 0.25rem; width:4em; height:3em;font-size: 1.125em; color:var(--EditorTheme_Text_1); visibility:hidden;">
                  <option value="2x">2x2</option>
                  <option value="2x3">2x3</option>
                  <option value="2x4">2x4</option>
                  <option value="3x">3x3</option>
                  <option value="3x2">3x2</option>
                  <option value="3x4">3x4</option>
                  <option value="4x">4x4</option>
                  <option value="4x2">4x2</option>
                  <option value="4x3">4x3</option>
                </select>
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
        matrix: document.getElementById("matrix")
      };

      const matrixSizeChanger = document.getElementById("matrixSizes");

      let currentType = variableTypeChangers.float;
      let typeName = "float";

      let variableModalElement = document.getElementById("variableModal");

      //Short function to cycle types
      const cycleVariable = (type) => { 
        typeName = type;
        currentType.style.backgroundColor = "var(--EditorTheme_Theme_3)"; 
        variableTypeChangers[type].style.backgroundColor = "var(--EditorTheme_Theme_4)"; 
        currentType = variableTypeChangers[type]; 
        if (type == "matrix") {
          matrixSizeChanger.style.visibility = "visible";
        }
        else {
          matrixSizeChanger.style.visibility = "hidden";
        }
      };
      cycleVariable("float");

      variableTypeChangers.float.onclick = () => { cycleVariable("float") };
      variableTypeChangers.int.onclick = () => { cycleVariable("int") };
      variableTypeChangers.vec2.onclick = () => { cycleVariable("vec2") };
      variableTypeChangers.vec3.onclick = () => { cycleVariable("vec3") };
      variableTypeChangers.vec4.onclick = () => { cycleVariable("vec4") };
      variableTypeChangers.texture.onclick = () => { cycleVariable("texture") };
      variableTypeChangers.cubemap.onclick = () => { cycleVariable("cubemap") };
      variableTypeChangers.matrix.onclick = () => { cycleVariable("matrix") };

      const Uniform = document.getElementById("Uniform");
      const Attribute = document.getElementById("Attribute");
      const Varying = document.getElementById("Varying");

      Uniform.onclick = () => {
        Attribute.checked = false;
        Varying.checked = false;
        Uniform.checked = true;
      }

      Attribute.onclick = () => {
        Uniform.checked = false;
        Varying.checked = false;
        Attribute.checked = true;
      }

      Varying.onclick = () => {
        Uniform.checked = false;
        Attribute.checked = false;
        Varying.checked = true;
      }

      const createVariableButton = document.getElementById("createVariable");
      const variableNameInput = document.getElementById("VarName");

      const doesVariableExist = (variablename) => {
        const variables = workspace.getAllVariables();
        if (!variablename.match(/^[a-zA-Z]+$/)) return ["stringInvalid"];
        for (let varIndex = 0; varIndex < variables.length; varIndex++) {
          const curVar = variables[varIndex];
          if (curVar.name == variablename) {
            return ["varExists", curVar.name, curVar.type];
          }
        }

        return false;
      }

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
              text.innerHTML = "variable " + variable_Exists[1] + " exists as a " + variable_Exists[2];
              break;

            default:
              text.innerHTML = "Honestly I dunno why you got this. Check the console";
              break;
          }
          errorPopup.style.width = "80%";
          errorPopup.style.transform = "translate(-50%,50%)"
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
        if (typeName == "matrix") {
          window.workspace.createVariable(variableNameInput.value, currentType.id + "_" + matrixSizeChanger.value);
        }
        else {
          window.workspace.createVariable(variableNameInput.value, currentType.id);
        }
        
        varModal.close();
      }
    }

    set_float(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_float(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_integer(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_integer(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_v2(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_v2(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_v3(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_v3(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_v4(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_v4(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_bool(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_bool(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_tex(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_tex(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_cubemap(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_cubemap(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    set_matrix(block, generator) {
      const variableName = Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name;
      const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

      return `${variableName} = ${value}` + nextBlockToCode(block, generator);
    }

    get_matrix(block, generator) {
      return [`${Blockly.Variables.getVariable(window.workspace,block.getFieldValue('VAR')).name}` + nextBlockToCode(block, generator), Order.ATOMIC];
    }
  }

  window.categories.variables = variables_category;
}