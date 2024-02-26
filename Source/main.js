function onAllAddonsLoaded() {
  window.toolbox = {
    kind: "categoryToolbox",
    contents: [],
  };

  addImportantReporters();
  Blockly.blockRendering.register(
    "pen_plus_renderer",
    window.customZelosRenderer
  );
  workspace = Blockly.inject("BlocklyDiv", {
    toolbox: window.toolbox,
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
      toolbox: window.ContinuousToolbox,
      flyoutsVerticalToolbox: window.ContinuousFlyout,
      metricsManager: window.ContinuousMetrics,
    },
    theme: penPlusBlocklyTheme(),
  });
  window.workspace = workspace;

  createGLSLGen();
  addVariableTypes();
  addBlocks();

  const zoomToFit = new ZoomToFitControl(workspace);
  zoomToFit.init();

  window.supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
  ]);

  // Add the disableOrphans event handler. This is not done automatically by
  // the plugin and should be handled by your application.
  workspace.addChangeListener(Blockly.Events.disableOrphans);

  workspace.addChangeListener(updateGLSL);

  workspace.registerButtonCallback("createVariable", (button) => {});

  // The plugin must be initialized before it has any effect.
  const disableTopBlocksPlugin = new window.DisableTopBlocks();
  disableTopBlocksPlugin.init();
}
