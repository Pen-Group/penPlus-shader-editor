//Isolating render preview variables and code just so we don't accidentally overrite them!
function previewRender() {
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  let previewData_Pen = [
    //X    Y   Z    w    R    G    B    transparency U    V
    -0.5, 0.5, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, -0.5, -0.5, 0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 0.0, 0.5, -0.5, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
  ];

  //our buffer we will be pumping 90% of default data through.
  const buffer_Pen = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer_Pen);
  gl.bufferData(gl.ARRAY_BUFFER, previewData_Pen, gl.STATIC_DRAW);

  penPlus.textures = {};
  penPlus.cubemaps = {};

  const powerOfTwo = (x) => {
    console.log((Math.log(x)/Math.log(2)) % 1 === 0)
    return (Math.log(x)/Math.log(2)) % 1 === 0;
  }

  //Load Textures
  const textureKeys = Object.keys(penPlus.shaderParams.sampleTextures);
  for (let keyID = 0; keyID < textureKeys.length; keyID++) {
    const textureData = penPlus.shaderParams.sampleTextures[textureKeys[keyID]];

    penPlus.textures[textureData.name] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, penPlus.textures[textureData.name]);

    const image = new Image();
    image.src = textureData.DATA;

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, penPlus.textures[textureData.name]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      if ((!powerOfTwo(image.width)) || (!powerOfTwo(image.height))) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
    };
  }

  //Load Cubemaps
  const cubemapKeys = Object.keys(penPlus.shaderParams.sampleCubemaps);
  for (let keyID = 0; keyID < cubemapKeys.length; keyID++) {
    const textureData = penPlus.shaderParams.sampleCubemaps[cubemapKeys[keyID]];

    penPlus.cubemaps[textureData.name] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, penPlus.cubemaps[textureData.name]);

    for (let faceID = 0; faceID < 6; faceID++) {
      const side = penPlus.cubemapFaceOrder[faceID];
      const URI = textureData.DATA[faceID];

      const image = new Image();
      image.src = URI;

      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, penPlus.cubemaps[textureData.name]);
        gl.texImage2D(gl[side], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.texParameteri(
          gl.TEXTURE_CUBE_MAP,
          gl.TEXTURE_MIN_FILTER,
          gl.NEAREST
        );
        gl.texParameteri(
          gl.TEXTURE_CUBE_MAP,
          gl.TEXTURE_MAG_FILTER,
          gl.NEAREST
        );
      };
    }
  }

  penPlus.timer = 0;

  let lastTime = Date.now();
  let now = Date.now();

  penPlus.refreshMesh = () => {
    let attributes = {}
    switch (penPlus.previewMode) {
      case "fullscreen":
        attributes = [{},{}]
        Object.keys(penPlus.attributeSetters[0]).forEach(element => {
          attributes[0][element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[1],penPlus.attributeSetters[2]]
          attributes[1][element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[2],penPlus.attributeSetters[3]]
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
        attributes = [{},{},{},{}]
        Object.keys(penPlus.attributeSetters[0]).forEach(element => {
          attributes[0][element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[1],penPlus.attributeSetters[2]]
          attributes[1][element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[2],penPlus.attributeSetters[3]]
          attributes[2][element] = [penPlus.attributeSetters[4],penPlus.attributeSetters[5],penPlus.attributeSetters[6]]
          attributes[3][element] = [penPlus.attributeSetters[4],penPlus.attributeSetters[6],penPlus.attributeSetters[7]]
        });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader
              //Front
              .makeTriangle(Object.assign({
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
              },attributes[0]))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[1]))
              )
              //Back
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({a_position: [
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
              },attributes[2])))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[3]))
              )
              //Left
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({a_position: [
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
              },attributes[0])))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[1]))
              )
              //right
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({a_position: [
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
              },attributes[2])))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[3]))
              )
              //top
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({a_position: [
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
              },attributes[0])))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[1]))
              )
              //top
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({a_position: [
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
              },attributes[2])))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[3]))
              )
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 36;
        break;

      case "square":
        attributes = [{},{}]
        Object.keys(penPlus.attributeSetters[0]).forEach(element => {
          attributes[0][element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[1],penPlus.attributeSetters[2]]
          attributes[1][element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[2],penPlus.attributeSetters[3]]
        });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader
              .makeTriangle(Object.assign({
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
              },attributes[0]))
              .concat(
                gl.shaders.editorShader.makeTriangle(Object.assign({
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
                },attributes[1]))
              )
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 6;
        break;

      default:
        Object.keys(penPlus.attributeSetters[0]).forEach(element => {
          attributes[element] = [penPlus.attributeSetters[0],penPlus.attributeSetters[1],penPlus.attributeSetters[2]]
        });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(
            gl.shaders.editorShader.makeTriangle(Object.assign({
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
            },attributes))
          ),
          gl.STATIC_DRAW
        );

        penPlus.meshPoints = 3;
        break;
    }
  }

  function renderFrame() {
    now = Date.now();
    if (gl && gl.shaders && gl.shaders["editorShader"]) {
      penPlus.timer += (now - lastTime) / 1000;
      document.body.style.setProperty("--U_TIMER", penPlus.timer + "px");

      gl.canvas.width = gl.canvas.clientWidth;
      gl.canvas.height = gl.canvas.clientHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.useProgram(gl.shaders["editorShader"]);

      if (
        gl.shaders.editorShader.uniforms.u_timer &&
        gl.shaders.editorShader.uniforms.u_timer.location
      ) {
        gl.shaders.editorShader.uniforms.u_timer.value = penPlus.timer;
      }

      if (
        gl.shaders.editorShader.uniforms.u_res &&
        gl.shaders.editorShader.uniforms.u_res.location
      ) {
        gl.shaders.editorShader.uniforms.u_res.value = [
          gl.canvas.width,
          gl.canvas.height,
        ];
      }

      if (
        gl.shaders.editorShader.uniforms.u_transform &&
        gl.shaders.editorShader.uniforms.u_transform.location
      ) {
        gl.shaders.editorShader.uniforms.u_transform.value = [
          1,1,0,0,
          0,1,0,0,
          0,0,0,0,
          0,0,0,0
        ];
      }

      gl.drawArrays(gl.TRIANGLES, 0, penPlus.meshPoints);
    }
    lastTime = now;
    window.requestAnimationFrame(renderFrame);
  }

  window.requestAnimationFrame(renderFrame);
}
