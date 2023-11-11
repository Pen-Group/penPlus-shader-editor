{
    window.categories = window.categories || {};

    //WIP

    class operators_category extends window.penPlusExtension {
        getInfo() {
            return {
                name: "Operators",
                id: "operators",
                color1: "#59c059",
                color2: "#46b946",
                color3: "#389438",
                blocks: [
                    {
                        opcode: "add",
                        type: "reporter",
                        text: "%1+%2",
                        tooltip: "Add two numbers together",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "sub",
                        type: "reporter",
                        text: "%1-%2",
                        tooltip: "Subtract 2 numbers from each other",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "mul",
                        type: "reporter",
                        text: "%1*%2",
                        tooltip: "Multiplies two numbers together",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "div",
                        type: "reporter",
                        text: "%1/%2",
                        tooltip: "Divide 2 numbers from each other",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "pow",
                        type: "reporter",
                        text: "%1^%2",
                        tooltip: "Puts the first number to the power of the second number",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    "---",
                    {
                        opcode: "equal",
                        type: "boolean",
                        text: "%1=%2",
                        tooltip: "Returns true if two numbers are equal.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "notequal",
                        text: "%1≠%2",
                        type: "boolean",
                        tooltip: "Returns true if two numbers are not equal.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "less",
                        type: "boolean",
                        text: "%1<%2",
                        tooltip: "Returns true if the first number is less than the second.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "equalLess",
                        type: "boolean",
                        text: "%1≤%2",
                        tooltip: "Returns true if the first number is less than or equal to the second.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "more",
                        type: "boolean",
                        text: "%1>%2",
                        tooltip: "Returns true if the first number is more than the second.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "equalMore",
                        type: "boolean",
                        text: "%1≥%2",
                        tooltip: "Returns true if the first number is more than or equal to the second.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    "---",
                    {
                        opcode: "and",
                        type: "boolean",
                        text: "%1and%2",
                        tooltip: "Returns true if and only if both are true.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                check: "Boolean",
                            },
                            {
                                type: "input_value",
                                name: "B",
                                check: "Boolean",
                            },
                        ]
                    },
                    {
                        opcode: "or",
                        type: "boolean",
                        text: "%1or%2",
                        tooltip: "Returns true if one is true.",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                check: "Boolean",
                            },
                            {
                                type: "input_value",
                                name: "B",
                                check: "Boolean",
                            },
                        ]
                    },
                    {
                        opcode: "not",
                        type: "boolean",
                        text: "not%1",
                        tooltip: "Opposite of the input",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                check: "Boolean",
                            }
                        ]
                    },
                    "---",
                    {
                        opcode: "true",
                        type: "boolean",
                        text: "true",
                        tooltip: "Always true",
                    },
                    {
                        opcode: "false",
                        type: "boolean",
                        text: "false",
                        tooltip: "Always false",
                    },
                    "---",
                    {
                        opcode: "mod",
                        type: "reporter",
                        text: "%1mod%2",
                        tooltip: "Get the remainder of the division of the two numbers",
                        arguments: [
                            {
                                type: "input_value",
                                name: "A",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                            {
                                type: "input_value",
                                name: "B",
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                    {
                        opcode: "arith",
                        type: "reporter",
                        text: "%1 of %2",
                        tooltip: "Performs the desired arithmatic operation",
                        arguments: [
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
                                shadow: {
                                    type: "number_reporter",
                                },
                            },
                        ]
                    },
                ],
            }
        }

        add(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`(${A} + ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        sub(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`(${A} - ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        mul(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`(${A} * ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        div(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`(${A} / ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        pow(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`pow(${A}, ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        equal(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`${A} == ${B}` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        notequal(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`${A} != ${B}` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        less(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`${A} < ${B}` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        equalLess(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`${A} <= ${B}` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        more(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`${A} > ${B}` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        equalMore(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`${A} >= ${B}` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        and(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`(${A} && ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        or(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`(${A} || ${B})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        not(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            return [`(!${A})` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        true(block, generator) {
            return [`true` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        false(block, generator) {
            return [`false` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        mod(block, generator) {
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            const B = generator.valueToCode(block, 'B', Order.ATOMIC);
            return [`mod(float(${A}),float(${B}))` + nextBlockToCode(block, generator), Order.ATOMIC];
        }

        arith(block, generator) {
            const arith = block.getFieldValue('arithmatic');
            const A = generator.valueToCode(block, 'A', Order.ATOMIC);
            return [`${arith}(float(${A}))` + nextBlockToCode(block, generator), Order.ATOMIC];
        }
    }

    window.categories.operators = operators_category;
}
