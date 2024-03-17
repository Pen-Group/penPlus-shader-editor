(function () {
  penPlus.highlightREGEX = highlights = [
    //Custom blocks and functions
    {
      name: "func_Highlight",
      match: [/^([A-z_\d]+)\(/, "", "("],
    },
    {
      name: "func_Highlight",
      match: /^(return+)/,
    },

    //Variables
    {
      name: "float_Highlight",
      match: /^(float+)/,
    },
    {
      name: "int_Highlight",
      match: /^(int+)/,
    },

    {
      name: "vec2_Highlight",
      match: /^(vec2+)/,
    },
    {
      name: "vec3_Highlight",
      match: /^(vec3+)/,
    },
    {
      name: "vec4_Highlight",
      match: /^(vec4+)/,
    },

    {
      name: "matrix_Highlight",
      match: /^(mat2+)/,
    },
    {
      name: "matrix_Highlight",
      match: /^(mat3+)/,
    },
    {
      name: "matrix_Highlight",
      match: /^(mat4+)/,
    },

    {
      name: "texture_Highlight",
      match: /^(sampler2D+)/,
    },
    {
      name: "cubemap_Highlight",
      match: /^(samplerCube+)/,
    },
    {
      name: "func_Highlight",
      match: /^(void+)/,
    },

    //comment highlight
    {
      name: "comment_Highlight",
      match: /^(\/\/[\w\d\s\+\-\*\?\/\\\.\,1-90\!\@\#\$\%\^\&\(\)\_\=\`\~\<\>\]\[\"\'\:]+\n)/,
    },

    //operators
    {
      name: "operator_Highlight",
      match: /^(>=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(<=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(>+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(<+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(==+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\*+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\++)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\-+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\/+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\*=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\+=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\-=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\/=+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\|\|+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\&\&+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\^\^+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\![=]+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\>\>+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\<\<+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\&+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\^+)/,
    },
    {
      name: "operator_Highlight",
      match: /^(\|+)/,
    },

    //precisions
    {
      name: "precision_Highlight",
      match: /^(lowp+)/,
    },
    {
      name: "precision_Highlight",
      match: /^(mediump+)/,
    },
    {
      name: "precision_Highlight",
      match: /^(highp+)/,
    },
    {
      name: "precision_Highlight",
      match: /^(varying+)/,
    },
    {
      name: "precision_Highlight",
      match: /^(attribute+)/,
    },
    {
      name: "precision_Highlight",
      match: /^(uniform+)/,
    },

    //statements
    {
      name: "controls_Highlight",
      match: /^((?:^|\W)if(?:$|\W))/,
    },
    {
      name: "controls_Highlight",
      match: /^((?:^|\W)else(?:$|\W))/,
    },
    {
      name: "controls_Highlight",
      match: /^((?:^|\W)switch(?:$|\W))/,
    },
    {
      name: "controls_Highlight",
      match: /^((?:^|\W)case(?:$|\W))/,
    },
    {
      name: "controls_Highlight",
      match: /^((?:^|\W)for(?:$|\W))/,
    },
  ];
})();
