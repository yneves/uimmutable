/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Paginator', [
  'React', 'Immutable', 'classNames', 'uim.Icon', 'uim.Link',
  function (React, Immutable, classNames, Icon, Link) {

    return {

      propTypes: {
        page: React.PropTypes.number.isRequired,
        pages: React.PropTypes.number.isRequired,
        pageUrl: React.PropTypes.string.isRequired,
        firstPage: React.PropTypes.number.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        onClick: React.PropTypes.func,
        className: React.PropTypes.string
      },

      getDefaultProps: function () {
        return {
          firstPage: -5,
          lastPage: 5,
          page: 1,
          pages: 1
        };
      },

      makeUrl: function (page) {
        return this.props.pageUrl.replace(/\{page\}/, page);
      },

      renderParts: function () {

        var parts = [];

        var pages = this.props.pages;
        var current = this.props.page;

        var previous = current > 1;
        var next = current < pages;
        var first = Math.max(1, current + this.props.firstPage);
        var last = Math.min(pages, current + this.props.lastPage);

        if (previous) {
          parts.push(
            <li key='previous'>
              <Link href={this.makeUrl(current - 1)}>
                <Icon name='previous' icon='chevron-left' />
              </Link>
            </li>
          );
        }

        for (var i = first; i <= last; i++) {
          parts.push(
            <li key={i} className={classNames({ current: current === i })}>
              <Link href={this.makeUrl(i)} label={i.toString()} />
            </li>
          )
        }

        if (next) {
          parts.push(
            <li key='next'>
              <Link href={this.makeUrl(current + 1)}>
                <Icon name='next' icon='chevron-right' />
              </Link>
            </li>
          );
        }

        return parts;
      },

      render: function () {

        var classes = { paginator: true };
        classes[this.props.className] = !!this.props.className;

        return (
          <div className={classNames(classes)}>
            <ul>
              {this.renderParts()}
            </ul>
          </div>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
