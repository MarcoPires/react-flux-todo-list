/**
 * npm modules
 */
var React = require('react');
var ReactPropTypes = React.PropTypes;

/**
 * Local modules
 */
var ReactComponent = require('../bindStateToComponents');

 /**
 * Local module components
 */
var TodoItem = require('./TodoItem.react');



/**
 * Retrieve the current TODO data from the TodoStore and provides props for the component.
 * @return {object} 
 */
var mapStateToProps = function(store) {
	return {
		allTodos       : store.getAll(),
		areAllComplete : store.areAllComplete()
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
		 * Event handler to mark all TODOs as complete
		 */
		onToggleCompleteAll: function() {
			actions.toggleCompleteAll();
		}
	};
};

var MainSection = ReactComponent({
	
	/**
	 * @return {object} react component
	 */
	render: function(state, dispatch){
		var allTodos = state.allTodos;

		// This section should be hidden by default
		// and shown when there are todos.
		if (allTodos.length < 1) return null;
		

		var todos = [];
		allTodos.map(function(todo, index){
			todos.push(<TodoItem key={index} todo={ todo } />);
		});

		return (
			<section id="main">
				<input
					id       = "toggle-all"
					type     = "checkbox"
					onChange = { dispatch.onToggleCompleteAll }
					checked  = { state.areAllComplete ? 'checked' : '' }
				/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">{todos}</ul>
			</section>
		)
	}
}, mapStateToProps, mapDispatchToProps);


module.exports = MainSection;