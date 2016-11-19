/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var TodoActions = require('../actions/TodoActions');
var ReactComponent  = require('../bindStateToComponents');

 /**
 * Local module components
 */
var TodoTextInput = require('./TodoTextInput.react');


/**
 * Mapping properties to dispatchers
 * 
 * @param  {object} actions 
 * @return {object}       
 */
var mapDispatchToProps = function (actions) {
	return{

		/**
		 * Event handler called within TodoTextInput.
		 * Defining this here allows TodoTextInput to be used in multiple places
		 * in different ways.
		 * @param  {string} text 
		 */
		onSave: function(text) {
			if (text.trim())  actions.create(text);
		}
	};
};

var Header = ReactComponent({
	
	/**
	 * @return {object} react component
	 */
	render: function(state, dispatch) {
		return (
			<header>
				<h1>todos</h1>
				<TodoTextInput
					id          = "new-todo"
					placeholder = "What needs to be done?"
					onSave      = { dispatch.onSave }
				/>
			</header>
		);
	}
}, null, mapDispatchToProps);

module.exports = Header;