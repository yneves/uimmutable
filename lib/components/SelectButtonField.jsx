/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.SelectButtonField", [
  "React", "Immutable", "classNames", "uim.SelectButton", "uim.Field",
  function(React, Immutable, classNames, SelectButton, Field) {
  
    return {
  
      statics: {
        pickProps: SelectButton.pickProps
      },
      
      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        options: React.PropTypes.List.isRequired,
        disabled: React.PropTypes.bool.isRequired,
        disabledValues: React.PropTypes.List,
        blankValue: React.PropTypes.string,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
      },
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          disabled: false
        };
      },
      
      render: function() {
        
        var classes = {};
        classes["select-button-field"] = true;
        classes[this.props.className] = !!this.props.className;
        
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            <SelectButton {...this.props} />
          </Field>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //
