/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
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
        disabled: field.get("disabled"),
        disabledValues: field.get("disabledValues"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.List.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    disabledValues: React.PropTypes.List,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getInitialState: function() {
    return {
      showOptions: false
    };
  },
  
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },
  
  handleClickCaret: function(event) {
    event.event.stopPropagation();
    this.setState({ showOptions: !this.state.showOptions });
  },
  
  handleClickOption: function(option, event) {
    event.stopPropagation();
    this.setState({ showOptions: !this.state.showOptions });
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        path: this.props.path,
        value: option.get("value"),
        option: option,
        event: event
      });
    }
  },
  
  handleClickValue: function(event) {
    if (this.props.onClick) {
      this.props.onClick({
        name: this.props.name,
        path: this.props.path,
        value: this.props.value,
        event: event
      });
    }
  },
  
  renderOption: function(option, index) {
    
    var classes = {};
    classes["select-button-option"] = true;
    classes[option.get("className")] = !!option.get("className");
    
    return (
      <li key={index} className={classNames(classes)} onClick={this.handleClickOption.bind(this, option)}>
        {option.get("label")}
      </li>
    );
  },
  
  isDisabled: function() {
    return this.props.disabled || (this.props.disabledValues ? 
      this.props.disabledValues.indexOf(this.props.value) !== -1 : 
      false);
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
        onClick={this.handleClickValue}
        className={classNames(classes)}
        path={this.props.path}
        name={this.props.name}
        value={value} />
    );
  },
  
  renderOptions: function() {
    if (!this.isDisabled()) {
      return ([
        <Icon key="icon" name="caret-down" onClick={this.handleClickCaret} />
        ,
        <ul key="list">
          {this.props.options.map(this.renderOption)}
        </ul>
      ]);
    }
  },
  
  render: function() {
    
    var classes = {};
    classes["select-button"] = true;
    classes["show-options"] = this.state.showOptions;
    classes["disabled"] = this.isDisabled();
    classes[this.props.className] = !!this.props.className;
    
    return (
      <button data-button-name={this.props.name} className={classNames(classes)} type="button">
        {this.renderSelectedOption()}
        {this.renderOptions()}
      </button>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = SelectButton;

// - -------------------------------------------------------------------- - //
