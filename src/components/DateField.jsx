/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.DateField', [
  'React', 'Immutable', 'classNames',
  'uim.Value', 'uim.Field', 'uim.DatePicker', 'uim.DateFormat',
  (React, Immutable, classNames, Value, Field, DatePicker, DateFormat) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          value: values.getIn(path),
          style: field.get('style'),
          required: field.get('required'),
          inputFormat: field.get('inputFormat'),
          outputFormat: field.get('outputFormat'),
          placeholder: field.get('placeholder')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      required: React.PropTypes.bool,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      inputFormat: React.PropTypes.string.isRequired,
      outputFormat: React.PropTypes.string.isRequired,
      placeholder: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        inputFormat: DateFormat.date.input,
        outputFormat: DateFormat.date.output
      };
    },

    parseInput(date) {
      if (typeof date === 'string') {
        date = date.substr(0, this.props.outputFormat.length);
      }
      return date ? moment(date, this.props.outputFormat) : undefined;
    },

    parseOutput(date) {
      return date.isValid() ? date.format(this.props.outputFormat) : undefined;
    },

    handleChange(value) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.parseOutput(value)
        });
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <DatePicker
            dateFormat={this.props.inputFormat}
            selected={this.parseInput(this.props.value)}
            onChange={this.handleChange}
            placeholderText={this.props.placeholder}
            required={this.props.required} />
        );
      } else {
        content = (
          <Value
            className='date-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value}
            format='date' />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['date-field']: true,
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
