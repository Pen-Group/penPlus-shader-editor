(function () {
  //Empty file
  const emptyFile = {
    blockDat: {},
    dynamicDat: {
      dynamic_variables: [],
      dynamic_myblocks: [],
    },
    glsl: "//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\n\nuniform highp float u_timer;\n\n//PenPlus Textures\nuniform sampler2D u_texture;\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n\n  r += m;\n  g += m;\n  b += m;\n\n  return vec4(r, g, b, a);\n}\n\n\n    void vertex() {\n      gl_Position = a_position;\n      v_texCoord = a_texCoord;\n    }\n\n    void fragment() {\n      gl_FragColor = vec4(1,1,1,1);\n    }\n",
    isText: false,
    savedVarState: {},
  };

  const download = (data, filename, type) => {
    var file = new Blob([data], { type: type });

    if (window.navigator.msSaveOrOpenBlob) {
      // For IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
      // For other browsers
      var a = document.createElement("a");
      var url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  penPlus.loadProjectFile = (contents) => {
    if (contents.blockDat) {
      //Load the blockly workspace
      //
      penPlus.dynamicallyAdded = contents.dynamicDat;

      penPlus.Generated_GLSL = contents.glsl;
      penPlus.monacoEditor.setValue(penPlus.Generated_GLSL);

      penPlus.isText = contents.isText || false;
      penPlus.isTextMode = contents.isText || false;
      penPlus.blockly_Button.disabled = contents.isText;
      penPlus.recompileButton.style.visibility = penPlus.autoCompile && !penPlus.isTextMode ? "hidden" : "visible";

      penPlus.previousVariableStates = contents.savedVarState || {};

      //if not blockly load the text
      if (penPlus.isText) {
        penPlus.glsl_Button.onclick();
        penPlus.recompileButton.style.visibility = "visible";
      }
      //if blockly load the blockly workspace
      else {
        penPlus.blockly_Button.onclick();

        Blockly.serialization.workspaces.load(
          contents.blockDat,
          window.workspace
        );
      }
    } else {
      Blockly.serialization.workspaces.load(contents, window.workspace);
      penPlus.isTextMode = false;
    }
  }

  const readSaveFile = () => {
    let opener = document.createElement("input");
    opener.type = "file";
    opener.accept = ".pps";

    opener.click();

    opener.addEventListener(
      "change",
      () => {
        let file = opener.files[0];
        if (!file) {
          return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
          let contents = JSON.parse(e.target.result);
          penPlus.loadProjectFile(contents);

          penPlus.recompileButton.style.visibility =
            penPlus.autoCompile && !penPlus.isTextMode ? "hidden" : "visible";
        };
        reader.readAsText(file);
      },
      false
    );
  };

  //Define our buttons
  const fileDropdown = document.getElementById("fileDropdown");
  const newButton = document.getElementById("newButton");
  const saveButton = document.getElementById("saveButton");
  const importButton = document.getElementById("importButton");
  const exportButton = document.getElementById("exportButton");
  const loadButton = document.getElementById("loadButton");

  //Remove the export button if we are in an IFrame
  if (window.location === window.parent.location) {
    penPlus.isIFrame = true;
    fileDropdown.removeChild(importButton);
    fileDropdown.removeChild(exportButton);
  }

  //New button behavior
  newButton.onclick = () => {
    //Ask the user if they want to create a new project
    if (window.confirm("Do you want to make a new project?")) {
      //override existing data.
      penPlus.dynamicallyAdded = emptyFile.dynamicDat;
      penPlus.Generated_GLSL = emptyFile.glsl;
      penPlus.GLSL_CODE_WINDOW.value = penPlus.Generated_GLSL;
      penPlus.isText = emptyFile.isText || false;
      penPlus.blockly_Button.disabled = emptyFile.isText;
      penPlus.previousVariableStates = emptyFile.savedVarState || {};

      //Create our new blockly project
      penPlus.blockly_Button.onclick();
      Blockly.serialization.workspaces.load(
        emptyFile.blockDat,
        window.workspace
      );
    }
  };

  //Save stuff
  saveButton.onclick = () => {
    download(
      //Pack it all into one big happy string family!
      JSON.stringify({
        blockDat: Blockly.serialization.workspaces.save(penPlus.workspace),
        dynamicDat: penPlus.dynamicallyAdded,
        glsl: (penPlus.isTextMode) ? penPlus.monacoEditor.getValue() : penPlus.Generated_GLSL,
        isText: penPlus.isTextMode,
        savedVarState: penPlus.previousVariableStates || {},
      }),
      "shader.pps",
      ""
    );
  };

  loadButton.onclick = readSaveFile;

  importButton.onclick = () => {
    penPlus.IFRAME_API.parent.postMessage(
      {
        type: "DATA_REQUEST"
      },
      penPlus.IFRAME_API.parentURL
    );
  };

  exportButton.onclick = () => {
    const projectData = {
      blockDat: Blockly.serialization.workspaces.save(penPlus.workspace),
      dynamicDat: penPlus.dynamicallyAdded,
      glsl: penPlus.Generated_GLSL,
      isText: penPlus.isTextMode,
      savedVarState: penPlus.previousVariableStates || {},
    };

    updateGLSL({ type: Blockly.Events.BLOCK_CHANGE, isManualCompile: true });

    penPlus.IFRAME_API.parent.postMessage(
      {
        type: "DATA_SEND",
        projectData: projectData,
        mergedGLSL: penPlus.Generated_GLSL,
        vertShader: penPlus.Generated_Vert,
        fragShader: penPlus.Generated_Frag,
      },
      penPlus.IFRAME_API.parentURL
    );
  };
})();
