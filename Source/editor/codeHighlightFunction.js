penPlus.setupMonacoEditor = () => {
  penPlus.isTextMode = false;

  penPlus.monacoEditor = monaco.editor.create(document.getElementById("myBlocklyCodeOutput"), {
    value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
    language:"glsl"
  })
  monaco.editor.setTheme("myCoolTheme");

  
  //This should work //?Right
  penPlus.monacoEditor.getModel().onDidChangeContent((event) => {penPlus.editGLSL(event)});

  penPlus.editGLSL = (event) => {
    if (event.isFlush) return;
    
    recompileButton.style.visibility = "visible";
    penPlus.isTextMode = true;
    penPlus.blockly_Button.disabled = true;
  };
}
