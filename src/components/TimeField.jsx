/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.TimeField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          required: field.get('required'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      required: React.PropTypes.bool,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    componentDidMount() {
      if (this.props.input) {
        this.handleChange();
      }
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

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <input
            ref='input'
            type='time'
            value={this.props.value}
            onChange={this.handleChange}
            required={this.props.required} />
        );
      } else {
        content = (
          <Value
            className='time-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['time-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);
