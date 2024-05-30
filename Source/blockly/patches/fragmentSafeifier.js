penPlus.makeFragmentSafe = (shaderText) => {
  return shaderText
    .replaceAll()
    .replaceAll(/(gl_Position\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
    .replaceAll(/(gl_Position)/g, "vec4(1)")
    .replaceAll(/(v_color\.*[xyzw]*\s*[+*/-]*=.*;)/g, "")
    .replaceAll(/(penPlus_isFragment)/g, "true");
};
