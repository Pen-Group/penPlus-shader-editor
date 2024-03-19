(function () {
  const settingsButton = document.getElementById("OptionsButton");

  penPlus.editorTheme =
    localStorage.getItem("penPlusEditorTheme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  penPlus.autoCompile =
    localStorage.getItem("AutoCompile") === null
      ? true
      : localStorage.getItem("AutoCompile") == "true";

  penPlus.customBlockColors =
    JSON.parse(localStorage.getItem("customBlockColors")) || {};

  recompileButton.style.visibility = penPlus.autoCompile ? "hidden" : "visible";

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
          <div style="width:75%; margin-left:12.5%; justify-content: center; background-color:var(--EditorTheme_Theme_3);">
            <p>Block Colors<br>won't change until refreshed!<br>Has some bugs</p>
            <div style="display:flex; height: 25%;">
              <input type="color" id="eventsColor"></input>
              <p style="transform:translate(0%,-0.9em);">Events</p>

              <input type="color" id="vertexColor"></input>
              <p style="transform:translate(0%,-0.9em);">Vertex</p>

              <input type="color" id="looksColor"></input>
              <p style="transform:translate(0%,-0.9em);">Looks</p>
            </div>
            <div style="display:flex; height: 25%;">
              <input type="color" id="colorsColor"></input>
              <p style="transform:translate(0%,-0.9em);">Colors</p>
            
              <input type="color" id="controlsColor"></input>
              <p style="transform:translate(0%,-0.9em);">Controls</p>

              <input type="color" id="operatorsColor"></input>
              <p style="transform:translate(0%,-0.9em);">Operators</p>
            </div>
            <div style="display:flex; height: 25%;">
              <input type="color" id="sensingColor"></input>
              <p style="transform:translate(0%,-0.9em);">Sensing</p>

              <input type="color" id="myBlocksColor"></input>
              <p style="transform:translate(0%,-0.9em);">My Blocks</p>
            </div>

            <p>Variable Types</p>
            <div style="display:flex; height: 25%;">
              <input type="color" id="floatColor"></input>
              <p style="transform:translate(0%,-0.9em);">Float</p>

              <input type="color" id="intColor"></input>
              <p style="transform:translate(0%,-0.9em);">Int</p>
            </div>
            <div style="display:flex; height: 25%;">
              <input type="color" id="vec2Color"></input>
              <p style="transform:translate(0%,-0.9em);">Vector 2</p>

              <input type="color" id="vec3Color"></input>
              <p style="transform:translate(0%,-0.9em);">Vector 3</p>

              <input type="color" id="vec4Color"></input>
              <p style="transform:translate(0%,-0.9em);">Vector 4</p>
            </div>
            <div style="display:flex; height: 25%;">
              <input type="color" id="matrixColor"></input>
              <p style="transform:translate(0%,-0.9em);">Matrix</p>
              
              <input type="color" id="textureColor"></input>
              <p style="transform:translate(0%,-0.9em);">Texture</p>
              
              <input type="color" id="cubemapColor"></input>
              <p style="transform:translate(0%,-0.9em);">Cubemap</p>
            </div>
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

      recompileButton.style.visibility =
        penPlus.autoCompile && !penPlus.isTextMode ? "hidden" : "visible";
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
      categoryButtons[key].value =
        penPlus.penPlusTheme.blockStyles[`${key}_blocks`].colourPrimary;
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

        penPlus.customBlockColors[key].colourSecondary =
          penPlus.RGBtoHex(secondary);
        penPlus.customBlockColors[key].colourTertiary =
          penPlus.RGBtoHex(tertiary);

        //The text is pain
        (penPlus.customBlockColors[key].colorText =
          penPlus.brightnessByColor(categoryButtons[key].value) >= 200
            ? "#000000"
            : "#ffffff"),
          //Add it to local storage
          localStorage.setItem(
            "customBlockColors",
            JSON.stringify(penPlus.customBlockColors)
          );
      });
    });
  };
})();
