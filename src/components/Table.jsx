/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.Table', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          rows: field.get('rows'),
          columns: field.get('columns'),
          header: field.get('header'),
          footer: field.get('footer'),
          className: field.get('className'),
          style: field.get('style')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      header: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      footer: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      rows: React.PropTypes.List.isRequired,
      columns: React.PropTypes.List.isRequired,
      transformColumns: React.PropTypes.func,
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
        rows: Immutable.List(),
        columns: Immutable.List(),
        header: true,
        footer: false
      };
    },

    handleClick(row, column, event) {
      if (this.props.onClick) {
        event.row = row;
        event.column = column;
        this.props.onClick(event);
      }
    },

    isValidTarget(target) {
      return (
        target.hasAttribute('data-row-index') &&
        target.hasAttribute('data-column-index')
      );
    },

    findTarget(event) {
      let target = event.target;
      while (!this.isValidTarget(target)) {
        target = target.parentNode;
        if (target === document.body) {
          break;
        }
      }
      if (this.isValidTarget(target)) {
        return target;
      }
    },

    handleClickBody(event) {
      const target = this.findTarget(event);
      if (target) {

        const rowIndex = Number(target.getAttribute('data-row-index'));
        const colIndex = Number(target.getAttribute('data-column-index'));
        const row = this.props.rows.get(rowIndex);
        const column = this.props.columns.get(colIndex);

        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            row: row,
            column: column,
            event: event
          });
        }
      }
    },

    handleChange(row, column, event) {
      if (this.props.onChange) {
        event.row = row;
        event.column = column;
        this.props.onChange(event);
      }
    },

    renderHeadCol(column, index) {
      const style = {};
      if (column.get('width')) {
        style.width = column.get('width');
      }
      return (
        <th key={index}
          style={style}
          className='table-column'
          data-column-index={index}
          data-column-name={column.get('name')}>
          {column.get('label')}
        </th>
      );
    },

    renderCol(row, rowIndex, column, colIndex) {

      const Component = rey.deps.get('uim.' + column.get('type'));

      if (!Component) {
        throw new Error('unknown component type (' + column.get('type') + ')');
      }

      if (!Component.pickProps) {
        throw new Error('invalid component type (' + column.get('type') + ')');
      }

      const props = Component.pickProps(this.props.path, column, row);

      return (
        <td key={colIndex}
          className='table-column'
          data-row-index={rowIndex}
          data-column-index={colIndex}
          data-column-name={column.get('name')}>
          <Component
            {...props}
            onClick={this.handleClick.bind(this, row, column)}
            onChange={this.handleChange.bind(this, row, column)} />
        </td>
      );
    },

    renderRow(row, rowIndex) {
      return (
        <tr key={rowIndex} className='table-row' data-row-index={rowIndex}>
          {this.getColumns(row, rowIndex).map((column, colIndex) => (
            this.renderCol(row, rowIndex, column, colIndex)
          ))}
        </tr>
      );
    },

    getColumns(row, rowIndex) {
      let columns = this.props.columns;
      if (this.props.transformColumns) {
        columns = this.props.transformColumns(columns, row, rowIndex);
      }
      return columns;
    },

    renderBody() {
      const classes = {
        'table-body': true,
        'no-foot': !this.props.footer
      };
      return (
        <tbody className={classNames(classes)} onClick={this.handleClickBody}>
          {this.props.rows.map(this.renderRow)}
        </tbody>
      );
    },

    renderHeader() {
      if (this.props.header) {
        let content;
        if (this.props.header === true) {
          content = (
            <tr className='table-head table-row'>
              {this.getColumns().map(this.renderHeadCol)}
            </tr>
          );
        } else {
          content = (
            <tr className='table-head table-custom-head table-row'>
              <th className='table-column' colSpan={this.props.columns.size}>
                {this.props.header}
              </th>
            </tr>
          );
        }
        return (
          <thead>
            {content}
          </thead>
        );
      }
    },

    renderFooter() {
      if (this.props.footer) {
        return (
          <tfoot>
            <tr className='table-foot table-custom-foot table-row'>
              <td className='table-column' colSpan={this.props.columns.size}>
                {this.props.footer}
              </td>
            </tr>
          </tfoot>
        );
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        table: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <table data-table-name={this.props.name} style={style} className={classNames(classes)} cellSpacing={0}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </table>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
