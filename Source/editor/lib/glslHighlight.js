penPlus.setupMonacoTheme = () => {
  monaco.languages.register({ id: "glsl" });

  monaco.languages.setMonarchTokensProvider("glsl", {
    tokenizer: {
      root: [
        [/(\/\/.*)/, "comment"],
        //lol for some reason it doesn't like this if anybody knows a monaco fix then pr it
        [/(\/\*.*\*\/)/, "comment"],

        [/(float+)/, "variable"],
        [/(int+)/, "int"],

        [/(vec2+)/, "vec-two"],
        [/(vec3+)/, "vec-three"],
        [/(vec4+)/, "vec-four"],

        [/(mat2+)/, "matrix"],
        [/(mat3+)/, "matrix"],
        [/(mat4+)/, "matrix"],

        [/(sampler2D+)/, "texture"],
        [/(samplerCube+)/, "cubemap"],

        [/([\{\}])/, "controls"],

        [/(>=+)/, "operator"],
        [/(<=+)/, "operator"],
        [/(>>+)/, "operator"],
        [/(<<+)/, "operator"],
        [/(<+)/, "operator"],
        [/(>+)/, "operator"],
        [/(==+)/, "operator"],
        [/(!=+)/, "operator"],
        [/(=+)/, "operator"],

        [/(\+=+)/, "operator"],
        [/(\/=+)/, "operator"],
        [/(\-=+)/, "operator"],
        [/(\*=+)/, "operator"],

        [/(\/+)/, "operator"],
        [/(\*+)/, "operator"],
        [/(\++)/, "operator"],
        [/(\-+)/, "operator"],

        [/(\|\|+)/, "operator"],
        [/(\&\&+)/, "operator"],
        [/(\^\^+)/, "operator"],

        [/(\|+)/, "operator"],
        [/(\&+)/, "operator"],
        [/(\^+)/, "operator"],

        [/(\d+\.\d+)/, "operator"],
        [/(\d+\.)/, "operator"],
        [/(\.\d+)/, "operator"],
        [/(\d+)/, "operator"],

        [/(true+)/, "operator"],
        [/(false+)/, "operator"],

        [/(lowp+)/, "precision"],
        [/(mediump+)/, "precision"],
        [/(highp+)/, "precision"],

        [/(varying+)/, "precision"],
        [/(attribute+)/, "precision"],
        [/(uniform+)/, "precision"],

        [/((?:^|\W)if(?:$|\W))/, "controls"],
        [/((?:^|\W)else(?:$|\W))/, "controls"],
        [/((?:^|\W)switch(?:$|\W))/, "controls"],
        [/((?:^|\W)case(?:$|\W))/, "controls"],
        [/((?:^|\W)for(?:$|\W))/, "controls"],
        [/((?:^|\W)while(?:$|\W))/, "controls"],
        [/((?:^|\W)do(?:$|\W))/, "controls"],

        [/([\w_]*\s*)\(/, "my-blocks"],
        [/\)/, "my-blocks"],
        [/(return+)/, "my-blocks"],
        [/(discard+)/, "my-blocks"],
        [/(break+)/, "my-blocks"],
        [/(continue+)/, "my-blocks"],
        [/(void+)/, "my-blocks"],
      ],
    },
  });

  // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme("myCoolTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "my-blocks",
        foreground: penPlus.penPlusTheme.blockStyles["myblocks_blocks"].colourPrimary,
        fontStyle: "bold",
      },

      {
        token: "variable",
        foreground: penPlus.penPlusTheme.blockStyles["variables_blocks"].colourPrimary,
      },
      {
        token: "int",
        foreground: penPlus.penPlusTheme.blockStyles["int_blocks"].colourPrimary,
      },

      {
        token: "vec-two",
        foreground: penPlus.penPlusTheme.blockStyles["vector_blocks"].colourPrimary,
      },
      {
        token: "vec-three",
        foreground: penPlus.penPlusTheme.blockStyles["vec3_blocks"].colourPrimary,
      },
      {
        token: "vec-four",
        foreground: penPlus.penPlusTheme.blockStyles["vec4_blocks"].colourPrimary,
      },

      {
        token: "matrix",
        foreground: penPlus.penPlusTheme.blockStyles["matrix_blocks"].colourPrimary,
      },

      {
        token: "texture",
        foreground: penPlus.penPlusTheme.blockStyles["texture_blocks"].colourPrimary,
      },
      {
        token: "cubemap",
        foreground: penPlus.penPlusTheme.blockStyles["cubemap_blocks"].colourPrimary,
      },

      {
        token: "controls",
        foreground: penPlus.penPlusTheme.blockStyles["controls_blocks"].colourPrimary,
        fontStyle: "bold",
      },

      {
        token: "comment",
        foreground: penPlus.penPlusTheme.blockStyles["sensing_blocks"].colourPrimary,
        fontStyle: "italic",
      },

      {
        token: "operator",
        foreground: penPlus.penPlusTheme.blockStyles["operators_blocks"].colourPrimary,
      },

      {
        token: "precision",
        foreground: penPlus.penPlusTheme.blockStyles["colors_blocks"].colourPrimary,
      },
    ],
    colors: {
      "editor.foreground": "#efefef",
    },
  });
};
