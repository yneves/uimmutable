/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.FileField', [
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
            className: field.get('className'),
            multiple: field.get('multiple'),
            value: values.getIn(path)
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        input: React.PropTypes.bool.isRequired,
        multiple: React.PropTypes.bool,
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
            files: this.refs.input.files,
            event: event
          });
        }
      },

      render: function () {

        var classes = {};
        classes['file-field'] = true;
        classes[this.props.className] = !!this.props.className;

        var content;

        if (this.props.input) {
          content = (
            <input
              ref='input'
              type='file'
              multiple={!!this.props.multiple}
              onChange={this.handleChange} />
          );

        } else {
          content = (
            <Value
              className='text-value'
              path={this.props.path}
              name={this.props.name}
              value={this.props.value} />
          );
        }

        return (
          <div className='file-field-wrapper'>
            <Field ref='field'
              name={this.props.name}
              label={this.props.label}
              className={classNames(classes)}>
              {content}
            </Field>
          </div>
        );
      }
    };
  }
]);

// - -------------------------------------------------------------------- - //
