/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var ReactComponent  = require('../bindStateToComponents');


var ReactPropTypes = React.PropTypes;

/**
 * Retrieve the current TODO data from the TodoStore and provides props for the component.
 * @return {object} 
 */
var mapStateToProps = function(store) {
	return {
		allTodos           : store.getAll(),
		numbCompletedTodos : store.getNumbCompleted()
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

/**
 * Only render the button if there is completed items, else return null.
 * @param  {number} completed
 * @return {object} react component          
 */
var clearCompletedButton = function(completed, dispatch) {
	if (!completed) return null;

	return (
		<button
			id="clear-completed"
			onClick={ dispatch.onClearCompletedClick }>
				Clear completed ({ completed })
		</button>
	);
};

var Footer = ReactComponent({
	
	/**
	 * @return {object} react component
	 */
	render: function(state, dispatch) {
		var allTodos  = state.allTodos;
		var total     = allTodos.length;

		if (total === 0) return null;
	    
	    var completed = state.numbCompletedTodos;
	    var itemsLeft = total - completed;
	    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
	    itemsLeftPhrase += 'left';
		
		return (
			<footer id="footer">
				<span id="todo-count">
				<strong>
					{ itemsLeft }
				</strong>
					{ itemsLeftPhrase }
				</span>

				{ clearCompletedButton( completed, dispatch ) }
			</footer>
		);
	}
}, mapStateToProps, mapDispatchToProps);

module.exports = Footer;