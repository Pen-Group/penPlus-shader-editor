{
  window.categories = window.categories || {};

  class controls_category extends window.penPlusExtension {
    getInfo() {
      return {
        name: "Controls",
        id: "controls",
        color1: "#ffab19",
        color2: "#ec9c13",
        color3: "#cf8b17",
        blocks: [
          {
            opcode: "if",
            type: "command",
            text: "if %1 then %2 %3",
            tooltip: "If the input is true execute the inline code.",
            arguments: [
              {
                type: "input_value",
                check: "Boolean",
                name: "condition",
              },
              {
                type: "input_dummy",
              },
              {
                type: "input_statement",
                name: "true",
              },
            ],
          },
          {
            opcode: "ifelse",
            type: "command",
            text: "if %1 then %2 %3 else %4 %5",
            tooltip: "If the input is true execute the inline code.",
            arguments: [
              {
                type: "input_value",
                name: "condition",
                check: "Boolean",
              },
              {
                type: "input_dummy",
              },
              {
                type: "input_statement",
                name: "true",
              },
              {
                type: "input_dummy",
              },
              {
                type: "input_statement",
                name: "false",
              },
            ],
          },
          {
            opcode: "repeat",
            type: "command",
            text: ["repeat %1 %2", "%1"],
            alignment: ["LEFT", "RIGHT"],
            tooltip: "Repeats the specified amount of times.",
            arguments: [
              [
                {
                  type: "input_value",
                  name: "times",
                  shadow: {
                    type: "int_reporter",
                  },
                },
                {
                  type: "input_statement",
                  name: "code",
                },
              ],
              [
                {
                  type: "field_image",
                  name: "times",
                  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAA+CAYAAABnVDalAAACkklEQVR4Xu3bYVLDIBAF4PYUegy9m55C76bH0FNY6QwZQoF9hLfLJhN/NmmAL7sLIfV62fnf18fTXzqE1/ffK3tI9AuyO1i7Xo6Tn8fE2iWSBBTBWFC7Q0KBmFC7QsqBXt5+Vln2/flczM7RiNoNkgQUdTSgdoGEAmlBuUfqBdKAco20FYgN5RZpFIgJ5RKJBcSCcofEBmJAuULSAhqFcoOkDTQC5QLJCmgr1HQka6AtUFORZgH1Qk1Dmg3UAzUFyQsQCmWO5A0IgTJF8grUggp7USdStk1X2o+ahpTvKlq9QJDacYUUOusR6kSSwuj/eI5kXpNCH3vfdsRxjURdbd8bMLucSIJSfMtiWrhjn7ZE04xImoq0BcsSKX9PNyWSkFqQ1y8mUu/LysMjlWYr9CbF804kQMwtEus579CRdCIBIZ4izSzaoasu081TFJ1IQES7RGJFURgco2gfGokF5A7JYxS5QvIKVEWy+AF5WjNLuwKzp/20f6slALKF0ftwKE0g2kCh/dE+L0gIUBzwaKOtHcqRCGLOaA+R1KoH0tZnL1jrZngEWmoS8gggYdWiDInQUZxSBDHSbLVVEgcidRaFkupQelxqE70Wc12Ut3lFoqjU0REwFkzslybQPd0Y6xMEjA1TA2KmWTHdwodag0HTpue80s3pnUiQ9u5LAEY0IY2xztH4J5tW34pI8Qseo8oaaFkCaC7uWNFTm+Y1atDD7JZ+oLnQG8FqTQwaNaiJFA/WsKzTT5o1LYBW6ZbrSStlTTAvOKslQCsVLLEkHIv6U7KA3pZIUPmF0ShDUOK1rVJrM5JUq0aKsvTdmThwutUG0RtdEkZ+3APOMBK6dOjB8QST9huqST0DRfC8YtTGeQNTCriege44bQAAAABJRU5ErkJggg==",
                  width: 16,
                  height: 16,
                },
              ],
            ],
          },
          {
            opcode: "break",
            type: "terminal",
            text: "break %1",
            tooltip: "Repeats the specified amount of times.",
            arguments: [
              {
                type: "field_image",
                name: "times",
                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAA+CAYAAABnVDalAAACkklEQVR4Xu3bYVLDIBAF4PYUegy9m55C76bH0FNY6QwZQoF9hLfLJhN/NmmAL7sLIfV62fnf18fTXzqE1/ffK3tI9AuyO1i7Xo6Tn8fE2iWSBBTBWFC7Q0KBmFC7QsqBXt5+Vln2/flczM7RiNoNkgQUdTSgdoGEAmlBuUfqBdKAco20FYgN5RZpFIgJ5RKJBcSCcofEBmJAuULSAhqFcoOkDTQC5QLJCmgr1HQka6AtUFORZgH1Qk1Dmg3UAzUFyQsQCmWO5A0IgTJF8grUggp7USdStk1X2o+ahpTvKlq9QJDacYUUOusR6kSSwuj/eI5kXpNCH3vfdsRxjURdbd8bMLucSIJSfMtiWrhjn7ZE04xImoq0BcsSKX9PNyWSkFqQ1y8mUu/LysMjlWYr9CbF804kQMwtEus579CRdCIBIZ4izSzaoasu081TFJ1IQES7RGJFURgco2gfGokF5A7JYxS5QvIKVEWy+AF5WjNLuwKzp/20f6slALKF0ftwKE0g2kCh/dE+L0gIUBzwaKOtHcqRCGLOaA+R1KoH0tZnL1jrZngEWmoS8gggYdWiDInQUZxSBDHSbLVVEgcidRaFkupQelxqE70Wc12Ut3lFoqjU0REwFkzslybQPd0Y6xMEjA1TA2KmWTHdwodag0HTpue80s3pnUiQ9u5LAEY0IY2xztH4J5tW34pI8Qseo8oaaFkCaC7uWNFTm+Y1atDD7JZ+oLnQG8FqTQwaNaiJFA/WsKzTT5o1LYBW6ZbrSStlTTAvOKslQCsVLLEkHIv6U7KA3pZIUPmF0ShDUOK1rVJrM5JUq0aKsvTdmThwutUG0RtdEkZ+3APOMBK6dOjB8QST9huqST0DRfC8YtTGeQNTCriege44bQAAAABJRU5ErkJggg==",
                width: 16,
                height: 16,
              },
            ],
          },
        ],
      };
    }

    if(block, generator) {
      const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
      const trueExec = generator.statementToCode(block, "true");
      return `if (${condition}) {\n${trueExec}\n}`;
    }

    ifelse(block, generator) {
      const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
      const trueExec = generator.statementToCode(block, "true");
      const falseExec = generator.statementToCode(block, "false");
      return `if (${condition}) {\n${trueExec}\n}\nelse{\n${falseExec}\n}`;
    }

    repeat(block, generator) {
      const times = generator.valueToCode(block, "times", Order.ATOMIC);
      const code = generator.statementToCode(block, "code");
      window.loopID += 1;
      return `for (int penPlusLoop_${loopID}=0;penPlusLoop_${loopID}<int(${times});penPlusLoop_${loopID}++) {\n${code}\n}`;
    }

    break() {
      return `break;`;
    }
  }

  window.categories.controls = controls_category;
}
