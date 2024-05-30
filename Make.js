//requiring path DOM, readline, and fs modules
const path = require("path");
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Compilation Started");

//Define directories
const InputDir = "Source/";
const OutputDir = "Build/";

//Default build prefix
let buildPrefix = "Default";
//Check if persist and build folders exist
if (!fs.existsSync("persist")) {
  fs.mkdirSync("persist");
}

if (!fs.existsSync("Build")) {
  fs.mkdirSync("Build");
}

//Check if the build name exists
if (!fs.existsSync("persist/buildName.txt")) {
  //If not ask
  console.log("Enter build name.\nWill be saved for later.\n");

  readline.question("Build Prefix : ", (name) => {
    buildPrefix = name;

    //Save for later builds
    fs.appendFileSync("persist/buildName.txt", name, (err) => {
      if (err) {
        console.log("Name saving failed");
      } else {
        console.log("Name saved");
      }
    });

    //Build
    build();
  });
} else {
  //If it does read it and build
  buildPrefix = fs.readFileSync("persist/buildName.txt", {
    encoding: "utf8",
    flag: "r",
  });

  build();
}

function build() {
  //Function to check if a source is a URL
  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  console.log("Directories Found\nReading Input");

  //Try to find the HTML file
  fs.readdir(InputDir, (error, files) => {
    if (error) {
      console.error("Read Failed Aborting");
      return;
    }

    //Alert the user that the input was successful
    console.log("Read of input successful");
    console.log("Directory contains", files);
    console.log("Searching for html file");

    //Find the HTML file
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
    };

    const htmlFile = findHtmlFile();

    //If there is no html file cry and let the user see
    if (!htmlFile) {
      console.error("Read Failed Aborting");
      return;
    }

    console.log("Html file '" + htmlFile + "' found!");

    //Read the file
    fs.readFile(InputDir + htmlFile, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Read started");

      //Create the data and dom objects
      let htmlFileDat = data;

      let dataReader = new JSDOM(htmlFileDat);

      let head = new JSDOM(htmlFileDat).window.document.head.innerHTML;

      //Locate scripts and grab keys, Also create a counter
      let scripts = dataReader.window.document.body.getElementsByTagName("script");

      let scriptKeys = Object.keys(scripts);

      let scriptsLoaded = 0;

      //Function that is called when a script is loaded into the new output file
      const onScriptLoaded = () => {
        if (scriptsLoaded == scriptKeys.length) {
          console.log(dataReader.window.document.body.innerHTML);
          console.log("new html created.");
          console.log("old replaced with new");
          fs.appendFile(
            OutputDir + buildPrefix + "_" + htmlFile + "_Build_" + Date.now() + ".html",
            `<!DOCTYPE html>
                    <html lang="en">
                      <head>` +
              head +
              `</head>
                      <body>` +
              dataReader.window.document.body.innerHTML +
              `</body>
                    </html>
                    `,
            (err) => {
              if (err) {
                console.log("File creation failed");
              }
              console.log("file exported as '" + buildPrefix + "_" + htmlFile + "_Build_" + Date.now() + "' check Build for the result");
              process.exit();
            }
          );
        }
      };

      //Loop through the scripts loading them into the output file
      scriptKeys.forEach((element) => {
        let filename = scripts[element].getAttribute("src");
        if (!isValidUrl(filename)) {
          fs.readFile(InputDir + filename, "utf8", (err, data) => {
            if (err) {
              console.error("Could not read filedata");
              return;
            }

            scripts[element].innerHTML = data;

            console.log("Read and added " + scripts[element].getAttribute("src") + " to standalone html");

            scripts[element].removeAttribute("src");
            scriptsLoaded += 1;
            onScriptLoaded();
          });
        } else {
          scriptsLoaded += 1;
          onScriptLoaded();
        }
      });
    });
  });
}
