import React from 'react';
// import Test from './Test.jsx';
import NavSide from './navSide/index.jsx';
import Content from './content/index.jsx';
import FormContainer from './addroomform/index.jsx';

require('../css/reset.css');

class App extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {};
	}
	render()
	{
		return (
			<div className="wrapper">
				<NavSide />
				<Content />
				<FormContainer />
			</div>
			);
	}
}

export default App;