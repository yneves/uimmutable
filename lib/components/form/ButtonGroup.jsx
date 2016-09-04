/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.ButtonGroup', [
  'React', 'Immutable', 'classNames', 'uim.Button',
  (React, Immutable, classNames, Button) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          buttons: field.get('buttons'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      buttons: React.PropTypes.List.isRequired,
      onClick: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleClick(button, event) {
      if (this.props.onClick) {
        event.button = button;
        this.props.onClick(event);
      }
    },

    renderButton(button, index) {
      const props = Button.pickProps(this.props.path, button);
      return (
        <Button key={index} {...props} onClick={this.handleClick.bind(this, button)} />
      );
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        ['button-group']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-field-name={this.props.name} style={style} className={classNames(classes)}>
          {this.props.buttons.map(this.renderButton)}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
