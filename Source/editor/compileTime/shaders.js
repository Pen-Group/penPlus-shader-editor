const gl = document
  .getElementById("shaderpreview")
  .getContext("webgl", { antialias: false });

function shaderLog(reason) {
  const logThing = document.createElement("div");
  logThing.innerHTML = "Errors at : " + Date.now();
  logThing.className = "logText";

  document.getElementById("shaderLog").appendChild(logThing);

  reason.split("ERROR:").forEach(Error => {
    const errorElement = penPlus.easyErrorHandler(Error);
    if (errorElement) {
      errorElement.style.backgroundColor = "#ff666699";

      errorElement.style.backgroundImage = "url(\"data:image/png;base64,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\")"
      errorElement.style.backgroundRepeat = "repeat";
      errorElement.style.backgroundSize = "80px 80px";

      document.getElementById("shaderLog").appendChild(errorElement);

      errorElement.style.backgroundPosition = `0px calc(var(--U_TIMER) * 10)`;
    }
  })
}

function replacementShader() {
  penPlus.Generated_GLSL = penPlus.defaultShader + penPlus.defaultVert + penPlus.defaultFrag;

  if (!penPlus.Generated_GLSL.includes("void vertex")) {
    penPlus.Generated_GLSL += penPlus.defaultVert;
  }

  if (!penPlus.Generated_GLSL.includes("void fragment")) {
    penPlus.Generated_GLSL += penPlus.defaultFrag;
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
function getTypedInput(type, name, index) {
  let input = "";
  let keys = {};
  let options = "";
  let inputFunction = () => {};
  switch (type) {
    case "samplerCube":
      keys = Object.keys(penPlus.cubemaps);

      input = document.createElement("select");
      input.style.width = "75%";
      input.className = "scratchStyledInput";

      //Loop through textures to add them to the list
      options = "";
      keys.forEach((key) => {
        options += `<option value="${key}">cubemap ${key}</option>`;
      });

      input.innerHTML = options;

      if (penPlus.previousVariableStates[name])
        input.value = penPlus.previousVariableStates[name];
      gl.shaders.editorShader.uniforms[name].value = penPlus
        .previousVariableStates[name]
        ? penPlus.previousVariableStates[name]
        : penPlus.cubemaps[input.value];

      input.addEventListener("change", () => {
        gl.shaders.editorShader.uniforms[name].value =
          penPlus.cubemaps[input.value];
        penPlus.previousVariableStates[name] = input.value;
      });

      return input;
    case "sampler2D":
      keys = Object.keys(penPlus.textures);

      input = document.createElement("select");
      input.style.width = "75%";
      input.className = "scratchStyledInput";

      //Loop through textures to add them to the list
      options = "";
      keys.forEach((key) => {
        options += `<option value="${key}">texture ${key}</option>`;
      });

      input.innerHTML = options;

      if (penPlus.previousVariableStates[name])
        input.value = penPlus.previousVariableStates[name];
      gl.shaders.editorShader.uniforms[name].value = penPlus
        .previousVariableStates[name]
        ? penPlus.previousVariableStates[name]
        : penPlus.textures[input.value];

      input.addEventListener("change", () => {
        gl.shaders.editorShader.uniforms[name].value =
          penPlus.textures[input.value];
        penPlus.previousVariableStates[name] = input.value;
      });

      return input;

    case "float":
      input = document.createElement("input");
      input.style.width = "75%";

      input.type = "Number";
      input.value = 0;
      input.className = "scratchStyledInput";
      if (index !== undefined) {
        input.value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index]
          : gl.shaders.editorShader.uniforms[name].elements[index].current;
        if (penPlus.previousVariableStates[name+index])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name+index];
        input.addEventListener("change", () => {
          gl.shaders.editorShader.uniforms[name].elements[index].value = input.value;
          penPlus.previousVariableStates[name+index] =
            gl.shaders.editorShader.uniforms[name].elements[index].current;
        });
      }
      //Uniform stuff
      else {
        input.value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name]
          : gl.shaders.editorShader.uniforms[name].current;
        if (penPlus.previousVariableStates[name])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name];

        input.addEventListener("change", () => {
          gl.shaders.editorShader.uniforms[name].value = input.value;
          penPlus.previousVariableStates[name] =
            gl.shaders.editorShader.uniforms[name].current;
        });
      }

      return input;

    case "int":
      input = document.createElement("input");
      input.style.width = "75%";

      input.type = "Number";
      input.value = 0;
      input.className = "scratchStyledInput";
      if (index !== undefined) {
        input.value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index]
          : gl.shaders.editorShader.uniforms[name].elements[index].current;
        if (penPlus.previousVariableStates[name+index])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name+index];
        input.addEventListener("change", () => {
          gl.shaders.editorShader.uniforms[name].elements[index].value = Math.floor(
            input.value
          );
          penPlus.previousVariableStates[name+index] =
            gl.shaders.editorShader.uniforms[name].elements[index].current;
        });
      } else {
        input.value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name]
          : gl.shaders.editorShader.uniforms[name].current;
        if (penPlus.previousVariableStates[name])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name];
        input.addEventListener("change", () => {
          gl.shaders.editorShader.uniforms[name].value = Math.floor(
            input.value
          );
          penPlus.previousVariableStates[name] =
            gl.shaders.editorShader.uniforms[name].current;
        });
      }

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
      if (index !== undefined) {
        inputFunction = () => {
          gl.shaders.editorShader.uniforms[name].elements[index].value = [
            input.children[0].value,
            input.children[1].value,
          ];
          penPlus.previousVariableStates[name+index] =
            gl.shaders.editorShader.uniforms[name].elements[index].current;
        };

        input.children[0].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][0]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[0];
        input.children[1].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][1]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[1];
        if (penPlus.previousVariableStates[name+index])
          gl.shaders.editorShader.uniforms[name].elements[index].value =
            penPlus.previousVariableStates[name+index];
      } else {
        inputFunction = () => {
          gl.shaders.editorShader.uniforms[name].value = [
            input.children[0].value,
            input.children[1].value,
          ];
          penPlus.previousVariableStates[name] =
            gl.shaders.editorShader.uniforms[name].current;
        };

        input.children[0].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][0]
          : gl.shaders.editorShader.uniforms[name].current[0];
        input.children[1].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][1]
          : gl.shaders.editorShader.uniforms[name].current[1];
        if (penPlus.previousVariableStates[name])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name];
      }

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
      if (index !== undefined) {
        inputFunction = () => {
          gl.shaders.editorShader.uniforms[name].elements[index].value = [
            input.children[0].value,
            input.children[1].value,
            input.children[2].value,
          ];
          penPlus.previousVariableStates[name+index] =
            gl.shaders.editorShader.uniforms[name].elements[index].current;
        };

        input.children[0].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][0]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[0];
        input.children[1].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][1]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[1];
        input.children[2].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][2]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[2];
        if (penPlus.previousVariableStates[name+index])
          gl.shaders.editorShader.uniforms[name].elements[index].value =
            penPlus.previousVariableStates[name+index];
      } else {
        inputFunction = () => {
          gl.shaders.editorShader.uniforms[name].value = [
            input.children[0].value,
            input.children[1].value,
            input.children[2].value,
          ];
          penPlus.previousVariableStates[name] =
            gl.shaders.editorShader.uniforms[name].current;
        };

        input.children[0].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][0]
          : gl.shaders.editorShader.uniforms[name].current[0];
        input.children[1].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][1]
          : gl.shaders.editorShader.uniforms[name].current[1];
        input.children[2].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][2]
          : gl.shaders.editorShader.uniforms[name].current[2];
        if (penPlus.previousVariableStates[name])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name];
      }

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
      if (index !== undefined) {
        inputFunction = () => {
          gl.shaders.editorShader.uniforms[name].elements[index].value = [
            input.children[0].value,
            input.children[1].value,
            input.children[2].value,
            input.children[3].value,
          ];
          penPlus.previousVariableStates[name+index] =
            gl.shaders.editorShader.uniforms[name].elements[index].current;
        };

        input.children[0].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][0]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[0];
        input.children[1].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][1]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[1];
        input.children[2].value = penPlus.previousVariableStates[name+index]
          ? penPlus.previousVariableStates[name+index][2]
          : gl.shaders.editorShader.uniforms[name].elements[index].current[2];
          input.children[3].value = penPlus.previousVariableStates[name+index]
            ? penPlus.previousVariableStates[name+index][3]
            : gl.shaders.editorShader.uniforms[name].elements[index].current[3];
        if (penPlus.previousVariableStates[name+index])
          gl.shaders.editorShader.uniforms[name].elements[index].value =
            penPlus.previousVariableStates[name+index];
      } else {
        inputFunction = () => {
          gl.shaders.editorShader.uniforms[name].value = [
            input.children[0].value,
            input.children[1].value,
            input.children[2].value,
            input.children[3].value,
          ];
          penPlus.previousVariableStates[name] =
            gl.shaders.editorShader.uniforms[name].current;
        };

        input.children[0].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][0]
          : gl.shaders.editorShader.uniforms[name].current[0];
        input.children[1].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][1]
          : gl.shaders.editorShader.uniforms[name].current[1];
        input.children[2].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][2]
          : gl.shaders.editorShader.uniforms[name].current[2];
        input.children[3].value = penPlus.previousVariableStates[name]
          ? penPlus.previousVariableStates[name][3]
          : gl.shaders.editorShader.uniforms[name].current[3];
        if (penPlus.previousVariableStates[name])
          gl.shaders.editorShader.uniforms[name].value =
            penPlus.previousVariableStates[name];
      }

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
        penPlus.previousVariableStates[name] =
          gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][0]
        : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][1]
        : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][2]
        : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][3]
        : gl.shaders.editorShader.uniforms[name].current[3];
      if (penPlus.previousVariableStates[name])
        gl.shaders.editorShader.uniforms[name].value =
          penPlus.previousVariableStates[name];

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
        penPlus.previousVariableStates[name] =
          gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][0]
        : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][1]
        : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][2]
        : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][3]
        : gl.shaders.editorShader.uniforms[name].current[3];
      input.children[4].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][4]
        : gl.shaders.editorShader.uniforms[name].current[4];
      input.children[5].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][5]
        : gl.shaders.editorShader.uniforms[name].current[5];
      input.children[6].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][6]
        : gl.shaders.editorShader.uniforms[name].current[6];
      input.children[7].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][7]
        : gl.shaders.editorShader.uniforms[name].current[7];
      input.children[8].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][8]
        : gl.shaders.editorShader.uniforms[name].current[8];
      if (penPlus.previousVariableStates[name])
        gl.shaders.editorShader.uniforms[name].value =
          penPlus.previousVariableStates[name];

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
        penPlus.previousVariableStates[name] =
          gl.shaders.editorShader.uniforms[name].current;
      };

      input.children[0].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][0]
        : gl.shaders.editorShader.uniforms[name].current[0];
      input.children[1].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][1]
        : gl.shaders.editorShader.uniforms[name].current[1];
      input.children[2].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][2]
        : gl.shaders.editorShader.uniforms[name].current[2];
      input.children[3].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][3]
        : gl.shaders.editorShader.uniforms[name].current[3];
      input.children[4].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][4]
        : gl.shaders.editorShader.uniforms[name].current[4];
      input.children[5].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][5]
        : gl.shaders.editorShader.uniforms[name].current[5];
      input.children[6].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][6]
        : gl.shaders.editorShader.uniforms[name].current[6];
      input.children[7].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][7]
        : gl.shaders.editorShader.uniforms[name].current[7];
      input.children[8].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][8]
        : gl.shaders.editorShader.uniforms[name].current[8];
      input.children[9].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][9]
        : gl.shaders.editorShader.uniforms[name].current[9];
      input.children[10].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][10]
        : gl.shaders.editorShader.uniforms[name].current[10];
      input.children[11].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][11]
        : gl.shaders.editorShader.uniforms[name].current[11];
      input.children[12].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][12]
        : gl.shaders.editorShader.uniforms[name].current[12];
      input.children[13].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][13]
        : gl.shaders.editorShader.uniforms[name].current[13];
      input.children[14].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][14]
        : gl.shaders.editorShader.uniforms[name].current[14];
      input.children[15].value = penPlus.previousVariableStates[name]
        ? penPlus.previousVariableStates[name][15]
        : gl.shaders.editorShader.uniforms[name].current[15];
      if (penPlus.previousVariableStates[name])
        gl.shaders.editorShader.uniforms[name].value =
          penPlus.previousVariableStates[name];

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

  try {
    penPlus.refreshVariableMenu = (refreshedPoints) => {
      penPlus.shaderVars.innerHTML = "";

      penPlus.ShaderAttributes.forEach((attribute) => {
        if (attribute.scope == "uniform") {
          //handle arrays
          if (attribute.name.includes("[")) {
            let rawName = attribute.name.replace(/\[([^)]+)\]/g,"");
            let length = Number(attribute.name.replace(rawName,"").replace("[","").replace("]",""));
            console.log(length)
            gl.shaders["editorShader"].setupUniformArray(rawName,attribute.type,length);

            let divElement = document.createElement("div");
            divElement.style.color = "var(--EditorTheme_Text_1)";
            divElement.style.position = "relative";
            divElement.style.maxWidth = "50%";
            divElement.style.display = "flex";
  
            divElement.innerHTML = `${attribute.name}:`;
  
            penPlus.shaderVars.appendChild(divElement);

            for (let index = 0; index < length; index++) {
              divElement = document.createElement("div");
              divElement.style.color = "var(--EditorTheme_Text_1)";
              divElement.style.position = "relative";
              divElement.style.maxWidth = "50%";
              divElement.style.display = "flex";

              divElement.appendChild(getTypedInput(attribute.type, rawName,index));

              penPlus.shaderVars.appendChild(divElement);
            }
            return;
          }

          //Handle non arrays
          if (!refreshedPoints) gl.shaders["editorShader"].setupUniform(attribute.name, attribute.type);

          //Remove pen+ uniforms that are static
          if (attribute.name != "u_timer" && attribute.name != "u_res" && attribute.name != "u_transform") {
            let divElement = document.createElement("div");
            divElement.style.color = "var(--EditorTheme_Text_1)";
            divElement.style.position = "relative";
            divElement.style.maxWidth = "50%";
            divElement.style.display = "flex";
  
            divElement.innerHTML = `${attribute.name}:`;
            divElement.appendChild(getTypedInput(attribute.type, attribute.name));
  
            penPlus.shaderVars.appendChild(divElement);
          }
        } 
        //stuff won't work lol figure it out later
        else {
          if (!refreshedPoints) gl.shaders["editorShader"].setupAttribute(
            attribute.name,
            attribute.type
          );

          //Remove preset attributes
          /*
          if (
            attribute.name != "a_position" &&
            attribute.name != "a_color" &&
            attribute.name != "a_texCoord"
          ) {
            let divElement = document.createElement("div");
            divElement.style.color = "var(--EditorTheme_Text_1)";
            divElement.style.position = "relative";
            divElement.style.maxWidth = "100%";
            divElement.style.display = "flex";
  
            divElement.innerHTML = `${attribute.name}:`;
            penPlus.shaderVars.appendChild(divElement);

            //Loop through every point
            for (let vertexID = 0; vertexID < penPlus.pointCount; vertexID++) {
              divElement = document.createElement("div");
              divElement.style.color = "var(--EditorTheme_Text_1)";
              divElement.style.position = "relative";
              divElement.style.maxWidth = "100%";
              divElement.style.display = "flex";
    
              divElement.innerHTML = `${attribute.name.replaceAll(/([A-Za-z_])/g,"⠀").replace('⠀',vertexID + 1)}:`;
              divElement.appendChild(
                getTypedInput(attribute.type, "attribute.name", vertexID + 1)
              );
              penPlus.shaderVars.appendChild(divElement);
            }
          }
          */
        }
      });

    }

    penPlus.refreshVariableMenu();
    penPlus.refreshMesh();
  } catch (error) {
    shaderLog(error);
  }

  penPlus.compiling = false;
}
