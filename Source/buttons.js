{
    const glsl_Button = document.getElementById("ButtonGLSL")
    const blockly_Button = document.getElementById("ButtonBlockly")
    const terminal_Button = document.getElementById("TerminalToggle")
    const blockly = document.getElementById("BlocklyDiv")

    glsl_Button.onclick = () => {
        document.body.style.setProperty("--CodeVis", "visible");
        document.body.style.setProperty("--BlocklyVis", "hidden");

        glsl_Button.className = "buttonSelected";
        blockly_Button.className = "buttonUnselected";
    }

    blockly_Button.onclick = () => {
        document.body.style.setProperty("--CodeVis", "hidden");
        document.body.style.setProperty("--BlocklyVis", "visible");

        glsl_Button.className = "buttonUnselected";
        blockly_Button.className = "buttonSelected";
    }

    terminal_Button.onclick = () => {
        if (blockly.style.width === "100%") {
            document.body.style.setProperty("--TerminalVis", "visible");

            blockly.style.width = "70%"
            blockly.style.left = "30%"
            Blockly.svgResize(workspace);
        } else {
            document.body.style.setProperty("--TerminalVis", "hidden");

            blockly.style.width = "100%"
            blockly.style.left = "0px"
            Blockly.svgResize(workspace);
        }
    }
}
