/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.MemoField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          rows: field.get('rows'),
          cols: field.get('cols'),
          className: field.get('className'),
          width: field.get('width'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      rows: React.PropTypes.number,
      cols: React.PropTypes.number,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      width: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
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

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <textarea
            ref='input'
            rows={this.props.rows}
            cols={this.props.cols}
            value={this.props.value || ''}
            onChange={this.handleChange} />
        );
      } else {
        content = (
          <Value
            className='memo-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['memo-field']: true,
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

// - -------------------------------------------------------------------- - //
