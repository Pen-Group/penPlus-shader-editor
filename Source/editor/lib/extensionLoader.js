(function() {
    penPlus.addExtension = (URL) => {
        fetch(URL).then(fetched => fetched.text()).then(text => {
            const script = document.createElement("script");
            script.innerHTML = text;
            document.body.appendChild(script);
        });
    }
})();