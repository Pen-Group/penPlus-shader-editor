(function () {
  penPlus.doHighlight = (event) => {
    if (event.key == "Tab") {
      event.preventDefault();
      //TODO Tab behavior is a bit odd. I'm going to have to research this.
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
