import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers/index.jsx';

let logger = createLogger();
let inital_State = { users:{ self: '', onlineCount: 0 }, rooms: [], houses: [] };

const store = createStore(
				reducer,
				inital_State,
				applyMiddleware(thunk, logger)
			    );

export default store;