//! Built-in or Third Party Packages

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//! User Files

import rootReducer from './reducers';

const middleware = [ thunk ];

export const ConfigureStore = () => {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
	return store;
};
