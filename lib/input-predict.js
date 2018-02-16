'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputPredict = function (_React$Component) {
  _inherits(InputPredict, _React$Component);

  function InputPredict(props) {
    _classCallCheck(this, InputPredict);

    var _this = _possibleConstructorReturn(this, (InputPredict.__proto__ || Object.getPrototypeOf(InputPredict)).call(this, props));

    _this.state = {
      value: '',
      suggestions: [''],
      index: 0,
      containerStyle: {
        position: "relative"
      },
      inputStyle: {
        background: "transparent",
        zIndex: "0"
      },
      suggestionStyle: {
        position: "absolute",
        top: "0",
        background: "transparent",
        zIndex: "-1"
      }
    };
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(InputPredict, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.suggestion && newProps.suggestion != this.state.suggestion[0]) {
        this.setState({ suggestions: [newProps.suggestion], index: 0 });
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var event = Object.create(e);

      if (e.keyCode === 9 || e.keyCode === 13) {
        e.preventDefault();
        var val = this.state.suggestions[this.state.index];
        this.setState({ value: val });

        // A little hack to the send the onChange event back to the user
        event.target.value = val;
        this.props.onChange(event);
      } else if (e.keyCode === 38 && this.state.index > 0) {
        this.setState({ index: this.state.index - 1 });
      } else if (e.keyCode === 40 && this.state.index < this.state.suggestions.length - 1) {
        this.setState({ index: this.state.index + 1 });
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(e);
      }
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      var suggestions = [];

      if (this.props.dictionary) {
        if (e.target.value.trim().length) {
          for (var i = 0; i < this.props.dictionary.length; i++) {
            var regex = new RegExp('^' + e.target.value, 'i');
            if (regex.test(this.props.dictionary[i])) {
              suggestions.push(e.target.value + this.props.dictionary[i].slice(e.target.value.length));
            }
          }
        }
      }

      if (suggestions.length === 0) {
        suggestions = [''];
      }

      this.setState({ value: e.target.value, suggestions: this.props.suggestion ? [this.props.suggestion] : suggestions, index: 0 });
      this.props.onChange(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          inputStyle = _props.inputStyle,
          suggestionStyle = _props.suggestionStyle,
          dictionary = _props.dictionary,
          suggestion = _props.suggestion,
          onChange = _props.onChange,
          onKeyDown = _props.onKeyDown,
          value = _props.value,
          otherProps = _objectWithoutProperties(_props, ['inputStyle', 'suggestionStyle', 'dictionary', 'suggestion', 'onChange', 'onKeyDown', 'value']);

      return _react2.default.createElement(
        'div',
        { className: 'input-predict-container', style: this.state.containerStyle },
        _react2.default.createElement('input', _extends({ className: 'input-predict-input', style: inputStyle || this.state.inputStyle,
          onChange: this.handleInputChange,
          onKeyDown: this.handleKeyDown,
          value: this.state.value
        }, otherProps)),
        _react2.default.createElement('input', { className: 'input-predict-suggestion', style: suggestionStyle || this.state.suggestionStyle, type: 'text', disabled: 'disabled',
          value: this.state.suggestions[this.state.index] })
      );
    }
  }]);

  return InputPredict;
}(_react2.default.Component);

exports.default = InputPredict;