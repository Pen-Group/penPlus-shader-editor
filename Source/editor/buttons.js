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
          let contents = JSON.parse(e.target.result);
          console.log(JSON.parse(e.target.result));
          if (contents.blockDat) {
            Blockly.serialization.workspaces.load(
              contents.blockDat,
              window.workspace
            );
            penPlus.dynamicallyAdded = contents.dynamicDat;
            penPlus.Generated_GLSL = contents.glsl;
          } else {
            Blockly.serialization.workspaces.load(contents, window.workspace);
          }
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
  const settingsButton = document.getElementById("OptionsButton");
  const creditsButton = document.getElementById("CreditsButton");
  const fileButton = document.getElementById("fileButton");
  const recompileButton = document.getElementById("recompileButton");

  const fileDropdown = document.getElementById("fileDropdown");
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

  penPlus.autoCompile =
    localStorage.getItem("AutoCompile") === null
      ? true
      : localStorage.getItem("AutoCompile") == "true";

  recompileButton.style.visibility = (penPlus.autoCompile) ? "hidden" : "visible";

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
    const varModal = penPlus.createModal(`
    <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
      <div style="position:absolute;left:0px;top:0px; width:100%; height:20%; background-color: var(--EditorTheme_Theme_4);">
        <p class="noSelect" style="position:absolute;left:50%;top:50%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">The People behind the madness</p>>
      </div>
      <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:48px; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 32px;">
        Credits
        <div id="closeButton" aria-label="Close" style="cursor:pointer; transform:translate(-110%,0%);aspect-ratio:1 / 1;background-color: var(--EditorTheme_Color_2); width:auto; height:80%; position:absolute; left:100%; top:10%; border-radius:100%;" role="button" tabindex="0">
          <img style="top:25%; width:50%; height:50%; left:25%; position:absolute; transform:rotate(45deg)" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==" draggable="false">
        </div>
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
        Drago Cuven<br>
        SillyCubeGuy<br>
        Dizzy Awe<br>
        Spong<br>
        </span>
        </p>
      </div>
    </div>
    `);

    document.getElementById("closeButton").onclick = () => {
      varModal.close();
    };
  };

  settingsButton.onclick = () => {
    const varModal = penPlus.createModal(`
    <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
      <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:48px; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 32px;">
        Options
        <div id="closeButton" aria-label="Close" style="cursor:pointer; transform:translate(-110%,0%);aspect-ratio:1 / 1;background-color: var(--EditorTheme_Color_2); width:auto; height:80%; position:absolute; left:100%; top:10%; border-radius:100%;" role="button" tabindex="0">
          <img style="top:25%; width:50%; height:50%; left:25%; position:absolute; transform:rotate(45deg)" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==" draggable="false">
        </div>
      </div>
      <div style="text-align: center; position:absolute; top:48px; width:100%; height:80%; overflow-y:scroll; color:var(--EditorTheme_Text_1);">
        <div>
          <div style="display:flex; width:100%; justify-content: center;">
            <input type="checkbox" id="AutoComp"></input>
            <p style="transform:translate(0%,-0.9em);">Automatic Compilation</p>
          </div>
          <div>Not much here now</div>
        </div>
      </div>
    </div>
    `);

    const autocompileButton = document.getElementById("AutoComp");

    autocompileButton.checked = penPlus.autoCompile;

    autocompileButton.onclick = () => {
      penPlus.autoCompile = autocompileButton.checked;
      localStorage.setItem("AutoCompile", autocompileButton.checked);

      recompileButton.style.visibility = (penPlus.autoCompile) ? "hidden" : "visible";
    };

    document.getElementById("closeButton").onclick = () => {
      varModal.close();
    };
  };

  fileButton.onclick = () => {
    fileDropdown.style.visibility = (fileDropdown.style.visibility == "hidden") ? "visible" : "hidden";
  }

  document.getElementById("prevAndConsole").onclick = () => {
    fileDropdown.style.visibility = "hidden";
  }

  document.getElementById("BlocklyDiv").onclick = () => {
    fileDropdown.style.visibility = "hidden";
  }

  document.getElementById("recompileButton").onclick = () => {
    updateGLSL({type:Blockly.Events.BLOCK_CHANGE,isManualCompile:true})
  }

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
    penPlus.previewMode = "fullscreen";
  };

  squareButton.onclick = () => {
    penPlus.previewMode = "square";
  };

  triangleButton.onclick = () => {
    penPlus.previewMode = "triangle";
  };

  saveButton.onclick = () => {
    download(
      JSON.stringify({
        blockDat: Blockly.serialization.workspaces.save(penPlus.workspace),
        dynamicDat: penPlus.dynamicallyAdded,
        glsl: penPlus.Generated_GLSL,
      }),
      "shader.pps",
      ""
    );
  };

  loadButton.onclick = () => {
    let result = readSingleFile();
  };
}
