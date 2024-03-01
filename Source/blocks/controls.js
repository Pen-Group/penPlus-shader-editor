{
  penPlus.categories = penPlus.categories || {};

  class controls_category extends penPlus.penPlusExtension {
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
            opcode: "continue",
            type: "terminal",
            text: "continue %1",
            tooltip: "skips to the next iteration of a loop",
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
          {
            opcode: "break",
            type: "terminal",
            text: "break %1",
            tooltip: "Breaks a loop",
            arguments: [
              {
                type: "field_image",
                name: "times",
                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAYAAAASYli2AAAAAXNSR0IArs4c6QAAAMxJREFUSEvtltENwyAMRGGbdIhml3SwZpd2iGabVEYyMZaBs/IRRYJv8+Q7Y+MYgPN7P/fH6xuB0NANIhiDEGgTKGEoFAJOyyds65yYvSxvDGT/SC4fRHZV8gAmG4eH5qxwPRvExwE8fLZa7zoPrcnMucppIzO03gwN39iC0SUPkOIzUF9EfjgZw32e3mGtAChUDo0CaEnsQfUEyp0ivUTlM0z+hkXreaAWLBVFS0KgNZgJlEXSnrZAnBj00WsVre3BtSydXkU4M8869wfziMuD3BVjeQAAAABJRU5ErkJggg==",
                width: 16,
                height: 16,
              },
            ],
          },
          {
            opcode: "discard",
            type: "terminal",
            text: "discard %1",
            tooltip: "discards the current pixel",
            arguments: [
              {
                type: "field_image",
                name: "times",
                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAAAXNSR0IArs4c6QAAALFJREFUWEftl1ESgCAIROP+h7bxg0YRWjSzmuhTqacLbkib40kpJUfYEUJEhOJhQC+UgQj+HbC1E6nM1B2jj5VwFEujOUTFg+Z/CGZJVknOuT+OU4BRVY7Ov19qXqHlTN5x6eGnxSXdhyG942VaGqnzJPLbq+BywdXfKcC9ubTiteYgpK6aupB62TnO1TjTMt0GMvoHst4zwZptzoLLQm0a+rs6kQCrd6fZcmu3iscubTtqbxgkZiXUewAAAABJRU5ErkJggg==",
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
      return (
        `if (${condition}) {\n${trueExec}\n}` +
        nextBlockToCode(block, generator)
      );
    }

    ifelse(block, generator) {
      const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
      const trueExec = generator.statementToCode(block, "true");
      const falseExec = generator.statementToCode(block, "false");
      return (
        `if (${condition}) {\n${trueExec}\n}\nelse{\n${falseExec}\n}` +
        nextBlockToCode(block, generator)
      );
    }

    repeat(block, generator) {
      const times = generator.valueToCode(block, "times", Order.ATOMIC);
      const code = generator.statementToCode(block, "code");
      penPlus.loopID += 1;
      return (
        `for (int penPlusLoop_${loopID}=0;penPlusLoop_${loopID}<int(${times});penPlusLoop_${loopID}++) {\n${code}\n}` +
        nextBlockToCode(block, generator)
      );
    }

    continue() {
      return `continue;\n`;
    }

    break() {
      return `break;\n`;
    }

    discard() {
      return `discard;\n`;
    }
  }

  penPlus.categories.controls = controls_category;
}
