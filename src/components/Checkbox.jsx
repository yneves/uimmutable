/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.Checkbox', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          style: field.get('style'),
          disabled: field.get('disabled'),
          value: field.get('value'),
          checked: !!values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func.isRequired,
      onChange: React.PropTypes.func.isRequired,
      value: React.PropTypes.any,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    componentDidMount() {
      this.handleClick();
    },

    handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        checkbox: true,
        disabled: this.props.disabled,
        [this.props.className]: !!this.props.className
      };
      return (
        <label className={classNames(classes)} style={style}>
          <input ref='input'
            type='checkbox'
            name={this.props.name}
            checked={this.props.checked}
            disabled={this.props.disabled}
            value={this.props.value}
            onClick={this.handleClick}
            onChange={this.handleChange} />
          <span>{this.props.label}</span>
        </label>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
