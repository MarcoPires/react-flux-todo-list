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
};

module.exports = TodoActions;