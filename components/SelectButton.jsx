// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

var Value = require("./Value.jsx");
var Icon = require("./Icon.jsx");

// - -------------------------------------------------------------------- - //

var SelectButton = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        options: field.get("options"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.List.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getInitialState: function() {
    return {
      showOptions: false
    };
  },
  
  handleClickCaret: function(event) {
    event.event.stopPropagation();
    this.setState({ showOptions: !this.state.showOptions });
  },
  
  handleClick: function(option, event) {
    event.stopPropagation();
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        path: this.props.path,
        value: option.get("value"),
        option: option,
        event: event
      });
    }
    this.setState({ showOptions: !this.state.showOptions });
  },
  
  renderOption: function(option, index) {
    
    var classes = {};
    classes["select-button-option"] = true;
    classes[option.get("className")] = !!option.get("className");
    
    return (
      <li key={index} className={classNames(classes)} onClick={this.handleClick.bind(this, option)}>
        {option.get("label")}
      </li>
    );
  },
  
  getSelectedOption: function() {
    if (this.props.value || this.props.value === 0) {
      var size = this.props.options.size;
      var selected;
      var option;
      var i;
      for (i = 0; i < size; i++) {
        option = this.props.options.get(i);
        if (option.get("value") === this.props.value) {
          selected = option;
          break;
        }
      }
      return selected;
    }
  },
  
  renderSelectedOption: function() {
    
    var classes = {};
    classes["select-button-value"] = true;
    
    var selectedOption = this.getSelectedOption();
    var value;
    
    if (selectedOption) {
      classes[selectedOption.get("className")] = !!selectedOption.get("className");
      value = selectedOption.get("selectedLabel") || selectedOption.get("label");
    }
    
    return (
      <Value
        className={classNames(classes)}
        path={this.props.path}
        name={this.props.name}
        value={value} />
    );
  },
  
  render: function() {
    
    var classes = {};
    classes["select-button"] = true;
    classes["show-options"] = this.state.showOptions;
    classes[this.props.className] = !!this.props.className;
    
    return (
      <button data-button-name={this.props.name} className={classNames(classes)} type="button">
        {this.renderSelectedOption()}
        <Icon name="caret-down" onClick={this.handleClickCaret} />
        <ul>
          {this.props.options.map(this.renderOption)}
        </ul>
      </button>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = SelectButton;

// - -------------------------------------------------------------------- - //
