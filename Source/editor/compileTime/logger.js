(function () {
    const shaderLog = document.getElementById("shaderLog");

    penPlus.JS_ERROR_MESSAGE = `This is a javascript error.<br> 
    Please take a screenshot of the console and send the project file to <a href="https://github.com/Pen-Group">ObviousAlexC</a>, or a <a href="https://github.com/orgs/Pen-Group/people">Pen-Group member!</a><br><br>
    You could also make a <a href="https://github.com/Pen-Group/penPlus-shader-editor/pulls">pull request</a> 
    or an <a href="https://github.com/Pen-Group/penPlus-shader-editor/issues">issue</a> on <a href="https://github.com/Pen-Group/penPlus-shader-editor">Github</a><br><br>
    If you are using a mod of the shader editor contact the mod's developer.`

    penPlus.shaderLog = (OUTPUT) => {
        const logThing = document.createElement("div");
        logThing.innerHTML = OUTPUT;
        logThing.className = "logText";

        shaderLog.appendChild(logThing);        
    }

    penPlus.shaderError = (ERROR) => {
        const errorElement = document.createElement("div");
        errorElement.innerHTML = ERROR;
        errorElement.className = "logText";

        errorElement.style.backgroundColor = "#ff666699";
        errorElement.style.color = "#000000";

        errorElement.style.backgroundImage = "url(\"data:image/png;base64,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\")"
        errorElement.style.backgroundRepeat = "repeat";
        errorElement.style.backgroundSize = "80px 80px";

        shaderLog.appendChild(errorElement);

        errorElement.style.backgroundPosition = `0px calc(var(--U_TIMER) * 10)`;
    }

    penPlus.shaderWarning = (WARNING) => {
        const errorElement = document.createElement("div");
        errorElement.innerHTML = WARNING;
        errorElement.className = "logText";

        errorElement.style.backgroundColor = "#ff666699";
        errorElement.style.color = "#000000";

        errorElement.style.backgroundImage = "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB1UExURf/hZv/OZv+7Zv/MZv/NZv/LZv/KZv/JZv/IZv/HZv/GZv/FZv/EZv/RZv/PZv/DZv/CZv/SZv/QZv/BZv/TZv/AZv/UZv+/Zv/VZv++Zv/WZv+9Zv/XZv+8Zv/YZv/gZv/ZZv/fZv/aZv/eZv/bZv/dZv/cZpDVBcAAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATWSURBVHhe7Z3ZeoMgEEap3fd939f3f8Q2yZ9iMqgwgA7LuWocPzsnJAZxQFWpVCqVSqVSSZmNZs4mXibK1sJizja2pcgmHMAONifHNgT+2UUgMYhH0+whlBQ7SL5NiiImjyRNzCLNPsLJsIvE18lGJDWTPaRNqSKT0O3RNAfYJwlyEdlHzmYOsVcC5CLS75GQSS4iB8i3myPsKZxcRA6RbR9JmFCRjWP88U8KItTjRBGR5hR7C8YkYjA5w+5iOUKimj+PfETUOV5ohJtQj4v59mxEDCaXi4BMTpGk5hiRbETUFTZoBJucIUXNv0c+IgaTa0TEQT3OEZmRjYi6wUbNLSLCuER6mhWPfERSMaEeV4gsyUZE3SGguUdEENdITUM88hFRDwhpHhERwy0S09wg0iYbEfkmlh75iKgnhDXPiIjgHklp7hBZJxsR2SaPSEnzgAglGxH1gl1avCI0Nd0epjKnFEVWy5yWVU5iTZ6RjeZpEVgvD4JJciK0zAn1Wm942eJ9EZkU6wbJT0SkySsSafGCUAEi6gMbWnwiNBE9HkWIiDN5RxIt3hAqRER9YVOLb4QmoNejEBFRJp9IoMUHQjMKEVE/2NjiB6GRGfAoRkSMyTf+eYsvhBYUIzJ8hFEYzqIcEREmFh/wgkQGT3zxsTnjlCRi6q2NamLVUSpKZKADHRu7nmtZIqar/tFMbC+4iUnWIr0DMXExeJjHCddFzLOnsxFRCuEWGD2Oi/3AbXEi3QP6MTF4dN1vKk/EYNJzWzgMLjcACxRxu1MfAlq30CBioEQRl2qWELgVkhQpMq4JrX/rrewpU8S+CM8f14LEQkUMlcORTJzrqEsVsSvm9se9sL1YEZsJD/4wJn+UKzI8KSgARGR4zppIEdogMUT6ZzIGgdEgIkVYsyEZIn2zfYNARGwm2goU4c0Y5ogYTDAjPgisBhEowpxVzxLpXqQgAETEbsEGcSLcxUB4Il0LeQSAiFiuMyNNhL1gDlPEvNhNALgNIk3kAgfTWK9gxF24mK7QtYGID0TEfk0pUSK0QeKLRDHxaBBRIic4kIYtYu9hWlhwCxEuRMRlbUJBIrRBxhExmPgtoU9EnJZUlSOC5wm0GEvEsECtjwkRcVvjVoyIZ4N4iRhW1eY/nYGIuK4D7fWQCGLCFmmnscB5QWt9CPcswjUJERl5YW6yhj5TZPUTPmNqEdevGSAioz8YgZiwRGiDTC9iroocgIhwDrI88zF7SuvXmJwcyDFYIj5nrT9CJBHizfD7HZnh/7EI0iCraXC+qf5fVCLin0aYU46jSJBT+PqbMUWTBDmDhxCh3QsnEdrNkSPi1L8I0/EMIuLV4wvU74wk4nBRRER4F2dhRDwuU0NdZcYSsTYhItyr5QC/IzO4TRLwst+7izKHNond4BoR8Rjk0yZ8D+5wZ9jRyuW76TGWwx3vJCK+w8f+sEToiP70IqybNEQkxF0vXxgiUe56+UNNhm5kimwQhojhATuITIzrzX4iEqp6whdHkVg1BwGgJj0FMTErjHzJRsTl6Thxq/B8yUbEofyNiginoyAxOY8qIo4qIo3cRZIzyeZ3JBeRTg9Tp1EyPSKG6xG5OF4hisV58EEoFrWudMhUHpYVonQ4XhZuZXyVSqVSqVQqFS+U+gUn53wzddrR+QAAAABJRU5ErkJggg==\")"
        errorElement.style.backgroundRepeat = "repeat";
        errorElement.style.backgroundSize = "40px 40px";

        shaderLog.appendChild(errorElement);

        errorElement.style.backgroundPosition = `calc(var(--U_TIMER_SIN) * 10) calc(var(--U_TIMER) * -10)`;
    }

    penPlus.shaderCompileLog = (OUPUT) => {
        penPlus.shaderLog("Errors at : " + Date.now())

        OUPUT.split("ERROR:").forEach(Error => {
            const returnedError = penPlus.easyErrorHandler(Error);
            if (returnedError) {
                penPlus.shaderError(returnedError);
            }
        })
    }
})();