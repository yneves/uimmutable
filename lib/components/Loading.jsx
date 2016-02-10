/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Button", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
    return {
  
      render: function() {
        return (
          <div className="loading">
            <span className="fa fa-spinner fa-spin" />
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //
