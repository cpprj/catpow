var _excluded = ["label", "desc", "caption"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
* Finderで選択された項目をbulk APIで処理するコンポーネント
*/
Catpow.Finder.BulkControl = function (props) {
  var callback = props.callback;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useMemo = _wp$element.useMemo,
      useEffect = _wp$element.useEffect,
      useContext = _wp$element.useContext;
  var __ = wp.i18n.__;

  var _useContext = useContext(Catpow.FinderContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var _useState = useState(false),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = babelHelpers.slicedToArray(_useState3, 2),
      modal = _useState4[0],
      setModal = _useState4[1];

  var cols = state.index.cols;
  useEffect(function () {
    wp.apiFetch({
      path: state.apiPath + '/bulk/index'
    }).then(function (bulk) {
      dispatch({
        type: 'update',
        data: {
          bulk: bulk
        }
      });
    });
  }, []);
  var options = useMemo(function () {
    if (!state.bulk) {
      return {};
    }

    var options = {};
    Object.keys(state.bulk).map(function (name) {
      options[state.bulk[name].label] = name;
    });
    return options;
  }, [state.bulk]);
  var exec_bulk = useCallback( /*#__PURE__*/function () {
    var _ref = babelHelpers.asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
      var conf, vals;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              conf = state.bulk[action];
              _context.next = 4;
              return show_modal(conf);

            case 4:
              vals = _context.sent;
              wp.apiFetch({
                path: state.apiPath + '/bulk/exec/' + action,
                method: 'POST',
                data: {
                  rows: state.selectedRows.map(function (row) {
                    return row._id;
                  }),
                  vals: vals
                }
              }).then(function (res) {
                if (callback) {
                  callback({
                    action: action,
                    res: res,
                    state: state,
                    dispatch: dispatch
                  });
                }

                if (res.remove) {
                  dispatch({
                    type: 'removeRows',
                    rows: state.selectedRows
                  });
                }

                if (res.update) {
                  dispatch({
                    type: 'updateRows',
                    rows: res.update
                  });
                }

                if (res.message) {
                  dispatch(_objectSpread({
                    type: 'showMessage'
                  }, res.message));
                }

                if (res.download) {
                  Catpow.util.download(res.download.data, res.download.name || state.name + '.csv', 'text/csv');
                }
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", false);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [state, dispatch]);
  var show_modal = useCallback(function (conf) {
    var _Catpow = Catpow,
        ModalForm = _Catpow.ModalForm,
        Buttons = _Catpow.Buttons;
    var Input = ModalForm.Input,
        Button = ModalForm.Button;
    return new Promise(function (resolve, reject) {
      if (!conf.inputs) {
        resolve(false);
        return;
      }

      setModal(wp.element.createElement(ModalForm, {
        onComplete: function onComplete(values) {
          setModal(false);

          if (values.accept) {
            resolve(values);
          } else {
            reject(false);
          }
        }
      }, wp.element.createElement("div", {
        className: "FinderBulkControlForm"
      }, wp.element.createElement("h3", {
        className: "title"
      }, conf.label), wp.element.createElement("ul", {
        className: "inputs"
      }, conf.inputs.map(function (props) {
        var label = props.label,
            desc = props.desc,
            caption = props.caption,
            otherPorps = babelHelpers.objectWithoutProperties(props, _excluded);
        return wp.element.createElement("li", {
          className: "item"
        }, label && wp.element.createElement("h4", {
          className: "label"
        }, label), desc && wp.element.createElement("p", {
          className: "desc"
        }, desc), wp.element.createElement("div", {
          className: "input"
        }, wp.element.createElement(Input, otherPorps)), caption && wp.element.createElement("p", {
          className: "caption"
        }, caption));
      })), wp.element.createElement(Buttons, null, wp.element.createElement(Button, {
        label: __('キャンセル', 'catpow'),
        className: "negative",
        name: "accept",
        value: false
      }), wp.element.createElement(Button, {
        label: __('実行', 'catpow'),
        className: "primary",
        name: "accept",
        value: true
      })))));
    });
  }, [setModal]);
  return wp.element.createElement("div", {
    className: "FinderControl FinderBulkControl"
  }, wp.element.createElement("ul", {
    className: "items"
  }, wp.element.createElement("li", {
    className: 'item' + (open ? ' active' : '')
  }, wp.element.createElement("div", {
    className: "inputs"
  }, wp.element.createElement(Catpow.SelectBox, {
    label: __('一括処理', 'catpow'),
    value: value,
    options: options,
    onChange: function onChange(val) {
      setValue(val);
    }
  }), wp.element.createElement(Catpow.Button, {
    label: __('実行', 'catpow'),
    onClick: function onClick(e) {
      exec_bulk(value);
    }
  })))), modal);
};
