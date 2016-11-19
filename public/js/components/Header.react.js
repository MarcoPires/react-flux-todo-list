/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var TodoActions = require('../actions/TodoActions');

 /**
 * Local module components
 */
var TodoTextInput = require('./TodoTextInput.react');


var Header = React.createClass({
	
	/**
	 * Event handler called within TodoTextInput.
	 * Defining this here allows TodoTextInput to be used in multiple places
	 * in different ways.
	 * @param  {string} text 
	 */
	_onSave: function(text) {
		if (text.trim()) TodoActions.create(text); 
	},

	/**
	 * @return {object} react component
	 */
	render: function() {
		return (
			<header>
				<h1>todos</h1>
				<TodoTextInput
					id          = "new-todo"
					placeholder = "What needs to be done?"
					onSave      = { this._onSave }
				/>
			</header>
		);
	}
});

module.exports = Header;