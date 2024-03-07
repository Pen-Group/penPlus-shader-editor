(function () {
  const parser = new DOMParser();

  penPlus.stringToDOM = (xmlString) => {
    return parser.parseFromString(xmlString, "text/xml").childNodes[0];
  };
})();
