import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers/index.jsx';

let logger = createLogger();
let inital_State = { data: 'Hello World!' };

const store = createStore(
				reducer,
				inital_State,
				applyMiddleware(thunk, logger)
			    );

export default store;