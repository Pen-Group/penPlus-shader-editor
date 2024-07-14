(function() {
    const recordButton = document.getElementById("recordButton");
    let recording = false;

    console.log("gif loaded")

    recordButton.onclick = () => {
        if (recording) return;

        recording = true;

        recordButton.innerText = "Recording";

        const gif = new GIF({
            workers: 1,
            quality: 10,
            background: "#0f0f1f",
            dither: "FloydSteinberg",
            width: 960,
            height: 720
        });

        const renderLoop = setInterval(() => {
            gif.addFrame(gl.canvas, {delay:33})
        }, 33);

        gif.on('finished', function(blob) {
            window.open(URL.createObjectURL(blob));
            
            recording = false;
            recordButton.innerText = "Capture GIF";
        });

        setTimeout(() => {
            clearInterval(renderLoop);

            recordButton.innerText = "Rendering";

            gif.render();
        },15000);
    }
})();