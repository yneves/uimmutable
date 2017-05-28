/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

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
