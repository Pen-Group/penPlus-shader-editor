penPlus.makeVertexSafe = (shaderText) => {
  return shaderText
    .replaceAll()
    .replaceAll(/(gl_FragColor\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
    .replaceAll(/(gl_FragColor)/g, "vec4(1)")
    .replaceAll(/(gl_FragCoord)/g, "vec2(1)")
    .replaceAll(/(penPlus_isFragment)/g, "false");
};
