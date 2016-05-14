/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

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
          width: field.get('width'),
          placeholder: field.get('placeholder')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      width: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      placeholder: React.PropTypes.string
    },

    parseInput(date) {
      return date ? moment(date, DateFormat.date.output) : undefined;
    },

    parseOutput(date) {
      return date.isValid() ? date.format(DateFormat.date.output) : undefined;
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
            dateFormat={DateFormat.date.input}
            selected={this.parseInput(this.props.value)}
            onChange={this.handleChange}
            placeholderText={this.props.placeholder} />
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
          width={this.props.width}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);
