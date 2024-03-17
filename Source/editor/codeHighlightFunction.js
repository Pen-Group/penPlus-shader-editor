(function () {
  penPlus.isTextMode = false;

  penPlus.editGLSL = (event) => {
    if (event.key == "Tab") {
      event.preventDefault();
      penPlus.GLSL_CODE_WINDOW.value += "    ";
    }

    if (penPlus.GLSL_CODE_WINDOW.value != penPlus.Generated_GLSL) {
      recompileButton.style.visibility = "visible";
      penPlus.isTextMode = true;
      penPlus.blockly_Button.disabled = true;
    }

    penPlus.doHighlight(event);
  };

  penPlus.doHighlight = (event) => {
    penPlus.GLSL_CODE_HIGHLIGHTED.innerHTML = penPlus.GLSL_CODE_WINDOW.value
      .replaceAll("\n", "<br>")
      .replaceAll(" ", "&nbsp;");

    penPlus.syntaxHighlighter({
      patterns: penPlus.highlightREGEX,
      selector: "code",

      postProcess: (string) => {
        return string.replaceAll("\n", "<br>");
      },
    });
  };
})();
