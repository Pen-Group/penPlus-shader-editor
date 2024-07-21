(function () {
  penPlus.refreshDefaultShaderString = () => {
    penPlus.defaultShader = (
      (penPlus.blocklyGLSLVersion == "300") ? `#version 300 es
//This is the default shader for the shader editor!
//These functions are here and are written for the GLSL 3.0 specification.
//You can revert it to GLSL 1.0 by removing the version number

//our output for color
out highp vec4 fragColor;\n` : "") +
  `//Base Variables
attribute highp vec4 a_position;
attribute highp vec4 a_color;
attribute highp vec2 a_texCoord;

varying highp vec4 v_color;
varying highp vec2 v_texCoord;

varying highp float v_depth;
uniform highp float u_timer;
uniform highp mat4 u_transform;

//Pen+ Textures
uniform mediump vec2 u_res;

//Base functions

//Some missing math functions
highp float log10(highp float a) {
  return log(a)/log(10.0);
}

highp float eulernum(highp float a) {
    return 2.718 * a;
}

//Psuedorandomness
highp vec4 pcg4d(highp vec4 v)
{
    v = v * 1664525.0 + 1013904223.0;
    
    v.x += v.y*v.w;
    v.y += v.z*v.x;
    v.z += v.x*v.y;
    v.w += v.y*v.z;
    
    v.x += v.z*v.w;
    v.y += v.y*v.x;
    v.z += v.x*v.w;
    v.w += v.y*v.x;
    
    return vec4(v);
}

highp vec4 daveRandomRange(highp float lowR, highp float highR)
{
    lowp float r = (gl_FragCoord.x * 50.25313532) + (gl_FragCoord.y * 21.5453) + u_timer;
    highp float randomizer = r*r/u_timer/5398932.234523;
    return clamp(vec4(
    fract(sin(mod(randomizer*(91.3458), 1440.0)) * 47453.5453),
    fract(sin(mod(randomizer*(80.3458), 1440.0)) * 48456.5453),
    fract(sin(mod(randomizer*(95.3458), 1440.0)) * 42457.5453),
    fract(sin(mod(randomizer*(85.3458), 1440.0)) * 47553.5453)
    ), lowR, highR);
}

highp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {
  highp float huePrime = mod(hue,360.0);
  highp float c = (value/100.0) * (saturation/100.0);
  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));
  highp float m = (value/100.0) - c;
  highp float r = 0.0;
  highp float g = 0.0;
  highp float b = 0.0;
  
  if (huePrime >= 0.0 && huePrime < 60.0) {
      r = c;
      g = x;
      b = 0.0;
  } else if (huePrime >= 60.0 && huePrime < 120.0) {
      r = x;
      g = c;
      b = 0.0;
  } else if (huePrime >= 120.0 && huePrime < 180.0) {
      r = 0.0;
      g = c;
      b = x;
  } else if (huePrime >= 180.0 && huePrime < 240.0) {
      r = 0.0;
      g = x;
      b = c;
  } else if (huePrime >= 240.0 && huePrime < 300.0) {
      r = x;
      g = 0.0;
      b = c;
  } else if (huePrime >= 300.0 && huePrime < 360.0) {
      r = c;
      g = 0.0;
      b = x;
  }
  r += m;
  g += m;
  b += m;
  return vec4(r, g, b, a);
}

highp vec4 rotation(highp vec4 invec4) {
  return vec4(
    (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],
    (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],
    invec4.zw
  );
}`;

    penPlus.defaultVert = `//Vertex Shader
void vertex() {
  gl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);
  v_color = a_color;
  v_texCoord = a_texCoord;
}`;

    penPlus.defaultFrag = `//Fragment Shader
void fragment() {
  ${(penPlus.blocklyGLSLVersion == "300") ?  "f" : "gl_F"}ragColor = v_color;
}`;

    penPlus.colorVariable = (penPlus.blocklyGLSLVersion == "300") ?  "fragColor" : "gl_FragColor";

    penPlus.is300Version = penPlus.blocklyGLSLVersion == "300";
  }

  penPlus.refreshDefaultShaderString();
})();
