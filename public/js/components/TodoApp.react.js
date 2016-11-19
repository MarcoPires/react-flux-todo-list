/**
 * npm modules
 */
var React = require('react');

/**
 * Local modules
 */
var TodoStore = require('../stores/TodoStore');
var ReactComponent  = require('../bindStateToComponents');

 /**
 * Local module components
 */
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var Footer = require('./Footer.react');


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

var TodoApp = ReactComponent({
	
	componentDidMount: function(store) {
		store.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(store) {
		store.removeChangeListener(this._onChange);
	},

	/**
	 * Event handler for 'change' events coming from the TodoStore
	 */
	_onChange: function() {
		console.log("onchange", mapStateToProps(TodoStore));
		this.setState(mapStateToProps(TodoStore));
	},

	/**
	 * @return {object} react component
	 */
	render: function(state) {

		return (
			<div>
				<Header />
				<MainSection />
				<Footer />
			</div>
		);
	}
}, mapStateToProps);

module.exports = TodoApp;