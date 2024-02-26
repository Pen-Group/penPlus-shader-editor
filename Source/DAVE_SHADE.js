(function(){
  window.webGLShaderManager = {}

  window.webGLShaderManager.createAndCompile = (GL, name, vert, frag, onError) => {

    onError = onError || function(error) {
      console.error(error);
    };

    //? compile vertex Shader
    const vertShader = GL.createShader(GL.VERTEX_SHADER);
    try {
      GL.shaderSource(vertShader, vert.trim());
      GL.compileShader(vertShader);
      if (!GL.getShaderParameter(vertShader, GL.COMPILE_STATUS)) {
        throw GL.getShaderInfoLog(vertShader);
      }
    } catch (error) {
      onError(error);
      return;
    }

    //? compile fragment Shader
    const fragShader = GL.createShader(GL.FRAGMENT_SHADER);
    try {
      GL.shaderSource(fragShader, frag.trim());
      GL.compileShader(fragShader);
      if (!GL.getShaderParameter(fragShader, GL.COMPILE_STATUS)) {
        throw GL.getShaderInfoLog(fragShader);
      }
    } catch (error) {
      onError(error);
      return;
    }

    //? compile program
    const program = GL.createProgram();
    try {
      GL.attachShader(program, vertShader);
      GL.attachShader(program, fragShader);
      GL.linkProgram(program);
      if (!GL.getProgramParameter(program, GL.LINK_STATUS)) {
        throw GL.getProgramInfoLog(program);
      }

      GL.validateProgram(program);
      if (!GL.getProgramParameter(program, GL.VALIDATE_STATUS)) {
        throw GL.getProgramInfoLog(program);
      }
    } catch (error) {
      onError(error);
      return;
    }

    GL.shaders = GL.shaders || {};

    //If we already have a shader delete it to hopefully save memory.
    if (GL.shaders[name]) {
      gl.deleteProgram(GL.shaders[name]);
      gl.deleteShader(GL.shaders[name].vertexShader);
      gl.deleteShader(GL.shaders[name].fragmentShader);
    }

    GL.shaders[name] = program;
    GL.shaders[name].vertexShader = vertShader;
    GL.shaders[name].fragmentShader = vertShader;

    //setupUniform

    GL.shaders[name].uniforms = {};
    GL.shaders[name].attributes = {};
    GL.shaders[name].attributeOrder = [];
    GL.shaders[name].textureID = 0;
    GL.shaders[name].currentByte = 0;
    GL.shaders[name].customTypes = {};

    GL.shaders[name].setupStruct = (structName,data) => {
      GL.shaders[name].customTypes[structName] = data;
    }

    GL.shaders[name].setupUniform = (uniformName,uniformType,returnObject) => {
      GL.useProgram(program);
      if (GL.shaders[name].customTypes[uniformType]) {
        GL.shaders[name].uniforms[uniformName] = {}

        const typeDEF = GL.shaders[name].customTypes[uniformType];
        const typeKEYS = Object.keys(typeDEF);
        typeKEYS.forEach(KEY => {
          GL.shaders[name].uniforms[uniformName][KEY] = GL.shaders[name].setupUniform(`${uniformName}.${KEY}`,typeDEF[KEY],true);
        });

        if (returnObject) return GL.shaders[name].uniforms[uniformName];
        return;
      }
      GL.shaders[name].uniforms[uniformName] = {
        set value(val) {
          GL.useProgram(program);
          switch (GL.shaders[name].uniforms[uniformName].type) {
            case "float" || "double":
              GL.uniform1f(GL.shaders[name].uniforms[uniformName].location,val);
              break;
  
            case "int":
              GL.uniform1i(GL.shaders[name].uniforms[uniformName].location,Math.floor(val));
              break;
  
            case "uint":
              GL.uniform1u(GL.shaders[name].uniforms[uniformName].location,Math.floor(val));
              break;
  
            case "vec2":
              GL.uniform2fv(GL.shaders[name].uniforms[uniformName].location,new Float32Array(val));
              break;
  
            case "vec3":
              GL.uniform3fv(GL.shaders[name].uniforms[uniformName].location,new Float32Array(val));
              break;
  
            case "vec4":
              GL.uniform4fv(GL.shaders[name].uniforms[uniformName].location,new Float32Array(val));
              break;
  
            
  
            case "mat2":
              GL.uniformMatrix2fv(GL.shaders[name].uniforms[uniformName].location,false,new Float32Array(val));
              break;
    
            case "mat3":
              GL.uniformMatrix3fv(GL.shaders[name].uniforms[uniformName].location,false,new Float32Array(val));
              break;
    
            case "mat4":
              GL.uniformMatrix4fv(GL.shaders[name].uniforms[uniformName].location,false,new Float32Array(val));
              break;
          
            default:
              if (!val) return;
              GL.activeTexture(GL[`TEXTURE${GL.shaders[name].uniforms[uniformName].textureID}`]);
              GL.bindTexture(GL.TEXTURE_2D, val);
              GL.uniform1i(GL.shaders[name].uniforms[uniformName].location, GL[`TEXTURE${GL.shaders[name].uniforms[uniformName].textureID}`]);
              break;
          }

          GL.shaders[name].uniforms[uniformName].current = val;

          return val
        }
      };

      GL.shaders[name].uniforms[uniformName].location = GL.getUniformLocation(program,uniformName);

      //if (GL.shaders[name].uniforms[uniformName].location) return;

      GL.shaders[name].uniforms[uniformName].type = uniformType;
      switch (uniformType) {
        case "float" || "int" || "uint" || "double":
          GL.shaders[name].uniforms[uniformName].value = 1.0;
          break;

        case "mat2":
          GL.shaders[name].uniforms[uniformName].value = [
            1.0,0.0,
            0.0,1.0
          ];
          break;

        case "mat3":
          GL.shaders[name].uniforms[uniformName].value = [
            1.0,0.0,0.0,
            0.0,1.0,0.0,
            0.0,0.0,1.0
          ];
          break;

        case "mat4":
          GL.shaders[name].uniforms[uniformName].value = [
            1.0,0.0,0.0,0.0,
            0.0,1.0,0.0,0.0,
            0.0,0.0,1.0,0.0,
            0.0,0.0,0.0,1.0
          ];
          break;

        case "vec2":
          GL.shaders[name].uniforms[uniformName].value = [0.0,0.0];
          break;
  
        case "vec3":
          GL.shaders[name].uniforms[uniformName].value = [0.0,0.0,0.0];
          break;
  
        case "vec4":
          GL.shaders[name].uniforms[uniformName].value = [0.0,0.0,0.0,0.0];
          break;

        case "sampler2D":
          GL.shaders[name].uniforms[uniformName].textureID = Number(GL.shaders[name].textureID);
          GL.shaders[name].textureID += 1;
        
        default:
          GL.shaders[name].uniforms[uniformName].value = 0.0;
          break;
      }
      if (returnObject) return GL.shaders[name].uniforms[uniformName];
      console.log(`Uniform ${uniformName} set up as type ${uniformType}`);
    }

    GL.shaders[name].setupUniformArray = (uniformName,uniformType,size) => {
      GL.useProgram(program);

      GL.shaders[name].uniforms[uniformName] = {
        maxLength:size,
        elements:[],
        type:uniformType
      };

      for (let x = 0; x < size; x++) {
        GL.shaders[name].uniforms[uniformName].elements.push(GL.shaders[name].setupUniform(`${uniformName}[${x}]`,uniformType,true));
      }

      console.log(`Uniform array ${uniformName} set up as type ${uniformType} with a length of ${size}`);
    }

    GL.shaders[name].updateAttributeStride = () => {
      GL.shaders[name].attributeOrder.forEach(attributeName => {
        GL.vertexAttribPointer(
          GL.shaders[name].attributes[attributeName].location,
          GL.shaders[name].attributes[attributeName].vectorSize,
          GL.FLOAT,
          GL.shaders[name].attributes[attributeName].normalized,
          GL.shaders[name].currentByte,
          GL.shaders[name].attributes[attributeName].offset
        );
        console.log(`shader ${attributeName} at offset ${GL.shaders[name].attributes[attributeName].offset}`);
      });
      console.log(`Shader stride is now ${GL.shaders[name].currentByte}`);
    }

    //Only supports floats and its derivitives.
    GL.shaders[name].setupAttribute = (attributeName, attributeType,normalized) => {
      normalized = normalized || false;

      let attributeLength = 1;
      GL.shaders[name].attributes[attributeName] = {}
      GL.shaders[name].attributes[attributeName].location = GL.getAttribLocation(program,attributeName);

      if (GL.shaders[name].attributes[attributeName].location === undefined) return;
      
      switch (attributeType) {
        case "float" || "double":
          break;

        case "vec2":
          attributeLength = 2;
          break;

        case "vec3":
          attributeLength = 3;
          break;

        case "vec4":
          attributeLength = 4;
          break;
      
        default:
          break;
      }

      GL.shaders[name].attributes[attributeName].offset = GL.shaders[name].currentByte;
      GL.shaders[name].attributes[attributeName].normalized = normalized;
      GL.shaders[name].attributes[attributeName].vectorSize = attributeLength;

      console.log(`Attribute ${attributeName} set up as type ${attributeType} at byte ${GL.shaders[name].currentByte}`);

      GL.shaders[name].currentByte += Float32Array.BYTES_PER_ELEMENT * attributeLength;

      GL.shaders[name].attributeOrder.push(attributeName);

      GL.enableVertexAttribArray(GL.shaders[name].attributes[attributeName].location);

      GL.shaders[name].updateAttributeStride();

    }

    GL.shaders[name].makeTriangle = (triangleDat) => {
      let returnedDat = [];
      for (let point = 0; point < 3; point++) {
        GL.shaders[name].attributeOrder.forEach(item => {
          returnedDat.push(triangleDat[item][point]);
        })
      }

      return returnedDat.flat(4);
    }

    return program;
  }
})();