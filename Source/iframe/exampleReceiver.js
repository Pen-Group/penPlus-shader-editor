/* 
  ! __        ___    ____  _   _ ___ _   _  ____   !
  ! \ \      / / \  |  _ \| \ | |_ _| \ | |/ ___|  !
  !  \ \ /\ / / _ \ | |_) |  \| || ||  \| | |  _   !
  !   \ V  V / ___ \|  _ <| |\  || || |\  | |_| |  !
  !    \_/\_/_/   \_\_| \_\_| \_|___|_| \_|\____|  !
  THIS IS AN EXAMPLE FOR HOW YOU CAN INTEGRATE THE IFRAME API INTO YOUR OWN PROJECTS!
  THIS DOES NOTHING. UNLESS YOU OPEN A LOCALHOST and navigate to http://localhost:[port]/source/iframeTest.html
*/

//This doesn't have to be stylized like this but I will do it for consistancy.
(function () {
  const IFrame = document.getElementById("shaderEditor");
  const output = document.getElementById("outputText");

  let loaded = false;
  let IFrameLoaded = false;

  //Execute once the Iframe and main document are loaded.
  const onRegistered = () => {
    console.log("iframe registered");
    //register the parent window by posting a message to the IFrame.
    IFrame.contentWindow.postMessage({
      type: "REGISTER_PARENT",
      exportText: `Export to ${window.location.hostname}`,
      exitButton: true,
    });
    //Check for incoming messages
    window.addEventListener(
      "message",
      (event) => {
        //Error Handling
        if (!event.data.type) console.error("No Type found");

        switch (event.data.type) {
          //If we are registered sucessfully this will happen
          case "REGISTER_SUCCESS":
            console.log("Registration Successful");
            break;

          //Happens when data is sent out of the editor
          case "DATA_SEND":
            //And lets just display it on the page for the time being.
            console.log(event.data);
            output.innerHTML = JSON.stringify(event.data);
            break;

          //Just so we can handle unexpected data types.
          default:
            console.log("Just simple type handling here!");
            break;
        }
      },
      false
    );
  };

  //Simple One Liner
  const tryRegister = () => {
    console.log(loaded, IFrameLoaded);
    if (loaded && IFrameLoaded) onRegistered();
  };

  window.onload = () => {
    loaded = true;
    tryRegister();
  };

  IFrame.onload = () => {
    IFrameLoaded = true;
    tryRegister();
  };
})();
