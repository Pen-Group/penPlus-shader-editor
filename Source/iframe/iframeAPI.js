(function () {
  penPlus.IFRAME_API = {
    parent:{
      postMessage: () => {}
    },
    isIFRAME:false,
  };

  window.addEventListener("message", (event) => {
    console.log(event);
    //Handle
    if (!event.data.type) {
      console.error("No event specified");
    }

    switch (event.data.type) {
      case "REGISTER_PARENT":
        penPlus.IFRAME_API.parent = event.source;
        penPlus.IFRAME_API.isIFRAME = true;
        
        penPlus.IFRAME_API.exitButton = event.data.exitButton || false;
        
        penPlus.IFRAME_API.exportText = event.data.exportText || "Export";
        document.getElementById("exportButton").innerHTML = penPlus.IFRAME_API.exportText;

        event.source.postMessage({
          type: "REGISTER_SUCCESS",
        });
        break;

      default:
        console.error("Invalid Event");
        break;
    }
  });

  penPlus.IFRAME_API.readyMessage = () => {
    console.log("sending ready message");
    window.parent.postMessage({type: "READY"});
  }
})();
