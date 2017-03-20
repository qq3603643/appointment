import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import _history from './history.jsx';

import store from './store/store.jsx';
import App from './components/App.jsx';
import Login from './components/login/index.jsx';
import Welcome from './components/welcome/index.jsx';

const history = syncHistoryWithStore(_history, store);
history.listen(location => location);

ReactDom.render(
	<Provider store={ store }>
		<Router history={ history }>
 			<Route path='/login' component={ Login } />
			<Route path='/home' component={ App } />
			<Route path='/' component={ Welcome } />
		</Router>
	</Provider>,
	document.querySelector('#root')
	);