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

  GLSL_GEN.forBlock["matrix2_reporter"] = function (block, generator) {
    return [
      `mat2(${block.getFieldValue("00")},${block.getFieldValue(
        "01"
      )},${block.getFieldValue("10")},${block.getFieldValue("11")})`,
      Order.ATOMIC,
    ];
  };

  GLSL_GEN.forBlock["matrix3_reporter"] = function (block, generator) {
    return [
      `mat3(${block.getFieldValue("00")},${block.getFieldValue(
        "01"
      )},${block.getFieldValue("02")},${block.getFieldValue(
        "10"
      )},${block.getFieldValue("11")},${block.getFieldValue(
        "12"
      )},${block.getFieldValue("20")},${block.getFieldValue(
        "21"
      )},${block.getFieldValue("22")})`,
      Order.ATOMIC,
    ];
  };

  GLSL_GEN.forBlock["matrix4_reporter"] = function (block, generator) {
    return [
      `mat4(${block.getFieldValue("00")},${block.getFieldValue(
        "01"
      )},${block.getFieldValue("02")},${block.getFieldValue(
        "03"
      )},${block.getFieldValue("10")},${block.getFieldValue(
        "11"
      )},${block.getFieldValue("12")},${block.getFieldValue(
        "13"
      )},${block.getFieldValue("20")},${block.getFieldValue(
        "21"
      )},${block.getFieldValue("22")},${block.getFieldValue(
        "23"
      )},${block.getFieldValue("30")},${block.getFieldValue(
        "31"
      )},${block.getFieldValue("32")},${block.getFieldValue("33")})`,
      Order.ATOMIC,
    ];
  };

  GLSL_GEN.forBlock["string_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("STRING");
    return [`${numba}`, Order.ATOMIC];
  };
}

function updateGLSL(event) {
  if (window.workspace.isDragging()) return; // Don't update while changes are happening.
  if (!window.supportedEvents.has(event.type)) return;

  window.timer = 0;

  window.customBlocks = [];

  document.getElementById("shaderLog").innerHTML = "";

  //Base GLSL code
  window.Generated_GLSL = `//Base Variables
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

//Base functions
highp float log10(highp float a) {
  return log(a)/log(10.0);
}

highp float eulernum(highp float a) {
    return 2.718 * a;
}
`;

  //Add Variables
  workspace.getAllVariables().forEach((variable) => {
    let type = variable.type;

    if (type == "texture") type = "sampler2D";
    if (type == "cubemap") type = "samplerCube";
    if (type == "matrix_2x") type = "mat2";
    if (type == "matrix_3x") type = "mat3";
    if (type == "matrix_4x") type = "mat4";

    let appendance = "";

    let scope = variable.name.split(" ")[0].split("[")[0];
    if (scope == "array") {
      scope = "uniform";
      appendance = `[${variable.name.split(" ")[0].split("[")[1].replace("]","")}]`;
    }
    if (scope == "hat") return;

    if (!variable.name.split(" ")[1]) return;

    //Types that don't have precision
    if (
      variable.type == "texture" ||
      variable.type == "cubemap" ||
      variable.type == "int"
    )
      window.Generated_GLSL += `\n${variable.name.split(" ")[0]} ${
        type
      } ${variable.name.split(" ")[1] + appendance};\n`;
    else
      window.Generated_GLSL += `\n${scope} highp ${type} ${
        variable.name.split(" ")[1] + appendance
      };\n`;
  });

  //Add some spacing
  window.Generated_GLSL += `\n`;

  window.Generated_GLSL += window.GLSL_GEN.workspaceToCode(window.workspace);

  window.Generated_Frag = "";
  window.Generated_Vert = "";

  window.loopID = 0;

  workspace.getToolbox().refreshSelection();

  let inner = 0;

  let vertFunction = "";
  let fragFunction = "";

  if (!window.Generated_GLSL.includes("void vertex")) {
    window.Generated_GLSL += `
    void vertex() {
      gl_Position = a_position;
      v_texCoord = a_texCoord;
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

  document.getElementById("myBlocklyCodeOutput").value = window.Generated_GLSL;

  window.Generated_Vert = window.Generated_GLSL.replace(fragFunction,"").replace("void vertex","void main");
  window.Generated_Frag = window.Generated_GLSL.replace(vertFunction,"").replace("void fragment","void main");
  
  genProgram();
}
