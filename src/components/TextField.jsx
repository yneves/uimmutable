/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //



rey.component('uim.TextField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field)  => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          required: field.get('required'),
          className: field.get('className'),
          options: field.get('options'),
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
      options: React.PropTypes.List,
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

    getId() {
      return this.props.path.toJS().join('-');
    },

    renderOptions() {
      if (this.props.input && this.props.options) {
        return (
          <datalist id={this.getId() + '-options'}>
            {this.props.options.map(function (option, index) {
              return (
                <option key={index} value={option}>{option}</option>
              );
            })}
          </datalist>
        )
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <input
            ref='input'
            type='text'
            value={this.props.value || ''}
            list={this.getId() + '-options'}
            required={this.props.required}
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
      return content;
    },

    render() {
      const classes = {
        ['text-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
          {this.renderOptions()}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
