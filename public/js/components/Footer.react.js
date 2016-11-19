/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var TodoActions = require('../actions/TodoActions');
var ReactComponent  = require('../bindStateToComponents');


var ReactPropTypes = React.PropTypes;

/**
 * Retrieve the current TODO data from the TodoStore and provides props for the component.
 * @return {object} 
 */
var mapStateToProps = function(store) {
	return {
		allTodos: store.getAll()
	};
};

/**
 * Mapping properties to dispatchers
 * 
 * @param  {object} actions 
 * @return {object}       
 */
var mapDispatchToProps = function (actions) {
	return{
		/**
		 * Event handler to delete all completed TODOs
		 */
		onClearCompletedClick: function() {
			actions.destroyCompleted();
		}
	};
};

var getNumbCompleted = function(todos){
	var count = 0;
	
	todos.map(function(todo){
		if (todo.complete) count++;
	});
	return count;
};


var Footer = ReactComponent({
	
	/**
	 * @return {object} react component
	 */
	render: function(state, dispatch) {
		var allTodos  = state.allTodos;
		var total     = allTodos.length;

		if (total === 0) return null;
	    
	    var completed = getNumbCompleted(allTodos);
	    var itemsLeft = total - completed;
	    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
	    itemsLeftPhrase += 'left';
		
		// Undefined and thus not rendered if no completed items are left.
		var clearCompletedButton;
		if (completed) {
		  	clearCompletedButton =
			<button
				id="clear-completed"
				onClick={ dispatch.onClearCompletedClick }>
				Clear completed ({ completed })
			</button>;
		};

		return (
			<footer id="footer">
				<span id="todo-count">
				<strong>
					{ itemsLeft }
				</strong>
					{ itemsLeftPhrase }
				</span>

				{ clearCompletedButton }
			</footer>
		);
	}
}, mapStateToProps, mapDispatchToProps);

module.exports = Footer;