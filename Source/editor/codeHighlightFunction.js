penPlus.setupMonacoEditor = () => {
  penPlus.isTextMode = false;

  penPlus.monacoEditor = monaco.editor.create(document.getElementById("myBlocklyCodeOutput"), {
    value: penPlus.defaultShader + penPlus.defaultVert + penPlus.defaultFrag,
    language: "glsl",
    automaticLayout: true
  });
  monaco.editor.setTheme("myCoolTheme");

  //This should work //?Right
  penPlus.monacoEditor.getModel().onDidChangeContent((event) => {
    penPlus.editGLSL(event);
  });

  penPlus.editGLSL = (event) => {
    if (event.isFlush) return;

    recompileButton.style.visibility = "visible";
    penPlus.isTextMode = true;
    penPlus.blockly_Button.disabled = true;
  };
};
