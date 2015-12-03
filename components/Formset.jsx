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

var FieldGroup = require("./FieldGroup.jsx");
var Fieldset = require("./Fieldset.jsx");
var DateField = require("./DateField.jsx");
var TimeField = require("./TimeField.jsx");
var TextField = require("./TextField.jsx");
var MemoField = require("./MemoField.jsx");
var SelectField = require("./SelectField.jsx");
var PasswordField = require("./PasswordField.jsx");
var ButtonGroup = require("./ButtonGroup.jsx");
var CheckGroup = require("./CheckGroup.jsx");
var RadioGroup = require("./RadioGroup.jsx");

// - -------------------------------------------------------------------- - //

var Formset = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    types: React.PropTypes.Map.isRequired,
    fields: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    input: React.PropTypes.bool.isRequired,
    collapsible: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      collapsible: false,
      input: true,
      path: Immutable.List(),
      types: Immutable.Map({
        Fieldset: Fieldset,
        TextField: TextField,
        TimeField: TimeField,
        MemoField: MemoField,
        DateField: DateField,
        SelectField: SelectField,
        PasswordField: PasswordField,
        ButtonGroup: ButtonGroup,
        CheckGroup: CheckGroup,
        RadioGroup: RadioGroup
      })
    };
  },
  
  getInitialState: function() {
    return {
      collapsed: false
    };
  },
  
  handleClickTitle: function() {
    if (this.props.collapsible) {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  },
  
  render: function() {
    
    var classes = { formset: true };
    classes[this.props.className] = !!this.props.className;
    
    var extraProps = {
      input: this.props.input,
      onClick: this.props.onClick,
      onChange: this.props.onChange
    };
    
    var title;
    if (this.props.label) {
      title = (
        <h1 className="title" onClick={this.handleClickTitle}>
          <span>{this.props.label}</span>
        </h1>
      );
    }
    
    return (
      <div data-form-name={this.props.name} className={classNames(classes)}>
        {title}
        <FieldGroup
          path={this.props.path}
          types={this.props.types}
          fields={this.props.fields}
          values={this.props.values}
          extraProps={extraProps}
          collapsed={this.state.collapsed} />
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Formset;

// - -------------------------------------------------------------------- - //
