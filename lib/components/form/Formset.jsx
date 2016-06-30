/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Formset', [
  'React', 'Immutable', 'classNames', 'uim.FieldGroup',
  (React, Immutable, classNames, FieldGroup) => ({

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.node,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      input: React.PropTypes.bool.isRequired,
      collapsible: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false
      };
    },

    getInitialState() {
      return {
        collapsed: false
      };
    },

    handleClickTitle() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },

    renderTitle() {
      if (this.props.label) {
        return (
          <h1 className='title' onClick={this.handleClickTitle}>
            <span>{this.props.label}</span>
          </h1>
        );
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        formset: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-form-name={this.props.name} style={style} className={classNames(classes)}>
          {this.renderTitle()}
          <FieldGroup
            path={this.props.path}
            input={this.props.input}
            fields={this.props.fields}
            values={this.props.values}
            collapsed={this.state.collapsed}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
