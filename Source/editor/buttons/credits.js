(function () {
  const creditsButton = document.getElementById("CreditsButton");

  creditsButton.onclick = () => {
    const varModal = penPlus.createModal(`
      <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
        <div style="position:absolute;left:0px;top:0px; width:100%; height:20%; background-color: var(--EditorTheme_Theme_4);">
          <p class="noSelect" style="position:absolute;left:50%;top:50%;Transform:Translate(-50%,0%); color:var(--EditorTheme_Text_2);">The People behind the madness</p>>
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
          <button class="generalThemedButton" id="githubLink">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </button>
        </div>
      </div>
      `);

    document.getElementById("closeButton").onclick = () => {
      varModal.close();
    };

    document.getElementById("githubLink").onclick = () => {
      window
        .open("https://github.com/Pen-Group/penPlus-shader-editor", "_blank")
        .focus();
    };
  };
})();
