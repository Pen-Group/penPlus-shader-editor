Blockly.Gesture.prototype.setStartBlock = (block) => {
    //Stolen from scratch LoL
    if(!this.startBlock_ && !this.startBubble_) {
        this.startBlock_ = block;
        this.shouldDuplicateOnDrag = Blockly.scratchBlocksUtils.isShadowArgumentReporter(block);
        if (block.isInFlyout && block != block.getRootBlock()) {
            this.setTargetBlock_(block.getRootBlock());
        }
        else {
            this.setTargetBlock_(block)
        }
    }
}