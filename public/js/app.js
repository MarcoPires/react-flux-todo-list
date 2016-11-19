/**
 * npm modules
 */
var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Local module components
 */
var TodoApp = require('./components/TodoApp.react');



ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);