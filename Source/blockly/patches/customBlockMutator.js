(function() {
    Blockly.Extensions.registerMutator(
        'customBlockMutator',
        { 
          saveExtraState: function() {
            return {
              'customArgs': this.customArgs,
              'mainText': this.mainText,
              'type': this.type,
            };
          },
          
          loadExtraState: function(state) {
            this.customArgs = state['customArgs'];
            this.mainText = state['mainText'];
            this.type = state['type'];
            // This is a helper function which adds or removes inputs from the block.
            this.updateShape_();
          },   

          mutationToDom: function() {
            // You *must* create a <mutation></mutation> element.
            // This element can have children.
            var container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('items', this.itemCount_);
            return container;
          },
          
          domToMutation: function(xmlElement) {
            this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
            // This is a helper function which adds or removes inputs from the block.
            this.updateShape_();
          },          
        },
        undefined
    );
})();