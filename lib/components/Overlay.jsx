/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Overlay', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    render() {
      return (
        <div className='overlay'>
          <div className='overlay-container'>
            {this.props.children}
          </div>
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
