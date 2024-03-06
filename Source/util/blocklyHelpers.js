(function() {
    penPlus.toBlocklyArg = (inputJson) => {
        let argument = inputJson;

        if (argument.type == "input_statement") {
            argument.check = argument.check || "Action";
        }

        return argument;
    }
})()