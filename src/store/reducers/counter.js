import * as ActionTypes from '../actionTypes';

const initialState = {
	count: 0
};

export const Counter = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.INC_COUNTER:
			return {
				count: state.count + 1
			};
		case ActionTypes.DEC_COUNTER:
			return {
				count: state.count - 1
			};
		default:
			return state;
	}
};
