{
  penPlus.categories = penPlus.categories || {};

  class matrix_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Matrix",
        id: "matrix",
        color1: "#737fff",
        color2: "#636ed6",
        color3: "#5560cb",
        blocks: [
          {
            opcode: "mat2",
            type: "reporter",
            text: "%1 %2 \n %3 %4",
            tooltip: "A 2x2 Matrix",
            output: "matrix_2x",
            arguments: [
              {
                type: "input_value",
                name: "00",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "01",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "10",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "11",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "mat3",
            type: "reporter",
            text: "%1 %2 %3 \n %4 %5 %6 \n %7 %8 %9",
            tooltip: "A 3x3 Matrix",
            output: "matrix_3x",
            arguments: [
              {
                type: "input_value",
                name: "00",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "01",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "02",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "10",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "11",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "12",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "20",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "21",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "22",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "mat4",
            type: "reporter",
            text: "%1 %2 %3 %4 \n %5 %6 %7 %8 \n %9 %10 %11 %12 \n %13 %14 %15 %16",
            tooltip: "A 4x4 Matrix",
            output: "matrix_4x",
            arguments: [
              {
                type: "input_value",
                name: "00",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "01",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "02",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "03",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "10",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "11",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "12",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "13",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "20",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "21",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "22",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "23",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "30",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "31",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "32",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "33",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          "---",
          {
            opcode: "getitem",
            type: "reporter",
            text: "row %1 of column %2 of %3",
            tooltip: "Gets one value from a matrix",

            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid(
                [
                  ["1", "0"],
                  ["2", "1"],
                  ["3", "2"],
                  ["4", "3"],
                ],
                "row",
                4
              ),
              penPlus.createGrid(
                [
                  ["1", "0"],
                  ["2", "1"],
                  ["3", "2"],
                  ["4", "3"],
                ],
                "column",
                1
              ),
              {
                type: "input_value",
                name: "matrix",

                shadow: {
                  type: "matrix4_reporter",
                },
              },
            ],
          },
          {
            opcode: "getrow",
            type: "reporter",
            text: "row %1 of %2",
            tooltip: "Gets a row of a matrix",

            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid(
                [
                  ["1", "0"],
                  ["2", "1"],
                  ["3", "2"],
                  ["4", "3"],
                ],
                "column",
                4
              ),
              {
                type: "input_value",
                name: "matrix",

                shadow: {
                  type: "matrix4_reporter",
                },
              },
            ],
          },
          {
            opcode: "getcolumn",
            type: "reporter",
            text: "column %1 of %2",
            tooltip: "Gets a column of a matrix",

            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid(
                [
                  ["1", "0"],
                  ["2", "1"],
                  ["3", "2"],
                  ["4", "3"],
                ],
                "row",
                1
              ),
              {
                type: "input_value",
                name: "matrix",

                shadow: {
                  type: "matrix4_reporter",
                },
              },
            ],
          },
        ],
      };
    }

    mat2(block, generator) {
      return [`mat2(${generator.valueToCode(block, "00", Order.ATOMIC)},${generator.valueToCode(block, "01", Order.ATOMIC)},${generator.valueToCode(block, "10", Order.ATOMIC)},${generator.valueToCode(block, "11", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    mat3(block, generator) {
      return [`mat3(${generator.valueToCode(block, "00", Order.ATOMIC)},${generator.valueToCode(block, "01", Order.ATOMIC)},${generator.valueToCode(block, "02", Order.ATOMIC)},${generator.valueToCode(block, "10", Order.ATOMIC)},${generator.valueToCode(block, "11", Order.ATOMIC)},${generator.valueToCode(block, "12", Order.ATOMIC)},${generator.valueToCode(block, "20", Order.ATOMIC)},${generator.valueToCode(block, "21", Order.ATOMIC)},${generator.valueToCode(block, "22", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    mat4(block, generator) {
      return [`mat4(${generator.valueToCode(block, "00", Order.ATOMIC)},${generator.valueToCode(block, "01", Order.ATOMIC)},${generator.valueToCode(block, "02", Order.ATOMIC)},${generator.valueToCode(block, "03", Order.ATOMIC)},${generator.valueToCode(block, "10", Order.ATOMIC)},${generator.valueToCode(block, "11", Order.ATOMIC)},${generator.valueToCode(block, "12", Order.ATOMIC)},${generator.valueToCode(block, "13", Order.ATOMIC)},${generator.valueToCode(block, "20", Order.ATOMIC)},${generator.valueToCode(block, "21", Order.ATOMIC)},${generator.valueToCode(block, "22", Order.ATOMIC)},${generator.valueToCode(block, "23", Order.ATOMIC)},${generator.valueToCode(block, "30", Order.ATOMIC)},${generator.valueToCode(block, "31", Order.ATOMIC)},${generator.valueToCode(block, "32", Order.ATOMIC)},${generator.valueToCode(block, "33", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    getitem(block, generator) {
      return [`${generator.valueToCode(block, "matrix", Order.ATOMIC)}[${block.getFieldValue("column")}][${block.getFieldValue("row")}]`, Order.ATOMIC];
    }

    getrow(block, generator) {
      let columnNumber = 4;
      switch (block.getInputTargetBlock("matrix").type) {
        default:
          break;

        case "matrix_mat2" || "matrix2_reporter":
          columnNumber = 2;
          break;

        case "matrix_mat3" || "matrix3_reporter":
          columnNumber = 3;
          break;

        case "matrix_mat4" || "matrix4_reporter":
          columnNumber = 4;
          break;
      }

      return [`vec${columnNumber}(${generator.valueToCode(block, "matrix", Order.ATOMIC)}[${block.getFieldValue("column")}])`, Order.ATOMIC];
    }

    getcolumn(block, generator) {
      let columnNumber = 4;
      switch (block.getInputTargetBlock("matrix").type) {
        default:
          break;

        case "matrix_mat2" || "matrix2_reporter":
          columnNumber = 2;
          break;

        case "matrix_mat3" || "matrix3_reporter":
          columnNumber = 3;
          break;

        case "matrix_mat4" || "matrix4_reporter":
          columnNumber = 4;
          break;
      }

      let getters = "";
      for (let column = 0; column < columnNumber; column++) {
        getters += `${column == 0 ? "" : ","}${generator.valueToCode(block, "matrix", Order.ATOMIC)}[${column}][${block.getFieldValue("row")}]`;
      }

      return [`vec${columnNumber}(${getters})`, Order.ATOMIC];
    }
  }

  penPlus.categories.matrix = matrix_category;
}
