//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

console.log("Compilation Started");

const InputDir = "Source/";
const OutputDir = "Build/";

const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

console.log("Directories Found\nReading Input");

fs.readdir(InputDir,(error, files) => {
    if (error) {
        console.error("Read Failed Aborting");
        return;
    }
    console.log("Read of input successful")
    console.log("Directory contains", files)
    console.log("Searching for html file")

    const findHtmlFile = () => {
        for (let file = 0; file < files.length; file++) {
            const curFile = files[file];
            if (curFile.match(/(\w*)\.html$/) != null) {
                return curFile;
            }
        }

        if (error) {
            console.error("Could not find html file");
            return null;
        }
    }

    const htmlFile = findHtmlFile();

    if (!htmlFile) {
        console.error("Read Failed Aborting");
        return;
    }

    console.log("Html file '" + htmlFile + "' found!");

    fs.readFile(InputDir + htmlFile, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Read started");

        let htmlFileDat = data;

        let dataReader = new JSDOM(htmlFileDat);

        let head = new JSDOM(htmlFileDat).window.document.head.innerHTML;

        let scripts = dataReader.window.document.body.getElementsByTagName('script');

        let scriptKeys = Object.keys(scripts);

        let scriptsLoaded = 0;

        const onScriptLoaded = () => {
            if (scriptsLoaded == scriptKeys.length) {
                console.log(dataReader.window.document.body.innerHTML);
                console.log("new html created.");
                console.log("old replaced with new");
                fs.appendFile(OutputDir + htmlFile + "_Build_" + Date.now() + ".html",
                `<!DOCTYPE html>
                <html lang="en">
                  <head>`+head+
                  `</head>
                  <body>`+
                dataReader.window.document.body.innerHTML + `</body>
                </html>
                `
                , (err) => {
                    if (err) {
                        console.log("File creation failed");
                    }
                    console.log("file exported as '" + htmlFile + "_Build_" + Date.now() + "' check Build for the result")
                });
            }
        }

        scriptKeys.forEach(element => {
            let filename = scripts[element].getAttribute("src");
            if (!isValidUrl(filename)) {
                fs.readFile(InputDir + filename, 'utf8', (err, data) => {
                    if (err) {
                        console.error("Could not read filedata");
                        return;
                    }

                    scripts[element].innerHTML = data;
                    
                    console.log("Read and added " + scripts[element].getAttribute("src") + " to standalone html")
                    
                    scripts[element].removeAttribute("src");
                    scriptsLoaded += 1;
                    onScriptLoaded();
                })
            }
            else{
                scriptsLoaded += 1;
                onScriptLoaded();
            }
        });
    });
})