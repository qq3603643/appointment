import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import { reducer as appoint } from '../reducers/index.jsx';

let logger = createLogger();

let Reducer = combineReducers(
	{
		appoint,
		routing: routerReducer
	});

const store = createStore(
				Reducer,
				applyMiddleware(thunk, logger)
			    );

export default store;