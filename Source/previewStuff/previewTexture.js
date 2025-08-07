(function () {
  penPlus.shaderParams = penPlus.shaderParams || {};
  
  penPlus.textures = {};
  penPlus.textures3d = {};
  fetch("media/Textures.json").then(request => request.json()).then(json => {
    penPlus.shaderParams.sampleTextures = json;

    //Load Textures
    const textureKeys = Object.keys(penPlus.shaderParams.sampleTextures);
    for (let keyID = 0; keyID < textureKeys.length; keyID++) {
      const textureData = penPlus.shaderParams.sampleTextures[textureKeys[keyID]];

      if (textureData.type == "texture") {
        penPlus.textures[textureData.name] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, penPlus.textures[textureData.name]);

        const image = new Image();
        image.src = textureData.src;

        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, penPlus.textures[textureData.name]);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        };
      } else {
        penPlus.textures3d[textureData.name] = gl.createTexture();
        //gl.bindTexture(gl.TEXTURE_3D, penPlus.textures3d[textureData.name]);

        const image = new Image();
        image.src = textureData.src;

        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_3D, penPlus.textures3d[textureData.name]);
          gl.texImage3D(gl.TEXTURE_3D, 0, gl.RGBA, ...textureData.dimensions, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);

          gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        };
      }
    }
  });
})();
