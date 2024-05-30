(function () {
  const creditsButton = document.getElementById("CreditsButton");

  creditsButton.onclick = () => {
    const varModal = penPlus.createModal(`
      <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;">
      <div class="ModalHeader">
        <div class="ModalHeaderFH">
          Credits
        </div>

        <div class="ModalHeaderFC">
          <div id="closeButton" aria-label="Close" class="closeButton" role="button" tabindex="0">
            <img class="closeButtonImage" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==" draggable="false">
          </div>
        </div>
      </div>  
    
      <div class="modalContents">
        <div class="modalContentHeader">
          <div class="modalContentHeaderDivider"></div>
          <span>The people behind the madness</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentHeader">
          <span>Programmers</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/ObviousAlexC.png" class="creditsImage"></img>
              <span><a href="https://scratch.mit.edu/users/pinksheep2917/">ObviousAlexC</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>Shader Code, IFrame API, Block Set, General Scripting</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/NamelessCat.png" class="creditsImage"></img>
              <span><a href="https://scratch.mit.edu/users/NamelessCat/">Nameless Cat</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>CSS styling and HTML refactoring</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/JWKLong.png" class="creditsImage"></img>
              <span><a href="https://github.com/jwklong?page=2&tab=repositories">jwklong</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>Blockly Rendering Modifications</span>
            </label>
          </div>
        </div>

        <div class="modalContentHeader">
          <span>Icons Provided By</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/FeatherIcons.png" class="creditsImage"></img>
              <span><a href="https://feathericons.com/">Feather Icons</a></span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/GoogleFonts.png" class="creditsImage"></img>
              <span><a href="https://fonts.google.com/icons">Google Material Icons</a></span>
            </label>
          </div>
        </div>

        <div class="modalContentHeader">
          <span>Extra textures and cubemaps provided by</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/AmbientCG.png" class="creditsImage"></img>
              <span><a href="https://ambientcg.com/">AmbientCG</a></span>
            </label>
          </div>
        </div>

        <div class="modalContentHeader">
          <span>Code Editors are from</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/BlocklyLogo.png" class="creditsImage"></img>
              <span><a href="https://developers.google.com/blockly">Google</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>Blockly</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/microsoftOpenSource.png" class="creditsImage"></img>
              <span><a href="https://microsoft.github.io/monaco-editor/">Microsoft Open Source Division</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>Monaco</span>
            </label>
          </div>
        </div>

        <div class="modalContentHeader">
          <span>Special Thanks to</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/Garbomuffin.png" class="creditsImage"></img>
              <span><a href="https://github.com/GarboMuffin">GarboMuffin</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>Creating Turbowarp</span>
            </label>
          </div>
        </div>

        <div class="modalContentSetting">
          <div>
            <label style="cursor:default;">
              <img src="creditsImages/JeremyGamer13.jpg" class="creditsImage"></img>
              <span><a href="https://github.com/JeremyGamer13">JeremyGamer13</a></span>
              <span style="white-space: pre; color:var(--EditorTheme_Theme_3)">  ---  </span>
              <span>Penguinmod Help and Blockly Assistance</span>
            </label>
          </div>
        </div>

        <div class="modalContentHeader">
          <span>Testers</span>
          <div class="modalContentHeaderDivider"></div>
        </div>

        <div class="modalContentHeader">
          <div class="noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/SkyIsTumbling.jpg" class="creditsImage"></img>
                <span><a href="https://www.youtube.com/@SkyIsTumbling">SkyIsTumbling</a></span>
              </label>
            </div>
          </div>

          <div class=" noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/Spogn.png" class="creditsImage"></img>
                <span><a href="https://www.google.com/search?client=firefox-b-1-d&sca_esv=fd9a95c27a98d6d9&sxsrf=ADLYWIILwSYLj5Wn2sLXw26h_Rh1H__fVg:1717100117908&q=spongebob&uds=ADvngMhdvWgwd1DARqoW4xZQ2piGwbHeLJPsQjZydZcU4Gua_nK1pe2VmIU8RuBelycJDOMQa9NBK3awpfq9fyAcMEq6IQ9Qs09I1NDj_EgKFd1YN1vnd02H8PVU9iSWz5VVklz3Mx_XfKqbD7PPc9kONqo23aCyNoNJcObJ0-KMTU1fx2Opa2HK5BWanqTIJFTxl_pfzoHi_RPtEr06ZQYevK5XdkSQ_IHJSBk8TNVqlpNzsHAP1-RY7bYx-M6UY6D9OR-rptByh_MvVcXzgwvCdtNSBmyt8uk5BGjLMc7y3zY3wOlTxJ64_OngMBGWNlrC9IDziLNl&udm=2&prmd=ivnsmbt&sa=X&ved=2ahUKEwjVlMm0mLaGAxXtk4kEHVETCdUQtKgLegQIDRAB&biw=1600&bih=775&dpr=1">Spong</a></span>
              </label>
            </div>
          </div>
        </div>

        <div class="modalContentHeader">
          <div class="noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/Shovel.png" class="creditsImage"></img>
                <span><a href="https://theshovel.rocks">The Shovel</a></span>
              </label>
            </div>
          </div>

          <div class=" noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/godSlayerApk.png" class="creditsImage"></img>
                <span><a href="https://godslayerakp.serv00.net/">GodSlayerAKP</a></span>
              </label>
            </div>
          </div>
        </div>

        <div class="modalContentHeader">
          <div class="noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/Alltrue.png" class="creditsImage"></img>
                <span><a href="https://scratch.mit.edu/users/alltrue/">Alltrue</a></span>
              </label>
            </div>
          </div>

          <div class=" noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/RealWorld.png" class="creditsImage"></img>
                <span><a href="https://open.spotify.com/user/8c9ay5g2d60b0km2cllp22n9h">RealWorld</a></span>
              </label>
            </div>
          </div>
        </div>

        <div class="modalContentHeader">
          <div class="noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/DragoCuvon.png" class="creditsImage"></img>
                <span><a href="https://www.youtube.com/channel/UCNFSB01H0jBOWsObfVcwPwg">Drago-Cuven</a></span>
              </label>
            </div>
          </div>

          <div class=" noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/DizzyAwe.png" class="creditsImage"></img>
                <span><a href="https://www.youtube.com/channel/UCsY6bijIIaRvh6LsIruDT3g">DizzyAwe</a></span>
              </label>
            </div>
          </div>
        </div>

        <div class="modalContentHeader">
          <div class="noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/SCG.png" class="creditsImage"></img>
                <span><a href="https://scratch.mit.edu/users/SillyCubeGuy/">SillyCubeGuy</a></span>
              </label>
            </div>
          </div>

          <div class=" noModalDivider modalContentSetting">
            <div>
              <label style="cursor:default;">
                <img src="creditsImages/LilyMakesThings.png" class="creditsImage"></img>
                <span><a href="https://scratch.mit.edu/users/LilyMakesThings/">LilyMakesThings</a></span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
      `);

    document.getElementById("closeButton").onclick = () => {
      varModal.close();
    };

    document.getElementById("githubLink").onclick = () => {
      window.open("https://github.com/Pen-Group/penPlus-shader-editor", "_blank").focus();
    };
  };
})();
