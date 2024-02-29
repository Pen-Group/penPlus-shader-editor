(function() {
    penPlus.createMenu = (contents, named) => {
        return {
          type: "field_dropdown",
          name: named,
          options: contents,
        };
      }
      
    penPlus.createGrid = (contents, named, columns) => {
      return {
        type: "field_grid_dropdown",
        name: named,
        columns: columns,
        options: contents,
      };
    }
})();