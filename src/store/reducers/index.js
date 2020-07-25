//! Built-in or Third Party Packages

import { combineReducers } from 'redux';

//! User Files

import { Counter } from './counter';

export default combineReducers({
	counter: Counter
});
