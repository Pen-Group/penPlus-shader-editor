function penPlusBlocklyTheme() {

    const blockStyles = {
        hat_blocks: {
            colourPrimary: "#ffbf00",
            colourSecondary: "#e6ac00",
            colourTertiary: "#cc9900",
        },
        logic_blocks: {
            colourPrimary: "#ffab19",
            colourSecondary: "#ec9c13",
            colourTertiary: "#cf8b17",

        },
        looks_blocks: {
            colourPrimary: "#9966ff",
            colourSecondary: "#855cd6",
            colourTertiary: "#774dcb",
        },
        operator_blocks: {
            colourPrimary: "#59c059",
            colourSecondary: "#46b946",
            colourTertiary: "#389438",
        },
        vertex_blocks: {
            colourPrimary: "#4c97ff",
            colourSecondary: "#4488e6",
            colourTertiary: "#3d79cc",
        },
        variable_blocks: {
            colourPrimary: "#ff8c1a",
            colourSecondary: "#dd8126",
            colourTertiary: "#cc7015"
        },
        variable_vec2_block: {
            colourPrimary: "#5AB897",
            colourSecondary: "#47AA8C",
            colourTertiary: "#339178"
        },
        variable_vec3_block: {
            colourPrimary: "#5BB4B7",
            colourSecondary: "#47AAAF",
            colourTertiary: "#319098"
        },
        variable_vec4_block: {
            colourPrimary: "#59BC77",
            colourSecondary: "#47AB6A",
            colourTertiary: "#359258"
        },
        variable_int_block: {
            colourPrimary: "#ffde00",
            colourSecondary: "#e6c800",
            colourTertiary: "#ccb100",
        },
        variable_bool_block: {
            colourPrimary: "#c2d916",
            colourSecondary: "#adc213",
            colourTertiary: "#a0b312"
        },
        texture_blocks: {
            colourPrimary: "#b464e7",
            colourSecondary: "#a755cf",
            colourTertiary: "#9a48c4"
        },
        cubemap_blocks: {
            colourPrimary: "#8672ff",
            colourSecondary: "#7465d6",
            colourTertiary: "#6657cb"
        },
        matrix_blocks: {
            colourPrimary: "#737fff",
            colourSecondary: "#636ed6",
            colourTertiary: "#5560cb"
        }
    };

    return Blockly.Theme.defineTheme("themeName", {
        blockStyles: blockStyles,
        fontStyle: {
            'family': 'helvetica Neue, helvetica, serif',
            'weight': 500,
            'size': 12
        },
        componentStyles: {
            workspaceBackgroundColour: '#1e1e1e',
            toolboxBackgroundColour: 'blackBackground',
            toolboxForegroundColour: '#fff',
            flyoutBackgroundColour: '#252526',
            flyoutForegroundColour: '#ccc',
            flyoutOpacity: 1,
            scrollbarColour: '#797979',
            insertionMarkerColour: '#fff',
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.4,
            cursorColour: '#d0d0d0',
            blackBackground: '#333',
        },
        startHats: true,
    });
}