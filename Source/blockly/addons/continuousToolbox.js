(function () {
  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */

  /**
   * @fileoverview Toolbox category with styling for continuous toolbox.
   */

  /** Toolbox category for continuous toolbox. */
  class ContinuousCategory extends Blockly.ToolboxCategory {
    /**
     * Constructor for ContinuousCategory which is used in ContinuousToolbox.
     * @override
     */
    constructor(categoryDef, toolbox) {
      super(categoryDef, toolbox);
    }

    /** @override */
    createLabelDom_(name) {
      const label = document.createElement("div");
      label.setAttribute("id", this.getId() + ".label");
      label.textContent = name;
      label.classList.add(this.cssConfig_["label"]);
      return label;
    }

    /** @override */
    createIconDom_() {
      const icon = document.createElement("div");
      icon.classList.add("categoryBubble");
      icon.style.backgroundColor = this.colour_;
      return icon;
    }

    /** @override */
    addColourBorder_() {
      // No-op
    }

    /** @override */
    setSelected(isSelected) {
      if (isSelected) {
        this.rowDiv_.style.backgroundColor = "gray";
        Blockly.utils.dom.addClass(this.rowDiv_, this.cssConfig_["selected"]);
      } else {
        this.rowDiv_.style.backgroundColor = "";
        Blockly.utils.dom.removeClass(
          this.rowDiv_,
          this.cssConfig_["selected"]
        );
      }
      Blockly.utils.aria.setState(
        /** @type {!Element} */ (this.htmlDiv_),
        Blockly.utils.aria.State.SELECTED,
        isSelected
      );
    }
  }

  Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    ContinuousCategory,
    true
  );

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */

  /**
   * @fileoverview Flyout that supports always-open continuous scrolling.
   */

  /**
   * Class for continuous flyout.
   */
  class ContinuousFlyout extends Blockly.VerticalFlyout {
    /** @override */
    constructor(workspaceOptions) {
      super(workspaceOptions);

      /**
       * List of scroll positions for each category.
       * @type {!Array<{name: string, position: !Object}>}
       */
      this.scrollPositions = [];

      /**
       * Target scroll position, used to smoothly scroll to a given category
       * location when selected.
       * @type {?number}
       */
      this.scrollTarget = null;

      /**
       * The percentage of the distance to the scrollTarget that should be
       * scrolled at a time. Lower values will produce a smoother, slower scroll.
       * @type {number}
       */
      this.scrollAnimationFraction = 0.3;

      /**
       * Whether to recycle blocks when refreshing the flyout. When false, do not
       * allow anything to be recycled. The default is to recycle.
       * @type {boolean}
       * @private
       */
      this.recyclingEnabled_ = true;

      this.workspace_.setMetricsManager(
        new ContinuousFlyoutMetrics(this.workspace_, this)
      );

      this.workspace_.addChangeListener((e) => {
        if (e.type === Blockly.Events.VIEWPORT_CHANGE) {
          this.selectCategoryByScrollPosition_(-this.workspace_.scrollY);
        }
      });

      this.autoClose = false;
    }

    /**
     * Gets parent toolbox.
     * Since we registered the ContinuousToolbox, we know that's its type.
     * @returns {!ContinuousToolbox} Toolbox that owns this flyout.
     * @private
     */
    getParentToolbox_() {
      const toolbox = this.targetWorkspace.getToolbox();
      return /** @type {!ContinuousToolbox} */ (toolbox);
    }

    /**
     * Records scroll position for each category in the toolbox.
     * The scroll position is determined by the coordinates of each category's
     * label after the entire flyout has been rendered.
     * @package
     */
    recordScrollPositions() {
      this.scrollPositions = [];
      const categoryLabels = this.buttons_.filter(
        (button) =>
          button.isLabel() &&
          this.getParentToolbox_().getCategoryByName(button.getButtonText())
      );
      for (const [index, button] of categoryLabels.entries()) {
        if (button.isLabel()) {
          const position = button.getPosition();
          const adjustedPosition = new Blockly.utils.Coordinate(
            position.x,
            position.y - this.labelGaps[index]
          );
          this.scrollPositions.push({
            name: button.getButtonText(),
            position: adjustedPosition,
          });
        }
      }
    }

    /**
     * Returns the scroll position for the given category name.
     * @param {string} name Category name.
     * @returns {?Object} Scroll position for given category, or null if not
     *     found.
     * @package
     */
    getCategoryScrollPosition(name) {
      for (const scrollInfo of this.scrollPositions) {
        if (scrollInfo.name === name) {
          return scrollInfo.position;
        }
      }
      console.warn(`Scroll position not recorded for category ${name}`);
      return null;
    }

    /**
     * Selects an item in the toolbox based on the scroll position of the flyout.
     * @param {number} position Current scroll position of the workspace.
     * @private
     */
    selectCategoryByScrollPosition_(position) {
      // If we are currently auto-scrolling, due to selecting a category by
      // clicking on it, do not update the category selection.
      if (this.scrollTarget !== null) {
        return;
      }
      const scaledPosition = Math.round(position / this.workspace_.scale);
      // Traverse the array of scroll positions in reverse, so we can select the
      // furthest category that the scroll position is beyond.
      for (let i = this.scrollPositions.length - 1; i >= 0; i--) {
        const category = this.scrollPositions[i];
        if (scaledPosition >= category.position.y) {
          this.getParentToolbox_().selectCategoryByName(category.name);
          return;
        }
      }
    }

    /**
     * Scrolls flyout to given position.
     * @param {number} position The Y coordinate to scroll to.
     */
    scrollTo(position) {
      // Set the scroll target to either the scaled position or the lowest
      // possible scroll point, whichever is smaller.
      const metrics = this.workspace_.getMetrics();
      this.scrollTarget = Math.min(
        position * this.workspace_.scale,
        metrics.scrollHeight - metrics.viewHeight
      );

      this.stepScrollAnimation_();
    }

    /**
     * Step the scrolling animation by scrolling a fraction of the way to
     * a scroll target, and request the next frame if necessary.
     * @private
     */
    stepScrollAnimation_() {
      if (this.scrollTarget === null) {
        return;
      }

      const currentScrollPos = -this.workspace_.scrollY;
      const diff = this.scrollTarget - currentScrollPos;
      if (Math.abs(diff) < 1) {
        this.workspace_.scrollbar.setY(this.scrollTarget);
        this.scrollTarget = null;
        return;
      }
      this.workspace_.scrollbar.setY(
        currentScrollPos + diff * this.scrollAnimationFraction
      );

      requestAnimationFrame(this.stepScrollAnimation_.bind(this));
    }

    /**
     * Add additional padding to the bottom of the flyout if needed,
     * in order to make it possible to scroll to the top of the last category.
     * @param {!Blockly.MetricsManager.ContainerRegion} contentMetrics Content
     *    metrics for the flyout.
     * @param {!Blockly.MetricsManager.ContainerRegion} viewMetrics View metrics
     *    for the flyout.
     * @returns {number} Additional bottom padding.
     */
    calculateBottomPadding(contentMetrics, viewMetrics) {
      if (this.scrollPositions.length > 0) {
        const lastCategory =
          this.scrollPositions[this.scrollPositions.length - 1];
        const lastPosition = lastCategory.position.y * this.workspace_.scale;
        const lastCategoryHeight = contentMetrics.height - lastPosition;
        if (lastCategoryHeight < viewMetrics.height) {
          return viewMetrics.height - lastCategoryHeight;
        }
      }
      return 0;
    }

    /** @override */
    getX() {
      if (
        this.isVisible() &&
        this.targetWorkspace.toolboxPosition === this.toolboxPosition_ &&
        this.targetWorkspace.getToolbox() &&
        this.toolboxPosition_ !== Blockly.utils.toolbox.Position.LEFT
      ) {
        // This makes it so blocks cannot go under the flyout in RTL mode.
        return this.targetWorkspace.getMetricsManager().getViewMetrics().width;
      }

      return super.getX();
    }

    /**
     * @override
     */
    show(flyoutDef) {
      super.show(flyoutDef);
      this.recordScrollPositions();
      this.workspace_.resizeContents();
      this.selectCategoryByScrollPosition_(0);
    }

    /**
     * Determine if this block can be recycled in the flyout.  Blocks that have no
     * variables and are not dynamic shadows can be recycled.
     * @param {!Blockly.BlockSvg} block The block to attempt to recycle.
     * @returns {boolean} True if the block can be recycled.
     * @protected
     */
    blockIsRecyclable_(block) {
      if (!this.recyclingEnabled_) {
        return false;
      }

      // If the block needs to parse mutations, never recycle.
      if (block.mutationToDom && block.domToMutation) {
        return false;
      }

      if (!block.isEnabled()) {
        return false;
      }

      for (const input of block.inputList) {
        for (const field of input.fieldRow) {
          // No variables.
          if (field.referencesVariables()) {
            return false;
          }
          if (field instanceof Blockly.FieldDropdown) {
            if (field.isOptionListDynamic()) {
              return false;
            }
          }
        }
        // Check children.
        if (input.connection) {
          const targetBlock =
            /** @type {Blockly.BlockSvg} */
            (input.connection.targetBlock());
          if (targetBlock && !this.blockIsRecyclable_(targetBlock)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * Sets the function used to determine whether a block is recyclable.
     * @param {function(!Blockly.BlockSvg):boolean} func The function used to
     *     determine if a block is recyclable.
     * @public
     */
    setBlockIsRecyclable(func) {
      this.blockIsRecyclable_ = func;
    }

    /**
     * Set whether the flyout can recycle blocks.
     * @param {boolean} isEnabled True to allow blocks to be recycled, false
     *     otherwise.
     * @public
     */
    setRecyclingEnabled(isEnabled) {
      this.recyclingEnabled_ = isEnabled;
    }

    /**
     * Lay out the blocks in the flyout.
     * @param {Array<Blockly.Flyout.FlyoutItem>} contents The blocks and buttons to lay out.
     * @param {Array<number>} gaps The visible gaps between blocks.
     */
    layout_(contents, gaps) {
      super.layout_(contents, gaps);
      this.labelGaps = [];
      for (const [index, item] of contents.entries()) {
        if (item.type === "button" && item.button.isLabel()) {
          this.labelGaps.push(gaps[index - 1] ?? this.MARGIN);
        }
      }
    }
  }

  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */

  /**
   * @fileoverview Overrides metrics to exclude the flyout from the viewport.
   */

  /** Computes metrics for a toolbox with an always open flyout. */
  class ContinuousMetrics extends Blockly.MetricsManager {
    /** @override */
    constructor(workspace) {
      super(workspace);
    }
    /**
     * Computes the viewport size to not include the toolbox and the flyout.
     * The default viewport includes the flyout.
     * @override
     */
    getViewMetrics(getWorkspaceCoordinates = undefined) {
      const scale = getWorkspaceCoordinates ? this.workspace_.scale : 1;
      const svgMetrics = this.getSvgMetrics();
      const toolboxMetrics = this.getToolboxMetrics();
      const flyoutMetrics = this.getFlyoutMetrics(false);
      const toolboxPosition = toolboxMetrics.position;

      if (this.workspace_.getToolbox()) {
        // Note: Not actually supported at this time due to ContinunousToolbox
        // only supporting a vertical flyout. But included for completeness.
        if (
          toolboxPosition == Blockly.TOOLBOX_AT_TOP ||
          toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM
        ) {
          svgMetrics.height -= toolboxMetrics.height + flyoutMetrics.height;
        } else if (
          toolboxPosition == Blockly.TOOLBOX_AT_LEFT ||
          toolboxPosition == Blockly.TOOLBOX_AT_RIGHT
        ) {
          svgMetrics.width -= toolboxMetrics.width + flyoutMetrics.width;
        }
      }
      return {
        height: svgMetrics.height / scale,
        width: svgMetrics.width / scale,
        top: -this.workspace_.scrollY / scale,
        left: -this.workspace_.scrollX / scale,
      };
    }

    /**
     * Moves the absoluteLeft and absoluteTop so they no longer include the
     * flyout.
     * @override
     */
    getAbsoluteMetrics() {
      const toolboxMetrics = this.getToolboxMetrics();
      const flyoutMetrics = this.getFlyoutMetrics(false);
      const toolboxPosition = toolboxMetrics.position;
      let absoluteLeft = 0;

      if (
        this.workspace_.getToolbox() &&
        toolboxPosition == Blockly.TOOLBOX_AT_LEFT
      ) {
        absoluteLeft = toolboxMetrics.width + flyoutMetrics.width;
      }
      let absoluteTop = 0;
      if (
        this.workspace_.getToolbox() &&
        toolboxPosition == Blockly.TOOLBOX_AT_TOP
      ) {
        absoluteTop = toolboxMetrics.height + flyoutMetrics.height;
      }
      return {
        top: absoluteTop,
        left: absoluteLeft,
      };
    }
  }

  Blockly.registry.register(
    Blockly.registry.Type.METRICS_MANAGER,
    "CustomMetricsManager",
    ContinuousMetrics
  );

  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */

  /** Adds additional padding to the bottom of the flyout if needed. */
  class ContinuousFlyoutMetrics extends Blockly.FlyoutMetricsManager {
    /** @override */
    constructor(workspace, flyout) {
      super(workspace, flyout);
    }
    /**
     * Adds additional padding to the bottom of the flyout if needed,
     * in order to make it possible to scroll to the top of the last category.
     * @override
     */
    getScrollMetrics(
      getWorkspaceCoordinates = undefined,
      cachedViewMetrics = undefined,
      cachedContentMetrics = undefined
    ) {
      const scrollMetrics = super.getScrollMetrics(
        getWorkspaceCoordinates,
        cachedViewMetrics,
        cachedContentMetrics
      );
      const contentMetrics =
        cachedContentMetrics || this.getContentMetrics(getWorkspaceCoordinates);
      const viewMetrics =
        cachedViewMetrics || this.getViewMetrics(getWorkspaceCoordinates);

      if (scrollMetrics) {
        scrollMetrics.height += this.flyout_.calculateBottomPadding(
          contentMetrics,
          viewMetrics
        );
      }
      return scrollMetrics;
    }
  }

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */

  /**
   * @fileoverview Toolbox that uses a continuous scrolling flyout.
   */

  /**
   * Class for continuous toolbox.
   */
  class ContinuousToolbox extends Blockly.Toolbox {
    /** @override */
    constructor(workspace) {
      super(workspace);
    }

    /** @override */
    init() {
      super.init();

      // Populate the flyout with all blocks and show it immediately.
      const flyout = this.getFlyout();
      flyout.show(this.getInitialFlyoutContents_());
      flyout.recordScrollPositions();

      this.workspace_.addChangeListener((e) => {
        if (
          e.type === Blockly.Events.BLOCK_CREATE ||
          e.type === Blockly.Events.BLOCK_DELETE
        ) {
          this.refreshSelection();
        }
      });
    }

    /** @override */
    getFlyout() {
      return /** @type {ContinuousFlyout} */ (super.getFlyout());
    }

    /**
     * Gets the contents that should be shown in the flyout immediately.
     * This includes all blocks and labels for each category of block.
     * @returns {!Blockly.utils.toolbox.FlyoutItemInfoArray} Flyout contents.
     * @private
     */
    getInitialFlyoutContents_() {
      /** @type {!Blockly.utils.toolbox.FlyoutItemInfoArray} */
      let contents = [];
      for (const toolboxItem of this.contents_) {
        if (toolboxItem instanceof Blockly.ToolboxCategory) {
          // Create a label node to go at the top of the category
          contents.push({ kind: "LABEL", text: toolboxItem.getName() });
          /**
           * @type {string|Blockly.utils.toolbox.FlyoutItemInfoArray|
           *    Blockly.utils.toolbox.FlyoutItemInfo}
           */
          let itemContents = toolboxItem.getContents();

          // Handle custom categories (e.g. variables and functions)
          if (typeof itemContents === "string") {
            itemContents =
              /** @type {!Blockly.utils.toolbox.DynamicCategoryInfo} */ ({
                custom: itemContents,
                kind: "CATEGORY",
              });
          }
          contents = contents.concat(itemContents);
        }
      }
      return contents;
    }

    /** @override */
    refreshSelection() {
      this.getFlyout().show(this.getInitialFlyoutContents_());
    }

    /** @override */
    updateFlyout_(_oldItem, newItem) {
      if (newItem) {
        const target = this.getFlyout().getCategoryScrollPosition(
          newItem.name_
        ).y;
        this.getFlyout().scrollTo(target);
      }
    }

    /** @override */
    shouldDeselectItem_(oldItem, newItem) {
      // Should not deselect if the same category is clicked again.
      return oldItem && oldItem !== newItem;
    }

    /**
     * Gets a category by name.
     * @param {string} name Name of category to get.
     * @returns {?Blockly.ToolboxCategory} Category, or null if not
     *    found.
     * @package
     */
    getCategoryByName(name) {
      const category = this.contents_.find(
        (item) =>
          item instanceof Blockly.ToolboxCategory &&
          item.isSelectable() &&
          name === item.getName()
      );
      if (category) {
        return /** @type {!Blockly.ToolboxCategory} */ (category);
      }
      return null;
    }

    /**
     * Selects the category with the given name.
     * Similar to setSelectedItem, but importantly, does not call updateFlyout
     * because this is called while the flyout is being scrolled.
     * @param {string} name Name of category to select.
     * @package
     */
    selectCategoryByName(name) {
      const newItem = this.getCategoryByName(name);
      if (!newItem) {
        return;
      }
      const oldItem = this.selectedItem_;

      if (this.shouldDeselectItem_(oldItem, newItem)) {
        this.deselectItem_(oldItem);
      }

      if (this.shouldSelectItem_(oldItem, newItem)) {
        this.selectItem_(oldItem, newItem);
      }
    }

    /** @override */
    getClientRect() {
      // If the flyout never closes, it should be the deletable area.
      const flyout = this.getFlyout();
      if (flyout && !flyout.autoClose) {
        return flyout.getClientRect();
      }
      return super.getClientRect();
    }
  }

  Blockly.Css.register(`
.categoryBubble {
  margin: 0 auto 0.125rem;
  border-radius: 100%;
  border: 1px solid;
  width: 1.25rem;
  height: 1.25rem;
}
.blocklyTreeRow {
  height: initial;
  padding: 3px 0;
}
.blocklyTreeRowContentContainer {
  display: flex;
  flex-direction: column;
}
.blocklyTreeLabel {
  margin: auto;
}
`);

  penPlus.ContinuousCategory = ContinuousCategory;
  penPlus.ContinuousFlyout = ContinuousFlyout;
  penPlus.ContinuousMetrics = ContinuousMetrics;
  penPlus.ContinuousFlyoutMetrics = ContinuousFlyoutMetrics;
  penPlus.ContinuousToolbox = ContinuousToolbox;
})();
