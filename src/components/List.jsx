/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.List', [
  'React', 'Immutable', 'classNames',
  'uim.Table', 'uim.Formset', 'uim.Toolbar',
  'uim.Pages', 'uim.SelectButton',
  (React, Immutable, classNames, Table, Formset, Toolbar, Pages, SelectButton) => ({

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      values: React.PropTypes.Map.isRequired,
      filter: React.PropTypes.oneOfType([
        React.PropTypes.List,
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      header: React.PropTypes.oneOfType([
        React.PropTypes.List,
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      footer: React.PropTypes.oneOfType([
        React.PropTypes.List,
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      rows: React.PropTypes.List.isRequired,
      columns: React.PropTypes.List.isRequired,
      transformColumns: React.PropTypes.func,
      empty: React.PropTypes.node,
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
        rows: Immutable.List(),
        path: Immutable.List(),
        columns: Immutable.List(),
        header: true,
        footer: false
      };
    },

    renderFilter() {
      if (this.props.filter) {
        let filter = this.props.filter;
        if (Immutable.List.isList(this.props.filter)) {
          filter = (
            <Formset
              name='filter'
              path={this.props.path}
              values={this.props.values}
              fields={this.props.filter}
              onClick={this.props.onClick}
              onChange={this.props.onChange} />
          );
        }
        return (
          <div className='list-filter'>
            {filter}
          </div>
        );
      }
    },

    renderLimit() {
      if (this.props.limits.size) {
        return (
          <SelectButton
            name='limit'
            path={this.props.path.push('limit')}
            value={this.props.values.getIn(this.props.path.push('limit'))}
            options={this.props.limits}
            onChange={this.props.onChange}
            className='select-limit'/>
        );
      }
    },

    renderPages() {
      if (this.props.pages > 1) {
        return (
          <div className='list-pages'>
            <Pages
              name='page'
              path={this.props.path.push('page')}
              value={Number(this.props.values.getIn(this.props.path.push('page')))}
              pages={this.props.pages}
              onChange={this.props.onChange} />
            {this.renderLimit()}
          </div>
        );
      }
    },

    isEmpty() {
      return this.props.rows.size === 0 && this.props.empty;
    },

    renderEmpty() {
      return (
        <div className='list-empty'>
          <p>{this.props.empty}</p>
        </div>
      );
    },

    renderHeader() {
      let header = this.props.header;
      if (Immutable.List.isList(this.props.header)) {
        header = (
          <Toolbar
            name='header'
            path={this.props.path}
            tools={this.props.header}
            values={this.props.values}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        );
      }
      return header;
    },

    renderFooter() {
      let footer = this.props.footer;
      if (Immutable.List.isList(this.props.footer)) {
        footer = (
          <Toolbar
            name='footer'
            path={this.props.path}
            tools={this.props.footer}
            values={this.props.values}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        );
      }
      return footer;
    },

    renderTable() {
      return (
        <div className='list-table'>
          <Table
            name='table'
            header={this.renderHeader()}
            footer={this.renderFooter()}
            rows={this.props.rows}
            columns={this.props.columns}
            transformColumns={this.props.transformColumns}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        </div>
      );
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        list: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-list-name={this.props.name} style={style} className={classNames(classes)}>
          {this.renderFilter()}
          {this.isEmpty() ? this.renderEmpty() : this.renderTable()}
          {this.renderPages()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
