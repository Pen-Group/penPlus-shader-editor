{
    window.categories = window.categories || {};
    
    class events_category extends window.penPlusExtension {
        getInfo() {
            return {
                name:"Events",
                id:"events",
                color1:"#ffbf00",
                color2:"#e6ac00",
                color3:"#cc9900",
                blocks: [
                    {
                        opcode:"vertex",
                        type:"hat",
                        text:"for each vertex",
                        tooltip: "Will be ran per vertex"
                    },
                    {
                        opcode:"pixel",
                        type:"hat",
                        text:"for each pixel",
                        tooltip: "Will be ran per pixel"
                    },
                ],
            }
        }

        vertex (block, generator) {
            return `//Vertex Shader\nvoid vertex() {\ngl_Position = a_position;${nextBlockToCode(block, generator)}\n}`;
        }

        pixel (block, generator) {
            return `//Fragment Shader\nvoid fragment() {${nextBlockToCode(block, generator)}\n}`;
        }
    }

    window.categories.events = events_category;
}
