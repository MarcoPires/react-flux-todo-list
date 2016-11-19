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
	_todos = TodoReducers(action, _todos);
	TodoStore.emitChange();
	console.log("state: ", _todos);
});

var TodoStore = assign({}, EventEmitter.prototype, {
	
	/**
	 * Tests whether all the remaining TODO items are marked as completed.
	 * @return {boolean}
	 */
	areAllComplete: function() {

		for (var id in _todos) {
			if (!_todos[id].complete) return false;
		}
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