{
  function download(data, filename, type) {
    var file = new Blob([data], { type: type });

    if (window.navigator.msSaveOrOpenBlob) {
      // For IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
      // For other browsers
      var a = document.createElement("a");
      var url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  function readSingleFile() {
    let opener = document.createElement("input");
    opener.type = "file";
    opener.accept = ".pps";

    opener.click();

    opener.addEventListener(
      "change",
      () => {
        let file = opener.files[0];
        if (!file) {
          return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
          let contents = e.target.result;
          Blockly.serialization.workspaces.load(
            JSON.parse(contents),
            window.workspace
          );
        };
        reader.readAsText(file);
      },
      false
    );
  }

  const glsl_Button = document.getElementById("ButtonGLSL");
  const blockly_Button = document.getElementById("ButtonBlockly");
  const terminal_Button = document.getElementById("TerminalToggle");
  const theme_Button = document.getElementById("DarkToggle");
  const creditsButton = document.getElementById("CreditsButton");
  const saveButton = document.getElementById("saveButton");
  const loadButton = document.getElementById("loadButton");
  const blockly = document.getElementById("BlocklyDiv");

  const fullScreen = document.getElementById("FullScreen");
  const squareButton = document.getElementById("SquareButton");
  const triangleButton = document.getElementById("TriangleButton");

  penPlus.shaderVars = document.getElementById("shaderVars");

  const log_button = document.getElementById("ButtonLog");
  const var_button = document.getElementById("ButtonVar");

  penPlus.editorTheme =
    localStorage.getItem("penPlusEditorTheme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  glsl_Button.onclick = () => {
    document.body.style.setProperty("--CodeVis", "visible");
    document.body.style.setProperty("--BlocklyVis", "hidden");

    glsl_Button.className = "buttonSelected";
    blockly_Button.className = "buttonUnselected";
  };

  blockly_Button.onclick = () => {
    document.body.style.setProperty("--CodeVis", "hidden");
    document.body.style.setProperty("--BlocklyVis", "visible");

    glsl_Button.className = "buttonUnselected";
    blockly_Button.className = "buttonSelected";
  };

  terminal_Button.onclick = () => {
    if (blockly.style.width === "100%") {
      document.body.style.setProperty("--TerminalVis", "visible");

      blockly.style.width = "70%";
      blockly.style.left = "30%";
      Blockly.svgResize(workspace);
    } else {
      document.body.style.setProperty("--TerminalVis", "hidden");

      blockly.style.width = "100%";
      blockly.style.left = "0px";
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

  creditsButton.onclick = () => {
    const varModal = createModal(`
    <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
      <div style="position:absolute;left:0px;top:0px; width:100%; height:20%; background-color: var(--EditorTheme_Theme_4);">
        <p class="noSelect" style="position:absolute;left:50%;top:50%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">The People behind the madness</p>>
      </div>
      <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:1.1em; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 2em;">
        Credits
      </div>
      <div style="text-align: center; position:absolute; top:20%; width:100%; height:80%; overflow-y:scroll; color:var(--EditorTheme_Text_1);">
        <p class="" style="flex: 1 2 auto; color:var(--EditorTheme_Text_2);font-size: 2em; width:100%;">Programmers<br>
        <span style="font-size: 0.5em;">
        ObviousAlexC - JavaScript, Main UI, GLSL Code<br>
        Nameless Cat - CSS and HTML refactoring<br>
        Jwklong - Custom Block Shapes<br>
        </span>
        Icons<br>
        <span style="font-size: 0.5em;">
        FeatherIcons.com<br>
        Google Material Icons<br>
        </span>
        Testers<br>
        <span style="font-size: 0.5em;">
        Alltrue<br>
        Nameless Cat<br>
        GodslayerAPK<br>
        JeremyGamer<br>
        The Shovel<br>
        RealWorld<br>
        </span>
        </p>
      </div>
      <button id="closeMenu" style="position:absolute; left:95%; top:90%; transform: translate(-100%,-100%); background-color:var(--EditorTheme_Color_1); border-width: 0px; border-radius: 0.25rem; width:4em; height:3em;font-size: 1.125em; color:var(--EditorTheme_Text_1);">Close</button>
    </div>
    `);

    document.getElementById("closeMenu").onclick = () => {
      varModal.close();
    };
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

  fullScreen.onclick = () => {
    window.previewMode = "fullscreen";
  };

  squareButton.onclick = () => {
    window.previewMode = "square";
  };

  triangleButton.onclick = () => {
    window.previewMode = "triangle";
  };

  saveButton.onclick = () => {
    console.log(
      JSON.stringify(Blockly.serialization.workspaces.save(window.workspace))
    );
    download(
      JSON.stringify(Blockly.serialization.workspaces.save(window.workspace)),
      "shader.pps",
      ""
    );
  };

  loadButton.onclick = () => {
    let result = readSingleFile();
  };
}
