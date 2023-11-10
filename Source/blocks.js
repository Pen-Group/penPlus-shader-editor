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
    new window.categories.events();
    new window.categories.vertex();
    new window.categories.looks();
    new window.categories.controls();
    new window.categories.operators();
    new window.categories.variables();
}
