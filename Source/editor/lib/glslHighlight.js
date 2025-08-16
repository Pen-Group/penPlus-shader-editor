penPlus.setupMonacoTheme = () => {
  monaco.languages.register({ id: "glsl" });
  const mainTypes = [
    [/(\/\/.*)/, "comment"],
    [/\/\*/, 'comment', '@comment'],
    
    [/((?:^|\W)float(?:$|\W))+/, "variable"],
    [/((?:^|\W)int(?:$|\W))+/, "int"],

    [/((?:^|\W)vec2(?:$|\W))+/, "vec-two"],
    [/((?:^|\W)vec3(?:$|\W))+/, "vec-three"],
    [/((?:^|\W)vec4(?:$|\W))+/, "vec-four"],

    [/((?:^|\W)mat2(?:$|\W))+/, "matrix"],
    [/((?:^|\W)mat3(?:$|\W))+/, "matrix"],
    [/((?:^|\W)mat4(?:$|\W))+/, "matrix"],

    [/((?:^|\W)lowp(?:$|\W))+/, "precision"],
    [/((?:^|\W)mediump(?:$|\W))+/, "precision"],
    [/((?:^|\W)highp(?:$|\W))+/, "precision"],
  ];
  const inFunctions = [
    [/([\{])/, "controls", "@controls"],

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
    ...mainTypes,

    [/((?:^|\W)return(?:$|\W))/, "my-blocks"],
    [/((?:^|\W)discard(?:$|\W))/, "my-blocks"],
    [/((?:^|\W)if(?:$|\W))/, "controls"],
    [/((?:^|\W)else(?:$|\W))/, "controls"],
    [/((?:^|\W)switch(?:$|\W))/, "controls"],
    [/((?:^|\W)case(?:$|\W))/, "controls"],
    [/((?:^|\W)for(?:$|\W))/, "controls"],
    [/((?:^|\W)while(?:$|\W))/, "controls"],
    [/((?:^|\W)do(?:$|\W))/, "controls"],
    [/((?:^|\W)break(?:$|\W))/, "controls"],
    [/((?:^|\W)continue(?:$|\W))/, "controls"],
    [/\(/, "my-blocks"],
    [/\)/, "my-blocks"],
  ]
  monaco.languages.setLanguageConfiguration("glsl", {
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
    ],
    folding: {
      markers: {
        start: /{/,
        end: /}/
      }
    }
  })
  monaco.languages.setMonarchTokensProvider("glsl", {
    tokenizer: {
      root: [
        
        [/layout.*\(.*location.*=.*\d\)/,"operator"],
        ...mainTypes,

        [/(sampler2D+)/, "texture"],
        [/(sampler3D+)/, "texture3d"],
        [/(samplerCube+)/, "cubemap"],

        [/(\d+\.\d+)/, "operator"],
        [/(\d+\.)/, "operator"],
        [/(\.\d+)/, "operator"],
        [/(\d+)/, "operator"],

        [/(true+)/, "operator"],
        [/(false+)/, "operator"],

        ...mainTypes,

        [/(varying+)/, "precision"],
        [/(attribute+)/, "precision"],
        [/(uniform+)/, "precision"],


        [/([\w_]*\s*)\(/, "my-blocks"],
        [/\)/, "my-blocks"],
        [/void/, "my-blocks"],
        [/struct/, "struct", "@struct"],
        [/{/,"my-blocks", "@myblock"],
      ],
      struct: [
        ...mainTypes,

        [/{/, 'struct'],
        [/}/, 'struct', '@pop'],
      ],
      myblock: [
        [/}/, 'my-blocks', '@pop'],
        ...inFunctions,
      ],
      controls: [
        [/}/, 'controls', '@pop'],
        ...inFunctions,
      ]
      ,
      comment: [
        [/[^\/*]+/, 'comment'],
        ['\\*/', 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
    },
  });

  penPlus.updateMonacoTheme = () => {
    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("myCoolTheme", {
      base: `vs${penPlus.editorTheme == "dark" ? "-dark" : ""}`,
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
          token: "texture3d",
          foreground: penPlus.penPlusTheme.blockStyles["texture3d_blocks"].colourPrimary,
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

        {
          token: "struct",
          foreground: penPlus.experimental?penPlus.penPlusTheme.blockStyles["structs_blocks"].colourPrimary:'#ffffff',
        },
      ],
      colors: {
        "editor.foreground": penPlus.editorTheme == "dark" ? "#efefef" : "#1f1f1f",
      },
    });
  }
  
  penPlus.updateMonacoTheme();
};
