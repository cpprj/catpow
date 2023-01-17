(() => {
  // components/Popover/component.jsx
  Catpow.Popover = function(props) {
    const { children, open, onClose, closeButton } = props;
    const { Fragment, useEffect, useState, useRef } = wp.element;
    const [state, setPopoverState] = useState("closed");
    const [position, setPosition] = useState("");
    useEffect(() => setPopoverState(open ? "open" : state === "closed" ? "closed" : "close"), [open]);
    const ref = useRef({});
    useEffect(() => {
      if (ref.current.getBoundingClientRect && open) {
        const bnd = ref.current.getBoundingClientRect();
        const x = bnd.left + bnd.width / 2;
        const ux = window.innerWidth / 8, cy = window.innerHeight / 2;
        var classes = "";
        if (bnd.bottom < cy) {
          classes += "bottom";
        } else {
          classes += "top";
        }
        if (x < ux * 3) {
          classes += " right";
        } else if (x > ux * 5) {
          classes += " left";
        } else {
          classes += " center";
        }
        setPosition(classes);
      }
    }, [ref, open]);
    return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "PopoverAnchor", ref }), /* @__PURE__ */ wp.element.createElement(Catpow.External, { className: "PopoverContainer", trace: ref.current }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: `Popover ${state} ${position}`,
        onAnimationEnd: () => {
          if (state === "close") {
            setPopoverState("closed");
          }
        }
      },
      /* @__PURE__ */ wp.element.createElement("div", { className: "PopoverBody" }, /* @__PURE__ */ wp.element.createElement("div", { className: "PopoverArrow" }), /* @__PURE__ */ wp.element.createElement("div", { className: "PopoverContents" }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: "PopoverControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "close", onClick: onClose })))
    )));
  };
})();
