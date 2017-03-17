import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import store from './store/store.jsx';
import App from './components/App.jsx';
import Login from './components/login/index.jsx';

const history = useRouterHistory(createHashHistory)({});

ReactDom.render(
	<Provider store={store}>
		<Router history={ history }>
 			<Route path='/login' component={ Login } />
			<Route path='/' component={App} />
		</Router>
	</Provider>,
	document.querySelector('#root')
	);


