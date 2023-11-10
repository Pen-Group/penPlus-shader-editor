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
        message0: "",
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
    new window.categories.controls();
}