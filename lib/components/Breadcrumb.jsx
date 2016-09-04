/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Breadcrumb', [
  'React', 'Immutable', 'classNames', 'uim.LinkGroup',
  (React, Immutable, classNames, LinkGroup) => ({

    statics: {
      pickProps: LinkGroup.pickProps
    },

    propTypes: {
      className: React.PropTypes.string
    },

    render() {
      const classes = {
        breadcrumb: true,
        [this.props.className]: this.props.className
      };
      return (
        <LinkGroup {...this.props} className={classNames(classes)} />
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
