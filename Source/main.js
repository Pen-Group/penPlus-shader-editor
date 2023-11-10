function onAllAddonsLoaded() {
    window.toolbox = {
      kind: "categoryToolbox",
      contents: [
      ]
    }

    
    addImportantReporters();
    workspace = Blockly.inject("BlocklyDiv", {
      toolbox: window.toolbox,
      collapse: false,
      comments: true,
      renderer: "zelos",
      grid:
         {
          spacing: 40,
          length: 3,
          colour: '#484848',
          snap: false
        },
      zoom:{
          controls: true,
          wheel: false,
          startScale: 0.8,
          maxScale: 1.5,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
      },
      move:{
        scrollbars: {
          horizontal: true,
          vertical: true
        },
        drag: true,
        wheel: true
      },
      trashcan: true,
      plugins: {
        toolbox: window.ContinuousToolbox,
        flyoutsVerticalToolbox: window.ContinuousFlyout,
        metricsManager: window.ContinuousMetrics,
      },
      theme: penPlusBlocklyTheme(),
    });
    window.workspace = workspace;
    
    createGLSLGen();
    addVariableTypes();
    addBlocks();

    /*window.toolbox = {
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
    };*/

    const zoomToFit = new ZoomToFitControl(workspace);
    zoomToFit.init();

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
      
    })

    // The plugin must be initialized before it has any effect.
    const disableTopBlocksPlugin = new window.DisableTopBlocks();
    disableTopBlocksPlugin.init();
  }
