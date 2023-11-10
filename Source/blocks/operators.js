{
    window.categories = window.categories || {};

    //WIP
    
    class operators_category extends window.penPlusExtension {
        getInfo() {
            return {
                name:"Looks",
                id:"looks",
                color1:"#9966ff",
                color2:"#855cd6",
                color3:"#774dcb",
                blocks: [
                    {
                        opcode:"setVertColor",
                        type:"command",
                        text:"set the vertice's colour to %1",
                        tooltip: "Will be ran per vertex",
                        arguments: [
                            {
                                type: "input_value",
                                name: "COLOR",
                                check: "vec4",
                                shadow: {
                                    type: "color_reporter"
                                }
                            },
                        ]
                    },
                    {
                        opcode:"getVertColor",
                        type:"reporter",
                        text:"vertex colour",
                        tooltip: "Will be ran per pixel"
                    },
                    "---",
                    {
                        opcode:"setPixColor",
                        type:"command",
                        text:"set the pixel's colour to %1",
                        tooltip: "Will be ran per vertex",
                        arguments: [
                            {
                                type: "input_value",
                                name: "COLOR",
                                check: "vec4",
                                shadow: {
                                    type: "color_reporter"
                                }
                            },
                        ]
                    },
                    {
                        opcode:"getPixColor",
                        type:"reporter",
                        text:"pixel colour",
                        tooltip: "Will be ran per pixel"
                    },
                ],
            }
        }

        setPixColor (block, generator) {
            const colour = generator.valueToCode(block, 'COLOR', Order.ATOMIC);
            return `gl_FragColor = ${colour};` + nextBlockToCode(block, generator);
        }

        getPixColor (block, generator) {
            return [`gl_FragColor`, Order.ATOMIC];
        }

        setPixColor (block, generator) {
            const colour = generator.valueToCode(block, 'COLOR', Order.ATOMIC);
            return `v_color = ${colour};` + nextBlockToCode(block, generator);
        }

        getPixColor (block, generator) {
            return [`v_color`, Order.ATOMIC];
        }
    }

    window.categories.operators = operators_category;
}
