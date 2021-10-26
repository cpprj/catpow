function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.UI.DateSelect = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useReducer = _wp$element.useReducer,
      useMemo = _wp$element.useMemo,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect;

  var _useState = useState(false),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var now = useMemo(function () {
    return Catpow.util.getDateObject('now');
  });

  var _useReducer = useReducer(function (state, action) {
    switch (action.type) {
      case 'init':
        {
          state.min = Catpow.util.getDateObject(props.min || '-80 year');
          state.max = Catpow.util.getDateObject(props.max || '+1 year');
          state.minTime = state.min.getTime();
          state.maxTime = state.max.getTime();
          state.minYear = state.min.getFullYear();
          state.maxYear = state.max.getFullYear();
          action.value = props.value;
          return _objectSpread({}, state);
        }

      case 'update':
        {
          var d = action.value ? Catpow.util.getDateObject(action.value) : new Date(action.year || state.year || now.getFullYear(), (action.month || state.month || now.getMonth() + 1) - 1, action.date || state.date || now.getDate());

          if (isNaN(d.getTime())) {
            state.value = state.year = state.month = state.date = undefined;
            return _objectSpread({}, state);
          }

          var t = d.getTime();

          if (t < state.minTime) {
            d.setTime(state.minTime);
          }

          if (t > state.maxTime) {
            d.setTime(state.maxTime);
          }

          state.value = Catpow.util.getDateValue(d);
          state.year = d.getFullYear();
          state.month = d.getMonth() + 1;
          state.date = d.getDate();

          if (d.getFullYear() === state.minYear) {
            state.minMonth = state.min.getMonth() + 1;

            if (d.getMonth() === state.minMonth - 1) {
              state.minDate = state.min.getDate();
            } else {
              state.minDate = 1;
            }
          } else {
            state.minMonth = 1;
            state.minDate = 1;
          }

          if (d.getFullYear() === state.maxYear) {
            state.maxMonth = state.max.getMonth() + 1;

            if (d.getMonth() === state.maxMonth - 1) {
              state.maxDate = state.max.getDate();
            } else {
              state.maxDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            }
          } else {
            state.maxMonth = 12;
            state.maxDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
          }

          return _objectSpread({}, state);
        }
    }

    return state;
  }, {}),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  useEffect(function () {
    return dispatch({
      type: 'init'
    });
  }, []);
  return wp.element.createElement("div", {
    className: "DateSelect"
  }, wp.element.createElement("div", {
    className: "inputs"
  }, wp.element.createElement(Catpow.SelectNumber, {
    label: "---",
    min: state.minYear,
    max: state.maxYear,
    value: state.year,
    onChange: function onChange(year) {
      dispatch({
        type: 'update',
        year: year
      });
    }
  }), wp.element.createElement("span", {
    className: "unit"
  }, "\u5E74"), wp.element.createElement(Catpow.SelectNumber, {
    label: "---",
    min: state.minMonth,
    max: state.maxMonth,
    value: state.month,
    onChange: function onChange(month) {
      dispatch({
        type: 'update',
        month: month
      });
    }
  }), wp.element.createElement("span", {
    className: "unit"
  }, "\u6708"), wp.element.createElement(Catpow.SelectNumber, {
    label: "---",
    min: state.minDate,
    max: state.maxDate,
    value: state.date,
    onChange: function onChange(date) {
      dispatch({
        type: 'update',
        date: date
      });
    }
  }), wp.element.createElement("span", {
    className: "unit"
  }, "\u65E5"), wp.element.createElement("span", {
    className: "btn calendar",
    onClick: function onClick() {
      return setOpen(true);
    }
  })), wp.element.createElement(Catpow.Popup, {
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    closeButton: true
  }, wp.element.createElement(Catpow.Calendar, {
    className: "medium",
    year: state.year || now.getFullYear(),
    month: state.month || now.getMonth() + 1,
    showControl: true,
    min: props.min,
    max: props.max,
    values: state.value ? babelHelpers.defineProperty({}, state.value, true) : {},
    onSelect: function onSelect(value) {
      setOpen(false);
      dispatch({
        type: 'update',
        value: value
      });
    }
  })), state.value && wp.element.createElement(Catpow.UI.HiddenValues, {
    name: props.name,
    value: state.value
  }));
};
