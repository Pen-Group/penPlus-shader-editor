(function () {
    let rWidth = 30;
    let widthLerping = false;

    penPlus.preview = {
        widthTarget: 30,

        set width(val) {
            rWidth = val;
            document.body.style.setProperty("--previewWidth",`${val}vw`);
            Blockly.svgResize(workspace);
        },
        get width() {
            return rWidth;
        },

        lerpWidth(width,looped) {
            if (!looped) {
                penPlus.preview.widthTarget = width;
                if (widthLerping) return;
                widthLerping = true;
            }

            if (Math.abs(penPlus.preview.width - penPlus.preview.widthTarget) < 1) {
                penPlus.preview.width = penPlus.preview.widthTarget;
                widthLerping = false;
                return;
            }

            penPlus.preview.width += (penPlus.preview.widthTarget - penPlus.preview.width) * 0.125;
            window.requestAnimationFrame(() => {penPlus.preview.lerpWidth(penPlus.preview.widthTarget,true)});
        }
    }
})()