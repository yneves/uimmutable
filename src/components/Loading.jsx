/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.Loading', [
  'React',
  (React) => ({

    render() {
      return (
        <div className='loading'>
          <span className='fa fa-spinner fa-spin' />
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
