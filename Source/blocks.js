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
    output: "vec4",
  });
  addBlocklyBlock("number_reporter", "reporter", {
    message0: " %1 ",
    output: "float",
    args0: [
      {
        type: "field_number",
        name: "NUMBER",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("number_NOFLOAT_reporter", "reporter", {
    message0: " %1 ",
    output: "float",
    args0: [
      {
        type: "field_number",
        name: "NUMBER",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("string_reporter", "reporter", {
    message0: " %1 ",
    output: "string",
    args0: [
      {
        type: "field_input",
        name: "STRING",
        value: "Text Here",
        spellcheck: false,
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
        precision: 1,
      },
    ],
  });

  addBlocklyBlock("vec2_reporter", "reporter", {
    message0: "x:%1 y:%2",
    style: "vec2_blocks",
    output: "vec2",
    args0: [
      {
        type: "field_number",
        name: "x",
        value: 0,
      },
      {
        type: "field_number",
        name: "y",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("vec3_reporter", "reporter", {
    message0: "x:%1 y:%2 z:%3",
    style: "vec3_blocks",
    output: "vec3",
    args0: [
      {
        type: "field_number",
        name: "x",
        value: 0,
      },
      {
        type: "field_number",
        name: "y",
        value: 0,
      },
      {
        type: "field_number",
        name: "z",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("vec4_reporter", "reporter", {
    message0: "x:%1 y:%2 z:%3 w:%4",
    style: "vec4_blocks",
    output: "vec4",
    args0: [
      {
        type: "field_number",
        name: "x",
        value: 0,
      },
      {
        type: "field_number",
        name: "y",
        value: 0,
      },
      {
        type: "field_number",
        name: "z",
        value: 0,
      },
      {
        type: "field_number",
        name: "w",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("matrix2_reporter", "reporter", {
    message0: "%1 %2 \n %3 %4",
    style: "matrix_blocks",
    output: "matrix_2x",
    args0: [
      {
        type: "field_number",
        name: "00",
        value: 0,
      },
      {
        type: "field_number",
        name: "01",
        value: 0,
      },
      {
        type: "field_number",
        name: "10",
        value: 0,
      },
      {
        type: "field_number",
        name: "11",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("matrix3_reporter", "reporter", {
    message0: "%1 %2 %3 \n %4 %5 %6 \n %7 %8 %9",
    style: "matrix_blocks",
    output: "matrix_3x",
    args0: [
      {
        type: "field_number",
        name: "00",
        value: 0,
      },
      {
        type: "field_number",
        name: "01",
        value: 0,
      },
      {
        type: "field_number",
        name: "02",
        value: 0,
      },
      {
        type: "field_number",
        name: "10",
        value: 0,
      },
      {
        type: "field_number",
        name: "11",
        value: 0,
      },
      {
        type: "field_number",
        name: "12",
        value: 0,
      },
      {
        type: "field_number",
        name: "20",
        value: 0,
      },
      {
        type: "field_number",
        name: "21",
        value: 0,
      },
      {
        type: "field_number",
        name: "22",
        value: 0,
      },
    ],
  });

  addBlocklyBlock("matrix4_reporter", "reporter", {
    message0: "%1 %2 %3 %4 \n %5 %6 %7 %8 \n %9 %10 %11 %12 \n %13 %14 %15 %16",
    style: "matrix_blocks",
    output: "matrix_4x",
    args0: [
      {
        type: "field_number",
        name: "00",
        value: 0,
      },
      {
        type: "field_number",
        name: "01",
        value: 0,
      },
      {
        type: "field_number",
        name: "02",
        value: 0,
      },
      {
        type: "field_number",
        name: "03",
        value: 0,
      },
      {
        type: "field_number",
        name: "10",
        value: 0,
      },
      {
        type: "field_number",
        name: "11",
        value: 0,
      },
      {
        type: "field_number",
        name: "12",
        value: 0,
      },
      {
        type: "field_number",
        name: "13",
        value: 0,
      },
      {
        type: "field_number",
        name: "20",
        value: 0,
      },
      {
        type: "field_number",
        name: "21",
        value: 0,
      },
      {
        type: "field_number",
        name: "22",
        value: 0,
      },
      {
        type: "field_number",
        name: "23",
        value: 0,
      },
      {
        type: "field_number",
        name: "30",
        value: 0,
      },
      {
        type: "field_number",
        name: "31",
        value: 0,
      },
      {
        type: "field_number",
        name: "32",
        value: 0,
      },
      {
        type: "field_number",
        name: "33",
        value: 0,
      },
    ],
  });
}

function addVariableTypes() {
  window.variableTypes.push({
    kind: "button",
    text: "Create Variable",
    callbackKey: "createVariable",
  });
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
  addVariableType(
    "vec2",
    "variable_vec2_block",
    ["vec2", "VectorCompliant"],
    false,
    {
      VALUE: {
        shadow: {
          type: "vec2_reporter",
        },
      },
    }
  );
  addVariableType(
    "vec3",
    "variable_vec3_block",
    ["vec3", "VectorCompliant"],
    false,
    {
      VALUE: {
        shadow: {
          type: "vec3_reporter",
        },
      },
    }
  );

  addVariableType(
    "vec4",
    "variable_vec4_block",
    ["vec4", "VectorCompliant"],
    false,
    {
      VALUE: {
        shadow: {
          type: "vec4_reporter",
        },
      },
    }
  );

  addVariableType("bool", "variable_bool_block", "Boolean", true);

  addVariableType("texture", "texture_blocks", ["texture"], false, {
    noSet: true,
  });

  addVariableType("cubemap", "cubemap_blocks", ["cubemap"], false, {
    noSet: true,
  });

  addVariableType(
    "matrix",
    "matrix_blocks",
    ["Matrix", "VectorCompliant"],
    false
  );
}

function addBlocks() {
  new window.categories.events();
  new window.categories.vertex();
  new window.categories.looks();
  new window.categories.color();
  new window.categories.controls();
  new window.categories.operators();
  new window.categories.sensing();
  new window.categories.vector();
  new window.categories.matrix();
  new window.categories.variables();
  new window.categories.myBlocks();
}
