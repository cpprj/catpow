(() => {
  // ../ui/ProtectedMedia/input.jsx
  Catpow.UI.ProtectedMedia = (props) => {
    const { SelectMedia } = Catpow;
    const { useState, useCallback } = wp.element;
    const [value, setValue] = useState(props.value);
    return /* @__PURE__ */ React.createElement("div", { className: "ProtectedMedia" }, /* @__PURE__ */ React.createElement(
      SelectMedia,
      {
        src: value.url || props.default.url,
        mime: value.mime || props.default.mime,
        onChange: (media) => {
          setValue({
            ...value,
            id: media.id,
            url: media.url,
            mime: media.mime
          });
        }
      }
    ), /* @__PURE__ */ React.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value
      }
    ));
  };
})();
