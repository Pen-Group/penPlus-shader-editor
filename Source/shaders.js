const gl = document.getElementById("shaderpreview").getContext("webgl");

window.ShaderObject = {
    program: undefined,
    vert: undefined,
    frag: undefined,
};

function shaderLog(reason) {
    const logThing = document.createElement("div");
    logThing.innerHTML = Date.now() + "::" + reason;
    logThing.className = "logText";

    console.log(reason);

    document.getElementById("shaderLog").appendChild(logThing);
}

function replacementShader(reason) {
    shaderLog(reason);
}

function genProgram() {
    //If we already have a shader delete it to hopefully save memory.
    if (window.ShaderObject.program) {
        gl.deleteProgram(window.ShaderObject.program);
        gl.deleteShader(window.ShaderObject.vert);
        gl.deleteShader(window.ShaderObject.frag);
    }

    //Split the shader code into fragment and vertice shaders
    if (window.Generated_GLSL.indexOf("//Fragment Shader") <= window.Generated_GLSL.indexOf("//Vertex Shader")) {
        window.Generated_Frag = window.Generated_GLSL.substring(0, window.Generated_GLSL.indexOf("//Vertex Shader"));

        window.Generated_Vert = window.Generated_GLSL.substring(0, window.Generated_GLSL.indexOf("//Fragment Shader")) +
            window.Generated_GLSL.substring(window.Generated_GLSL.indexOf("//Vertex Shader"), window.Generated_GLSL.length);
    }
    else {
        window.Generated_Vert = window.Generated_GLSL.substring(0, window.Generated_GLSL.indexOf("//Fragment Shader"));

        window.Generated_Frag = window.Generated_GLSL.substring(0, window.Generated_GLSL.indexOf("//Vertex Shader")) +
            window.Generated_GLSL.substring(window.Generated_GLSL.indexOf("//Fragment Shader"), window.Generated_GLSL.length);
    }

    //Replace their functions with main functions
    window.Generated_Vert = window.Generated_Vert.replace(" vertex", " main");
    window.Generated_Frag = window.Generated_Frag.replace(" fragment", " main");

    //Remove attributes from fragment
    window.Generated_Frag = window.Generated_Frag.replace(/attribute (.*?);/g, "");

    //Get the variables for later use from the global window class
    let vert = window.Generated_Vert;
    let frag = window.Generated_Frag;

    //? compile vertex Shader
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    try {
        gl.shaderSource(vertShader, vert.trim());
        gl.compileShader(vertShader);
        if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(vertShader);
        }
    } catch (error) {
        replacementShader(error);
    }

    //? compile fragment Shader
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    try {
        gl.shaderSource(fragShader, frag.trim());
        gl.compileShader(fragShader);
        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(fragShader);
        }
    } catch (error) {
        replacementShader(error);
    }

    //? compile program
    const program = gl.createProgram();
    try {
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw gl.getProgramInfoLog(program);
        }

        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            throw gl.getProgramInfoLog(program);
        }
    } catch (error) {
        replacementShader(error);
    }

    window.ShaderObject = {
        program: program,
        vert: vertShader,
        frag: fragShader,
    };
}