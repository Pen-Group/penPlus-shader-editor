const gl = document.getElementById("shaderpreview").getContext("webgl");

function shaderLog(reason) {
  const logThing = document.createElement("div");
  logThing.innerHTML = Date.now() + "::" + reason;
  logThing.className = "logText";

  console.log(reason);

  document.getElementById("shaderLog").appendChild(logThing);
}

function replacementShader() {
  window.Generated_GLSL = `//replacement shader
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

  if (!window.Generated_GLSL.includes("void vertex")) {
    window.Generated_GLSL += `
      void vertex() {
        gl_Position = a_position;
      }\n`
  }

  if (!window.Generated_GLSL.includes("void fragment")) {
    window.Generated_GLSL += `
      void fragment() {
        gl_FragColor = vec4(1,1,1,1);
      }\n`
  }

  for (let letterID = window.Generated_GLSL.indexOf("void vertex"); letterID < window.Generated_GLSL.length; letterID++) {
    const letter = window.Generated_GLSL.charAt(letterID);
    vertFunction += letter;
    if (letter == "{") {
      inner += 1;
    }
    else if (letter == "}") {
      inner -= 1;
      if (inner == 0) {
        break;
      }
    }
  }

  inner = 0;

  for (let letterID = window.Generated_GLSL.indexOf("void fragment"); letterID < window.Generated_GLSL.length; letterID++) {
    const letter = window.Generated_GLSL.charAt(letterID);
    fragFunction += letter;
    if (letter == "{") {
      inner += 1;
    }
    else if (letter == "}") {
      inner -= 1;
      if (inner == 0) {
        break;
      }
    }
  }

  genProgram();
}

function getTypedInput(type) {
  switch (type) {
    case "sampler2D":
      const keys = Object.keys(window.textures);
      let options = ""
      keys.forEach(key => {
        options += `<option value="${key}">texture ${key}</option>`;
      })
      return `<select style="background-color:var(--EditorTheme_Theme_4); border-width: 0px; border-radius: 0.25rem; width:50%; height:1.5em;font-size: 1.125em; color:var(--EditorTheme_Text_1);">${options}</select>`;
  
    default:
      return ``;
  }
}

window.compiling = false;

function genProgram() {
  window.compiling = true;

  //Remove attributes from fragment
  window.Generated_Frag = window.Generated_Frag.replace(
    /attribute (.*?);/g,
    ""
  );

  //Get attributes and add them into an array.
  window.ShaderAttributes = [
    ...window.Generated_GLSL.matchAll(/attribute (.*?);/g),
  ];

  window.ShaderAttributes = window.ShaderAttributes.concat([
    ...window.Generated_GLSL.matchAll(/uniform (.*?);/g),
  ]);

  //Then only get the type, scope, and name
  for (let i = 0; i < window.ShaderAttributes.length; i++) {
    const splitAttribute = window.ShaderAttributes[i][0].split(" ");
    window.ShaderAttributes[i] = {
      scope: splitAttribute[0]
    }

    if (splitAttribute.length >= 4) {
      window.ShaderAttributes[i].type = splitAttribute[2];
      window.ShaderAttributes[i].name = splitAttribute[3].replace(";", "");
    }
    else {
      window.ShaderAttributes[i].type = splitAttribute[1];
      window.ShaderAttributes[i].name = splitAttribute[2].replace(";", "");
    }
  }

  //Get the variables for later use from the global window class
  let vert = window.Generated_Vert;
  let frag = window.Generated_Frag;

  console.log(vert)
  console.log(frag)

  //? compile vertex Shader
  window.webGLShaderManager.createAndCompile(gl, "editorShader", vert, frag, (error) => {
    shaderLog(error);
    replacementShader();
  });

  window.shaderVars.innerHTML = "";

  window.ShaderAttributes.forEach(attribute => {
    if (attribute.scope == "uniform") {
      gl.shaders["editorShader"].setupUniform(attribute.name, attribute.type);
      if (attribute.name != "u_timer" && attribute.name != "u_res") {
        let divElement = document.createElement("div");
        divElement.style.color = "var(--EditorTheme_Text_1)";
        divElement.innerHTML = `${attribute.name}:${getTypedInput(attribute.type)}`;

        gl.shaders.editorShader.uniforms[attribute.name].value = window.textures[divElement.children[0].value];
        divElement.children[0].addEventListener("change", () => {
          gl.shaders.editorShader.uniforms[attribute.name].value = window.textures[divElement.children[0].value];
        })
        
        window.shaderVars.appendChild(divElement);
      }
    }
    else {
      gl.shaders["editorShader"].setupAttribute(attribute.name, attribute.type);
      if (attribute.name != "a_position" && attribute.name != "a_color" && attribute.name != "a_texCoord") {}
    }
  });
  window.compiling = false;
}
