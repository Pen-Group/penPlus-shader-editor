(function () {
    penPlus.isTextMode = false;

    penPlus.editGLSL = (event) => {
        recompileButton.style.visibility = "visible";
        penPlus.isTextMode = true;
        penPlus.blockly_Button.disabled = true;
        penPlus.doHighlight(event);
    }

  penPlus.doHighlight = (event) => {
    if (event.key == "Tab") {
      event.preventDefault();
      penPlus.GLSL_CODE_WINDOW.value += "    ";
    }

    penPlus.GLSL_CODE_HIGHLIGHTED.innerHTML =
      penPlus.GLSL_CODE_WINDOW.value.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;");

    penPlus.syntaxHighlighter({
      patterns: penPlus.highlightREGEX,
      selector: "code",

      postProcess: (string) => {
        return string.replaceAll("\n", "<br>");
      },
    });
  };
})();
