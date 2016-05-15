/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectButtonField', [
  'React', 'Immutable', 'classNames', 'uim.SelectButton', 'uim.Field',
  (React, Immutable, classNames, SelectButton, Field) => ({

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
      onClick: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false
      };
    },

    render() {
      const classes = {
        ['select-button-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          <SelectButton
            path={this.props.path}
            name={this.props.name}
            options={this.props.options}
            value={this.props.value}
            disabled={this.props.disabled}
            disabledValues={this.props.disabledValues}
            onClick={this.props.onClick}
            onChange={this.props.onChange}
            className={this.props.className} />
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
