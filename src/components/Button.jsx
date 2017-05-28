/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.Button', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          htmlType: field.get('htmlType'),
          disabled: field.get('disabled'),
          style: field.get('style'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      htmlType: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        htmlType: 'button',
        disabled: false
      };
    },

    handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },

    render: function () {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        button: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <button
          style={style}
          data-button-name={this.props.name}
          type={this.props.htmlType}
          disabled={this.props.disabled}
          className={classNames(classes)}
          onClick={this.handleClick}>
          {this.props.label}
        </button>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
