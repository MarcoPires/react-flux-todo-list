/**
 * npm modules
 */
var React = require('react');
var ReactPropTypes = React.PropTypes;

/**
 * Local modules
 */
var ReactComponent = require('../bindStateToComponents');


var TodoItem = ReactComponent({
	render: function(state, dispatch){
		var todo = this.props.todo; 
		return (
			<li
				key={todo.id}>
				olá
			</li>
		)
	}
});


module.exports = TodoItem;