/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.Pages', [
  'React', 'Immutable', 'classNames', 'uim.Icon',
  (React, Immutable, classNames, Icon) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          pages: field.get('pages'),
          range: field.get('range'),
          value: Number(values.getIn(path)),
          className: field.get('className'),
          style: field.get('style')
        };
      }
    },

    propTypes: {
      name: React.PropTypes.string.isRequired,
      path: React.PropTypes.List.isRequired,
      value: React.PropTypes.number.isRequired,
      pages: React.PropTypes.number.isRequired,
      range: React.PropTypes.number.isRequired,
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
        value: 1,
        pages: 1,
        range: 5
      };
    },

    handleClick(event, page) {
      if (page && page !== this.props.value) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: page,
            event: event
          });
        }
      }
    },

    renderPages() {

      const parts = [];
      const pages = this.props.pages;
      const current = this.props.value;
      const previous = current > 1;
      const next = current < pages;
      const first = Math.max(1, current - this.props.range);
      const last = Math.min(pages, current + this.props.range);

      if (previous) {
        parts.push(
          <li key='previous' onClick={(e) => this.handleClick(e, current - 1)}>
            <Icon name='previous' icon='chevron-left' />
         </li>
        );
      }

      for (let i = first; i <= last; i++) {
        parts.push(
          <li key={i}
            onClick={(e) => this.handleClick(e, i)}
            className={current === i ? 'current' : ''}>
            {i.toString()}
          </li>
        );
      }

      if (next) {
        parts.push(
          <li key='next' onClick={(e) => this.handleClick(e, current + 1)}>
            <Icon name='next' icon='chevron-right' />
          </li>
        );
      }

      return parts;
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        pages: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <ul style={style} className={classNames(classes)}>
           {this.renderPages()}
         </ul>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
