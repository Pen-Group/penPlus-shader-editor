(function() {
    const recordButton = document.getElementById("recordButton");
    let recording = false;

    const canvas = document.getElementById("shaderpreview");

    recordButton.onclick = () => {
        if (recording) return;

        recording = true;

        recordButton.innerText = "Recording";
            
        penPlus.overrideSize.width = 960;
        penPlus.overrideSize.height = 720;

        const gif = new GIF({
            workers: 5,
            quality: 10,
            background: "#0f0f8f",
            dither: "FloydSteinberg",
            workerScript:"util/gif.worker.js",
            width: 960,
            height: 720
        });

        const renderLoop = setInterval(() => {
            gif.addFrame(canvas, {delay: 33});
        }, 33);

        gif.on('finished', (blob) =>  {
            window.open(URL.createObjectURL(blob));
            
            recording = false;
            recordButton.innerText = "Capture GIF";

            penPlus.overrideSize.width = null;
            penPlus.overrideSize.height = null;
        });

        gif.on('progress', (progress) => {
            recordButton.innerText = `Rendering ${Math.floor(progress * 100)}%`;
        });

        setTimeout(() => {
            clearInterval(renderLoop);

            recordButton.innerText = "Rendering 0%";

            gif.render();
        },15000);
    }
})();