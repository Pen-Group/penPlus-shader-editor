class vertex_category extends window.penPlusExtension {
    getInfo() {
        return {
            name:"Vertex",
            id:"vertex",
            color1:"#ffab19",
            color2:"#ec9c13",
            color3:"#cf8b17",
            blocks: [
                {
                    opcode:"gotoPos",
                    type:"command",
                    text:"go to x:%1 y:%2",
                    arguments: [
                        {
                            type: "input_value",
                            name: "X",
                        },
                        {
                            type: "input_value",
                            name: "Y",
                        }
                    ]
                }
            ],
        }
    }
}