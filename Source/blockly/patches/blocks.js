//Defines blocks. Should probably split this into multiple files lol.
function addImportantReporters() {
  //The colour reporter
  penPlus.addBlocklyBlock("color_reporter", "reporter", {
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
  penPlus.addBlocklyBlock("number_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("blank_reporter", "reporter", {
    message0: "%1",
    output: "noInput",
    style: "myblocks_blocks",
    args0: [
      {
        type: "input_dummy",
      },
    ],
  });

  penPlus.addBlocklyBlock("number_NOFLOAT_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("string_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("int_reporter", "reporter", {
    message0: " %1 ",
    output: "int",
    args0: [
      {
        type: "field_number",
        name: "NUMBER",
        value: 0,
        precision: 1,
      },
    ],
  });

  penPlus.addBlocklyBlock("vec2_reporter", "reporter", {
    message0: "x:%1 y:%2",
    style: "vector_blocks",
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

  penPlus.addBlocklyBlock("vec3_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("vec4_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("matrix2_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("matrix3_reporter", "reporter", {
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

  penPlus.addBlocklyBlock("matrix4_reporter", "reporter", {
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

function addBlocks() {
  new penPlus.categories.events();
  new penPlus.categories.vertex();
  new penPlus.categories.looks();
  new penPlus.categories.color();
  new penPlus.categories.controls();
  new penPlus.categories.operators();
  new penPlus.categories.sensing();
  new penPlus.categories.vector();
  new penPlus.categories.matrix();
  new penPlus.categories.variables();
  new penPlus.categories.myBlocks();
  new penPlus.categories.glsl();

  if (penPlus.experimental) {
    new penPlus.categories.structs();
  }
}
