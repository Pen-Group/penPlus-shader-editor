let loopID = 0;
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

function createGLSLGen() {
    window.GLSL_GEN = new Blockly.Generator('GLSL');
    const GLSL_GEN = window.GLSL_GEN;

    const Order = {
        ATOMIC: 0,
    }

    function nextBlockToCode(block, generator) {
        const nextBlock =
            block.nextConnection && block.nextConnection.targetBlock();
        let appended = ''
        if (nextBlock) {
            return '\n' + GLSL_GEN.blockToCode(nextBlock);
        }
        return ''
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

    GLSL_GEN.forBlock['pixel_pixcolour'] = function (block, generator) {
        return [`gl_FragColor`, Order.ATOMIC];
    };

    GLSL_GEN.forBlock['pixel_vertcolour'] = function (block, generator) {
        return [`v_color`, Order.ATOMIC];
    };

    GLSL_GEN.forBlock['pixel_color'] = function (block, generator) {
        const colour = generator.valueToCode(block, 'COLOR', Order.ATOMIC);
        return `gl_FragColor = ${colour};` + nextBlockToCode(block, generator);
    };

    GLSL_GEN.forBlock['pixel_vertColor'] = function (block, generator) {
        const colour = generator.valueToCode(block, 'COLOR', Order.ATOMIC);
        return `v_color = ${colour};` + nextBlockToCode(block, generator);
    };

    GLSL_GEN.forBlock['pixel_X'] = function (block, generator) {
        return [`gl_FragCoord.x`, Order.ATOMIC];
    }

    GLSL_GEN.forBlock['pixel_Y'] = function (block, generator) {
        return [`gl_FragCoord.y`, Order.ATOMIC];
    }

    GLSL_GEN.forBlock['vertex_gotoPos'] = function (block, generator) {
        const X = generator.valueToCode(block, 'X', Order.ATOMIC);
        const Y = generator.valueToCode(block, 'Y', Order.ATOMIC);
        return `gl_Position.xy = vec2(float(${X}),float(${Y}));` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_setZ'] = function (block, generator) {
        const Z = generator.valueToCode(block, 'Z', Order.ATOMIC);
        return `gl_Position.z = float(${Z});` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_setW'] = function (block, generator) {
        const W = generator.valueToCode(block, 'W', Order.ATOMIC);
        return `gl_Position.w = float(${W});` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_changeX'] = function (block, generator) {
        const X = generator.valueToCode(block, 'X', Order.ATOMIC);
        return `gl_Position.x += float(${X});` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_changeY'] = function (block, generator) {
        const Y = generator.valueToCode(block, 'Y', Order.ATOMIC);
        return `gl_Position.y += float(${Y});` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_changeZ'] = function (block, generator) {
        const Z = generator.valueToCode(block, 'Z', Order.ATOMIC);
        return `gl_Position.z += float(${Z});` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_changeW'] = function (block, generator) {
        const W = generator.valueToCode(block, 'W', Order.ATOMIC);
        return `gl_Position.w += float(${W});` + nextBlockToCode(block, generator);
    }

    GLSL_GEN.forBlock['vertex_getX'] = function (block, generator) {
        return [`gl_Position.x` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['vertex_getY'] = function (block, generator) {
        return [`gl_Position.y` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['vertex_getZ'] = function (block, generator) {
        return [`gl_Position.z` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['vertex_getW'] = function (block, generator) {
        return [`gl_Position.w` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    GLSL_GEN.forBlock['control_if'] = function (block, generator) {
        const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
        const trueExec = generator.statementToCode(block, "true");
        return `if (${condition}) {\n${trueExec}\n}`;
    }

    GLSL_GEN.forBlock['control_ifelse'] = function (block, generator) {
        const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
        const trueExec = generator.statementToCode(block, "true");
        const falseExec = generator.statementToCode(block, "false");
        return `if (${condition}) {\n${trueExec}\n}\nelse{\n${falseExec}\n}`;
    }

    GLSL_GEN.forBlock['control_repeat'] = function (block, generator) {
        const times = generator.valueToCode(block, "times", Order.ATOMIC);
        const code = generator.statementToCode(block, "code");
        loopID += 1;
        return `for (int penPlusLoop_${loopID}=0;penPlusLoop_${loopID}<${times};penPlusLoop_${loopID}++) {\n${code}\n}`;
    }

    GLSL_GEN.forBlock['as_vertex'] = function (block, generator) {
        //const innerCode = generator.blockToCode(block.nextStatement);
        functionsThatExist.vert = true;
        return `//Vertex Shader\nvoid vertex() {\ngl_Position = a_position;${nextBlockToCode(block, generator)}\n}`;
    };

    GLSL_GEN.forBlock['as_frag'] = function (block, generator) {
        //const innerCode = generator.blockToCode(block.nextStatement);
        functionsThatExist.frag = true;
        return `//Fragment Shader\nvoid fragment() {${nextBlockToCode(block, generator)}\n}`;
    };
}

function updateGLSL(event) {
    if (window.workspace.isDragging()) return; // Don't update while changes are happening.
    if (!window.supportedEvents.has(event.type)) return;

    functionsThatExist = {
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
`;

    window.Generated_GLSL += window.GLSL_GEN.workspaceToCode(window.workspace);

    window.Generated_Frag = "";
    window.Generated_Vert = "";

    loopID = 0;

    if (!(window.Generated_GLSL.includes("//Fragment Shader") && window.Generated_GLSL.includes("//Vertex Shader"))) {
        if ((!window.Generated_GLSL.includes("//Vertex Shader")) && window.Generated_GLSL.includes("//Fragment Shader")) {
            replacementShader("Missing Vertex Shader creating manual replacement");
            window.Generated_GLSL += `//Vertex Shader
void vertex() {
gl_Position = a_position;
}`;
        }
        else if ((!window.Generated_GLSL.includes("//Fragment Shader")) && window.Generated_GLSL.includes("//Vertex Shader")) {
            replacementShader("Missing Pixel/Fragment Shader creating manual replacement");
            window.Generated_GLSL += `//Fragment Shader
void fragment() {
gl_FragColor = v_color;
}`;
        }
        else {
            replacementShader("Missing both shaders using generic set");
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