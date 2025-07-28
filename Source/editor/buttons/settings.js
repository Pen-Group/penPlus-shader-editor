(function () {
  const themeIcon = document.getElementById("themeIcon");
  const settingsButton = document.getElementById("OptionsButton");

  penPlus.editorTheme = localStorage.getItem("penPlusEditorTheme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  if (penPlus.editorTheme == "dark") {
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  } else {
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  }

  penPlus.autoCompile = localStorage.getItem("AutoCompile") === null ? true : localStorage.getItem("AutoCompile") == "true";

  penPlus.fancyLogBG = localStorage.getItem("fancyLogBG") === null ? true : localStorage.getItem("fancyLogBG") == "true";

  penPlus.EditorAccent = localStorage.getItem("accentColor") === null ? "#0fbd8c" : localStorage.getItem("accentColor");
  penPlus.CustomEditorAccent = localStorage.getItem("customColor") === null ? "#0fbd8c" : localStorage.getItem("customColor");

  penPlus.blocklyGLSLVersion = localStorage.getItem("blocklyGLSLVersion") === null ? "300" : localStorage.getItem("blocklyGLSLVersion");
  penPlus.refreshDefaultShaderString();

  penPlus.customBlockColors = JSON.parse(localStorage.getItem("customBlockColors")) || {};

  let availableSounds; 
  fetch("media/SoundSets.json").then(result => result.json()).then(soundJSONS => {
    availableSounds = soundJSONS;
    if (Blockly) {
      penPlus.loadSounds(penPlus.blocklyEditorSounds);
    }
  });

  penPlus.blocklyEditorSounds = localStorage.getItem("blocklyEditorSounds") === null ? "Blockly" : localStorage.getItem("blocklyEditorSounds");

  penPlus.loadSounds = (soundSet) => {
    if (!availableSounds) return;
    Blockly.getMainWorkspace().audioManager.sounds.clear();

    availableSounds.forEach(soundSet2 => {
      if (soundSet2.Name != soundSet) return;

      soundSet2.Sounds.forEach(sound => {
        Blockly.getMainWorkspace().audioManager.sounds.set(sound,new Audio(`media/sounds/${soundSet}/${sound}.mp3`));
      });
    });
  }

  const addInputOption = (input,func,value) => {
    input.value = value;
    input.onchange = (event) => {
      func(input,event);
    };
  }

  const addCheckboxValue = (input,func,value) => {
    input.checked = value;
    input.onclick = (event) => {
      func(input,event);
    }
  }

  recompileButton.style.visibility = penPlus.autoCompile ? "hidden" : "visible";

  settingsButton.onclick = () => {
    const varModal = penPlus.createModal(`
    <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;">
      <div class="ModalHeader">
        <div class="ModalHeaderFH">
          Options
        </div>

        <div class="ModalHeaderFC">
          <div id="closeButton" aria-label="Close" class="closeButton" role="button" tabindex="0">
            <img class="closeButtonImage" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==" draggable="false">
          </div>
        </div>
      </div>  
    
      <div class="modalContents">
        <div class="modalContentHeader">
          <span>Scratch Settings</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="checkbox" id="AutoComp"></input>
              <span>Auto Compilation</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <span>GLSL Version</span>
              <select value="300" id="GLSLVersion">
                <option value="100">1.0 (Legacy)</option>
                <option value="300">3.0</option>
              </select>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <span>Sounds</span>
              <select value="300" id="EditorSoundDropdown">
                ${(() => {
                  let resultingSounds = "";
                  availableSounds.forEach(sound => {
                    resultingSounds += `<option value="${sound.Name}">${sound.Name}</option>`;
                  });
                  return resultingSounds;
                })()}
              </select>
            </label>
          </div>
        </div>



        <div class="modalContentHeader">
          <span>Visual Settings</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="checkbox" id="ErrAWarnAnim"></input>
              <span>Error and Warning Animations</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <span>Editor Accent</span>
              <select value="300" id="EditorThemeDropdown">
                <option value="#0fbd8c">Editor Green</option>
                <option value="#ff4c4c">Turbo Red</option>
                <option value="#855cd6">Proper Purple</option>
                <option value="#4c97ff">Classic Blue</option>
                <option value="#ffcc00">Banana Yellow</option>
                <option value="#333333">Garish Grey</option>
                <option value="CUSTOM_COLOR">Custom Color</option>
              </select>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" value="${penPlus.CustomEditorAccent}" id="customColorInput"></input>
              <span style="color:var(--EditorTheme_Text_1);">Custom Accent Color</span>
            </label>
          </div>
        </div>



        <div class="modalContentHeader">
          <span>Category Colors</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="eventsColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Events</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="vertexColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Vertex</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="looksColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Looks</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="colorsColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Colors</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="controlsColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Controls</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="operatorsColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Operators</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="sensingColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Sensing</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="myBlocksColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">My Blocks</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="injectionColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Injection</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="floatColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Float</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="intColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Integer</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="vec2Color"></input>
              <span style="color:var(--EditorTheme_Text_1);">Vector 2</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="vec3Color"></input>
              <span style="color:var(--EditorTheme_Text_1);">Vector 3</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="vec4Color"></input>
              <span style="color:var(--EditorTheme_Text_1);">Vector 4</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="matrixColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Matrix</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="textureColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Texture</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="color" id="cubemapColor"></input>
              <span style="color:var(--EditorTheme_Text_1);">Cubemap</span>
            </label>
          </div>
        </div>
        
      </div>
    </div>
    `);

    document.getElementById("closeButton").onclick = () => {
      varModal.close();
    };

    addCheckboxValue(document.getElementById("AutoComp"), (input) => {
      penPlus.autoCompile = input.checked;
      localStorage.setItem("AutoCompile", input.checked);

      recompileButton.style.visibility = penPlus.autoCompile && !penPlus.isTextMode ? "hidden" : "visible";
    },penPlus.autoCompile);

    addCheckboxValue(document.getElementById("ErrAWarnAnim"), (input) => {
      penPlus.fancyLogBG = input.checked;
      localStorage.setItem("fancyLogBG", input.checked);
    },penPlus.fancyLogBG);

    addInputOption(document.getElementById("GLSLVersion"), (input) => {
      penPlus.blocklyGLSLVersion = input.value;
      localStorage.setItem("blocklyGLSLVersion", penPlus.blocklyGLSLVersion);

      penPlus.refreshDefaultShaderString();
    },penPlus.blocklyGLSLVersion);

    addInputOption(document.getElementById("EditorSoundDropdown"),(input) => {
      penPlus.blocklyEditorSounds = input.value;
      localStorage.setItem("blocklyEditorSounds",penPlus.blocklyEditorSounds);
      penPlus.loadSounds(penPlus.blocklyEditorSounds);
    },penPlus.blocklyEditorSounds);

    //These two are tied to each other.
    const editorTheme = document.getElementById("EditorThemeDropdown");
    const editorThemeCustomColor = document.getElementById("customColorInput");

    addInputOption(editorTheme, (input) => {
      penPlus.EditorAccent = input.value;
      localStorage.setItem("accentColor", penPlus.EditorAccent);
      if (input.value != "CUSTOM_COLOR") {
        localStorage.setItem("customColor", penPlus.EditorAccent);
        penPlus.setThemeToColor(input.value);
        editorThemeCustomColor.value = input.value;
      }
    },penPlus.EditorAccent);

    addInputOption(editorThemeCustomColor, (input) => {
      penPlus.CustomEditorAccent = input.value;
      penPlus.EditorAccent = "CUSTOM_COLOR";
      editorTheme.value = "CUSTOM_COLOR";
      localStorage.setItem("accentColor", penPlus.EditorAccent);
      localStorage.setItem("customColor", penPlus.CustomEditorAccent);
      penPlus.setThemeToColor(input.value);
    },penPlus.CustomEditorAccent);

    const categoryButtons = {
      events: document.getElementById("eventsColor"),
      vertex: document.getElementById("vertexColor"),
      looks: document.getElementById("looksColor"),
      colors: document.getElementById("colorsColor"),
      controls: document.getElementById("controlsColor"),
      operators: document.getElementById("operatorsColor"),
      sensing: document.getElementById("sensingColor"),
      myblocks: document.getElementById("myBlocksColor"),
      injection: document.getElementById("injectionColor"),

      variables: document.getElementById("floatColor"),
      int: document.getElementById("intColor"),

      vector: document.getElementById("vec2Color"),
      vec3: document.getElementById("vec3Color"),
      vec4: document.getElementById("vec4Color"),

      matrix: document.getElementById("matrixColor"),
      texture: document.getElementById("textureColor"),
      cubemap: document.getElementById("cubemapColor"),
    };

    const keys = Object.keys(categoryButtons);

    keys.forEach((key) => {
      categoryButtons[key].value = penPlus.penPlusTheme.blockStyles[`${key}_blocks`].colourPrimary;
      categoryButtons[key].addEventListener("change", () => {
        //Create the color key
        penPlus.customBlockColors[key] = penPlus.customBlockColors[key] || {};

        /*
          ░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░
          ░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░
          ░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░
          ░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░
          ░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░
          █░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█
          █░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█   Me when I use 2 spellings of Colour in the same script.
          ░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░
          ░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░
          ░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░
          ░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░
          ░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░
          ░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░
          ░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░
          ░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░
        */
        //set the colours.

        let primary = categoryButtons[key].value;

        let secondary = penPlus.hexToRgb(primary);
        secondary.r *= penPlus.brightnessByColor(primary) >= 128 ? 0.85 : 1.15;
        secondary.g *= penPlus.brightnessByColor(primary) >= 128 ? 0.85 : 1.15;
        secondary.b *= penPlus.brightnessByColor(primary) >= 128 ? 0.85 : 1.15;

        let tertiary = penPlus.hexToRgb(primary);
        tertiary.r *= penPlus.brightnessByColor(primary) >= 128 ? 0.65 : 1.35;
        tertiary.g *= penPlus.brightnessByColor(primary) >= 128 ? 0.65 : 1.35;
        tertiary.b *= penPlus.brightnessByColor(primary) >= 128 ? 0.65 : 1.35;

        penPlus.customBlockColors[key].colourPrimary = primary;

        penPlus.customBlockColors[key].colourSecondary = penPlus.RGBtoHex(secondary);
        penPlus.customBlockColors[key].colourTertiary = penPlus.RGBtoHex(tertiary);

        //The text is pain
        (penPlus.customBlockColors[key].colorText = penPlus.brightnessByColor(categoryButtons[key].value) >= 200 ? "#000000" : "#ffffff"),
          //Add it to local storage
          localStorage.setItem("customBlockColors", JSON.stringify(penPlus.customBlockColors));
      });
    });
  };
})();
