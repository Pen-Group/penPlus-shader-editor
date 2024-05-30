penPlus.refreshTheme = (init) => {
  //Hacky fix
  //Works

  document.body.style.setProperty(
    "--EditorTheme_ButtonSVGStyle",
    penPlus.editorTheme == "dark" ? "invert(100%)" : "invert(0%)"
  );

  document.body.style.setProperty(
    "--EditorTheme_Theme_1",
    penPlus.editorTheme == "dark" ? "#0f0f0f" : "#ffffff"
  );
  document.body.style.setProperty(
    "--EditorTheme_Theme_2",
    penPlus.editorTheme == "dark" ? "#141414" : "#f4f4f4"
  );
  document.body.style.setProperty(
    "--EditorTheme_Theme_3",
    penPlus.editorTheme == "dark" ? "#1f1f1f" : "#efefef"
  );
  document.body.style.setProperty(
    "--EditorTheme_Theme_4",
    penPlus.editorTheme == "dark" ? "#2f2f2f" : "#dfdfdf"
  );

  document.body.style.setProperty(
    "--EditorTheme_Text_1",
    penPlus.editorTheme == "dark" ? "#ffffff" : "#000000"
  );
  document.body.style.setProperty(
    "--EditorTheme_Text_2",
    penPlus.editorTheme == "dark" ? "#bfbfbf" : "#4f4f4f"
  );

  document.body.style.setProperty(
    "--EditorTheme_Text_4",
    penPlus.editorTheme == "dark" ? "#8b8b8b" : "#292929"
  );

  penPlus.penPlusTheme.componentStyles =
    penPlus.editorTheme == "dark"
      ? {
          workspaceBackgroundColour: "#1e1e1e",
          toolboxBackgroundColour: "blackBackground",
          toolboxForegroundColour: "#fff",
          flyoutBackgroundColour: "#252526",
          flyoutForegroundColour: "#ccc",
          flyoutOpacity: 0.5,
          scrollbarColour: "#797979",
          insertionMarkerColour: "#fff",
          insertionMarkerOpacity: 0.3,
          scrollbarOpacity: 0.4,
          cursorColour: "#d0d0d0",
          blackBackground: "#333",
        }
      : {
          workspaceBackgroundColour: "#F9F9F9",
          toolboxBackgroundColour: "blackBackground",
          toolboxForegroundColour: "#fff",
          flyoutBackgroundColour: "#fbfbfb",
          flyoutForegroundColour: "#777",
          flyoutOpacity: 0.5,
          scrollbarColour: "#b9b9b9",
          insertionMarkerColour: "#000",
          insertionMarkerOpacity: 0.3,
          scrollbarOpacity: 0.4,
          cursorColour: "#202020",
          blackBackground: "#ccc",
        };

  if (!init) {
    workspace.setTheme(
      Blockly.Theme.defineTheme("penPlus", penPlus.penPlusTheme)
    );
  }
};

function penPlusBlocklyTheme() {
  penPlus.penPlusTheme = {
    blockStyles: {},
    fontStyle: {
      family: "helvetica",
      weight: 500,
      size: 12,
    },
    componentStyles:
      penPlus.editorTheme == "dark"
        ? {
            workspaceBackgroundColour: "#1e1e1e",
            toolboxBackgroundColour: "blackBackground",
            toolboxForegroundColour: "#fff",
            flyoutBackgroundColour: "#252526",
            flyoutForegroundColour: "#ccc",
            flyoutOpacity: 0.5,
            scrollbarColour: "#797979",
            insertionMarkerColour: "#fff",
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.4,
            cursorColour: "#d0d0d0",
            blackBackground: "#333",
          }
        : {
            workspaceBackgroundColour: "#1e1e1e",
            toolboxBackgroundColour: "blackBackground",
            toolboxForegroundColour: "#fff",
            flyoutBackgroundColour: "#fbfbfb",
            flyoutForegroundColour: "#777",
            flyoutOpacity: 0.5,
            scrollbarColour: "#b9b9b9",
            insertionMarkerColour: "#000",
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.4,
            cursorColour: "#202020",
            blackBackground: "#ccc",
          },
    startHats: true,
  };

  penPlus.refreshTheme(true);

  return penPlus.penPlusTheme;
}
