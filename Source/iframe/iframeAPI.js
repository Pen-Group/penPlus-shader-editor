(function () {
  penPlus.IFRAME_API = {
    parent: {
      postMessage: () => {},
    },
    closeButton: document.getElementById("CloseIFRAMEeditor"),
    isIFRAME: false,
  };

  penPlus.IFRAME_API.closeButton.style.position = "absolute";
  penPlus.IFRAME_API.closeButton.style.visibility = "hidden";

  penPlus.IFRAME_API.closeButton.onclick = () => {
    const varModal = penPlus.createModal(`
      <div id="variableModal" class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:4/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
        <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:48px; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 32px;">
          Close without saving?
        </div>
        <div style="text-align: center; position:absolute; top:10%; width:100%; height:80%; overflow-y:hidden; color:var(--EditorTheme_Text_1);">
          <p class="" style="flex: 1 2 auto; color:var(--EditorTheme_Text_2);font-size: 1.5em; width:100%;">You could lose your shader!<br>
          </p>
          <button class="generalThemedButton" style="font-size: 1.5em;" id="closeShaderEditor">
            Close
          </button>
          <button class="generalThemedButton" style="font-size: 1.5em;" id="closeThisLittleModal">
            Continue editing
          </button>
        </div>
      </div>
      `);

    document.getElementById("closeShaderEditor").onclick = () => {
      penPlus.IFRAME_API.parent.postMessage(
        {
          type: "EDITOR_CLOSE",
        },
        penPlus.IFRAME_API.parentURL
      );
    }

    document.getElementById("closeThisLittleModal").onclick = () => {
      varModal.close();
    }
  };

  window.addEventListener("message", (event) => {
    //Handle
    //Make sure monaco doesn't interfere
    if (event.data.vscodeScheduleAsyncWork) return;

    if (!event.data.type) {
      console.error("No event specified");
    }

    switch (event.data.type) {
      case "REGISTER_PARENT":
        penPlus.IFRAME_API.parent = event.source;
        penPlus.IFRAME_API.isIFRAME = true;

        penPlus.IFRAME_API.exitButton = event.data.exitButton || false;

        if (penPlus.IFRAME_API.exitButton == true) {
          penPlus.IFRAME_API.closeButton.style.position = "relative";
          penPlus.IFRAME_API.closeButton.style.visibility = "visible";
        } else {
          penPlus.IFRAME_API.closeButton.style.position = "absolute";
          penPlus.IFRAME_API.closeButton.style.visibility = "hidden";
        }

        penPlus.IFRAME_API.parentURL = event.origin;

        penPlus.IFRAME_API.importText = event.data.importText || "Import";
        penPlus.IFRAME_API.exportText = event.data.exportText || "Export";

        document.getElementById("importButton").innerHTML = 
          penPlus.IFRAME_API.importText;

        document.getElementById("exportButton").innerHTML =
          penPlus.IFRAME_API.exportText;


        event.source.postMessage(
          {
            type: "REGISTER_SUCCESS",
          },
          penPlus.IFRAME_API.parentURL
        );
        break;
      
      case "DATA_LOAD":
        penPlus.loadProjectFile(event.data.projectData);
        break;

      default:
        console.error("Invalid Event");
        break;
    }
  });
})();
