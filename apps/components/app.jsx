import React from 'react';
// import Test from './Test.jsx';
import NavSide from 'navSide/index.jsx';

require('../css/reset.css');

class App extends React.Component
{
	constructor(props)
	{
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
			<NavSide />
			);
	}
}

App.childContextTypes =
{
	store: React.PropTypes.object.isRequired
}

export default App;