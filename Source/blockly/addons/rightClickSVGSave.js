(function() {
    const download = (data, filename, type) => {
        var file = new Blob([data], { type: type });
    
        if (window.navigator.msSaveOrOpenBlob) {
          // For IE10+
          window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
          // For other browsers
          var a = document.createElement("a");
          var url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }
      };

    const saveImage = {
        id: 'saveImage',
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        displayText: (scope) => {
            return `Save block stack as SVG`;
        },
        weight: 15,
        preconditionFn: (scope) => {
            if (scope.block) {
                return 'enabled';
            }
            return 'hidden';
        },
        callback: (scope, e) => {
            const group = scope.block.svgGroup_;
            const bounds = group.getBoundingClientRect();
            const outerHTML = `<svg width="${Math.floor(bounds.width / penPlus.workspace.scale)}" height="${Math.floor(bounds.height / penPlus.workspace.scale)}" xmlns="http://www.w3.org/2000/svg" xmlns:html="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">${group.outerHTML.replaceAll("&nbsp;"," ").replaceAll(/class="[\w\d\s]*"/g, "").replace(/transform="[\w\.\(\)\s\d\,]*"/,"")}</svg>`;
            download(outerHTML,`${Date.now()}.svg`,"");
        }
        
    }

    Blockly.ContextMenuRegistry.registry.register(saveImage);
})();
