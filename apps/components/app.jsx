import React from 'react';
import Tit from './Tit.jsx';

class App extends React.Component
{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	getChildContext()
	{
		return {
			store: this.props.store
		};
	}
	render()
	{
		return (
			<Tit />
			);
	}
}

App.childContextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default App;