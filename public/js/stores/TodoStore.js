/**
 * npm modules
 */
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

/**
 * Local modules
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoReducers = require('../reducers/TodoReducers');


var CHANGE_EVENT = 'change';
var _todos       = [];

/**
 * Register callback to handle all updates.
 * Save changes in Store and dispatch change event.
 * @param  {object} action
 * 
 */
AppDispatcher.register(function(action){
	_todos = TodoReducers(action, _todos, TodoStore);
	TodoStore.emitChange();
	console.log("state: ", _todos);
});

var TodoStore = assign({}, EventEmitter.prototype, {
	
	/**
	 * Tests whether all the remaining TODO items are marked as completed.
	 * @return {boolean}
	 */
	areAllComplete: function() {
		for (var i = 0; i < _todos.length; i++) {
			if (!_todos[i].complete) return false;
		};
		return true;
	},

	/**
	 * Get the entire collection of TODOs.
	 * @return {object}
	 */
	getAll: function() {
		return _todos;
	},

	/**
	 * Get the number of completed TODOs.
	 * @return {number} 
	 */
	getNumbCompleted: function() {
		var count = 0;
		
		_todos.map(function(todo){
			if (todo.complete) count++;
		});
		return count;
	},

	/**
	 * Trigger change event
	 */
	emitChange: function() {
		console.log(CHANGE_EVENT)
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Add listener to the change event, register the callback
	 * @param {Function} callback 
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Remove listener to the change event
	 * @param  {Function} callback 
	 */
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

module.exports = TodoStore;