/**
 * npm modules
 */
var assign = require('object-assign');

/**
 * Local modules
 */
var Constants = require('../constants/Constants');


/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
	// Hand waving here -- not showing how this interacts with XHR or persistent
	// server-side storage.
	return {
		// Using the current timestamp + random number in place of a real id.
		id       : (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
		complete : false,
		text     : text
	};
};

/**
 * Update a TODO item.
 * @param  {array} state 	Todos collection
 * @param  {number} id   	Id from the todo to update
 * @param  {object} updates Properties to update
 * @return {array}       	New collection of todos, with the updated todo
 */
function update(state, id, updates) {
	return state.map(function(todo) {
		return todo.id !== id ? todo : assign({}, todo, updates);
	});
};

/**
 * Update all of the TODO items with the same object.
 * @param  {array} state 	Todos collection
 * @param  {object} updates Properties to update
 * @return {array}       	New collection of todos, with the updates
 */
function updateAll(state, updates) { console.log(state, updates)
	return state.map(function(todo) {
		return assign({}, todo, updates);
	});
};

/**
 * Delete a TODO item.
 * @param  {array} state Todos collection
 * @param  {number} id   Id from the todo to delete
 * @return {array}       New collection of todos, without the deleted todo
 */
function destroy(state, id) {
	return state.filter(function(todo) {
		return todo.id !== id;
	});
};

/**
 * Delete all the completed TODO items.
 * @param  {array} state Todos collection
 * @return {array}       New collection of todos, without the completed ones
 */
function destroyCompleted(state) {
	return state.filter(function(todo) {
		return todo.complete === false;
	});
};

var TodoReducers = function(action, state, store) {
	var text = '';

	switch(action.actionType){
		case Constants.TODO_CREATE:
			text = action.text || '';
			
			if (text !== '') return state.concat([ create(text.trim()) ])
			return state;
		

		case Constants.TODO_TOGGLE_COMPLETE_ALL:
			return updateAll(state, { complete: !store.areAllComplete() });



		case Constants.TODO_DESTROY_COMPLETED:
			return destroyCompleted(state);
		
		

		case Constants.TODO_DESTROY:
			return destroy(state, action.id);
		

		default:
			return state || [];
	}
};

module.exports = TodoReducers;