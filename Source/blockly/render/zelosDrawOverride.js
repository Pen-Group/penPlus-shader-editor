//I'm to lazy to try and extract the zelos renderer so we are replacing it.

penPlus.customZelosConstant = class extends (
  Blockly.zelos.ConstantProvider
) {
  init() {
    super.init();
    this.FAKE_BLOCK = this.makeRoundel();
  }

  makeRoundel() {
    const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
    const notchWidth = this.NOTCH_WIDTH / 3;
    const notchHeight = this.NOTCH_HEIGHT;
    const notchOffset = this.NOTCH_OFFSET_LEFT;

    function makeMainPath(height, up, right) {
      const halfHeight = height / 2;
      return (
        Blockly.utils.svgPaths.lineTo(0, 0) +
        Blockly.utils.svgPaths.lineTo(0, -height) +
        Blockly.utils.svgPaths.lineTo(notchOffset, 0) +
        Blockly.utils.svgPaths.lineTo(notchWidth, notchHeight) +
        Blockly.utils.svgPaths.lineTo(notchWidth, 0) +
        Blockly.utils.svgPaths.lineTo(notchWidth, -notchHeight) +
        Blockly.utils.svgPaths.moveBy(0, height) +
        Blockly.utils.svgPaths.lineTo(-notchWidth, notchHeight) +
        Blockly.utils.svgPaths.lineTo(-notchWidth, 0) +
        Blockly.utils.svgPaths.lineTo(-notchWidth, -notchHeight) +
        Blockly.utils.svgPaths.lineTo(-notchOffset, 0)
      );
    }

    function makeRightPath(height, up, right) {
      const halfHeight = height / 2;
      return Blockly.utils.svgPaths.lineTo(0, 0);
    }

    var this2 = this;

    return {
      type: this.SHAPES.HEXAGONAL,
      isDynamic: true,
      width(height) {
        const halfHeight = height / 2;
        return halfHeight > maxWidth ? maxWidth : halfHeight;
      },
      height(height) {
        return height;
      },
      connectionOffsetY(connectionHeight) {
        return connectionHeight / 2;
      },
      connectionOffsetX(connectionWidth) {
        return -connectionWidth / 2;
      },
      pathDown(height) {
        return makeMainPath(height, true, false);
      },
      pathUp(height) {
        return makeMainPath(height, true, false);
      },
      pathRightDown(height) {
        return makeRightPath(height, true, false);
      },
      pathRightUp(height) {
        return makeRightPath(height, true, false);
      },
    };
  }

  shapeFor(connection) {
    let check = connection.getCheck();
    !check &&
      connection.targetConnection &&
      (check = connection.targetConnection.getCheck());
    switch (connection.type) {
      case Blockly.connectionTypes.OUTPUT_VALUE:
        if (check && -1 !== check.indexOf("myBlock_Input"))
          return this.FAKE_BLOCK;
        return super.shapeFor(connection);
      default:
        return super.shapeFor(connection);
    }
  }
};

penPlus.customZelosRenderer = class extends Blockly.zelos.Renderer {
  makeConstants_() {
    return new penPlus.customZelosConstant();
  }
};

//Prevent zooming
Blockly.VerticalFlyout.prototype.getFlyoutScale = function () {
  return 0.8;
};

//Stolen from clamp :)
Blockly.VerticalFlyout.prototype.reflowInternal_ = function () {
  this.workspace_.scale = this.getFlyoutScale();
  let flyoutWidth = 0;
  const blocks = this.workspace_.getTopBlocks(false);
  for (let i = 0, block; (block = blocks[i]); i++) {
    let width = block.getHeightWidth().width;
    if (block.outputConnection) {
      width -= this.tabWidth_;
    }
    flyoutWidth = Math.max(flyoutWidth, width);
  }
  for (let i = 0, button; (button = this.buttons_[i]); i++) {
    flyoutWidth = Math.max(flyoutWidth, button.width);
  }
  flyoutWidth += this.MARGIN * 2 + this.tabWidth_;
  flyoutWidth *= this.workspace_.scale;
  flyoutWidth += Blockly.Scrollbar.scrollbarThickness;

  flyoutWidth = Math.min(flyoutWidth, 275);

  if (this.width_ !== flyoutWidth) {
    for (let i = 0, block; (block = blocks[i]); i++) {
      if (this.rectMap_.has(block)) {
        this.moveRectToBlock_(this.rectMap_.get(block), block);
      }
    }

    this.width_ = flyoutWidth;
    this.position();
    this.targetWorkspace.resizeContents();
    this.targetWorkspace.recordDragTargets();
  }
};
