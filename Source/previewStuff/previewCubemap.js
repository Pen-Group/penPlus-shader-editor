(function () {
  penPlus.cubemapFaceOrder = ["TEXTURE_CUBE_MAP_NEGATIVE_X", "TEXTURE_CUBE_MAP_POSITIVE_X", "TEXTURE_CUBE_MAP_NEGATIVE_Y", "TEXTURE_CUBE_MAP_POSITIVE_Y", "TEXTURE_CUBE_MAP_NEGATIVE_Z", "TEXTURE_CUBE_MAP_POSITIVE_Z"];

  penPlus.shaderParams = penPlus.shaderParams || {};
  penPlus.cubemaps = {};
  
  fetch("media/Cubemaps.json").then(request => request.json()).then(json => {
    penPlus.shaderParams.sampleCubemaps = json;

    //Load Cubemaps
    const cubemapKeys = Object.keys(penPlus.shaderParams.sampleCubemaps);
    for (let keyID = 0; keyID < cubemapKeys.length; keyID++) {
      const textureData = penPlus.shaderParams.sampleCubemaps[cubemapKeys[keyID]];

      penPlus.cubemaps[textureData.name] = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, penPlus.cubemaps[textureData.name]);

      for (let faceID = 0; faceID < 6; faceID++) {
        const side = penPlus.cubemapFaceOrder[faceID];
        const URI = textureData.faces[faceID];

        const image = new Image();
        image.src = URI;

        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, penPlus.cubemaps[textureData.name]);
          gl.texImage2D(gl[side], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        };
      }
    }
  });
})();
