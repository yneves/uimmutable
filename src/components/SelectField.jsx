/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //



rey.component('uim.SelectField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          options: field.get('options'),
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
      options: React.PropTypes.List.isRequired,
      value: React.PropTypes.any,
      required: React.PropTypes.bool,
      onChange: React.PropTypes.func,
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

    renderOption(option, index) {
      return (
        <option key={index} value={option.get('value')}>
          {option.get('label')}
        </option>
      );
    },

    getSelectedLabel() {
      const value = this.props.value;
      const selected = this.props.options.find(function (option) {
        return option.get('value') === value;
      });
      if (selected) {
        return selected.get('label');
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <select ref='input' value={this.props.value || ''}
            onChange={this.handleChange}
            required={this.props.required}>
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
      return content;
    },

    render() {
      const classes = {
        ['select-field']: true,
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

// - -------------------------------------------------------------------- - //
