(function () {
  const glsl_Button = document.getElementById("ButtonGLSL");
  penPlus.glsl_Button = glsl_Button;
  const blockly_Button = document.getElementById("ButtonBlockly");
  penPlus.blockly_Button = blockly_Button;

  const terminal_Button = document.getElementById("TerminalToggle");
  const theme_Button = document.getElementById("DarkToggle");
  const fileButton = document.getElementById("fileButton");

  //Secret button hidden within the options
  const recompileButton = document.getElementById("recompileButton");
  penPlus.recompileButton = recompileButton;

  const blockly_div = document.getElementById("BlocklyDiv");

  penPlus.shaderVars = document.getElementById("shaderVars");

  const log_button = document.getElementById("ButtonLog");
  const var_button = document.getElementById("ButtonVar");

  glsl_Button.onclick = () => {
    document.body.style.setProperty("--CodeVis", "visible");
    document.body.style.setProperty("--BlocklyVis", "hidden");

    glsl_Button.className = "buttonSelected";
    blockly_Button.className = "buttonUnselected";

    penPlus.doHighlight({});
  };

  blockly_Button.onclick = () => {
    document.body.style.setProperty("--CodeVis", "hidden");
    document.body.style.setProperty("--BlocklyVis", "visible");

    glsl_Button.className = "buttonUnselected";
    blockly_Button.className = "buttonSelected";
  };

  terminal_Button.onclick = () => {
    if (blockly_div.style.width === "100%") {
      document.body.style.setProperty("--TerminalVis", "visible");

      blockly_div.style.width = "70%";
      blockly_div.style.left = "30%";
      Blockly.svgResize(workspace);
    } else {
      document.body.style.setProperty("--TerminalVis", "hidden");

      blockly_div.style.width = "100%";
      blockly_div.style.left = "0px";
      Blockly.svgResize(workspace);
    }
  };

  theme_Button.onclick = () => {
    if (penPlus.editorTheme == "dark") {
      penPlus.editorTheme = "light";
    } else {
      penPlus.editorTheme = "dark";
    }

    localStorage.setItem("penPlusEditorTheme", penPlus.editorTheme);

    penPlus.refreshTheme();
  };

  fileButton.onclick = () => {
    fileDropdown.style.visibility =
      fileDropdown.style.visibility == "hidden" ? "visible" : "hidden";
  };

  document.getElementById("prevAndConsole").onclick = () => {
    fileDropdown.style.visibility = "hidden";
  };

  blockly_div.onclick = () => {
    fileDropdown.style.visibility = "hidden";
  };

  document.getElementById("recompileButton").onclick = () => {
    updateGLSL({ type: Blockly.Events.BLOCK_CHANGE, isManualCompile: true });
  };

  log_button.onclick = () => {
    document.getElementById("shaderLog").style.visibility = "visible";
    document.getElementById("shaderVars").style.visibility = "hidden";

    var_button.className = "buttonUnselected";
    log_button.className = "buttonSelected";
  };

  var_button.onclick = () => {
    document.getElementById("shaderLog").style.visibility = "hidden";
    document.getElementById("shaderVars").style.visibility = "visible";

    log_button.className = "buttonUnselected";
    var_button.className = "buttonSelected";
  };
})();
