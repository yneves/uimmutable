/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  function (React, Immutable, classNames, Value, Field) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));

          return {
            path: path,
            name: field.get('name'),
            label: field.get('label'),
            options: field.get('options'),
            className: field.get('className'),
            value: values.getIn(path)
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        input: React.PropTypes.bool.isRequired,
        options: React.PropTypes.List.isRequired,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
      },

      handleChange: function (event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },

      renderOption: function (option, index) {

        return (
          <option key={index} value={option.get('value')}>
            {option.get('label')}
          </option>
        );
      },

      getSelectedLabel: function () {
        var value = this.props.value;
        var selected = this.props.options.find(function (option) {
          return option.get('value') === value;
        });
        if (selected) {
          return selected.get('label');
        }
      },

      render: function () {

        var classes = {};
        classes['select-field'] = true;
        classes[this.props.className] = !!this.props.className;

        var content;

        if (this.props.input) {
          content = (
            <select ref='input' value={this.props.value} onChange={this.handleChange}>
              {this.props.options.map(this.renderOption)}
            </select>
          );

        } else {
          content = (
            <Value
              className='select-value'
              path={this.props.path}
              name={this.props.name}
              value={this.getSelectedLabel()} />
          );
        }

        return (
          <Field ref='field'
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            {content}
          </Field>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
