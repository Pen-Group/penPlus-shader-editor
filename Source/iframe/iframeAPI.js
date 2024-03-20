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

        event.source.postMessage({
          type: "REGISTER_SUCCESS",
        });
        break;

      default:
        console.error("Invalid Event");
        break;
    }
  });
})();
