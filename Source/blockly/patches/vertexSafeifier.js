penPlus.makeVertexSafe = (shaderText) => {
  if (shaderText.includes("#version 300 es")) {
    return shaderText
      .replaceAll(/(gl_FragColor\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
      .replaceAll(/(gl_FragColor)/g, "vec4(1)")
      .replaceAll(/(gl_FragCoord)/g, "vec2(1)")
      .replaceAll("attribute", "in")
      .replaceAll("varying", "out")
      .replaceAll(/(penPlus_isFragment)/g, "false");
  }

  //Old 2.22 spec
  return shaderText
    .replaceAll()
    .replaceAll(/(gl_FragColor\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
    .replaceAll(/(gl_FragColor)/g, "vec4(1)")
    .replaceAll(/(gl_FragCoord)/g, "vec2(1)")
    .replaceAll(/(penPlus_isFragment)/g, "false");
};
