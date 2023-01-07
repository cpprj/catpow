(() => {
  // ../blocks/switcher/editor_script.jsx
  CP.config.switcher = {
    factors: {
      schedule: "\u65E5\u6642",
      is_user_logged_in: "\u30ED\u30B0\u30A4\u30F3",
      current_user_can: "\u30E6\u30FC\u30B6\u30FC\u6A29\u9650",
      user_value: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831",
      input_value: "\u30D5\u30A9\u30FC\u30E0\u5165\u529B\u5024",
      content_value: "\u30B3\u30F3\u30C6\u30F3\u30C4\u60C5\u5831"
    },
    factorFlags: {
      schedule: 4,
      is_user_logged_in: 4,
      current_user_can: 4,
      user_value: 7,
      input_value: 7,
      content_value: 7
    },
    flagValues: {
      field: 1,
      compare: 2,
      values: 4
    }
  };
  wp.blocks.registerBlockType("catpow/switcher", {
    title: "\u{1F43E} Switcher",
    description: "\u65E5\u6642\u3084\u30ED\u30B0\u30A4\u30F3\u30E6\u30FC\u30B6\u30FC\u306B\u3088\u3063\u3066\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u5185\u5BB9\u304C\u5207\u308A\u66FF\u308F\u308B\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "networking",
    category: "catpow-functional",
    example: CP.example,
    edit(props) {
      const { attributes, className, setAttributes, isSelected, clientId } = props;
      const { useState, useEffect, useMemo, useCallback } = wp.element;
      const { currentIndex = 0 } = attributes;
      const [newBlocks, setNewBlocks] = useState(false);
      const { factors, factorFlags, flagValues } = CP.config.switcher;
      const selectiveClasses = useMemo(() => {
        const { factors: factors2, factorFlags: factorFlags2, flagValues: flagValues2 } = CP.config.switcher;
        const selectiveClasses2 = [
          {
            name: "factor",
            label: "\u30D5\u30A1\u30AF\u30BF\u30FC",
            input: "select",
            key: "factor",
            values: factors2
          },
          {
            name: "field",
            label: "\u30D5\u30A3\u30FC\u30EB\u30C9",
            input: "text",
            key: "field",
            cond: (states, { attr }) => factorFlags2[attr.factor] & flagValues2["field"]
          },
          {
            name: "compare",
            label: "\u6BD4\u8F03",
            input: "buttons",
            key: "compare",
            values: ["=", "IN", "BETWEEN"],
            cond: (states, { attr }) => factorFlags2[attr.factor] & flagValues2["compare"]
          },
          {
            name: "values",
            label: "\u5024",
            input: "textarea",
            key: "values",
            cond: (states, { attr }) => factorFlags2[attr.factor] & flagValues2["values"]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.switcher.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const values = useMemo(() => attributes.values.split("\n"), [attributes.values]);
      useEffect(() => {
        const editor = wp.data.dispatch("core/block-editor");
        const blocks = wp.data.select("core/block-editor").getBlock(clientId).innerBlocks;
        const newBlocks2 = values.map((cond, index) => {
          if (void 0 === blocks[index]) {
            return wp.blocks.createBlock("catpow/switchercontent", { cond });
          }
          editor.updateBlockAttributes(blocks[index].clientId, { cond });
          return blocks[index];
        });
        if (blocks.length !== newBlocks2.length) {
          setNewBlocks(newBlocks2);
        }
      }, [values]);
      useEffect(() => {
        if (newBlocks) {
          const editor = wp.data.dispatch("core/block-editor");
          editor.replaceInnerBlocks(clientId, newBlocks);
          const blocks = wp.data.select("core/block-editor").getBlock(clientId).innerBlocks;
          values.map((cond, index) => {
            editor.updateBlockAttributes(blocks[index].clientId, { cond });
          });
          setNewBlocks(false);
        }
      }, [currentIndex]);
      useEffect(() => {
        switch (attributes.factor) {
          case "schedule":
            setAttributes({ values: "0:00~6:00\n6:00~12:00\n12:00~18:00\n18:00~24:00" });
            break;
          case "is_user_logged_in":
            setAttributes({ values: "out\nin" });
            break;
          case "current_user_can":
            setAttributes({ values: "administrator\neditor\nauthor\ncontributor\nsubscriber" });
            break;
        }
      }, [attributes.factor]);
      const currentBlockId = "block-" + wp.data.select("core/block-editor").getBlock(clientId).innerBlocks[currentIndex]?.clientId;
      return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "switcherEdit", "data-current-index": currentIndex }, /* @__PURE__ */ wp.element.createElement("ul", { className: "tabs" }, /* @__PURE__ */ wp.element.createElement("li", { className: "tab icon" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "networking" })), /* @__PURE__ */ wp.element.createElement("li", { className: "tab" }, factors[attributes.factor]), factorFlags[attributes.factor] & flagValues["field"] ? /* @__PURE__ */ wp.element.createElement("li", { className: "tab" }, attributes.field, factorFlags[attributes.factor] & flagValues["compare"] && "\u3000" + attributes.compare) : false, factorFlags[attributes.factor] & flagValues["values"] ? values.map((cond, index) => /* @__PURE__ */ wp.element.createElement(
        "li",
        {
          className: "tab" + (index === currentIndex ? " active" : ""),
          onClick: () => {
            setAttributes({ currentIndex: index });
          }
        },
        cond
      )) : false), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(
        InnerBlocks,
        {
          template: values.map((cond) => ["catpow/switchercontent", { cond }]),
          allowedBlocks: ["catpow/switchercontent"]
        }
      ))), currentBlockId && /* @__PURE__ */ wp.element.createElement("style", null, CP.createStyleCode({ ["#" + currentBlockId]: { display: "block" } })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          classKey: "factor",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.switcher || {},
          initialOpen: true
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
  registerBlockType("catpow/switchercontent", {
    title: "\u{1F43E} SwitcherContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/switcher"],
    attributes: {
      cond: { source: "attribute", label: "\u6761\u4EF6", selector: "switcherContent", attribute: "cond", default: "content" }
    },
    edit({ attributes, className, setAttributes, clientId }) {
      const { cond } = attributes;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "switcherContent" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph"]], templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { cond } = attributes;
      return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("switcherContent", { cond }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
