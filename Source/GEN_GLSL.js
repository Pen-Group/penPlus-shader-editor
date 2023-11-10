let functionsThatExist = {
    vert: false,
    frag: false,
}

window.Generated_GLSL = `//Base Variables
attribute highp vec4 a_position;
attribute highp vec4 a_color;
attribute highp vec2 a_texCoord;
 
varying highp vec4 v_color;
varying highp vec2 v_texCoord;

varying highp float v_depth;

//Pen+ Textures
uniform sampler2D u_texture;
uniform mediump vec2 u_res;
uniform sampler2D u_depthTexture;

//Base functions
highp float log10(highp float a) {
  return log(a)/log(10.0);
}

highp float eulernum(highp float a) {
    return 2.718 * a;
}

//Vertex Shader
void vertex() {
gl_Position = a_position;
}
//Fragment Shader
void fragment() {
gl_FragColor = v_color;
}
`;

function nextBlockToCode(block, generator) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    let appended = ''
    if (nextBlock) {
        return '\n' + GLSL_GEN.blockToCode(nextBlock);
    }
    return ''
}

function createGLSLGen() {
    window.GLSL_GEN = new Blockly.Generator('GLSL');
    const GLSL_GEN = window.GLSL_GEN;

    const Order = {
        ATOMIC: 0,
    }

    

    GLSL_GEN.forBlock['number_reporter'] = function (block, generator) {
        const numba = block.getFieldValue("NUMBER");
        return [`${numba}`, Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_add'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} + ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_sub'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} - ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_mul'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} * ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_div'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} / ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_pow'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`pow(${A}, ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_equalTo'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} == ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_notequalTo'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} != ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_lessThan'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} < ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_lessThanEqual'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} <= ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_moreThan'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} > ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_moreThanEqual'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} >= ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_and'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} && ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_or'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`(${A} || ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_not'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        return [`!(${A})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_true'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`true` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_false'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`false` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['operator_mod'] = function (block, generator) {
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        const B = generator.valueToCode(block, 'B', Order.ATOMIC);
        return [`mod(float(${A}),float(${B}))` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['operator_arith'] = function (block, generator) {
        const arith = block.getFieldValue('arithmatic');
        const A = generator.valueToCode(block, 'A', Order.ATOMIC);
        return [`${arith}(float(${A}))` + nextBlockToCode(block, generator), Order.ATOMIC];
    };

    GLSL_GEN.forBlock['color_reporter'] = function (block, generator) {
        const colour = block.getFieldValue("COLOUR");
        let converted = hexToRgb(colour);
        converted.r /= 255;
        converted.g /= 255;
        converted.b /= 255;
        return [`vec4(${converted.r},${converted.g},${converted.b},1.0)`, Order.ATOMIC];
    };
}

function updateGLSL(event) {
    if (window.workspace.isDragging()) return; // Don't update while changes are happening.
    if (!window.supportedEvents.has(event.type)) return;

    window.Generated_GLSL = `//Base Variables
attribute highp vec4 a_position;
attribute highp vec4 a_color;
attribute highp vec2 a_texCoord;
 
varying highp vec4 v_color;
varying highp vec2 v_texCoord;

varying highp float v_depth;

//Pen+ Textures
uniform sampler2D u_texture;
uniform mediump vec2 u_res;
uniform sampler2D u_depthTexture;

//Base functions
highp float log10(highp float a) {
  return log(a)/log(10.0);
}

highp float eulernum(highp float a) {
    return 2.718 * a;
}
`;

    window.Generated_GLSL += window.GLSL_GEN.workspaceToCode(window.workspace);

    window.Generated_Frag = "";
    window.Generated_Vert = "";

    window.loopID = 0;

    if (!(window.Generated_GLSL.includes("//Fragment Shader") && window.Generated_GLSL.includes("//Vertex Shader"))) {
        if ((!window.Generated_GLSL.includes("//Vertex Shader")) && window.Generated_GLSL.includes("//Fragment Shader")) {
            shaderLog("Missing Vertex Shader creating manual replacement");
            window.Generated_GLSL += `//Vertex Shader
void vertex() {
gl_Position = a_position;
}`;
        }
        else if ((!window.Generated_GLSL.includes("//Fragment Shader")) && window.Generated_GLSL.includes("//Vertex Shader")) {
            shaderLog("Missing Pixel/Fragment Shader creating manual replacement");
            window.Generated_GLSL += `//Fragment Shader
void fragment() {
gl_FragColor = v_color;
}`;
        }
        else {
            shaderLog("Missing both shaders using generic set");
            window.Generated_GLSL += `//Vertex Shader t
void vertex() {
gl_Position = a_position;
}`;
            window.Generated_GLSL += `\n//Fragment Shader
void fragment() {
gl_FragColor = v_color;
}`;
        }
    }

    document.getElementById("myBlocklyCodeOutput").value = window.Generated_GLSL;

    genProgram();
}
