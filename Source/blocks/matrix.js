{
    window.categories = window.categories || {};
  
    class matrix_category extends window.penPlusExtension {
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
              tooltip: "A 3x3 Matrix",
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
          ],
        };
      }
  
      mat2(block, generator) {
        return [
          `mat2(${generator.valueToCode(block, "00", Order.ATOMIC)},${generator.valueToCode(block, "01", Order.ATOMIC)},${generator.valueToCode(block, "10", Order.ATOMIC)},${generator.valueToCode(block, "11", Order.ATOMIC)})` + nextBlockToCode(block, generator),
          Order.ATOMIC,
        ];
      }

      mat3(block, generator) {
        return [
          `mat3(${generator.valueToCode(block, "00", Order.ATOMIC)},${generator.valueToCode(block, "01", Order.ATOMIC)},${generator.valueToCode(block, "02", Order.ATOMIC)},${generator.valueToCode(block, "10", Order.ATOMIC)},${generator.valueToCode(block, "11", Order.ATOMIC)},${generator.valueToCode(block, "12", Order.ATOMIC)},${generator.valueToCode(block, "20", Order.ATOMIC)},${generator.valueToCode(block, "21", Order.ATOMIC)},${generator.valueToCode(block, "22", Order.ATOMIC)})` + nextBlockToCode(block, generator),
          Order.ATOMIC,
        ];
      }

      mat4(block, generator) {
        return [
          `mat4(${generator.valueToCode(block, "00", Order.ATOMIC)},${generator.valueToCode(block, "01", Order.ATOMIC)},${generator.valueToCode(block, "02", Order.ATOMIC)},${generator.valueToCode(block, "03", Order.ATOMIC)},${generator.valueToCode(block, "10", Order.ATOMIC)},${generator.valueToCode(block, "11", Order.ATOMIC)},${generator.valueToCode(block, "12", Order.ATOMIC)},${generator.valueToCode(block, "13", Order.ATOMIC)},${generator.valueToCode(block, "20", Order.ATOMIC)},${generator.valueToCode(block, "21", Order.ATOMIC)},${generator.valueToCode(block, "22", Order.ATOMIC)},${generator.valueToCode(block, "23", Order.ATOMIC)},${generator.valueToCode(block, "30", Order.ATOMIC)},${generator.valueToCode(block, "31", Order.ATOMIC)},${generator.valueToCode(block, "32", Order.ATOMIC)},${generator.valueToCode(block, "33", Order.ATOMIC)})` + nextBlockToCode(block, generator),
          Order.ATOMIC,
        ];
      }
    }
  
    window.categories.matrix = matrix_category;
  }
  