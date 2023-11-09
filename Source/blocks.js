//Defines blocks. Should probably split this into multiple files lol.
function addImportantReporters() {
    //The colour reporter
    addBlocklyBlock("color_reporter", "reporter", {
        message0: " %1 ",
        args0: [
            {
                type: "field_colour_hsv_sliders",
                name: "COLOUR",
                colour: "#0000ff",
            },
        ],
        output: "vec4"
    });
    addBlocklyBlock("number_reporter", "reporter", {
        message0: " %1 ",
        args0: [
            {
                type: "field_number",
                name: "NUMBER",
                value: 0,
            },
        ],
    });

    addBlocklyBlock("int_reporter", "reporter", {
        message0: " %1 ",
        args0: [
            {
                type: "field_number",
                name: "NUMBER",
                value: 0,
                precision: 1
            },
        ],
    });

    addBlocklyBlock("vec2_reporter", "reporter", {
        message0: "x:%1 y:%2",
        style: "variable_vec2_block",
        output: "vec2",
        args0: [
            {
                type: "field_number",
                name: "NUMBER",
                value: 0,
            },
            {
                type: "field_number",
                name: "NUMBER2",
                value: 0,
            },
        ],
    });

    addBlocklyBlock("vec3_reporter", "reporter", {
        message0: "x:%1 y:%2 z:%3",
        style: "variable_vec3_block",
        output: "vec3",
        args0: [
            {
                type: "field_number",
                name: "NUMBER",
                value: 0,
            },
            {
                type: "field_number",
                name: "NUMBER2",
                value: 0,
            },
            {
                type: "field_number",
                name: "NUMBER3",
                value: 0,
            },
        ],
    });

    addBlocklyBlock("vec4_reporter", "reporter", {
        message0: "x:%1 y:%2 z:%3 w:%4",
        style: "variable_vec4_block",
        output: "vec4",
        args0: [
            {
                type: "field_number",
                name: "NUMBER",
                value: 0,
            },
            {
                type: "field_number",
                name: "NUMBER2",
                value: 0,
            },
            {
                type: "field_number",
                name: "NUMBER2",
                value: 0,
            },
            {
                type: "field_number",
                name: "NUMBER2",
                value: 0,
            }
        ],
    });
}

function addVariableTypes() {
    window.variableTypes.push({
        "kind": "button",
        "text": "Create Variable",
        "callbackKey": "createVariable"
    })
    addVariableType("float", null, null, false, {
        VALUE: {
            shadow: {
                type: "number_reporter",
            },
        },
    });
    addVariableType("int", "variable_int_block", null, false, {
        VALUE: {
            shadow: {
                type: "int_reporter",
            },
        },
    });
    addVariableType("vec2", "variable_vec2_block", ["vec2", "VectorCompliant"], false, {
        VALUE: {
            shadow: {
                type: "vec2_reporter",
            },
        },
    });
    addVariableType("vec3", "variable_vec3_block", ["vec3", "VectorCompliant"], false, {
        VALUE: {
            shadow: {
                type: "vec3_reporter",
            },
        },
    });

    addVariableType("vec4", "variable_vec4_block", ["vec4", "VectorCompliant"], false, {
        VALUE: {
            shadow: {
                type: "vec4_reporter",
            },
        },
    });

    addVariableType("bool", "variable_bool_block", "Boolean", true);

    addVariableType("texture", "texture_blocks", ["texture"], false, {
        noSet: true
    });

    addVariableType("cubemap", "cubemap_blocks", ["cubemap"], false, {
        noSet: true
    });

    addVariableType("matrix", "matrix_blocks", ["Matrix", "VectorCompliant"], false);
}

function addBlocks() {
    //Events
    addBlocklyBlock("as_vertex", "hat", {
        type: "vertice",
        message0: "for each vertex",
        tooltip:"This will be in the scope of vertex.",
    });

    addBlocklyBlock("as_frag", "hat", {
        type: "fragment",
        message0: "for each pixel",
        tooltip:
            "The pixels execute this. (The points of a triangle or square!)",
    });

    //Vertices
    addBlocklyBlock("vertex_gotoPos", "command", {
        type: "vertice",
        message0: "go to x:%1 y:%2",
        args0: [
            {
                type: "input_value",
                name: "X",
            },
            {
                type: "input_value",
                name: "Y",
            },
        ],
        style: "vertex_blocks",
        tooltip: "Set the vertice's screen position to this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_setZ", "command", {
        type: "vertice",
        message0: "set depth to %1",
        args0: [
            {
                type: "input_value",
                name: "Z",
            },
        ],
        style: "vertex_blocks",
        tooltip: "Set the vertice's Depth or Z to this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_setW", "command", {
        type: "vertice",
        message0: "set corner pinch to %1",
        args0: [
            {
                type: "input_value",
                name: "W",
            },
        ],
        style: "vertex_blocks",
        tooltip: "Set the vertice's corner pinch or W value to this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_changeX", "command", {
        type: "vertice",
        message0: "change x by %1",
        args0: [
            {
                type: "input_value",
                name: "X",
            }
        ],
        style: "vertex_blocks",
        tooltip: "Change the vertice's x position by the desired value.",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_changeY", "command", {
        type: "vertice",
        message0: "change y by %1",
        args0: [
            {
                type: "input_value",
                name: "Y",
            }
        ],
        style: "vertex_blocks",
        tooltip: "Change the vertice's y position by the desired value.",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_changeZ", "command", {
        type: "vertice",
        message0: "change depth by %1",
        args0: [
            {
                type: "input_value",
                name: "Z",
            },
        ],
        style: "vertex_blocks",
        tooltip: "Change the vertice's Depth or Z by this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_changeW", "command", {
        type: "vertice",
        message0: "change corner pinch by %1",
        args0: [
            {
                type: "input_value",
                name: "W",
            },
        ],
        style: "vertex_blocks",
        tooltip: "Change the vertice's corner pinch or W value by this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_getX", "reporter", {
        type: "vertice",
        message0: "vertex X",
        style: "vertex_blocks",
        tooltip: "Get the vertice's X position",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_getY", "reporter", {
        type: "vertice",
        message0: "vertex Y",
        style: "vertex_blocks",
        tooltip: "Get the vertice's Y position",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_getZ", "reporter", {
        type: "vertice",
        message0: "vertex depth",
        style: "vertex_blocks",
        tooltip: "Get the vertice's depth or Z position",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("vertex_getW", "reporter", {
        type: "vertice",
        message0: "vertex corner pinch",
        style: "vertex_blocks",
        tooltip: "Get the vertice's corner pinch or W position",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    //Looks
    addBlocklyBlock("pixel_vertColor", "command", {
        type: "vertice",
        message0: "set the vertice's colour to %1",
        args0: [
            {
                type: "input_value",
                name: "COLOR",
                check: "vec4"
            },
        ],
        style: "looks_blocks",
        tooltip: "Set the pixel's colour to this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("pixel_color", "command", {
        type: "fragment",
        message0: "set the pixel's colour to %1",
        args0: [
            {
                type: "input_value",
                name: "COLOR",
                check: "vec4"
            },
        ],
        style: "looks_blocks",
        tooltip: "Set the pixel's colour to this",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("pixel_X", "reporter", {
        type: "fragment",
        message0: "pixel X",
        style: "looks_blocks",
        tooltip: "Pixel's X position",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("pixel_Y", "reporter", {
        type: "fragment",
        message0: "pixel Y",
        style: "looks_blocks",
        tooltip: "Pixel's Y position",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("pixel_pixcolour", "reporter", {
        type: "fragment",
        message0: "pixel colour",
        style: "looks_blocks",
        tooltip: "The pixel's current colour",
        output: "vec4",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("pixel_vertcolour", "reporter", {
        type: "",
        message0: "vertice colour",
        style: "looks_blocks",
        tooltip: "The closest vertice's colour",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
        output: "vec4"
    });

    //Controls
    addBlocklyBlock("control_if", "command", {
        message0: "if %1 then %2 %3",
        args0: [
            {
                type: "input_value",
                check: "Boolean",
                name: "condition",
            },
            {
                type: "input_dummy",
            },
            {
                type: "input_statement",
                name: "true",
            },
        ],
        style: "logic_blocks",
        tooltip: "If the input is true execute the inline code.",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("control_ifelse", "command", {
        message0: "if %1 then %2 %3 else %4 %5",
        args0: [
            {
                "type": "input_value",
                "name": "condition",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "true"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "false"
            }
        ],
        style: "logic_blocks",
        tooltip: "If the input is true execute the inline code.",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("control_repeat", "command", {
        message0: "repeat %1 %2",
        args0: [
            {
                type: "input_value",
                name: "times",
            },
            {
                type: "input_statement",
                name: "code",
            },
        ],
        style: "logic_blocks",
        tooltip: "Repeats the specified amount of times.",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    //Operators
    addBlocklyBlock("operator_add", "reporter", {
        message0: "%1+%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "Add two numbers together",
        output: ["VectorCompliant"],
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_sub", "reporter", {
        message0: "%1-%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "Subtracts A from B",
        output: ["VectorCompliant"],
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_mul", "reporter", {
        message0: "%1*%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "Multiplies A and B together",
        output: ["VectorCompliant"],
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_div", "reporter", {
        message0: "%1/%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "Divides A by B",
        output: ["VectorCompliant"],
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_pow", "reporter", {
        message0: "%1^%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "Divides A by B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_mod", "reporter", {
        message0: "%1 mod %2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "Gets the remainder of the division of A and B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    //Conditionals
    addBlocklyBlock("operator_equalTo", "boolean", {
        message0: "%1=%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "is A equal to B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });
    addBlocklyBlock("operator_notequalTo", "boolean", {
        message0: "%1!=%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "is A not equal to B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });
    addBlocklyBlock("operator_lessThan", "boolean", {
        message0: "%1<%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "is A less than to B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });
    addBlocklyBlock("operator_lessThanEqual", "boolean", {
        message0: "%1<=%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "is A less than or equal to to B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_moreThan", "boolean", {
        message0: "%1>%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "is A more than to B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });
    addBlocklyBlock("operator_moreThanEqual", "boolean", {
        message0: "%1>=%2",
        args0: [
            {
                type: "input_value",
                name: "A",
            },
            {
                type: "input_value",
                name: "B",
            },
        ],
        style: "operator_blocks",
        tooltip: "is A more than or equal to to B",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    //True and False
    addBlocklyBlock("operator_true", "boolean", {
        message0: "true",
        style: "operator_blocks",
        tooltip: "Always true",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });
    addBlocklyBlock("operator_false", "boolean", {
        message0: "false",
        style: "operator_blocks",
        tooltip: "Always false",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_and", "boolean", {
        message0: "%1 and %2",
        args0: [
            {
                type: "input_value",
                check: "Boolean",
                name: "A",
            },
            {
                type: "input_value",
                check: "Boolean",
                name: "B",
            }
        ],
        style: "operator_blocks",
        tooltip: "return true if A and B are true",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_or", "boolean", {
        message0: "%1 or %2",
        args0: [
            {
                type: "input_value",
                check: "Boolean",
                name: "A",
            },
            {
                type: "input_value",
                check: "Boolean",
                name: "B",
            }
        ],
        style: "operator_blocks",
        tooltip: "return true if A or B is true",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });


    addBlocklyBlock("operator_not", "boolean", {
        message0: "not%1",
        args0: [
            {
                type: "input_value",
                check: "Boolean",
                name: "A",
            }
        ],
        style: "operator_blocks",
        tooltip: "opposite of the input!",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    });

    addBlocklyBlock("operator_arith", "reporter", {
        message0: "%1 of %2",
        args0: [
            createMenu([
                ["abs", "abs"],
                ["floor", "floor"],
                ["ceiling", "ceil"],
                ["sqrt", "sqrt"],
                ["sin", "sin"],
                ["cos", "cos"],
                ["tan", "tan"],
                ["ln", "log"],
                ["log", "log10"],
                ["e^", "exp"],
                ["10^", "tenpow"],
            ], "arithmatic"),
            {
                type: "input_value",
                name: "A",
            },
        ],
        style: "operator_blocks",
        tooltip: "Uses the value of the arithmatic",
        helpUrl: "https://doors-game.fandom.com/wiki/DOORS_Wiki",
    })

    new window.categories.events();
    new window.categories.vertex();
    new window.categories.looks();
}