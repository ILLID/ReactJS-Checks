/** @jsx React.DOM */


// Button component
var Button = React.createClass({

	clickHandler: function (){
	
		// Print fields values
		var activeFields = [];
	
		for(var i=0, len=this.props.items.length; i<len; i++) {
			var userId = this.props.items[i].id;
			if( this.props.self.state.data[userId] ) {
				activeFields.push(userId);
			}
		}

		console.log(activeFields);
		
    },

	render: function() {
		return <button className="btn btn-default action-button" type="submit" onClick={this.clickHandler}>Show selected id's</button>
	}
	 
});

// Super checkbox
var Checkbox = React.createClass({

	changeAllCheckings: function(id) {

		// Change checked data for all input fields
        var value = this.refs.globalSelector.getDOMNode().checked;
		
		var st = {};
		for(var i=0, len=this.props.items.length; i<len; i++) {
			var userId = this.props.items[i].id;
			st[userId] = value;
		}

        this.props.self.setState({ data: st });

    },

	render: function() {
		return <input ref="globalSelector" className="multi-select" type="checkbox" onChange={this.changeAllCheckings} />
	}
	 
});


// Main component. Generate all table
var Table = React.createClass({

	getInitialState() {
		
		// Create array with [userId] -> checked data	
		var data = {};
		for(var i=0, len=this.props.items.length; i<len; i++) {
			var userId = this.props.items[i].id;
			data[userId] = false;
		}
		return {data};
	},
	
	changeChecking: function(id) {
	
		// Change checked data for one input field
		var st = {};
		for(var i=0, len=this.props.items.length; i<len; i++) {
			var userId = this.props.items[i].id;
			st[userId] = (this.props.items[i].id === id) ? !this.state.data[userId] : this.state.data[userId];
		}
		
		this.setState({ data: st });
		
    },

    render: function() {

        var self = this;

        var users = this.props.items.map(function(user){

            // Generate users list
            return	<tr>
						<th scope="row"><input type="checkbox" value={user.id} checked={self.state.data[user.id]} onChange={self.changeChecking.bind(self, user.id)} /></th>
						<td>{user.firstName}</td>
						<td>{user.lastName}</td>
						<td>{user.username}</td>
					</tr>
	
        });

        return <div className="panel panel-default">
					<div className="panel-heading">
						
						<Checkbox self={self} items={self.props.items} />
						
						<Button self={self} items={self.props.items} />
					
					</div>
					<div className="panel-body">
						<table className="table">
							<thead>
								<tr>
									<th>#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Username</th>
								</tr>
							</thead>
							<tbody>
								{users}
							</tbody>
						</table>
					</div>
				</div>

    }
});

// Define users array
var users = [
    { id: 0, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: 1, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
	{ id: 2, firstName: 'Larry', lastName: 'the Bird', username: '@twitter' },
];

React.renderComponent(
    <Table items={ users } />,
    document.body
);