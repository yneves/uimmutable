/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.LinkGroup', [
  'React', 'Immutable', 'classNames', 'uim.Link', 'uim.Icon',
  (React, Immutable, classNames, Link, Icon) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          links: field.get('links'),
          className: field.get('className'),
          collapsed: field.get('collapsed')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      links: React.PropTypes.List.isRequired,
      className: React.PropTypes.string,
      collapsed: React.PropTypes.bool.isRequired
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        links: Immutable.List(),
        collapsed: false
      };
    },

    renderIcon(link) {
      if (link.has('icon')) {
        return (
          <Icon key='icon' name={link.get('icon')} />
        );
      }
    },

    renderLink(link, index) {
      return (
        <li key={index} className={link.get('className')}>
          <Link name={link.get('name')} href={link.get('href')} className={link.get('className')}>
            {this.renderIcon(link)}
            {link.get('label')}
          </Link>
        </li>
      );
    },

    render() {
      const classes = {
        ['link-group']: true,
        [this.props.className]: !!this.props.className
      };
      let style = {};
      if (this.props.collapsed) {
        style.display = 'none';
      }
      return (
        <ul className={classNames(classes)} style={style}>
          {this.props.links.map(this.renderLink)}
        </ul>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
