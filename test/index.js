rey.run([
  'React', 'ReactDOM', 'uim.View',
  function(React, ReactDOM, View) {
    var element = React.createElement(View, {});
    ReactDOM.render(element, document.getElementById('root'));
  }
]);
