function onAllAddonsLoaded() {
  penPlus.toolbox = {
    kind: "categoryToolbox",
    contents: [],
  };

  //Custom zelos renderer.
  addImportantReporters();
  Blockly.blockRendering.register(
    "pen_plus_renderer",
    penPlus.customZelosRenderer
  );

  workspace = Blockly.inject("BlocklyDiv", {
    toolbox: penPlus.toolbox,
    collapse: false,
    comments: true,
    renderer: "pen_plus_renderer",
    grid: {
      spacing: 40,
      length: 3,
      colour: "#484848",
      snap: false,
    },
    zoom: {
      controls: true,
      wheel: false,
      startScale: 0.8,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true,
      },
      drag: true,
      wheel: true,
    },
    trashcan: false, // we don't want the recycling bin. Maybe it can be an option though?
    plugins: {
      toolbox: penPlus.ContinuousToolbox,
      flyoutsVerticalToolbox: penPlus.ContinuousFlyout,
      metricsManager: penPlus.ContinuousMetrics,
    },
    theme: penPlusBlocklyTheme(),
  });

  penPlus.workspace = workspace;

  //Experimental features.
  const urlParams = new URLSearchParams(document.location.search);
  penPlus.experimental = urlParams.get("experimental") == "true";
  if (penPlus.experimental) {
    console.log("you are using experimental code! Be careful!");
  }

  //Create the generator and add our blocks
  createGLSLGen();
  addBlocks();

  //Setup monaco
  penPlus.setupMonacoTheme();
  penPlus.setupMonacoEditor();

  //Zoom to fit addon
  const zoomToFit = new penPlus.ZoomToFitControl(workspace);
  zoomToFit.init();

  //Our auto recompile events
  penPlus.supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
  ]);

  //Init our preview render
  previewRender();

  // Add the disableOrphans event handler. This is not done automatically by
  // the plugin and should be handled by your application.
  workspace.addChangeListener(Blockly.Events.disableOrphans);

  workspace.addChangeListener(updateGLSL);

  //workspace.registerButtonCallback("createVariable", (button) => {});

  // The plugin must be initialized before it has any effect.
  const disableTopBlocksPlugin = new penPlus.DisableTopBlocks();
  disableTopBlocksPlugin.init();
}
