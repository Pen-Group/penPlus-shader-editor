(function() {
    const deleteVar = {
        id: 'deleteVar',
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        displayText: (scope) => {
            return `Remove variable ${scope.block.variableData.mainText.split(" ")[1]}`
        },
        weight: 10,
        preconditionFn: (scope) => {
            if (scope.block.variableData) {
                return 'enabled';
            }
            return 'hidden';
        },
        callback: (scope, e) => {
            const variableName = scope.block.variableData.mainText;
            penPlus.workspace.getAllBlocks().forEach(searchedBlock => {
                if (searchedBlock.variableData && searchedBlock.variableData.mainText == variableName) {
                    searchedBlock.dispose();
                }
            });

            penPlus.workspace.getAllVariables().forEach(searchedVar => {
                if (searchedVar.name == variableName) {
                    penPlus.workspace.deleteVariableById(searchedVar.id_);
                }
            })
        }
        
    }

    Blockly.ContextMenuRegistry.registry.register(deleteVar);
})();
