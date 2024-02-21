//Order we only need atomic
const Order = {
  ATOMIC: 0,
};

//Get if these exist
let functionsThatExist = {
  vert: false,
  frag: false,
};

//Base GLSL code
window.Generated_GLSL = `//Base Variables
attribute highp vec4 a_position;
attribute highp vec4 a_color;
attribute highp vec2 a_texCoord;
 
varying highp vec4 v_color;
varying highp vec2 v_texCoord;

varying highp float v_depth;

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
}
`;

//Helper function to convert the next block
function nextBlockToCode(block, generator) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    return "\n" + GLSL_GEN.blockToCode(nextBlock);
  }
  return "";
}

function createGLSLGen() {
  //Create the default GLSL generator
  window.GLSL_GEN = new Blockly.Generator("GLSL");
  const GLSL_GEN = window.GLSL_GEN;

  //Base reporters
  GLSL_GEN.forBlock["number_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("NUMBER");
    return [`float(${numba})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["int_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("NUMBER");
    return [`${numba}`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["color_reporter"] = function (block, generator) {
    const colour = block.getFieldValue("COLOUR");
    let converted = hexToRgb(colour);
    converted.r /= 255;
    converted.g /= 255;
    converted.b /= 255;
    return [
      `vec4(${converted.r},${converted.g},${converted.b},1.0)`,
      Order.ATOMIC,
    ];
  };

  GLSL_GEN.forBlock["vec2_reporter"] = function (block, generator) {
    const x = block.getFieldValue("x");
    const y = block.getFieldValue("y");
    return [`vec2(${x},${y})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["vec3_reporter"] = function (block, generator) {
    const x = block.getFieldValue("x");
    const y = block.getFieldValue("y");
    const z = block.getFieldValue("z");
    return [`vec3(${x},${y},${z})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["vec4_reporter"] = function (block, generator) {
    const x = block.getFieldValue("x");
    const y = block.getFieldValue("y");
    const z = block.getFieldValue("z");
    const w = block.getFieldValue("w");
    return [`vec4(${x},${y},${z},${w})`, Order.ATOMIC];
  };
}

function updateGLSL(event) {
  if (window.workspace.isDragging()) return; // Don't update while changes are happening.
  if (!window.supportedEvents.has(event.type)) return;

  document.getElementById("shaderLog").innerHTML = "";

  //Base GLSL code
  window.Generated_GLSL = `//Base Variables
attribute highp vec4 a_position;
attribute highp vec4 a_color;
attribute highp vec2 a_texCoord;
 
varying highp vec4 v_color;
varying highp vec2 v_texCoord;

varying highp float v_depth;

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
`;

  workspace.getAllVariables().forEach(variable => {
    window.Generated_GLSL += `\nuniform highp ${variable.type} ${variable.name};`
  });

  window.Generated_GLSL += window.GLSL_GEN.workspaceToCode(window.workspace);

  window.Generated_Frag = "";
  window.Generated_Vert = "";

  window.loopID = 0;

  if (!(window.Generated_GLSL.includes("//Fragment Shader") && window.Generated_GLSL.includes("//Vertex Shader"))) {
    if (!window.Generated_GLSL.includes("//Vertex Shader") && window.Generated_GLSL.includes("//Fragment Shader")) {
      shaderLog("Missing Vertex Shader creating manual replacement");
      window.Generated_GLSL += `//Vertex Shader
      void vertex() {
      gl_Position = a_position;
      }`;
    } else if (!window.Generated_GLSL.includes("//Fragment Shader") && window.Generated_GLSL.includes("//Vertex Shader")) {
      shaderLog("Missing Pixel/Fragment Shader creating manual replacement");
      window.Generated_GLSL += `//Fragment Shader
      void fragment() {
      gl_FragColor = v_color;
      }`;
    } else {
      shaderLog("Missing both shaders using generic set");
      window.Generated_GLSL += `//Vertex Shader t
      void vertex() {
      gl_Position = a_position;
      }`;
      window.Generated_GLSL += `\n//Fragment Shader
      void fragment() {
      gl_FragColor = v_color;
      }`;
    }
  }

  document.getElementById("myBlocklyCodeOutput").value = window.Generated_GLSL;

  genProgram();
}
