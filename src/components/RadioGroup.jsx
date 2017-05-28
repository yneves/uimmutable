/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.RadioGroup', [
  'React', 'Immutable', 'classNames', 'uim.Field', 'uim.Value', 'uim.Radio',
  (React, Immutable, classNames, Field, Value, Radio) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          options: field.get('options'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      input: React.PropTypes.bool.isRequired,
      options: React.PropTypes.List.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    renderRadio(option, index) {
      return (
        <Radio ref={index}
          key={index}
          path={this.props.path}
          name={this.props.name}
          label={option.get('label')}
          value={option.get('value')}
          checked={this.props.value === option.get('value')}
          disabled={option.get('disabled')}
          onChange={this.props.onChange} />
      );
    },

    getSelectedLabel() {
      const value = this.props.value;
      const selected = this.props.options.find((option) => {
        return option.get('value') === value;
      });
      if (selected) {
        return selected.get('label');
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = this.props.options.map(this.renderRadio);
      } else {
        content = (
          <Value
            className='radio-value'
            path={this.props.path}
            name={this.props.name}
            value={this.getSelectedLabel()} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['radio-group']: true,
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
