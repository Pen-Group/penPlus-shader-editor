{
    const glsl_Button = document.getElementById("ButtonGLSL")
    const blockly_Button = document.getElementById("ButtonBlockly")

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
}