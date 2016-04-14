/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Breadcrumb', [
  'React', 'Immutable', 'classNames', 'uim.LinkGroup',
  function (React, Immutable, classNames, LinkGroup) {

    return {

      statics: {
        pickProps: LinkGroup.pickProps
      },

      propTypes: {
        className: React.PropTypes.string
      },

      render: function () {
        var classes = {};
        classes['breadcrumb'] = true;
        classes[this.props.className] = !!this.props.className;

        return (
          <LinkGroup {...this.props} className={classNames(classes)} />
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
