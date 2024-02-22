//I'm to lazy to try and extract the zelos renderer so we are replacing it.

window.customZelosConstant = class extends window.Blockly.zelos.ConstantProvider {
    init() {
        super.init()
        this.FAKE_BLOCK = this.makeRoundel()
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
            return (Blockly.utils.svgPaths.lineTo(0,height));
        }

        var this2 = this

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
                return -connectionWidth;
            },
            pathDown(height) {
                return makeMainPath(height,true,false);
            },
            pathUp(height) {
                return makeMainPath(height,true,false)
            },
            pathRightDown(height) {
                return makeRightPath(height,true,false)
            },
            pathRightUp(height) {
                return makeRightPath(height,true,false)
            },
        };
    }


    shapeFor(connection){
        let check = connection.getCheck(); !check && connection.targetConnection && (check = connection.targetConnection.getCheck()); 
        switch (connection.type) {
            case Blockly.connectionTypes.OUTPUT_VALUE:
                if (check && -1 !== check.indexOf("myBlock_Input")) return this.FAKE_BLOCK;
                return super.shapeFor(connection);
            default: 
                return super.shapeFor(connection);
        }
    }
}

window.customZelosRenderer = class extends Blockly.zelos.Renderer {
    makeConstants_() {
        return new window.customZelosConstant();
    }
}