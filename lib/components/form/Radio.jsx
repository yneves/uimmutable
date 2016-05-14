/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Radio', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onChange: React.PropTypes.func.isRequired,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render() {
      const classes = {
        radio: true,
        disabled: this.props.disabled,
        [this.props.className]: !!this.props.className
      };
      return (
        <label className={classNames(classes)}>
          <input ref='input'
            type='radio'
            name={this.props.name}
            value={this.props.value}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onChange={this.handleChange} />
          <span>{this.props.label}</span>
        </label>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
