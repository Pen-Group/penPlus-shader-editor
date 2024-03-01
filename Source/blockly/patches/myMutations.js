(function() {
    Blockly.Extensions.registerMixin('penPlusCustomBlock', {
        someProperty: 'a cool value',

        saveExtraState: function() {
          return {
            'itemCount': this.itemCount_,
          };
        },
        
        loadExtraState: function(state) {
          this.itemCount_ = state['itemCount'];
          // This is a helper function which adds or removes inputs from the block.
          this.updateShape_();
        },
          
      
        someMethod: function() {
          // Do something cool!
        }
    });
})();