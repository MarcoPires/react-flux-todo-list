/**
 * npm modules
 */
var assign = require('object-assign');

/**
 * Local modules
 */
var TodoStore = require('../stores/TodoStore');
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
}

var TodoReducers = function(action, state) {
	var text = '';

	switch(action.actionType){
		case Constants.TODO_CREATE:
			text = action.text || '';
			
			if (text !== '') return state.concat([ create(text.trim()) ])

			return state;
		default:
			return state;
	}
};

module.exports = TodoReducers;