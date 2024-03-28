(function() {
    penPlus.defaultShader = `//replacement shader
    //Base Variables
    attribute highp vec4 a_position;
    attribute highp vec4 a_color;
    attribute highp vec2 a_texCoord;
     
    varying highp vec4 v_color;
    varying highp vec2 v_texCoord;
    
    varying highp float v_depth;

    uniform highp float u_timer;

    uniform highp mat4 u_transform;
    
    //Pen+ Textures
    uniform mediump vec2 u_res;
    
    //Base functions
    highp float log10(highp float a) {
      return log(a)/log(10.0);
    }
    
    highp float eulernum(highp float a) {
        return 2.718 * a;
    }`

    penPlus.defaultVert = `//Vertex Shader
    void vertex() {
    gl_Position = a_position * vec4(u_transform[0][0],u_transform[0][1],1,1);
    v_color = a_color;
    }`;

    penPlus.defaultFrag = `//Fragment Shader
    void fragment() {
    gl_FragColor = v_color;
    }`;
})();