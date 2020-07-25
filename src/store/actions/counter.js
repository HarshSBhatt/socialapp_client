import * as ActionTypes from '../actionTypes';

export const incrementCounter = () => ({
	type: ActionTypes.INC_COUNTER
});

export const decrementCounter = () => ({
	type: ActionTypes.DEC_COUNTER
});
