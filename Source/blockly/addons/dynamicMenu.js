(function() {
      penPlus.variableDropDownField = class extends Blockly.FieldDropdown {
        constructor(value) {
            super(() => {
                let returned = [];
                const variables = workspace.getAllVariables();
                variables.forEach(variableDef => {
                    if (variableDef.name.split(" ")[0] == "hat" || variableDef.name.split(" ")[0] == "varying") {
                        returned.push([
                            variableDef.name.split(" ")[1],
                            `${variableDef.name} ${variableDef.type}`
                        ]);
                    }
                });
                return returned;
            }) 
        }
      }

      penPlus.arrayVariableDropdownField = class extends Blockly.FieldDropdown {
        constructor(value) {
            super(() => {
                let returned = [];
                const variables = workspace.getAllVariables();
                variables.forEach(variableDef => {
                    if (variableDef.name.split(" ")[0].split("[")[0] == "array") {
                        returned.push([
                            variableDef.name.split(" ")[1],
                            `${variableDef.name} ${variableDef.type}`
                        ]);
                    }
                });
                return returned;
            }) 
        }
      }

      Blockly.fieldRegistry.register('field_penPlus_var', penPlus.variableDropDownField);
      Blockly.fieldRegistry.register('field_penPlus_vararray', penPlus.arrayVariableDropdownField);
})();