/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var ReactComponent = require('../bindStateToComponents');

 /**
 * Local module components
 */
var TodoTextInput = require('./TodoTextInput.react');



var ReactPropTypes = React.PropTypes;

/**
 * Mapping properties to dispatchers
 * 
 * @param  {object} actions 
 * @return {object}       
 */
var mapDispatchToProps = function (actions) {
	var that = this;

	return{

		/**
		 * Event handler to mark the TODO as complete
		 */
		onToggleComplete: function() {
			actions.toggleComplete(that.props.todo);
		},

		/**
		 * Allow the item name to be edited
		 */
		onDoubleClick: function(){
			that.setState({isEditing: true});
		},

		/**
		 * Event handler called within TodoTextInput.
		 * Defining this here allows TodoTextInput to be used in multiple places
		 * in different ways.
		 * @param  {string} text
		 */
		onSave: function(text) {
			actions.updateText(that.props.todo.id, text);
			that.setState({isEditing: false});
		},

		/**
		 * Delete the todo
		 */
		onDestroyClick: function(){
			actions.destroy(that.props.todo.id);
		}
	};
};
/**
 * Resolves the item class.
 * List items should get the class 'editing' when editing
 * and 'completed' when marked as completed.
 * Note that 'completed' is a classification while 'complete' is a state.
 * This differentiation between classification and state becomes important
 * in the naming of view actions toggleComplete() vs. destroyCompleted().
 * @param  {boolean} completed 
 * @return {string}
 */
var getItemClassName = function(complete){
	return (complete ? 'completed' : (this.state.isEditing ? 'editing' : ''));
};

/**
 * Handle the creation of the textInput component
 * @param  {Boolean} 	isEditing 
 * @param  {string}  	text      
 * @param  {function}  	onSave      
 * @return {object} 	react component
 */
var textInputComponent = function(isEditing, text, onSave){
	if(!isEditing) return null;
	return (
		<TodoTextInput
			className = "edit"
			onSave    = { onSave }
			value     = { text }
		/>
	);
};

var TodoItem = ReactComponent({

	propTypes: {
		todo: ReactPropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			isEditing: false
		};
	},

	/**
	 * @return {object} react component
	 */
	render: function(state, dispatch){
		var todo = this.props.todo;
		var text = todo.text;

		return (
			<li
				className = { getItemClassName.call(this, todo.complet) }
				key       = { todo.id }>
				
				<div className="view">
					<input 
						className = "toggle"
						type      = "checkbox"
						checked   = { todo.complete }
						onChange  = { dispatch.onToggleComplete }
					/>
					<label onDoubleClick={dispatch.onDoubleClick}>
						{ text }
					</label>
					<button className="destroy" onClick={ dispatch.onDestroyClick } />
				</div>
				{ textInputComponent.call(this, this.state.isEditing, text, dispatch.onSave) }
			</li>
		)
	}
}, null, mapDispatchToProps);


module.exports = TodoItem;