(function() {
    Blockly.Extensions.registerMutator(
        'customBlockMutator',
        { 
          saveExtraState: function() {
            return {
              'customBlockData': this.customBlockData
            };
          },
          
          loadExtraState: function(state) {
            this.customBlockData = state['customBlockData'];
            // This is a helper function which adds or removes inputs from the block.
            window.blockState = this;
          },

          mutationToDom: function() {
            // You *must* create a <mutation></mutation> element.
            // This element can have children.
            console.log(this);
            if (this.customBlockData) {
              this.inputFromJson_(penPlus.toBlocklyArg({
                type: "input_value",
                name: "name",
                check: "string",
                shadow: {
                  type: "string_reporter",
                },
              }));
            }
            
            var container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('items', this.itemCount_);
            return container;
          },
          
          domToMutation: function(xmlElement) {
          },          
        },
        undefined
    );
})();