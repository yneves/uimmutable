/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Menuset', [
  'React', 'Immutable', 'classNames', 'uim.LinkGroup',
  function (React, Immutable, classNames, LinkGroup) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            name: field.get('name'),
            label: field.get('label'),
            links: field.get('links'),
            className: field.get('className'),
            collapsible: field.get('collapsible'),
            collapsed: field.get('collapsed')
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        links: React.PropTypes.List.isRequired,
        collapsible: React.PropTypes.bool.isRequired,
        collapsed: React.PropTypes.bool.isRequired,
        className: React.PropTypes.string
      },

      getDefaultProps: function () {
        return {
          path: Immutable.List(),
          collapsible: false,
          collapsed: false
        };
      },

      getInitialState: function () {
        return {
          collapsed: this.props.collapsed
        };
      },

      handleClickLegend: function () {
        if (this.props.collapsible) {
          this.setState({
            collapsed: !this.state.collapsed
          });
        }
      },

      renderLabel: function () {
        if (this.props.label) {
          return (
            <legend onClick={this.handleClickLegend}>
              {this.props.label}
            </legend>
          );
        }
      },

      render: function () {

        var classes = {};
        classes['menuset'] = true;
        classes[this.props.className] = !!this.props.className;

        return (
          <div data-menu-name={this.props.name} className={classNames(classes)}>
            <fieldset>
              {this.renderLabel()}
              <LinkGroup
                path={this.props.path}
                links={this.props.links}
                collapsed={this.state.collapsed} />
            </fieldset>
          </div>
        );
      }
    };
  }
]);

// - -------------------------------------------------------------------- - //