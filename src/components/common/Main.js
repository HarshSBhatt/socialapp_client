//! Built-in or Third Party Packages

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//! User Files

import { incrementCounter, decrementCounter } from '../../store/actions';

function Main(props) {
	return (
		<div>
			<p>{props.counter.count}</p>
			<button onClick={() => props.incrementCounter()}>Increment</button>
			<button onClick={() => props.decrementCounter()}>Decrement</button>
		</div>
	);
}

const mapStateToProps = (state) => ({
	counter: state.counter
});

const mapDispatchToProps = (dispatch) => ({
	incrementCounter: () => dispatch(incrementCounter()),
	decrementCounter: () => dispatch(decrementCounter())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
