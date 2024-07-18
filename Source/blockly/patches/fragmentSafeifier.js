penPlus.makeFragmentSafe = (shaderText) => {
  if (shaderText.includes("#version 300 es")) {
    return shaderText
      .replaceAll(/(gl_Position\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
      .replaceAll(/(gl_Position)/g, "vec4(1)")
      .replaceAll(/(v_color\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
      .replaceAll("varying", "in")
      .replaceAll(/attribute.*;/g,"")
      .replaceAll(/(penPlus_isFragment)/g, "false")
      .replaceAll("gl_FragColor","fragColor");
  }

  //Old 2.22 spec
  return shaderText
    .replaceAll()
    .replaceAll(/(gl_Position\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
    .replaceAll(/(gl_Position)/g, "vec4(1)")
    .replaceAll(/(v_color\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
    .replaceAll(/attribute.*;/g,"")
    .replaceAll(/(penPlus_isFragment)/g, "true");
};
