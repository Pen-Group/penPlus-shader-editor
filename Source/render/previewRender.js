//Isolating render preview variables and code just so we don't accidentally overrite them!
function previewRender() {
  penPlus.overrideSize = {
    width:null,
    height:null
  };
  
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  let previewData_Pen = [
    //X    Y   Z    w    R    G    B    transparency U    V
    -0.5, 0.5, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, -0.5, -0.5, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.5, -0.5, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
  ];

  //our buffer we will be pumping 90% of default data through.
  const buffer_Pen = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer_Pen);
  gl.bufferData(gl.ARRAY_BUFFER, previewData_Pen, gl.STATIC_DRAW);

  penPlus.timer = 0;

  let lastTime = Date.now();
  let now = Date.now();

  penPlus.refreshMesh = () => {
    let attributes = {};
    switch (penPlus.previewMode) {
      case "fullscreen":
        attributes = [{}, {}];
        Object.keys(penPlus.attributeSetters[0]).forEach((element) => {
          attributes[0][element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[1], penPlus.attributeSetters[2]];
          attributes[1][element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[2], penPlus.attributeSetters[3]];
        });

        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader
              .makeTriangle({
                a_position: [
                  [-1, -1, 0, 1],
                  [1, -1, 0, 1],
                  [1, 1, 0, 1],
                ],
                a_color: [
                  [1.0, 1.0, 1.0, 1.0],
                  [1.0, 1.0, 1.0, 1.0],
                  [1.0, 1.0, 1.0, 1.0],
                ],
                a_texCoord: [
                  [0, 0],
                  [1, 0],
                  [1, 1],
                ],
              })
              .concat(
                gl.shaders.editorShader.makeTriangle({
                  a_position: [
                    [-1, -1, 0, 1],
                    [1, 1, 0, 1],
                    [-1, 1, 0, 1],
                  ],
                  a_color: [
                    [1.0, 1.0, 1.0, 1.0],
                    [1.0, 1.0, 1.0, 1.0],
                    [1.0, 1.0, 1.0, 1.0],
                  ],
                  a_texCoord: [
                    [0, 0],
                    [1, 1],
                    [0, 1],
                  ],
                })
              )
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 6;
        break;

      case "cube":
        //I cannot think of how to do this lol
        attributes = [{}, {}, {}, {}];
        Object.keys(penPlus.attributeSetters[0]).forEach((element) => {
          attributes[0][element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[1], penPlus.attributeSetters[2]];
          attributes[1][element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[2], penPlus.attributeSetters[3]];
          attributes[2][element] = [penPlus.attributeSetters[4], penPlus.attributeSetters[5], penPlus.attributeSetters[6]];
          attributes[3][element] = [penPlus.attributeSetters[4], penPlus.attributeSetters[6], penPlus.attributeSetters[7]];
        });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader
              //Front
              .makeTriangle(
                Object.assign(
                  {
                    a_position: [
                      [-0.5, -0.5, 0, 1],
                      [0.5, -0.5, 0, 1],
                      [0.5, 0.5, 0, 1],
                    ],
                    a_color: [
                      [1.0, 1.0, 1.0, 1.0],
                      [1.0, 1.0, 1.0, 1.0],
                      [1.0, 1.0, 1.0, 1.0],
                    ],
                    a_texCoord: [
                      [0, 0],
                      [1, 0],
                      [1, 1],
                    ],
                  },
                  attributes[0]
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 1],
                        [0.5, 0.5, 0, 1],
                        [-0.5, 0.5, 0, 1],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [0, 0],
                        [1, 1],
                        [0, 1],
                      ],
                    },
                    attributes[1]
                  )
                )
              )
              //Back
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 2],
                        [0.5, -0.5, 0, 2],
                        [0.5, 0.5, 0, 2],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [1, 0],
                        [0, 0],
                        [0, 1],
                      ],
                    },
                    attributes[2]
                  )
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 2],
                        [0.5, 0.5, 0, 2],
                        [-0.5, 0.5, 0, 2],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [1, 0],
                        [0, 1],
                        [1, 1],
                      ],
                    },
                    attributes[3]
                  )
                )
              )
              //Left
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 2],
                        [-0.5, -0.5, 0, 1],
                        [-0.5, 0.5, 0, 1],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [1, 0],
                        [0, 0],
                        [0, 1],
                      ],
                    },
                    attributes[0]
                  )
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 2],
                        [-0.5, 0.5, 0, 1],
                        [-0.5, 0.5, 0, 2],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [1, 0],
                        [0, 1],
                        [1, 1],
                      ],
                    },
                    attributes[1]
                  )
                )
              )
              //right
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [0.5, -0.5, 0, 2],
                        [0.5, -0.5, 0, 1],
                        [0.5, 0.5, 0, 1],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [0, 0],
                        [1, 0],
                        [1, 1],
                      ],
                    },
                    attributes[2]
                  )
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [0.5, -0.5, 0, 2],
                        [0.5, 0.5, 0, 1],
                        [0.5, 0.5, 0, 2],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [0, 0],
                        [1, 1],
                        [0, 1],
                      ],
                    },
                    attributes[3]
                  )
                )
              )
              //top
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, 0.5, 0, 2],
                        [-0.5, 0.5, 0, 1],
                        [0.5, 0.5, 0, 1],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [0, 0],
                        [1, 0],
                        [1, 1],
                      ],
                    },
                    attributes[0]
                  )
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, 0.5, 0, 2],
                        [0.5, 0.5, 0, 1],
                        [0.5, 0.5, 0, 2],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [0, 0],
                        [1, 1],
                        [0, 1],
                      ],
                    },
                    attributes[1]
                  )
                )
              )
              //top
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 2],
                        [-0.5, -0.5, 0, 1],
                        [0.5, -0.5, 0, 1],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [1, 0],
                        [0, 0],
                        [0, 1],
                      ],
                    },
                    attributes[2]
                  )
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 2],
                        [0.5, -0.5, 0, 1],
                        [0.5, -0.5, 0, 2],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [1, 0],
                        [0, 1],
                        [1, 1],
                      ],
                    },
                    attributes[3]
                  )
                )
              )
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 36;
        break;

      case "square":
        attributes = [{}, {}];
        Object.keys(penPlus.attributeSetters[0]).forEach((element) => {
          attributes[0][element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[1], penPlus.attributeSetters[2]];
          attributes[1][element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[2], penPlus.attributeSetters[3]];
        });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader
              .makeTriangle(
                Object.assign(
                  {
                    a_position: [
                      [-0.5, -0.5, 0, 1],
                      [0.5, -0.5, 0, 1],
                      [0.5, 0.5, 0, 1],
                    ],
                    a_color: [
                      [1.0, 1.0, 1.0, 1.0],
                      [1.0, 1.0, 1.0, 1.0],
                      [1.0, 1.0, 1.0, 1.0],
                    ],
                    a_texCoord: [
                      [0, 0],
                      [1, 0],
                      [1, 1],
                    ],
                  },
                  attributes[0]
                )
              )
              .concat(
                gl.shaders.editorShader.makeTriangle(
                  Object.assign(
                    {
                      a_position: [
                        [-0.5, -0.5, 0, 1],
                        [0.5, 0.5, 0, 1],
                        [-0.5, 0.5, 0, 1],
                      ],
                      a_color: [
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                        [1.0, 1.0, 1.0, 1.0],
                      ],
                      a_texCoord: [
                        [0, 0],
                        [1, 1],
                        [0, 1],
                      ],
                    },
                    attributes[1]
                  )
                )
              )
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 6;
        break;

      default:
        Object.keys(penPlus.attributeSetters[0]).forEach((element) => {
          attributes[element] = [penPlus.attributeSetters[0], penPlus.attributeSetters[1], penPlus.attributeSetters[2]];
        });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader.makeTriangle(
              Object.assign(
                {
                  a_position: [
                    [-0.5, -0.5, 0, 1],
                    [0.5, -0.5, 0, 1],
                    [0.5, 0.5, 0, 1],
                  ],
                  a_color: [
                    [1.0, 1.0, 1.0, 1.0],
                    [1.0, 1.0, 1.0, 1.0],
                    [1.0, 1.0, 1.0, 1.0],
                  ],
                  a_texCoord: [
                    [0, 0],
                    [1, 0],
                    [1, 1],
                  ],
                },
                attributes
              )
            )
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 3;
        break;
    }
  };

  function renderFrame() {
    now = Date.now();
    if (gl && gl.shaders && gl.shaders["editorShader"]) {
      gl.clear(gl.COLOR_BUFFER_BIT );
      penPlus.timer += (now - lastTime) / 1000;
      document.body.style.setProperty("--U_TIMER", penPlus.timer + "px");
      document.body.style.setProperty("--U_TIMER_SIN", Math.sin(penPlus.timer * 0.5) + "px");

      gl.canvas.width = penPlus.overrideSize.width || gl.canvas.clientWidth;
      gl.canvas.height = penPlus.overrideSize.height || gl.canvas.clientHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.useProgram(gl.shaders["editorShader"]);

      if (gl.shaders.editorShader.uniforms.u_timer && gl.shaders.editorShader.uniforms.u_timer.location) {
        gl.shaders.editorShader.uniforms.u_timer.value = penPlus.timer;
      }

      if (gl.shaders.editorShader.uniforms.u_res && gl.shaders.editorShader.uniforms.u_res.location) {
        gl.shaders.editorShader.uniforms.u_res.value = [gl.canvas.width, gl.canvas.height];
      }

      if (gl.shaders.editorShader.uniforms.u_transform && gl.shaders.editorShader.uniforms.u_transform.location) {
        gl.shaders.editorShader.uniforms.u_transform.value = [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      gl.drawArrays(gl.TRIANGLES, 0, penPlus.meshPoints);
    }
    lastTime = now;
    window.requestAnimationFrame(renderFrame);
  }

  window.requestAnimationFrame(renderFrame);
}
