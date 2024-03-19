const gl = document
  .getElementById("shaderpreview")
  .getContext("webgl", { antialias: false });

function shaderLog(reason) {
  const logThing = document.createElement("div");
  logThing.innerHTML = Date.now() + "::" + reason;
  logThing.className = "logText";

  console.log(reason);

  document.getElementById("shaderLog").appendChild(logThing);
}

function replacementShader() {
  penPlus.Generated_GLSL = `//replacement shader
    //Base Variables
    attribute highp vec4 a_position;
    attribute highp vec4 a_color;
    attribute highp vec2 a_texCoord;
     
    varying highp vec4 v_color;
    varying highp vec2 v_texCoord;
    
    varying highp float v_depth;

    uniform highp float u_timer;
    
    //Pen+ Textures
    uniform sampler2D u_texture;
    uniform mediump vec2 u_res;
    uniform sampler2D u_depthTexture;
    
    //Base functions
    highp float log10(highp float a) {
      return log(a)/log(10.0);
    }
    
    highp float eulernum(highp float a) {
        return 2.718 * a;
    }
    
    //Vertex Shader
    void vertex() {
    gl_Position = a_position;
    }
    //Fragment Shader
    void fragment() {
    gl_FragColor = v_color;
    }`;

  if (!penPlus.Generated_GLSL.includes("void vertex")) {
    penPlus.Generated_GLSL += `
      void vertex() {
        gl_Position = a_position;
      }\n`;
  }

  if (!penPlus.Generated_GLSL.includes("void fragment")) {
    penPlus.Generated_GLSL += `
      void fragment() {
        gl_FragColor = vec4(1,1,1,1);
      }\n`;
  }

  for (
    let letterID = penPlus.Generated_GLSL.indexOf("void vertex");
    letterID < penPlus.Generated_GLSL.length;
    letterID++
  ) {
    const letter = penPlus.Generated_GLSL.charAt(letterID);
    vertFunction += letter;
    if (letter == "{") {
      inner += 1;
    } else if (letter == "}") {
      inner -= 1;
      if (inner == 0) {
        break;
      }
    }
  }

  inner = 0;

  for (
    let letterID = penPlus.Generated_GLSL.indexOf("void fragment");
    letterID < penPlus.Generated_GLSL.length;
    letterID++
  ) {
    const letter = penPlus.Generated_GLSL.charAt(letterID);
    fragFunction += letter;
    if (letter == "{") {
      inner += 1;
    } else if (letter == "}") {
      inner -= 1;
      if (inner == 0) {
        break;
      }
    }
  }

  genProgram();
}

//* THIS FUNCTION IS GOING TO KILL ME */
function getTypedInput(type, name) {
  let input = "";
  let inputFunction = () => {};
  switch (type) {
    case "sampler2D":
      const keys = Object.keys(penPlus.textures);

      input = document.createElement("select");
      input.style.width = "75%";
      input.className = "scratchStyledInput";

      //Loop through textures to add them to the list
      let options = "";
      keys.forEach((key) => {
        options += `<option value="${key}">texture ${key}</option>`;
      });

      input.innerHTML = options;

      if (penPlus.previousVariableStates[name]) input.value = penPlus.previousVariableStates[name];
      gl.shaders.editorShader.uniforms[name].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name] : penPlus.textures[input.value];

      input.addEventListener("change", () => {
        gl.shaders.editorShader.uniforms[name].value = penPlus.textures[input.value];
        penPlus.previousVariableStates[name] = input.value;
      });

      return input;

    case "float":
      input = document.createElement("input");
      input.style.width = "75%";

      input.type = "Number";
      input.value = 0;
      input.className = "scratchStyledInput";

      input.value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name] : gl.shaders.editorShader.uniforms[name].current;
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.addEventListener("change", () => {
        gl.shaders.editorShader.uniforms[name].value = input.value;
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      });

      return input;

    case "int":
      input = document.createElement("input");
      input.style.width = "75%";

      input.type = "Number";
      input.value = 0;
      input.className = "scratchStyledInput";

      input.value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name] : gl.shaders.editorShader.uniforms[name].current;
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];
      input.addEventListener("change", () => {
        gl.shaders.editorShader.uniforms[name].value = Math.floor(input.value);
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      });

      return input;

    case "vec2":
      input = document.createElement("div");
      input.style.width = "75%";
      input.style.position = "relative";
      input.style.display = "grid";
      input.style.gridAutoColumns = "50% 50%";
      input.style.gridAutoRows = "100%";
      input.style.gridAutoFlow = "column";

      input.appendChild(document.createElement("input"));
      input.children[0].type = "Number";
      input.children[0].value = 0;
      input.children[0].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[1].type = "Number";
      input.children[1].value = 0;
      input.children[1].className = "scratchStyledInput";

      inputFunction = () => {
        gl.shaders.editorShader.uniforms[name].value = [
          input.children[0].value,
          input.children[1].value,
        ];
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][0] : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][1] : gl.shaders.editorShader.uniforms[name].current[1];
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.children[0].addEventListener("change", inputFunction);

      input.children[1].addEventListener("change", inputFunction);

      return input;

    case "vec3":
      input = document.createElement("div");
      input.style.width = "75%";
      input.style.position = "relative";
      input.style.display = "grid";
      input.style.gridAutoColumns = "33.3% 33.3% 33.3%";
      input.style.gridAutoRows = "100%";
      input.style.gridAutoFlow = "column";

      input.appendChild(document.createElement("input"));
      input.children[0].type = "Number";
      input.children[0].value = 0;
      input.children[0].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[1].type = "Number";
      input.children[1].value = 0;
      input.children[1].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[2].type = "Number";
      input.children[2].value = 0;
      input.children[2].className = "scratchStyledInput";

      inputFunction = () => {
        gl.shaders.editorShader.uniforms[name].value = [
          input.children[0].value,
          input.children[1].value,
          input.children[2].value,
        ];
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][0] : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][1] : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][2] : gl.shaders.editorShader.uniforms[name].current[2];
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.children[0].addEventListener("change", inputFunction);
      input.children[1].addEventListener("change", inputFunction);
      input.children[2].addEventListener("change", inputFunction);

      return input;

    case "vec4":
      input = document.createElement("div");
      input.style.maxWidth = "75%";
      input.style.display = "grid";
      input.style.gridAutoColumns = "25% 25% 25% 25%";
      input.style.gridAutoRows = "100%";
      input.style.gridAutoFlow = "column";

      input.appendChild(document.createElement("input"));
      input.children[0].type = "Number";
      input.children[0].value = 0;
      input.children[0].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[1].type = "Number";
      input.children[1].value = 0;
      input.children[1].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[2].type = "Number";
      input.children[2].value = 0;
      input.children[2].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[3].type = "Number";
      input.children[3].value = 0;
      input.children[3].className = "scratchStyledInput";

      inputFunction = () => {
        gl.shaders.editorShader.uniforms[name].value = [
          input.children[0].value,
          input.children[1].value,
          input.children[2].value,
          input.children[3].value,
        ];
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][0] : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][1] : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][2] : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][3] : gl.shaders.editorShader.uniforms[name].current[3];
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.children[0].addEventListener("change", inputFunction);
      input.children[1].addEventListener("change", inputFunction);
      input.children[2].addEventListener("change", inputFunction);
      input.children[3].addEventListener("change", inputFunction);

      return input;

    case "mat2":
      input = document.createElement("div");
      input.style.maxWidth = "75%";
      input.style.display = "grid";
      input.style.gridTemplateColumns = "repeat(2, 50%)";

      input.appendChild(document.createElement("input"));
      input.children[0].type = "Number";
      input.children[0].value = 0;
      input.children[0].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[1].type = "Number";
      input.children[1].value = 0;
      input.children[1].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[2].type = "Number";
      input.children[2].value = 0;
      input.children[2].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[3].type = "Number";
      input.children[3].value = 0;
      input.children[3].className = "scratchStyledInput";

      inputFunction = () => {
        gl.shaders.editorShader.uniforms[name].value = [
          input.children[0].value,
          input.children[1].value,
          input.children[2].value,
          input.children[3].value,
        ];
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][0] : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][1] : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][2] : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][3] : gl.shaders.editorShader.uniforms[name].current[3];
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.children[0].addEventListener("change", inputFunction);
      input.children[1].addEventListener("change", inputFunction);
      input.children[2].addEventListener("change", inputFunction);
      input.children[3].addEventListener("change", inputFunction);

      return input;

    case "mat3":
      input = document.createElement("div");
      input.style.maxWidth = "75%";
      input.style.display = "grid";
      input.style.gridTemplateColumns = "repeat(3, 33.3%)";

      input.appendChild(document.createElement("input"));
      input.children[0].type = "Number";
      input.children[0].value = 0;
      input.children[0].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[1].type = "Number";
      input.children[1].value = 0;
      input.children[1].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[2].type = "Number";
      input.children[2].value = 0;
      input.children[2].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[3].type = "Number";
      input.children[3].value = 0;
      input.children[3].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[4].type = "Number";
      input.children[4].value = 0;
      input.children[4].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[5].type = "Number";
      input.children[5].value = 0;
      input.children[5].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[6].type = "Number";
      input.children[6].value = 0;
      input.children[6].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[7].type = "Number";
      input.children[7].value = 0;
      input.children[7].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[8].type = "Number";
      input.children[8].value = 0;
      input.children[8].className = "scratchStyledInput";

      inputFunction = () => {
        gl.shaders.editorShader.uniforms[name].value = [
          input.children[0].value,
          input.children[1].value,
          input.children[2].value,
          input.children[3].value,
          input.children[4].value,
          input.children[5].value,
          input.children[6].value,
          input.children[7].value,
          input.children[8].value,
        ];
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][0] : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][1] : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][2] : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][3] : gl.shaders.editorShader.uniforms[name].current[3];
      input.children[4].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][4] : gl.shaders.editorShader.uniforms[name].current[4];
      input.children[5].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][5] : gl.shaders.editorShader.uniforms[name].current[5];
      input.children[6].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][6] : gl.shaders.editorShader.uniforms[name].current[6];
      input.children[7].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][7] : gl.shaders.editorShader.uniforms[name].current[7];
      input.children[8].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][8] : gl.shaders.editorShader.uniforms[name].current[8];
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.children[0].addEventListener("change", inputFunction);
      input.children[1].addEventListener("change", inputFunction);
      input.children[2].addEventListener("change", inputFunction);
      input.children[3].addEventListener("change", inputFunction);
      input.children[4].addEventListener("change", inputFunction);
      input.children[5].addEventListener("change", inputFunction);
      input.children[6].addEventListener("change", inputFunction);
      input.children[7].addEventListener("change", inputFunction);
      input.children[8].addEventListener("change", inputFunction);

      return input;

    case "mat4":
      input = document.createElement("div");
      input.style.maxWidth = "75%";
      input.style.display = "grid";
      input.style.gridTemplateColumns = "repeat(4, 25%)";

      input.appendChild(document.createElement("input"));
      input.children[0].type = "Number";
      input.children[0].value = 0;
      input.children[0].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[1].type = "Number";
      input.children[1].value = 0;
      input.children[1].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[2].type = "Number";
      input.children[2].value = 0;
      input.children[2].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[3].type = "Number";
      input.children[3].value = 0;
      input.children[3].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[4].type = "Number";
      input.children[4].value = 0;
      input.children[4].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[5].type = "Number";
      input.children[5].value = 0;
      input.children[5].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[6].type = "Number";
      input.children[6].value = 0;
      input.children[6].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[7].type = "Number";
      input.children[7].value = 0;
      input.children[7].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[8].type = "Number";
      input.children[8].value = 0;
      input.children[8].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[9].type = "Number";
      input.children[9].value = 0;
      input.children[9].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[10].type = "Number";
      input.children[10].value = 0;
      input.children[10].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[11].type = "Number";
      input.children[11].value = 0;
      input.children[11].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[12].type = "Number";
      input.children[12].value = 0;
      input.children[12].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[13].type = "Number";
      input.children[13].value = 0;
      input.children[13].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[14].type = "Number";
      input.children[14].value = 0;
      input.children[14].className = "scratchStyledInput";

      input.appendChild(document.createElement("input"));
      input.children[15].type = "Number";
      input.children[15].value = 0;
      input.children[15].className = "scratchStyledInput";

      inputFunction = () => {
        gl.shaders.editorShader.uniforms[name].value = [
          input.children[0].value,
          input.children[1].value,
          input.children[2].value,
          input.children[3].value,
          input.children[4].value,
          input.children[5].value,
          input.children[6].value,
          input.children[7].value,
          input.children[8].value,
          input.children[9].value,
          input.children[10].value,
          input.children[11].value,
          input.children[12].value,
          input.children[13].value,
          input.children[14].value,
          input.children[15].value,
        ];
        penPlus.previousVariableStates[name] = gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][0] : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][1] : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][2] : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][3] : gl.shaders.editorShader.uniforms[name].current[3];
      input.children[4].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][4] : gl.shaders.editorShader.uniforms[name].current[4];
      input.children[5].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][5] : gl.shaders.editorShader.uniforms[name].current[5];
      input.children[6].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][6] : gl.shaders.editorShader.uniforms[name].current[6];
      input.children[7].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][7] : gl.shaders.editorShader.uniforms[name].current[7];
      input.children[8].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][8] : gl.shaders.editorShader.uniforms[name].current[8];
      input.children[9].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][9] : gl.shaders.editorShader.uniforms[name].current[9];
      input.children[10].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][10] : gl.shaders.editorShader.uniforms[name].current[10];
      input.children[11].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][11] : gl.shaders.editorShader.uniforms[name].current[11];
      input.children[12].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][12] : gl.shaders.editorShader.uniforms[name].current[12];
      input.children[13].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][13] : gl.shaders.editorShader.uniforms[name].current[13];
      input.children[14].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][14] : gl.shaders.editorShader.uniforms[name].current[14];
      input.children[15].value = (penPlus.previousVariableStates[name]) ? penPlus.previousVariableStates[name][15] : gl.shaders.editorShader.uniforms[name].current[15];
      if (penPlus.previousVariableStates[name]) gl.shaders.editorShader.uniforms[name].value = penPlus.previousVariableStates[name];

      input.children[0].addEventListener("change", inputFunction);
      input.children[1].addEventListener("change", inputFunction);
      input.children[2].addEventListener("change", inputFunction);
      input.children[3].addEventListener("change", inputFunction);
      input.children[4].addEventListener("change", inputFunction);
      input.children[5].addEventListener("change", inputFunction);
      input.children[6].addEventListener("change", inputFunction);
      input.children[7].addEventListener("change", inputFunction);
      input.children[8].addEventListener("change", inputFunction);
      input.children[9].addEventListener("change", inputFunction);
      input.children[10].addEventListener("change", inputFunction);
      input.children[11].addEventListener("change", inputFunction);
      input.children[12].addEventListener("change", inputFunction);
      input.children[13].addEventListener("change", inputFunction);
      input.children[14].addEventListener("change", inputFunction);
      input.children[15].addEventListener("change", inputFunction);

      return input;

    default:
      return ``;
  }
}

penPlus.compiling = false;

penPlus.previousVariableStates = {};

function genProgram() {
  penPlus.compiling = true;

  //Remove attributes from fragment
  penPlus.Generated_Frag = penPlus.Generated_Frag.replace(
    /attribute (.*?);/g,
    ""
  );

  //Get attributes and add them into an array.
  penPlus.ShaderAttributes = [
    ...penPlus.Generated_GLSL.matchAll(/attribute (.*?);/g),
  ];

  penPlus.ShaderAttributes = penPlus.ShaderAttributes.concat([
    ...penPlus.Generated_GLSL.matchAll(/uniform (.*?);/g),
  ]);

  //Then only get the type, scope, and name
  for (let i = 0; i < penPlus.ShaderAttributes.length; i++) {
    const splitAttribute = penPlus.ShaderAttributes[i][0].split(" ");
    penPlus.ShaderAttributes[i] = {
      scope: splitAttribute[0],
    };

    if (splitAttribute.length >= 4) {
      penPlus.ShaderAttributes[i].type = splitAttribute[2];
      penPlus.ShaderAttributes[i].name = splitAttribute[3].replace(";", "");
    } else {
      penPlus.ShaderAttributes[i].type = splitAttribute[1];
      penPlus.ShaderAttributes[i].name = splitAttribute[2].replace(";", "");
    }
  }

  //Get the variables for later use from the global penPlus class
  let vert = penPlus.Generated_Vert;
  let frag = penPlus.Generated_Frag;

  //? compile vertex Shader
  penPlus.webGLShaderManager.createAndCompile(
    gl,
    "editorShader",
    vert,
    frag,
    (error) => {
      shaderLog(error);
      replacementShader();
    }
  );

  penPlus.shaderVars.innerHTML = "";

  try {
    penPlus.ShaderAttributes.forEach((attribute) => {
      if (attribute.scope == "uniform") {
        gl.shaders["editorShader"].setupUniform(attribute.name, attribute.type);
        if (attribute.name != "u_timer" && attribute.name != "u_res") {
          let divElement = document.createElement("div");
          divElement.style.color = "var(--EditorTheme_Text_1)";
          divElement.style.position = "relative";
          divElement.style.maxWidth = "50%";
          divElement.style.display = "flex";

          divElement.innerHTML = `${attribute.name}:`;
          divElement.appendChild(getTypedInput(attribute.type, attribute.name));

          penPlus.shaderVars.appendChild(divElement);
        }
      } else {
        gl.shaders["editorShader"].setupAttribute(
          attribute.name,
          attribute.type
        );
        if (
          attribute.name != "a_position" &&
          attribute.name != "a_color" &&
          attribute.name != "a_texCoord"
        ) {
        }
      }
    });
  } catch (error) {
    shaderLog(error);
  }

  penPlus.compiling = false;
}
