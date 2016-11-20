var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var TodoActions = {
	
	/**
	 * @param  {string} text 
	 */
	create: function(text) {
		console.log(text)
		AppDispatcher.dispatch({
			actionType : Constants.TODO_CREATE,
			text       : text
		});
	},
	/**
	 * Mark all ToDos as complete
	 */
	toggleCompleteAll: function() {
		AppDispatcher.dispatch({
			actionType: Constants.TODO_TOGGLE_COMPLETE_ALL
		});
	},
	
	/**
	 * Toggle whether a single ToDo is complete
	 * @param  {object} todo
	 */
	toggleComplete: function(todo) {
		var id 			= todo.id;
		var actionType  = todo.complete ?
			Constants.TODO_UNDO_COMPLETE :
				Constants.TODO_COMPLETE;

		AppDispatcher.dispatch({
			actionType : actionType,
			id         : id
		});
	},
	
	/**
	 * Delete all the completed ToDos
	 */
	destroyCompleted: function() {
		AppDispatcher.dispatch({
		  actionType: Constants.TODO_DESTROY_COMPLETED
		});
	}

};

module.exports = TodoActions;