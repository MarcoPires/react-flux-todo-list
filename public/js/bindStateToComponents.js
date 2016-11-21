/**
 * npm modules
 */
var React = require('react');
var assign = require('object-assign');

/**
 * Local modules
 */
var TodoStore = require('./stores/TodoStore');
var TodoActions = require('./actions/TodoActions');


var ReactComponent = function(ComponentOptions, mapStateToProps, mapDispatchToProps){
	var mapStateToProps    = mapStateToProps    || function(store){return {}};
	var mapDispatchToProps = mapDispatchToProps || function(){};
	var genericComponent   = React.createClass(assign({}, ComponentOptions, {
		
		getInitialState: function() {
			if(ComponentOptions.getInitialState) 
				return ComponentOptions.getInitialState.call(this, TodoStore);
			return mapStateToProps(TodoStore);
		},

		componentDidMount: function(){
			if(ComponentOptions.componentDidMount) 
				ComponentOptions.componentDidMount.call(this, TodoStore);
		},

		componentWillUnmount: function(){
			if(ComponentOptions.componentWillUnmount) 
				ComponentOptions.componentWillUnmount.call(this, TodoStore);
		},

		render: function(){
			return ComponentOptions.render.call(this, 
				mapStateToProps(TodoStore),
				mapDispatchToProps.call(this, TodoActions));
		}
	}));

	return genericComponent;
};

module.exports = ReactComponent;