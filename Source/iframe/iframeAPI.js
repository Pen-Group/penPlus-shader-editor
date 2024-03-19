(function () {
  penPlus.IFRAME_API = {};

  window.addEventListener("message", (event) => {
    console.log(event);
    //Handle
    if (!event.data.type) {
      console.error("No event specified");
    }

    switch (event.data.type) {
      case "REGISTER_PARENT":
        penPlus.IFRAME_API.parent = event.source;

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
