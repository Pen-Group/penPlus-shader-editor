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

  penPlus.customBlockColors = JSON.parse(localStorage.getItem("customBlockColors")) || {};

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
          <span>Compilation Settings</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label>
              <input type="checkbox" id="AutoComp"></input>
              <span>Auto Compilation (Scratch Only)</span>
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

    const autocompileButton = document.getElementById("AutoComp");

    autocompileButton.checked = penPlus.autoCompile;

    autocompileButton.onclick = () => {
      penPlus.autoCompile = autocompileButton.checked;
      localStorage.setItem("AutoCompile", autocompileButton.checked);

      recompileButton.style.visibility = penPlus.autoCompile && !penPlus.isTextMode ? "hidden" : "visible";
    };

    const fancyLogBG = document.getElementById("ErrAWarnAnim");

    fancyLogBG.checked = penPlus.fancyLogBG;

    fancyLogBG.onclick = () => {
      penPlus.fancyLogBG = fancyLogBG.checked;
      localStorage.setItem("fancyLogBG", fancyLogBG.checked);
    };

    document.getElementById("closeButton").onclick = () => {
      varModal.close();
    };

    const categoryButtons = {
      events: document.getElementById("eventsColor"),
      vertex: document.getElementById("vertexColor"),
      looks: document.getElementById("looksColor"),
      colors: document.getElementById("colorsColor"),
      controls: document.getElementById("controlsColor"),
      operators: document.getElementById("operatorsColor"),
      sensing: document.getElementById("sensingColor"),
      myblocks: document.getElementById("myBlocksColor"),

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
