function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
* APIへ入力値を送信して結果を表示する
*/
Catpow.Console = function (props) {
  var _props$className = props.className,
      className = _props$className === void 0 ? 'cp-console' : _props$className,
      path = props.path;
  var el = wp.element.createElement;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef,
      useMemo = _wp$element.useMemo,
      useReducer = _wp$element.useReducer;
  var ControlItem = useCallback(function (props) {
    var state = props.state,
        dispatch = props.dispatch;
    var _Catpow = Catpow,
        SelectBox = _Catpow.SelectBox,
        CheckBoxes = _Catpow.CheckBoxes,
        RadioButtons = _Catpow.RadioButtons,
        Buttons = _Catpow.Buttons,
        Button = _Catpow.Button,
        ModalForm = _Catpow.ModalForm;
    var name = props.name,
        type = props.type,
        label = props.label,
        desc = props.desc;
    var inputTypes = useMemo(function () {
      return {
        text: function text(props) {
          return wp.element.createElement("input", {
            type: "text",
            onChange: function onChange(e) {
              dispatch({
                type: 'setData',
                name: name,
                value: e.currentTarget.value
              });
            },
            value: state.data[name]
          });
        },
        select: function select(props) {
          return wp.element.createElement(SelectBox, {
            onChange: function onChange(value) {
              dispatch({
                type: 'setData',
                name: name,
                value: value
              });
            },
            options: props.options,
            value: state.data[name]
          });
        },
        checkbox: function checkbox(props) {
          return wp.element.createElement(CheckBoxes, {
            onChange: function onChange(value) {
              dispatch({
                type: 'setData',
                name: name,
                value: value
              });
            },
            options: props.options,
            value: state.data[name]
          });
        },
        radio: function radio(props) {
          return wp.element.createElement(RadioButtons, {
            onChange: function onChange(value) {
              dispatch({
                type: 'setData',
                name: name,
                value: value
              });
            },
            options: props.options,
            value: state.data[name]
          });
        },
        submit: function submit(props) {
          return wp.element.createElement(Buttons, {
            onClick: function onClick(action) {
              _submit(action, state.data);
            },
            options: props.options
          });
        }
      };
    }, []);
    return wp.element.createElement("div", {
      className: className + '-controls-item'
    }, label && wp.element.createElement("div", {
      className: "label"
    }, label), desc && wp.element.createElement("div", {
      className: "desc"
    }, desc), wp.element.createElement("div", {
      class: "body"
    }, el(inputTypes[type], props)));
  }, [className]);
  var ResultItem = useCallback(function (props) {
    var _props$type = props.type,
        type = _props$type === void 0 ? 'log' : _props$type,
        text = props.text;
    var resultTypes = useMemo(function () {
      return {
        success: function success(props) {
          return wp.element.createElement("div", {
            className: "text -success"
          }, props.text);
        },
        error: function error(props) {
          return wp.element.createElement("div", {
            className: "text -error"
          }, props.text);
        },
        warn: function warn(props) {
          return wp.element.createElement("div", {
            className: "text -warn"
          }, props.text);
        },
        notice: function notice(props) {
          return wp.element.createElement("div", {
            className: "text -notice"
          }, props.text);
        },
        log: function log(props) {
          return wp.element.createElement("div", {
            className: "text -log"
          }, props.text);
        }
      };
    }, []);
    return el(resultTypes[type], props);
  }, []);
  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'setData':
        {
          state.data[action.name] = action.value;
          return _objectSpread({}, state);
        }

      case 'setResults':
        {
          state.results = action.results;
          return _objectSpread({}, state);
        }
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    data: {},
    results: []
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _submit = useCallback(function (action, data) {
    wp.apiFetch({
      path: "/cp/v1/".concat(path, "/").concat(action),
      method: 'POST',
      data: data
    }).then(function (res) {
      var results = res.results,
          _res$resubmit = res.resubmit,
          resubmit = _res$resubmit === void 0 ? false : _res$resubmit;
      dispatch({
        type: 'setResults',
        results: results
      });

      if (resubmit) {
        _submit(action, resubmit);
      }
    }).catch(function (e) {
      dispatch({
        type: 'setResults',
        results: [{
          type: 'error',
          text: e.message
        }]
      });
    });
  }, []);

  var flagsToWords = useCallback(function (flags) {
    if (undefined === flags) {
      return '';
    }

    return Object.keys(flags).filter(function (word) {
      return flags[word];
    }).join(' ');
  }, []);
  return wp.element.createElement("div", {
    className: className
  }, wp.element.createElement("div", {
    class: className + '-controls'
  }, props.controls.map(function (itemProps) {
    return el(ControlItem, _objectSpread(_objectSpread({}, itemProps), {}, {
      state: state,
      dispatch: dispatch
    }));
  })), wp.element.createElement("div", {
    class: className + '-results'
  }, state.results.map(function (itemProps) {
    return el(ResultItem, itemProps);
  })));
};
