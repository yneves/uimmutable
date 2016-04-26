/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.List', [
  'React', 'Immutable', 'classNames', 'uim.Toolbar', 'uim.Paginator',
  (React, Immutable, classNames, Toolbar, Paginator) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          data: field.get('data'),
          columns: field.get('columns'),
          header: field.get('header'),
          footer: field.get('footer'),
          empty: field.get('empty'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      data: React.PropTypes.Map.isRequired,
      rows: React.PropTypes.List,
      columns: React.PropTypes.List.isRequired,
      header: React.PropTypes.bool.isRequired,
      footer: React.PropTypes.any,
      pageUrl: React.PropTypes.string,
      empty: React.PropTypes.any,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      transformColumnsWith: React.PropTypes.func
    },

    getDefaultProps() {
      return {
        data: Immutable.Map(),
        path: Immutable.List(),
        columns: Immutable.List(),
        header: true
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

    handleClickBody(event) {

      let target = event.target;
      while (!this.isValidTarget(target)) {
        target = target.parentNode;
        if (target === document.body) {
          break;
        }
      }

      if (this.isValidTarget(target)) {

        const rowIndex = Number(target.getAttribute('data-row-index'));
        const colIndex = Number(target.getAttribute('data-column-index'));

        const row = this.getRow(rowIndex);
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
      return (
        <div key={index}
          className='list-column'
          data-column-index={index}
          data-column-name={column.get('name')}>
          {column.get('label')}
        </div>
      );
    },

    renderCol(row, rowIndex, column, colIndex) {

      const Component = rey.inject('uim.' + column.get('type'));

      if (!Component) {
        throw new Error('unknown component type (' + column.get('type') + ')');
      }

      if (!Component.pickProps) {
        throw new Error('invalid component type (' + column.get('type') + ')');
      }

      const props = Component.pickProps(this.props.path, column, row);

      return (
        <div key={colIndex}
          className='list-column'
          data-row-index={rowIndex}
          data-column-index={colIndex}
          data-column-name={column.get('name')}>
          <Component
            {...props}
            onClick={this.handleClick.bind(this, row, column)}
            onChange={this.handleChange.bind(this, row, column)} />
        </div>
      );
    },

    renderRow(row, rowIndex) {

      let columns = this.props.columns;
      if (this.props.transformColumnsWith) {
        columns = this.props.transformColumnsWith(columns, row);
      }

      return (
        <div key={rowIndex} className='list-row' data-row-index={rowIndex}>
          {columns.map(function (column, colIndex) {
            return this.renderCol(row, rowIndex, column, colIndex);
          }, this)}
        </div>
      );
    },

    getRow(index) {
      let row;
      if (Immutable.List.isList(this.props.rows)) {
        row = this.props.rows.get(index);
      } else if (Immutable.List.isList(this.props.data.get('rows'))) {
        row = this.props.data.getIn(['rows', index]);
      }
      return row;
    },

    getRows() {
      let rows = this.props.rows;
      if (!Immutable.List.isList(rows)) {
        rows = this.props.data.get('rows');
      }
      if (!Immutable.List.isList(rows)) {
        rows = Immutable.List();
      }
      return rows;
    },

    countRows() {
      let count = 0;
      if (this.props.data.has('count')) {
        count = this.props.data.get('count');
      } else {
        count = this.getRows().size;
      }
      return count;
    },

    renderBody() {
      const classes = {
        'list-body': true,
        'no-foot': !this.props.footer
      };
      return (
        <div key='body' className={classNames(classes)} onClick={this.handleClickBody}>
          {this.getRows().map(this.renderRow)}
        </div>
      );
    },

    renderHeader() {
      let content;
      if (this.props.header === true) {

        let columns = this.props.columns;
        if (this.props.transformColumnsWith) {
          columns = this.props.transformColumnsWith(columns);
        }

        content = (
          <div key='head' className='list-head list-row'>
            {columns.map(this.renderHeadCol)}
          </div>
        );

      } else if (Immutable.List.isList(this.props.header)) {
        content = (
          <div key='head' className='list-head list-row'>
            <Toolbar
              name='header'
              path={this.props.path.push('header')}
              tools={this.props.header}
              values={this.props.data}
              onClick={this.props.onClick}
              onChange={this.props.onChange} />
          </div>
        );

      } else if (this.props.header) {
        content = (
          <div key='head' className='list-head list-row'>
            {this.props.header}
          </div>
        );
      }
      return content;
    },

    renderFooter() {
      let content;
      if (Immutable.List.isList(this.props.footer)) {

        content = (
          <div key='foot' className='list-foot list-row'>
            <Toolbar
              name='footer'
              path={this.props.path.push('footer')}
              tools={this.props.footer}
              values={this.props.data}
              onClick={this.props.onClick}
              onChange={this.props.onChange} />
          </div>
        );

      } else if (this.props.footer) {
        content = (
          <div key='foot' className='list-foot list-row'>
            <div className='list-column'>
              {this.props.footer}
            </div>
          </div>
        );
      }
      return content;
    },

    renderPages() {
      let content;
      if (this.props.data.has('pages') && this.props.data.has('page')) {

        const count = this.countRows();
        const page = count > 0 ? Number(this.props.data.get('page')) || 1 : 0;
        const pages = count > 0 ? Number(this.props.data.get('pages')) || 1 : 0;

        if (pages > 1) {
          content = (
            <Paginator
              key='pages'
              page={page}
              pages={pages}
              pageUrl={this.props.pageUrl} />
          );
        }
      }
      return content;
    },

    renderContent() {
      let content;
      if (this.countRows() > 0 || !this.props.empty) {
        content = [
          this.renderHeader(),
          this.renderBody(),
          this.renderFooter(),
          this.renderPages()
        ];
      } else {
        content = (
          <div className='list-empty'>{this.props.empty}</div>
        )
      }
      return content;
    },

    render() {
      const classes = {
        list: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-list-name={this.props.name} className={classNames(classes)}>
          {this.renderContent()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
