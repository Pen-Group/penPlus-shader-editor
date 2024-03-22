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
    penPlus.IFRAME_API.parent.postMessage(
      {
        type: "EDITOR_CLOSE",
      },
      penPlus.IFRAME_API.parentURL
    );
  };

  window.addEventListener("message", (event) => {
    //Handle
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

        penPlus.IFRAME_API.exportText = event.data.exportText || "Export";
        document.getElementById("exportButton").innerHTML =
          penPlus.IFRAME_API.exportText;

        event.source.postMessage(
          {
            type: "REGISTER_SUCCESS",
          },
          penPlus.IFRAME_API.parentURL
        );
        break;

      default:
        console.error("Invalid Event");
        break;
    }
  });
})();
