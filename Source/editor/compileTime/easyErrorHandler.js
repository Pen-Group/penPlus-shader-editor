(function () {
  const assignToREGEX = /((?<=to ').*(?='))/;
  const assignFromREGEX = /((?<=cannot convert from ').*(?=' to))/;

  const constructorNameREGEX = /((?<=constructing ).*(?= from))/;
  const constructorFromREGEX = /((?<=from ).*(?= can))/;

  const numREGEX = /\d/;

  const typeFromLongDescription = (description) => {
    if (description.includes("vector")) {
      switch (numREGEX.exec(description)[0]) {
        case "2":
          return "Vector 2";

        case "3":
          return "Vector 3";

        case "4":
          return "Vector 4";

        default:
          return "Unknown type";
      }
    } else if (description.includes("matrix")) {
      const split = description.split(" ");
      if (split.length > 5) {
        return `${split[2]} ${split[3]}`;
      } else if (split.length == 1) {
        return split[0];
      } else {
        return `${split[1]} ${split[2]}`;
      }
    }

    return description.split(" ")[description.split(" ").length - 1].replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  penPlus.easyErrorHandler = (error) => {
    if (error.includes(": dimension mismatch")) {
      return;
    }

    let returnedError = error;

    const lineNumber = error.split(":")[1];

    if (error.includes("cannot convert from")) {
      let from = typeFromLongDescription(assignFromREGEX.exec(error)[1]);
      let to = typeFromLongDescription(assignToREGEX.exec(error)[1]);

      if (error.includes("assign")) {
        returnedError = `Cannot assign a ${from} to a ${to} : At line ${lineNumber} in GLSL`;
      } else {
        returnedError = `Invalid operation between a ${from} and a ${to} : At line ${lineNumber} in GLSL`;
      }
    }
    //constructor.
    else if (error.includes("'constructor' : too many arguments")) {
      returnedError = `Constructor at ${lineNumber} in GLSL is invalid!`;
    }
    //Can only take one argument
    else if (error.includes("can only take one argument")) {
      let from = typeFromLongDescription(constructorNameREGEX.exec(error)[1]);
      let to = typeFromLongDescription(constructorFromREGEX.exec(error)[1]);

      returnedError = `Constructing a ${from} using a ${to} and other arguments is not vaild : At line ${lineNumber} in GLSL`;
    }
    //I'm screaming
    else if (error.includes("Invalid operation")) {
      if (error.includes("opaque type")) {
        returnedError = `An operation with a special variable type is invalid! : At line ${lineNumber} in GLSL`;
      }
    }
    //If something is undeclared
    else if (error.includes("undeclared identifier")) {
      returnedError = `Unknown variable ${error.split(":")[2]} : At line ${lineNumber} in GLSL`;
    }
    //If a void function returns a value
    else if (error.includes("void function cannot return a value")) {
      returnedError = `Unexpected return : At line ${lineNumber} in GLSL`;
    } else if (error.includes("function does not return a value")) {
      returnedError = `function ${error.split(":")[2]} has is missing a returning point : At line ${lineNumber} in GLSL`;
    } else if (error.includes("Recursive function cal")) {
      returnedError = `Recursion detected in function ${error.split("-> ")[1].replace(")", "")}`;
    }

    return returnedError;
  };
})();
