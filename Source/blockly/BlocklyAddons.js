window.addEventListener("load", () => {
  /*
   * window.ContinuousCategory = ContinuousCategory;
   * window.ContinuousFlyout = ContinuousFlyout;
   *window.ContinuousFlyoutMetrics = ContinuousFlyoutMetrics;
   * window.ContinuousMetrics = ContinuousMetrics;
   * window.ContinuousToolbox = ContinuousToolbox;
   * window.DisableTopBlocks = DisableTopBlocks;
   * window.ZoomToFitControl = ZoomToFitControl;
   * window.FieldGridDropdown = FieldGridDropdown;
   */

  document.body.removeChild(document.getElementById("loadingScreen"));

  onAllAddonsLoaded();
});
