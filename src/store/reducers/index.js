import { combineReducers } from 'redux';

import { Counter } from './counter';

export default combineReducers({
	counter: Counter
});
