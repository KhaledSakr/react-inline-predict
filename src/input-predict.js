import React from 'react';

export default class InputPredict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: props.suggestion ? [props.suggestion] : [''],
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
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.suggestion && newProps.suggestion != this.state.suggestions[0]) {
      this.setState({ suggestions: [newProps.suggestion], index: 0 });
    }
  }

  handleKeyDown(e) {
    // Handle Enter and Tab
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      let val = this.state.suggestions[this.state.index];
      this.setState({ value: val });
      if (this.props.onValueChange) {
        this.props.onValueChange(val, true);
      }
    }
    // Handle Up Arrow
    else if (e.keyCode === 38 && this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
    // Handle Down Arrow
    else if (e.keyCode === 40 && this.state.index < (this.state.suggestions.length - 1)) {
      this.setState({ index: this.state.index + 1 });
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  handleInputChange(e) {
    let suggestions = [];
    let match = false;

    if (this.props.suggestion) {
      if (this.props.suggestion === e.target.value) {
        match = true;
      }
    }
    else if (this.props.dictionary) {
      if (e.target.value.trim().length) {
        for (let i = 0; i < this.props.dictionary.length; i++) {
          let regex = new RegExp('^' + e.target.value, 'i');
          if (e.target.value === this.props.dictionary[i]) {
            match = true;
          }
          if (regex.test(this.props.dictionary[i])) {
            suggestions.push(e.target.value + this.props.dictionary[i].slice(e.target.value.length))
          }
        }
      }
    }

    if (suggestions.length === 0) {
      suggestions = [''];
    }

    this.setState({
      value: e.target.value,
      suggestions: this.props.suggestion ? [this.props.suggestion] : suggestions,
      index: 0
    });

    if (this.props.onValueChange) {
      this.props.onValueChange(e.target.value, match);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const { onValueChange, inputStyle, suggestionStyle, dictionary, suggestion, onChange, onKeyDown, value, ...otherProps } = this.props;
    return (
      <div className="input-predict-container" style={this.state.containerStyle}>
        <input className="input-predict-input" style={inputStyle || this.state.inputStyle}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.value}
          {...otherProps} />
        <input className="input-predict-suggestion" style={suggestionStyle || this.state.suggestionStyle} type="text" disabled="disabled"
          value={this.state.suggestions[this.state.index]} />
      </div>
    )
  }
}
