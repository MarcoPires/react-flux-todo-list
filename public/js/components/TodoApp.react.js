/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var TodoStore = require('../stores/TodoStore');

 /**
 * Local module components
 */
var Header = require('./Header.react');

/**
 * Retrieve the current TODO data from the TodoStore and provides props for the component.
 * @return {[type]} [description]
 */
var mapStateToProps = function() {
	return {
		allTodos       : TodoStore.getAll(),
		areAllComplete : TodoStore.areAllComplete()
	};
}

var TodoApp = React.createClass({
	
	getInitialState: function() {
		return mapStateToProps();
	},

	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		TodoStore.removeChangeListener(this._onChange);
	},

	/**
	 * Event handler for 'change' events coming from the TodoStore
	 */
	_onChange: function() {
		console.log("onchange", mapStateToProps());
		this.setState(mapStateToProps());
	},

	/**
	 * @return {object} react component
	 */
	render: function() {
		return (
			<div>
				<Header />
			</div>
		);
	}
});

module.exports = TodoApp;