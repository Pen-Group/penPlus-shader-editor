{
    penPlus.categories = penPlus.categories || {};

    class struct_category extends penPlus.penPlusExtension {
        getInfo() {
            return {
                name: "Structs",
                id: "structs",
                color1: "#9CACD3",
                color2: "#8592B5",
                color3: "#7683A2",
                blocks: [
                    {
                        opcode: "structDef",
                        type: "hat_customBlock",
                        text: "define %1 that is made of %2",
                        tooltip: "A Custom Variable Type!",
                        arguments: [
                            {
                                type: "input_value",
                                name: "name",

                                shadow: {
                                    type: "string_reporter",
                                },
                            },
                            {
                                type: "input_statement",
                                name: "arguments",
                                check: "StructBlockArgument",
                            }
                        ],
                    },
                ],
            };
        }

        structDef(block, generator) {
            //Cheap hack
            const customBlockType = block.getFieldValue("type");
            let name = generator.valueToCode(block, "name", Order.ATOMIC);
      
            if (name.length == 0) name = "no name!";

            const contents = generator.statementToCode(block, "arguments");
      
            penPlus.structs.push({
              name: name,
              contents: contents,
            });
      
            return `struct ${__glslifyName(
              name
            )}{${functionArguments}}`;
          }
    }

    penPlus.categories.structs = struct_category;
}
