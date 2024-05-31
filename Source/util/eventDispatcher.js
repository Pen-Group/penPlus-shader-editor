(function() {
    penPlus.events = {
        "onCompileStart": []
    }

    penPlus.addEventListener = (eventName,eventFunction) => {
        if (penPlus.events[eventName]) {
            penPlus.events[eventName].push(eventFunction);
        }
    }

    penPlus.dispatchEvent = (eventName) => {
        if (penPlus.events[eventName]) {
            penPlus.events[eventName].forEach(event => {
                event();
            })
        }
    }
})()