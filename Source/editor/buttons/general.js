(function () {
  const glsl_Button = document.getElementById("ButtonGLSL");
  penPlus.glsl_Button = glsl_Button;
  const blockly_Button = document.getElementById("ButtonBlockly");
  penPlus.blockly_Button = blockly_Button;

  const terminal_Button = document.getElementById("TerminalToggle");
  const theme_Button = document.getElementById("DarkToggle");
  const fileButton = document.getElementById("fileButton");

  const settingsDropdown = document.getElementById("settingsDropdown");
  const settingsDropdownButton = document.getElementById("SettingsButton");

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

    //penPlus.doHighlight({});
  };

  blockly_Button.onclick = () => {
    document.body.style.setProperty("--CodeVis", "hidden");
    document.body.style.setProperty("--BlocklyVis", "visible");

    glsl_Button.className = "buttonUnselected";
    blockly_Button.className = "buttonSelected";
  };

  terminal_Button.onclick = () => {
    if (penPlus.preview.widthTarget == 0) {
      penPlus.preview.lerpWidth(30);
    } else {
      penPlus.preview.lerpWidth(0);
    }
  };

  theme_Button.onclick = () => {
    if (penPlus.editorTheme == "dark") {
      penPlus.editorTheme = "light";
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
      penPlus.editorTheme = "dark";
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }

    localStorage.setItem("penPlusEditorTheme", penPlus.editorTheme);

    penPlus.refreshTheme();
    penPlus.updateMonacoTheme();
  };

  fileButton.onclick = () => {
    fileDropdown.style.visibility = fileDropdown.style.visibility == "hidden" ? "visible" : "hidden";
    settingsDropdown.style.visibility = "hidden";
  };

  settingsDropdownButton.onclick = () => {
    settingsDropdown.style.visibility = settingsDropdown.style.visibility == "hidden" ? "visible" : "hidden";
    fileDropdown.style.visibility = "hidden";
  };

  document.getElementById("prevAndConsole").onclick = () => {
    fileDropdown.style.visibility = "hidden";
    settingsDropdown.style.visibility = "hidden";
  };

  blockly_div.onclick = () => {
    fileDropdown.style.visibility = "hidden";
    settingsDropdown.style.visibility = "hidden";
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
