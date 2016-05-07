/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.DateRangeField', [
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
          placeholder: field.get('placeholder')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.List,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      placeholder: React.PropTypes.any
    },

    parseInput(value, index) {
      if (Immutable.List.isList(value)) {
        const date = value.get(index);
        return date ? moment(date, DateFormat.date.output) : undefined;
      }
    },

    parseOutput(date) {
      return date && date.isValid() ? date.format(DateFormat.date.output) : undefined;
    },

    handleChange(value, index) {
      let newValue;
      if (Immutable.List.isList(this.props.value)) {
        newValue = this.props.value.set(index, this.parseOutput(value));
      } else {
        newValue = Immutable.List().set(index, this.parseOutput(value));
      }
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: newValue
        });
      }
    },

    getPlaceholder(index) {
      let placeholder;
      if (rey.isString(this.props.placeholder)) {
        placeholder = this.props.placeholder;
      } else if (Immutable.List.isList(this.props.placeholder)) {
        placeholder = this.props.placeholder.get(index);
      }
      return placeholder;
    },

    renderContent() {
      let content;
      if (this.props.input) {
        const startDate = this.parseInput(this.props.value, 0);
        const endDate = this.parseInput(this.props.value, 1);
        content = [
          <DatePicker
            key='startDate'
            ref='startDate'
            startDate={startDate}
            endDate={endDate}
            selected={startDate}
            dateFormat={DateFormat.date.input}
            isClearable={true}
            onBlur={() => this.refs.startDate.setOpen(false)}
            onChange={(date) => this.handleChange(date, 0)}
            placeholderText={this.getPlaceholder(0)} />
          ,
          <DatePicker
            key='endDate'
            ref='endDate'
            startDate={startDate}
            endDate={endDate}
            selected={endDate}
            isClearable={true}
            onBlur={() => this.refs.endDate.setOpen(false)}
            dateFormat={DateFormat.date.input}
            onChange={(date) => this.handleChange(date, 1)}
            placeholderText={this.getPlaceholder(1)} />
        ];
      } else {
        content = (
          <Value
            className='date-range-value'
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
        ['date-range-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          className={classNames(classes)}
          name={this.props.name}
          label={this.props.label}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);
