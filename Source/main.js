function onAllAddonsLoaded() {
    createGLSLGen();
    addImportantReporters();
    addVariableTypes();
    addBlocks();

    const toolbox = {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Events",
          colour: "#ffbf00",
          contents: [
            {
              kind: "block",
              type: "as_vertex",
            },
            {
              kind: "block",
              type: "as_frag",
            },
          ],
        },
        {
          kind: "category",
          name: "Vertex",
          colour: "#4c97ff",
          contents: [
            {
              kind: "block",
              type: "vertex_gotoPos",
              inputs: {
                X: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                Y: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
            {
              kind: "block",
              type: "vertex_setZ",
              inputs: {
                Z: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
            {
              kind: "block",
              type: "vertex_setW",
              inputs: {
                W: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
            {
              kind: "label",
              text: ""
            },
            {
              kind: "block",
              type: "vertex_changeX",
              inputs: {
                X: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              }
            },
            {
              kind: "block",
              type: "vertex_changeY",
              inputs: {
                Y: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
            {
              kind: "block",
              type: "vertex_changeZ",
              inputs: {
                Z: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
            {
              kind: "block",
              type: "vertex_changeW",
              inputs: {
                W: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
            {
              kind: "label",
              text: ""
            },
            {
              kind: "block",
              type: "vertex_getX",
            },
            {
              kind: "block",
              type: "vertex_getY",
            },
            {
              kind: "block",
              type: "vertex_getZ",
            },
            {
              kind: "block",
              type: "vertex_getW",
            },
          ],
        },
        {
          kind: "category",
          name: "Looks",
          colour: "#9966ff",
          contents: [
            {
              kind: "block",
              type: "pixel_color",
              inputs: {
                COLOR: {
                  shadow: {
                    type: "color_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "pixel_vertColor",
              inputs: {
                COLOR: {
                  shadow: {
                    type: "color_reporter",
                  },
                },
              },
            },
            {
              kind: "label",
              text: ""
            },
            {
              kind: "block",
              type: "pixel_X",
            },
            {
              kind: "block",
              type: "pixel_Y",
            },
            {
              kind: "label",
              text: ""
            },
            {
              kind: "block",
              type: "pixel_pixcolour",
            },
            {
              kind: "block",
              type: "pixel_vertcolour"
            }
          ],
        },
        {
          kind: "category",
          name: "Controls",
          colour: "#ffab19",
          contents: [
            {
              kind: "block",
              type: "control_if",
            },
            {
              kind: "block",
              type: "control_ifelse",
            },
            {
              kind: "block",
              type: "control_repeat",
              inputs: {
                times: {
                  shadow: {
                    type: "number_reporter",
                  },
                }
              }
            },
          ],
        },
        {
          kind: "category",
          name: "Operators",
          colour: "#59c059",
          contents: [
            {
              kind: "block",
              type: "operator_add",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_sub",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_mul",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_div",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_pow",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },

            {
              kind: "label",
              text: ""
            },

            {
              kind: "block",
              type: "operator_equalTo",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_notequalTo",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_lessThan",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_lessThanEqual",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_moreThan",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_moreThanEqual",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },

            {
              kind: "label",
              text: " "
            },

            {
              kind: "block",
              type: "operator_and",
            },
            {
              kind: "block",
              type: "operator_or",
            },
            {
              kind: "block",
              type: "operator_not",
            },

            {
              kind: "label",
              text: " "
            },

            {
              kind: "block",
              type: "operator_true",
            },
            {
              kind: "block",
              type: "operator_false",
            },

            {
              kind: "label",
              text: " "
            },
            {
              kind: "block",
              type: "operator_mod",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
                B: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
            {
              kind: "block",
              type: "operator_arith",
              inputs: {
                A: {
                  shadow: {
                    type: "number_reporter",
                  },
                },
              },
            },
          ],
        },
        {
          kind: "category",
          name: "Variables",
          colour: "#ff8c1a",
          contents: window.variableTypes
        }
      ],
    };
    workspace = Blockly.inject("BlocklyDiv", {
      toolbox: toolbox,
      collapse: false,
      comments: true,
      renderer: "zelos",
      plugins: {
        toolbox: window.ContinuousToolbox,
        flyoutsVerticalToolbox: window.ContinuousFlyout,
        metricsManager: window.ContinuousMetrics,
      },
      theme: penPlusBlocklyTheme(),
    });
    window.workspace = workspace;

    window.supportedEvents = new Set([
      Blockly.Events.BLOCK_CHANGE,
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_MOVE,
    ]);

    // Add the disableOrphans event handler. This is not done automatically by
    // the plugin and should be handled by your application.
    workspace.addChangeListener(Blockly.Events.disableOrphans);

    workspace.addChangeListener(updateGLSL);

    workspace.registerButtonCallback("createVariable", (button) => {
      //Html Modal Mess
      const varModal = createModal(`
        <div class="Modal" style="--ModalWidth:40%; --ModalHeight:auto; aspect-ratio:3/2;background-color: var(--EditorTheme_Theme_1);border-radius:1rem; filter: drop-shadow(0px 0px 5px white);">
          <div style="position:absolute;left:0px;top:0px; width:100%; height:40%; background-color: var(--EditorTheme_Theme_4);">
            <input id="VarName" placeholder="Variable Name" style="position:absolute;left:50%;top:50%;Transform:Translate(-50%,-50%); width:50%; height:20%;" type="text"></input>
            <p class="noSelect" style="position:absolute;left:50%;top:75%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Only use A-Z</p>
          </div>
          <div class="noSelect" style="background-color: var(--EditorTheme_Color_1); width:100%; height:1.1em; position:absolute;  color:var(--EditorTheme_Text_3); text-align: center; justify-content: center; align-items: center;font-size: 2em;">
            Create Variable  
          </div>
          <div style="position:absolute; top:40%; width:100%; height:40%; color:var(--EditorTheme_Text_1);">
            <p class="noSelect" style="position:absolute;left:50%;top:75%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Variable Type</p>
            <!--Variable Types-->
            <div style="overflow-x:scroll; overflow-y:hidden; position:absolute; width:100%; height: 75%;text-align: center;">
              <!--Float-->
              <div id="float" style="position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6;justify-content: center;">
                <div style="background-color:#ff8c1a; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Float</p>
              </div>
              <!--Int-->
              <div id="int" style="left:25%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#ffde00;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Int</p>
              </div>
              <!--Vec 2-->
              <div id="vec2" style="left:50%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#5AB897;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 2</p>
              </div>
              <!--Vec 3-->
              <div id="vec3" style="left:75%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#5BB4B7;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 3</p>
              </div>
              <!--Vec 4-->
              <div id="vec4" style="left:100%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#59BC77;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1em; width:50%; height:50%;">Vector 4</p>
              </div>
              <!--Texture-->
              <div id="texture" style="left:125%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#b464e7;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Texture</p>
              </div>
              <!--Cubemap-->
              <div id="cubemap" style="left:150%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#8672ff;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Cubemap</p>
              </div>
              <!--Matrix-->
              <div id="matrix" style="left:175%; position:absolute;background-color: var(--EditorTheme_Theme_3);border-radius:1em;width:auto;height:100%;aspect-ratio:7/6; justify-content: center;">
                <div style="background-color:#737fff;position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:100%; aspect-ratio:1; width:auto; height:50%;">
                </div>

                <p class="noSelect" style="position:absolute;top:85%;left:50%;transform:translate(-50%,-50%);font-size: 1.125em; width:50%; height:50%;">Matrix</p>
              </div>
            </div>
            </div>
            <div style="top:80%;height:20%;width:100%;position:absolute;">
              <div style="display: flex;position:absolute;left:50%;width:50%;height:80%; font-size: 1.125em;  color:var(--EditorTheme_Text_1); transform: translate(-50%);">
                <div style="display: flex; width:33.3333%">
                  <input type="checkbox"></input>
                  <p style="transform:translate(0%,-1em);">Uniform</p>
                </div>
                <div style="display: flex; width:33.3333%">
                  <input type="checkbox"></input>
                  <p style="transform:translate(0%,-1em);">Vertex</p>
                </div>
                <div style="display: flex; width:33.3333%">
                  <input type="checkbox"></input>
                  <p style="transform:translate(0%,-1em);">Pixel</p>
                </div>
              </div>
              <p class="noSelect" style="position:absolute;left:50%;top:20%;Transform:Translate(-50%,-50%); color:var(--EditorTheme_Text_2);">Variable Scope</p>
              <button id="createVariable" style="position:absolute; left:95%; top:90%; transform: translate(-100%,-100%); background-color:var(--EditorTheme_Color_1); border-width: 0px; border-radius: 0.25rem; width:4em; height:3em;font-size: 1.125em; color:var(--EditorTheme_Text_1);">OK</button>
            </div>
          </div>
        </div>
      `);

      const variableTypeChangers = {
        float: document.getElementById("float"),
        int: document.getElementById("int"),
        vec2: document.getElementById("vec2"),
        vec3: document.getElementById("vec3"),
        vec4: document.getElementById("vec4"),
        texture: document.getElementById("texture"),
        cubemap: document.getElementById("cubemap"),
        matrix: document.getElementById("matrix")
      };

      let currentType = variableTypeChangers.float;

      //Short function to cycle types
      const cycleVariable = (type) => {currentType.style.backgroundColor = "var(--EditorTheme_Theme_3)";variableTypeChangers[type].style.backgroundColor = "var(--EditorTheme_Theme_4)";currentType = variableTypeChangers[type];};
      cycleVariable("float");

      variableTypeChangers.float.onclick = () => {cycleVariable("float")};
      variableTypeChangers.int.onclick = () => {cycleVariable("int")};
      variableTypeChangers.vec2.onclick = () => {cycleVariable("vec2")};
      variableTypeChangers.vec3.onclick = () => {cycleVariable("vec3")};
      variableTypeChangers.vec4.onclick = () => {cycleVariable("vec4")};
      variableTypeChangers.texture.onclick = () => {cycleVariable("texture")};
      variableTypeChangers.cubemap.onclick = () => {cycleVariable("cubemap")};
      variableTypeChangers.matrix.onclick = () => {cycleVariable("matrix")};

      const createVariableButton = document.getElementById("createVariable");
      const variableNameInput = document.getElementById("VarName");

      createVariableButton.onclick = () => {
        window.workspace.createVariable(variableNameInput.value, currentType.id);

        varModal.close();
      }
    })

    // The plugin must be initialized before it has any effect.
    const disableTopBlocksPlugin = new window.DisableTopBlocks();
    disableTopBlocksPlugin.init();
  }