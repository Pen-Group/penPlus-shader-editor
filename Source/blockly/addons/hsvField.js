(function () {
  /**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  /**
   * @fileoverview Colour input field.
   */
  /**
   * Class for a colour input field.
   */
  class FieldColour extends Blockly.Field {
    /**
     * @param value The initial value of the field.  Should be in '#rrggbb'
     *     format.  Defaults to the first value in the default colour array.  Also
     *     accepts Field.SKIP_SETUP if you wish to skip setup (only used by
     *     subclasses that want to handle configuration and setting the field
     *     value after their own constructors have run).
     * @param validator A function that is called to validate changes to the
     *     field's value.  Takes in a colour string & returns a validated colour
     *     string ('#rrggbb' format), or null to abort the change.
     * @param config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/colour}
     * for a list of properties this parameter supports.
     */
    constructor(value, validator, config) {
      super(Blockly.Field.SKIP_SETUP);
      /** The field's colour picker element. */
      this.picker = null;
      /** Index of the currently highlighted element. */
      this.highlightedIndex = null;
      /**
       * Array holding info needed to unbind events.
       * Used for disposing.
       * Ex: [[node, name, func], [node, name, func]].
       */
      this.boundEvents = [];
      /**
       * Serializable fields are saved by the serializer, non-serializable fields
       * are not.  Editable fields should also be serializable.
       */
      this.SERIALIZABLE = true;
      /** Mouse cursor style when over the hotspot that initiates the editor. */
      this.CURSOR = "default";
      /**
       * Used to tell if the field needs to be rendered the next time the block is
       * rendered.  Colour fields are statically sized, and only need to be
       * rendered at initialization.
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.isDirty_ = false;
      /**
       * An array of colour strings for the palette.
       * Copied from goog.ui.ColorPicker.SIMPLE_GRID_COLORS
       */
      this.colours = [
        // grays
        "#ffffff",
        "#cccccc",
        "#c0c0c0",
        "#999999",
        "#666666",
        "#333333",
        "#000000",
        // reds
        "#ffcccc",
        "#ff6666",
        "#ff0000",
        "#cc0000",
        "#990000",
        "#660000",
        "#330000",
        // oranges
        "#ffcc99",
        "#ff9966",
        "#ff9900",
        "#ff6600",
        "#cc6600",
        "#993300",
        "#663300",
        // yellows
        "#ffff99",
        "#ffff66",
        "#ffcc66",
        "#ffcc33",
        "#cc9933",
        "#996633",
        "#663333",
        // olives
        "#ffffcc",
        "#ffff33",
        "#ffff00",
        "#ffcc00",
        "#999900",
        "#666600",
        "#333300",
        // greens
        "#99ff99",
        "#66ff99",
        "#33ff33",
        "#33cc00",
        "#009900",
        "#006600",
        "#003300",
        // turquoises
        "#99ffff",
        "#33ffff",
        "#66cccc",
        "#00cccc",
        "#339999",
        "#336666",
        "#003333",
        // blues
        "#ccffff",
        "#66ffff",
        "#33ccff",
        "#3366ff",
        "#3333ff",
        "#000099",
        "#000066",
        // purples
        "#ccccff",
        "#9999ff",
        "#6666cc",
        "#6633ff",
        "#6600cc",
        "#333399",
        "#330099",
        // violets
        "#ffccff",
        "#ff99ff",
        "#cc66cc",
        "#cc33cc",
        "#993399",
        "#663366",
        "#330033",
      ];
      /**
       * An array of tooltip strings for the palette.  If not the same length as
       * COLOURS, the colour's hex code will be used for any missing titles.
       */
      this.titles = [];
      /**
       * Number of columns in the palette.
       */
      this.columns = 7;
      if (value === Blockly.Field.SKIP_SETUP) return;
      if (config) {
        this.configure_(config);
      }
      this.setValue(value);
      if (validator) {
        this.setValidator(validator);
      }
    }
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    configure_(config) {
      super.configure_(config);
      if (config.colourOptions) this.colours = config.colourOptions;
      if (config.colourTitles) this.titles = config.colourTitles;
      if (config.columns) this.columns = config.columns;
    }
    /**
     * Create the block UI for this colour field.
     *
     * @internal
     */
    initView() {
      const constants = this.getConstants();
      // This can't happen, but TypeScript thinks it can and lint forbids `!.`.
      if (!constants) throw Error("Constants not found");
      this.size_ = new Blockly.utils.Size(constants.FIELD_COLOUR_DEFAULT_WIDTH, constants.FIELD_COLOUR_DEFAULT_HEIGHT);
      if (!constants.FIELD_COLOUR_FULL_BLOCK) {
        this.createBorderRect_();
        this.getBorderRect().style["fillOpacity"] = "1";
      } else if (this.sourceBlock_ instanceof Blockly.BlockSvg) {
        this.clickTarget_ = this.sourceBlock_.getSvgRoot();
      }
    }
    /**
     * Updates text field to match the colour/style of the block.
     *
     * @internal
     */
    applyColour() {
      const constants = this.getConstants();
      // This can't happen, but TypeScript thinks it can and lint forbids `!.`.
      if (!constants) throw Error("Constants not found");
      if (!constants.FIELD_COLOUR_FULL_BLOCK) {
        if (this.borderRect_) {
          this.borderRect_.style.fill = this.getValue();
        }
      } else if (this.sourceBlock_ instanceof Blockly.BlockSvg) {
        this.sourceBlock_.pathObject.svgPath.setAttribute("fill", this.getValue());
        this.sourceBlock_.pathObject.svgPath.setAttribute("stroke", "#fff");
      }
    }
    /**
     * Ensure that the input value is a valid colour.
     *
     * @param newValue The input value.
     * @returns A valid colour, or null if invalid.
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    doClassValidation_(newValue) {
      if (typeof newValue !== "string") {
        return null;
      }
      return Blockly.utils.colour.parse(newValue);
    }
    /**
     * Update the value of this colour field, and update the displayed colour.
     *
     * @param newValue The value to be saved.  The default validator guarantees
     *     that this is a colour in '#rrggbb' format.
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    doValueUpdate_(newValue) {
      this.value_ = newValue;
      if (this.borderRect_) {
        this.borderRect_.style.fill = newValue;
      } else if (this.sourceBlock_ && this.sourceBlock_.rendered && this.sourceBlock_ instanceof Blockly.BlockSvg) {
        this.sourceBlock_.pathObject.svgPath.setAttribute("fill", newValue);
        this.sourceBlock_.pathObject.svgPath.setAttribute("stroke", "#fff");
      }
    }
    /**
     * Get the text for this field.  Used when the block is collapsed.
     *
     * @returns Text representing the value of this field.
     */
    getText() {
      let colour = this.value_;
      // Try to use #rgb format if possible, rather than #rrggbb.
      if (/^#(.)\1(.)\2(.)\3$/.test(colour)) {
        colour = "#" + colour[1] + colour[3] + colour[5];
      }
      return colour;
    }
    /**
     * Set a custom colour grid for this field.
     *
     * @param colours Array of colours for this block, or null to use default
     *     (FieldColour.COLOURS).
     * @param titles Optional array of colour tooltips, or null to use default
     *     (FieldColour.TITLES).
     * @returns Returns itself (for method chaining).
     */
    setColours(colours, titles) {
      this.colours = colours;
      if (titles) {
        this.titles = titles;
      }
      return this;
    }
    /**
     * Set a custom grid size for this field.
     *
     * @param columns Number of columns for this block, or 0 to use default
     *     (FieldColour.COLUMNS).
     * @returns Returns itself (for method chaining).
     */
    setColumns(columns) {
      this.columns = columns;
      return this;
    }
    /** Create and show the colour field's editor. */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    showEditor_() {
      this.dropdownCreate();
      // This can't happen, but TypeScript thinks it can and lint forbids `!.`.
      if (!this.picker) throw Error("Picker not found");
      Blockly.DropDownDiv.getContentDiv().appendChild(this.picker);
      Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose.bind(this));
      // Focus so we can start receiving keyboard events.
      this.picker.focus({ preventScroll: true });
    }
    /**
     * Handle a click on a colour cell.
     *
     * @param e Mouse event.
     */
    onClick(e) {
      const cell = e.target;
      const colour = cell && cell.getAttribute("data-colour");
      if (colour !== null) {
        this.setValue(colour);
        Blockly.DropDownDiv.hideIfOwner(this);
      }
    }
    /**
     * Handle a key down event.  Navigate around the grid with the
     * arrow keys.  Enter selects the highlighted colour.
     *
     * @param e Keyboard event.
     */
    onKeyDown(e) {
      let handled = true;
      let highlighted;
      switch (e.key) {
        case "ArrowUp":
          this.moveHighlightBy(0, -1);
          break;
        case "ArrowDown":
          this.moveHighlightBy(0, 1);
          break;
        case "ArrowLeft":
          this.moveHighlightBy(-1, 0);
          break;
        case "ArrowRight":
          this.moveHighlightBy(1, 0);
          break;
        case "Enter":
          // Select the highlighted colour.
          highlighted = this.getHighlighted();
          if (highlighted) {
            const colour = highlighted.getAttribute("data-colour");
            if (colour !== null) {
              this.setValue(colour);
            }
          }
          Blockly.DropDownDiv.hideWithoutAnimation();
          break;
        default:
          handled = false;
      }
      if (handled) {
        e.stopPropagation();
      }
    }
    /**
     * Move the currently highlighted position by dx and dy.
     *
     * @param dx Change of x.
     * @param dy Change of y.
     */
    moveHighlightBy(dx, dy) {
      if (!this.highlightedIndex) {
        return;
      }
      const colours = this.colours;
      const columns = this.columns;
      // Get the current x and y coordinates.
      let x = this.highlightedIndex % columns;
      let y = Math.floor(this.highlightedIndex / columns);
      // Add the offset.
      x += dx;
      y += dy;
      if (dx < 0) {
        // Move left one grid cell, even in RTL.
        // Loop back to the end of the previous row if we have room.
        if (x < 0 && y > 0) {
          x = columns - 1;
          y--;
        } else if (x < 0) {
          x = 0;
        }
      } else if (dx > 0) {
        // Move right one grid cell, even in RTL.
        // Loop to the start of the next row, if there's room.
        if (x > columns - 1 && y < Math.floor(colours.length / columns) - 1) {
          x = 0;
          y++;
        } else if (x > columns - 1) {
          x--;
        }
      } else if (dy < 0) {
        // Move up one grid cell, stop at the top.
        if (y < 0) {
          y = 0;
        }
      } else if (dy > 0) {
        // Move down one grid cell, stop at the bottom.
        if (y > Math.floor(colours.length / columns) - 1) {
          y = Math.floor(colours.length / columns) - 1;
        }
      }
      // Move the highlight to the new coordinates.
      const cell = this.picker.childNodes[y].childNodes[x];
      const index = y * columns + x;
      this.setHighlightedCell(cell, index);
    }
    /**
     * Handle a mouse move event.  Highlight the hovered colour.
     *
     * @param e Mouse event.
     */
    onMouseMove(e) {
      const cell = e.target;
      const index = cell && Number(cell.getAttribute("data-index"));
      if (index !== null && index !== this.highlightedIndex) {
        this.setHighlightedCell(cell, index);
      }
    }
    /** Handle a mouse enter event.  Focus the picker. */
    onMouseEnter() {
      var _a;
      (_a = this.picker) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
    }
    /**
     * Handle a mouse leave event.  Blur the picker and unhighlight
     * the currently highlighted colour.
     */
    onMouseLeave() {
      var _a;
      (_a = this.picker) === null || _a === void 0 ? void 0 : _a.blur();
      const highlighted = this.getHighlighted();
      if (highlighted) {
        Blockly.utils.dom.removeClass(highlighted, "blocklyColourHighlighted");
      }
    }
    /**
     * Returns the currently highlighted item (if any).
     *
     * @returns Highlighted item (null if none).
     */
    getHighlighted() {
      var _a;
      if (!this.highlightedIndex) {
        return null;
      }
      const x = this.highlightedIndex % this.columns;
      const y = Math.floor(this.highlightedIndex / this.columns);
      const row = (_a = this.picker) === null || _a === void 0 ? void 0 : _a.childNodes[y];
      if (!row) {
        return null;
      }
      return row.childNodes[x];
    }
    /**
     * Update the currently highlighted cell.
     *
     * @param cell The new cell to highlight.
     * @param index The index of the new cell.
     */
    setHighlightedCell(cell, index) {
      // Unhighlight the current item.
      const highlighted = this.getHighlighted();
      if (highlighted) {
        Blockly.utils.dom.removeClass(highlighted, "blocklyColourHighlighted");
      }
      // Highlight new item.
      Blockly.utils.dom.addClass(cell, "blocklyColourHighlighted");
      // Set new highlighted index.
      this.highlightedIndex = index;
      // Update accessibility roles.
      const cellId = cell.getAttribute("id");
      if (cellId && this.picker) {
        Blockly.utils.aria.setState(this.picker, Blockly.utils.aria.State.ACTIVEDESCENDANT, cellId);
      }
    }
    /** Create a colour picker dropdown editor. */
    dropdownCreate() {
      const columns = this.columns;
      const colours = this.colours;
      const selectedColour = this.getValue();
      // Create the palette.
      const table = document.createElement("table");
      table.className = "blocklyColourTable";
      table.tabIndex = 0;
      table.dir = "ltr";
      Blockly.utils.aria.setRole(table, Blockly.utils.aria.Role.GRID);
      Blockly.utils.aria.setState(table, Blockly.utils.aria.State.EXPANDED, true);
      Blockly.utils.aria.setState(table, Blockly.utils.aria.State.ROWCOUNT, Math.floor(colours.length / columns));
      Blockly.utils.aria.setState(table, Blockly.utils.aria.State.COLCOUNT, columns);
      let row = null;
      for (let i = 0; i < colours.length; i++) {
        if (i % columns === 0) {
          row = document.createElement("tr");
          Blockly.utils.aria.setRole(row, Blockly.utils.aria.Role.ROW);
          table.appendChild(row);
        }
        const cell = document.createElement("td");
        row.appendChild(cell);
        // This becomes the value, if clicked.
        cell.setAttribute("data-colour", colours[i]);
        cell.title = this.titles[i] || colours[i];
        cell.id = Blockly.utils.idGenerator.getNextUniqueId();
        cell.setAttribute("data-index", `${i}`);
        Blockly.utils.aria.setRole(cell, Blockly.utils.aria.Role.GRIDCELL);
        Blockly.utils.aria.setState(cell, Blockly.utils.aria.State.LABEL, colours[i]);
        Blockly.utils.aria.setState(cell, Blockly.utils.aria.State.SELECTED, colours[i] === selectedColour);
        cell.style.backgroundColor = colours[i];
        if (colours[i] === selectedColour) {
          cell.className = "blocklyColourSelected";
          this.highlightedIndex = i;
        }
      }
      // Configure event handler on the table to listen for any event in a cell.
      this.boundEvents.push(Blockly.browserEvents.conditionalBind(table, "pointerdown", this, this.onClick, true));
      this.boundEvents.push(Blockly.browserEvents.conditionalBind(table, "pointermove", this, this.onMouseMove, true));
      this.boundEvents.push(Blockly.browserEvents.conditionalBind(table, "pointerenter", this, this.onMouseEnter, true));
      this.boundEvents.push(Blockly.browserEvents.conditionalBind(table, "pointerleave", this, this.onMouseLeave, true));
      this.boundEvents.push(Blockly.browserEvents.conditionalBind(table, "keydown", this, this.onKeyDown, false));
      this.picker = table;
    }
    /** Disposes of events and DOM-references belonging to the colour editor. */
    dropdownDispose() {
      for (const event of this.boundEvents) {
        Blockly.browserEvents.unbind(event);
      }
      this.boundEvents.length = 0;
      this.picker = null;
      this.highlightedIndex = null;
    }
    /**
     * Construct a FieldColour from a JSON arg object.
     *
     * @param options A JSON object with options (colour).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options) {
      // `this` might be a subclass of FieldColour if that class doesn't override
      // the static fromJson method.
      return new this(options.colour, undefined, options);
    }
  }
  /** The default value for this field. */
  FieldColour.prototype.DEFAULT_VALUE = "#ffffff";
  // Unregister legacy field_colour that was in core.  Delete this once
  // core Blockly no longer defines field_colour.
  // If field_colour is not defined in core, this generates a console warning.
  Blockly.fieldRegistry.unregister("field_colour");
  Blockly.fieldRegistry.register("field_colour", FieldColour);
  /**
   * CSS for colour picker.
   */
  Blockly.Css.register(`
  .blocklyColourTable {
    border-collapse: collapse;
    display: block;
    outline: none;
    padding: 1px;
  }

  .blocklyColourTable>tr>td {
    border: 0.5px solid #888;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    height: 20px;
    padding: 0;
    width: 20px;
  }

  .blocklyColourTable>tr>td.blocklyColourHighlighted {
    border-color: #eee;
    box-shadow: 2px 2px 7px 2px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .blocklyColourSelected, .blocklyColourSelected:hover {
    border-color: #eee !important;
    outline: 1px solid #333;
    position: relative;
  }
  `);

  /**
   * A structure with three properties r, g, and b, representing the amount of
   * red, green, and blue light in the sRGB colour space where 1 is the maximum
   * amount of light that can be displayed.
   */
  class RgbColour {
    /**
     * The RgbColour constructor.
     * @param r The initial amount of red. Defaults to 0.
     * @param g The initial amount of green. Defaults to 0.
     * @param b The initial amount of blue. Defaults to 0.
     */
    constructor(r = 0, g = 0, b = 0) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    /**
     * Given a number from 0 to 1, returns a two-digit hexadecimal string from
     * '00' to 'ff'.
     * @param x The amount of light in a component from 0 to 1.
     * @returns A hexadecimal representation from '00' to 'ff'.
     */
    static componentToHex(x) {
      if (x <= 0) return "00";
      if (x >= 1) return "ff";
      return ("0" + ((x * 255 + 0.5) >>> 0).toString(16)).slice(-2);
    }

    /**
     * Returns a hexadecimal string in the format #rrggbb representing the colour.
     * @returns A hexadecimal representation of this colour.
     */
    toHex() {
      return "#" + RgbColour.componentToHex(this.r) + RgbColour.componentToHex(this.g) + RgbColour.componentToHex(this.b);
    }

    /**
     * Updates the properties of this instance to represent the same colour as the
     * provided string in the hexadecimal format #rrggbb.
     * @param hex A hexadecimal string in the format '#rrggbb'.
     * @returns This instance after updating it.
     */
    loadFromHex(hex) {
      this.r = parseInt(hex.slice(1, 3), 16) / 255;
      this.g = parseInt(hex.slice(3, 5), 16) / 255;
      this.b = parseInt(hex.slice(5, 7), 16) / 255;
      return this;
    }

    /**
     * Updates the properties of this instance to represent the same colour as the
     * provided HsvColour but in the sRGB colour space.
     * @param hsv An HSV representation of a colour to copy.
     * @returns This instance after updating it.
     */
    loadFromHsv(hsv) {
      const hue = (hsv.h - Math.floor(hsv.h)) * 6;
      this.r = hsv.v * (1 - hsv.s * Math.max(0, Math.min(1, 2 - Math.abs(hue - 3))));
      this.g = hsv.v * (1 - hsv.s * Math.max(0, Math.min(1, Math.abs(hue - 2) - 1)));
      this.b = hsv.v * (1 - hsv.s * Math.max(0, Math.min(1, Math.abs(hue - 4) - 1)));
      return this;
    }
  }

  /**
   * A structure with three properties h, s, and v, representing the hue,
   * saturation, and brightness in a colour. All three properties range from 0
   * to 1.
   */
  class HsvColour {
    /**
     * The HsvColour constructor.
     * @param h The initial hue of the colour. Defaults to 0.
     * @param s The initial amount of saturation. Defaults to 0.
     * @param v The initial amount of brightness. Defaults to 0.
     */
    constructor(h = 0, s = 0, v = 0) {
      this.h = h;
      this.s = s;
      this.v = v;
    }

    /**
     * Updates the properties of this instance to represent the same colour as the
     * provided RgbColour but in the HSV colour space.
     * @param rgb An RGB representation of a colour to copy.
     * @returns This instance after updating it.
     */
    loadFromRgb(rgb) {
      const max = Math.max(Math.max(rgb.r, rgb.g), rgb.b);
      const min = Math.min(Math.min(rgb.r, rgb.g), rgb.b);
      this.v = max;
      if (min === max) {
        this.h = 0;
        this.s = 0;
        return this;
      }

      const delta = max - min;
      this.s = delta / max;

      let hue;
      if (rgb.r === max) {
        hue = (rgb.g - rgb.b) / delta;
      } else if (rgb.g === max) {
        hue = 2 + (rgb.b - rgb.r) / delta;
      } else {
        hue = 4 + (rgb.r - rgb.g) / delta;
      }
      hue /= 6;
      this.h = hue - Math.floor(hue);
      return this;
    }

    /**
     * Updates the properties of this instance to copy the provided HsvColour.
     * @param other An HSV representation of a colour to copy.
     * @returns This instance after updating it.
     */
    copy(other) {
      this.h = other.h;
      this.s = other.s;
      this.v = other.v;
      return this;
    }
  }

  /**
   * Class for a colour input field that displays HSV slider widgets when clicked.
   */
  class FieldColourHsvSliders extends FieldColour {
    /* eslint-disable @typescript-eslint/naming-convention */
    /** The maximum value of the hue slider range. */
    static HUE_SLIDER_MAX = 360;

    /** The maximum value of the saturation slider range. */
    static SATURATION_SLIDER_MAX = 100;

    /** The maximum value of the brightness slider range. */
    static BRIGHTNESS_SLIDER_MAX = 100;

    /**
     * The gradient control point positions should align with the center of the
     * slider thumb when the corresponding colour is selected. When the slider
     * is at the minimum or maximum value, the distance of center of the thumb
     * from the edge of the track will be the thumb's radius, so that's how far
     * the minimum and maximum control points should be.
     */
    static THUMB_RADIUS = 12;
    /* eslint-enable @typescript-eslint/naming-convention */

    /** Helper colour structures to allow manipulation in the HSV colour space. */
    static helperHsv = new HsvColour();

    /** Helper colour structures to support conversion to the RGB colour space. */
    static helperRgb = new RgbColour();

    /** Array holding info needed to unbind events. Used for disposing. */
    hsvBoundEvents = [];

    /** HTML span element to display the current hue. */
    hueReadout = null;

    /** HTML range input element for editing hue. */
    hueSlider = null;

    /** HTML span element to display the current saturation. */
    saturationReadout = null;

    /** HTML range input element for editing saturation. */
    saturationSlider = null;

    /** HTML span element to display the current brightness. */
    brightnessReadout = null;

    /** HTML range input element for editing brightness. */
    brightnessSlider = null;

    /** HTML div element containing all the labels and sliders. */
    dropdownContainer = null;

    /* eslint-disable @typescript-eslint/naming-convention */
    /**
     * Create and show the colour field's editor.
     * @override
     */
    showEditor_() {
      /* eslint-enable @typescript-eslint/naming-convention */
      this.createDropdownSliders();
      if (!this.dropdownContainer || !this.hueSlider) {
        throw new Error("Failed to initialize the HSV sliders.");
      }
      Blockly.DropDownDiv.getContentDiv().appendChild(this.dropdownContainer);

      Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDisposeSliders.bind(this));

      // Focus so we can start receiving keyboard events.
      this.hueSlider.focus({ preventScroll: true });
    }

    /**
     * Creates a row with a slider label and a readout to display the slider
     * value, appends it to the provided container, and returns the readout.
     * @param name The display name of the slider.
     * @param container Where the row will be inserted.
     * @returns The readout, so that it can be updated.
     */
    static createLabelInContainer(name, container) {
      const label = document.createElement("div");
      const labelText = document.createElement("span");
      const readout = document.createElement("span");
      label.classList.add("fieldColourSliderLabel");
      labelText.textContent = name;
      label.appendChild(labelText);
      label.appendChild(readout);
      container.appendChild(label);
      return readout;
    }

    /**
     * Creates a slider, appends it to the provided container, and returns it.
     * @param max The maximum value of the slider.
     * @param step The minimum step size of the slider.
     * @param container Where the row slider be inserted.
     * @returns The slider.
     */
    static createSliderInContainer(max, step, container) {
      const slider = document.createElement("input");
      slider.classList.add("fieldColourSlider");
      slider.type = "range";
      slider.min = String(0);
      slider.max = String(max);
      slider.step = String(step);
      container.appendChild(slider);
      return slider;
    }

    /** Creates the colour picker slider editor and adds event listeners. */
    createDropdownSliders() {
      const container = document.createElement("div");
      container.classList.add("fieldColourSliderContainer");

      this.hueReadout = FieldColourHsvSliders.createLabelInContainer("Hue", container);
      this.hueSlider = FieldColourHsvSliders.createSliderInContainer(FieldColourHsvSliders.HUE_SLIDER_MAX, 2, container);
      this.saturationReadout = FieldColourHsvSliders.createLabelInContainer("Saturation", container);
      this.saturationSlider = FieldColourHsvSliders.createSliderInContainer(FieldColourHsvSliders.SATURATION_SLIDER_MAX, 1, container);
      this.brightnessReadout = FieldColourHsvSliders.createLabelInContainer("Brightness", container);
      this.brightnessSlider = FieldColourHsvSliders.createSliderInContainer(FieldColourHsvSliders.BRIGHTNESS_SLIDER_MAX, 1, container);

      this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.hueSlider, "input", this, this.onSliderChange));
      this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.saturationSlider, "input", this, this.onSliderChange));
      this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.brightnessSlider, "input", this, this.onSliderChange));

      if (window.EyeDropper) {
        // If the browser supports the eyedropper API, create a button for it.
        const button = document.createElement("button");
        button.classList.add("fieldColourEyedropper");
        container.appendChild(document.createElement("hr"));
        container.appendChild(button);
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(button, "click", this, this.onEyedropperEvent));
      }

      this.dropdownContainer = container;

      this.updateSliderValues();
    }

    /** Disposes of events and DOM-references belonging to the colour editor. */
    dropdownDisposeSliders() {
      for (const event of this.hsvBoundEvents) {
        Blockly.browserEvents.unbind(event);
      }
      this.hsvBoundEvents.length = 0;
      this.hueReadout = null;
      this.hueSlider = null;
      this.saturationReadout = null;
      this.saturationSlider = null;
      this.brightnessReadout = null;
      this.brightnessSlider = null;
      this.dropdownContainer = null;
    }

    /**
     * A helper function that converts a colour, specified by the provided hue,
     * saturation, and brightness parameters, into a hexadecimal string in the
     * format "#rrggbb".
     * @param hue The hue of the colour.
     * @param saturation The saturation of the colour.
     * @param brightness The brightness of the colour.
     * @returns A hexadecimal representation of the colour in the format "#rrggbb"
     */
    static hsvToHex(hue, saturation, brightness) {
      FieldColourHsvSliders.helperHsv.h = hue;
      FieldColourHsvSliders.helperHsv.s = saturation;
      FieldColourHsvSliders.helperHsv.v = brightness;
      return FieldColourHsvSliders.helperRgb.loadFromHsv(FieldColourHsvSliders.helperHsv).toHex();
    }

    /**
     * Updates the value of this field based on the editor sliders.
     * @param event Unused.
     */
    onSliderChange(event) {
      if (!this.hueSlider || !this.saturationSlider || !this.brightnessSlider) {
        throw new Error("The HSV sliders are missing.");
      }
      const hue = parseFloat(this.hueSlider.value) / FieldColourHsvSliders.HUE_SLIDER_MAX;
      const saturation = parseFloat(this.saturationSlider.value) / FieldColourHsvSliders.SATURATION_SLIDER_MAX;
      const brightness = parseFloat(this.brightnessSlider.value) / FieldColourHsvSliders.BRIGHTNESS_SLIDER_MAX;
      this.setValue(FieldColourHsvSliders.hsvToHex(hue, saturation, brightness));
      this.renderSliders();
    }

    /**
     * Updates the value of this field and editor sliders using an eyedropper.
     * @param event Unused.
     */
    onEyedropperEvent(event) {
      if (window.EyeDropper) {
        const eyeDropper = new window.EyeDropper();
        eyeDropper.open().then((result) => {
          this.setValue(result.sRGBHex);
          this.updateSliderValues();
        });
      }
    }

    /**
     * Updates the gradient backgrounds of the slider tracks and readouts based
     * on the slider values.
     */
    renderSliders() {
      if (!this.hueSlider || !this.hueReadout || !this.saturationSlider || !this.saturationReadout || !this.brightnessSlider || !this.brightnessReadout) {
        throw new Error("The HSV sliders are missing.");
      }
      this.hueReadout.textContent = this.hueSlider.value;
      this.saturationReadout.textContent = this.saturationSlider.value;
      this.brightnessReadout.textContent = this.brightnessSlider.value;

      const h = parseFloat(this.hueSlider.value) / FieldColourHsvSliders.HUE_SLIDER_MAX;
      const s = parseFloat(this.saturationSlider.value) / FieldColourHsvSliders.SATURATION_SLIDER_MAX;
      const v = parseFloat(this.brightnessSlider.value) / FieldColourHsvSliders.BRIGHTNESS_SLIDER_MAX;

      // The hue slider needs intermediate gradient control points to include all
      // colours of the rainbow.
      let hueGradient = "linear-gradient(to right, ";
      hueGradient += FieldColourHsvSliders.hsvToHex(0 / 6, s, v) + ` ${FieldColourHsvSliders.THUMB_RADIUS}px, `;
      hueGradient += FieldColourHsvSliders.hsvToHex(1 / 6, s, v) + ", ";
      hueGradient += FieldColourHsvSliders.hsvToHex(2 / 6, s, v) + ", ";
      hueGradient += FieldColourHsvSliders.hsvToHex(3 / 6, s, v) + ", ";
      hueGradient += FieldColourHsvSliders.hsvToHex(4 / 6, s, v) + ", ";
      hueGradient += FieldColourHsvSliders.hsvToHex(5 / 6, s, v) + ", ";
      hueGradient += FieldColourHsvSliders.hsvToHex(6 / 6, s, v) + ` calc(100% - ${FieldColourHsvSliders.THUMB_RADIUS}px))`;
      this.hueSlider.style.setProperty("--slider-track-background", hueGradient);

      // The saturation slider only needs gradient control points at each end.
      let saturationGradient = "linear-gradient(to right, ";
      saturationGradient += FieldColourHsvSliders.hsvToHex(h, 0, v) + ` ${FieldColourHsvSliders.THUMB_RADIUS}px, `;
      saturationGradient += FieldColourHsvSliders.hsvToHex(h, 1, v) + ` calc(100% - ${FieldColourHsvSliders.THUMB_RADIUS}px))`;
      this.saturationSlider.style.setProperty("--slider-track-background", saturationGradient);

      // The brightness slider only needs gradient control points at each end.
      let brightnessGradient = "linear-gradient(to right, ";
      brightnessGradient += FieldColourHsvSliders.hsvToHex(h, s, 0) + ` ${FieldColourHsvSliders.THUMB_RADIUS}px, `;
      brightnessGradient += FieldColourHsvSliders.hsvToHex(h, s, 1) + ` calc(100% - ${FieldColourHsvSliders.THUMB_RADIUS}px))`;
      this.brightnessSlider.style.setProperty("--slider-track-background", brightnessGradient);
    }

    /** Updates slider values based on the current value of the field. */
    updateSliderValues() {
      if (!this.hueSlider || !this.saturationSlider || !this.brightnessSlider) {
        return;
      }

      const hsv = FieldColourHsvSliders.helperHsv.loadFromRgb(FieldColourHsvSliders.helperRgb.loadFromHex(this.getValue() ?? ""));

      this.hueSlider.value = String(hsv.h * FieldColourHsvSliders.HUE_SLIDER_MAX);
      this.saturationSlider.value = String(hsv.s * FieldColourHsvSliders.SATURATION_SLIDER_MAX);
      this.brightnessSlider.value = String(hsv.v * FieldColourHsvSliders.BRIGHTNESS_SLIDER_MAX);

      this.renderSliders();
    }
  }

  Blockly.fieldRegistry.register("field_colour_hsv_sliders", FieldColourHsvSliders);

  // CSS for colour slider fields.
  Blockly.Css.register(`
      .fieldColourSliderContainer {
        padding: 4px;
      }
      .fieldColourSliderContainer hr {
        border: none;
        border-top: 1px solid #bbb;
      }
      .fieldColourSliderLabel {
        display: flex;
        justify-content: space-between;
      }
      .fieldColourEyedropper {
        appearance: none;
        position: relative;
        border: none;
        border-radius: 4px;
        background: transparent;
        font: inherit;
        color: inherit;
        cursor: pointer;
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .fieldColourEyedropper:hover {
        background: rgba(0,0,0,0.1)
      }
      .fieldColourEyedropper input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .fieldColourEyedropper::before {
        content: "Eyedropper";
      }
      .fieldColourEyedropper::after {
        content: "";
        margin-left: 8px;
        width: 24px;
        height: 24px;
        background: currentColor;
        pointer-events: none;
        -webkit-mask-image: var(--customize-dial-symbol);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-image: var(--customize-dial-symbol);
        mask-repeat: no-repeat;
        mask-position: center;
        --customize-dial-symbol: url('data:image/svg+xml,\
          <svg xmlns="http://www.w3.org/2000/svg" \
              width="24px" height="24px" \
              viewBox="0 0 24 24"> \
            <path stroke="black" strokewidth="1.414" fill="none" \
                  d="m 13 8 L 6 15 Q 3 18 2 21 Q 0 23 .5 23.5 Q 1 24 3 22 \
                      Q 6 21 9 18 L 16 11"/> \
            <path fill="black" \
                  d="m 12 7 Q 11 6 12 5 Q 13 4 14 5 Q 15 6 16 5 Q 20 -1 22.5 1.5 \
                      Q 25 4 19 8 Q 18 9 19 10 Q 20 11 19 12 Q 18 13 17 12"/> \
          </svg>');
      }
      .fieldColourSlider {
        -webkit-appearance: none;
        width: 150px;
        height: 24px;
        margin: 4px 8px 24px 8px;
        padding: 0;
      }
      .fieldColourSlider:last-child {
        margin-bottom: 4px;
      }
      .fieldColourSlider:focus {
        outline: none;
      }
      /* Webkit */
      .fieldColourSlider::-webkit-slider-runnable-track {
        background: var(--slider-track-background);
        border-radius: 8px;
        height: 16px;
      }
      .fieldColourSlider::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(0,0,0,.15);
        cursor: pointer;
        width: ${FieldColourHsvSliders.THUMB_RADIUS * 2}px;
        height: ${FieldColourHsvSliders.THUMB_RADIUS * 2}px;
        margin-top: -4px;
      }
      /* Firefox */
      .fieldColourSlider::-moz-range-track {
        background: var(--slider-track-background);
        border-radius: 8px;
        height: 16px;
      }
      .fieldColourSlider::-moz-range-thumb {
        background: #fff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(0,0,0,.15);
        cursor: pointer;
        width: ${FieldColourHsvSliders.THUMB_RADIUS * 2}px;
        height: ${FieldColourHsvSliders.THUMB_RADIUS * 2}px;
      }
      .fieldColourSlider::-moz-focus-outer {
        /* override the focus border style */
        border: 0;
      }
      /* IE */
      .fieldColourSlider::-ms-track {
        background: var(--slider-track-background);
        border-radius: 12px;
        width: 100%;
        height: 24px;
        /* remove default tick marks */
        color: transparent;
      }
      .fieldColourSlider::-ms-fill-lower  {
        background: transparent;
      }
      .fieldColourSlider::-ms-fill-upper  {
        background: transparent;
      }
      .fieldColourSlider::-ms-thumb {
        background: #fff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(0,0,0,.15);
        cursor: pointer;
        width: ${FieldColourHsvSliders.THUMB_RADIUS * 2}px;
        height: ${FieldColourHsvSliders.THUMB_RADIUS * 2}px;
      }
      `);
})();
