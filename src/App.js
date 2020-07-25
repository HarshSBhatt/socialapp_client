//! Built-in or Third Party Packages

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

//! User Files

import './styles/App.scss';
import { ConfigureStore } from './store/configureStore';
import Main from './components/common/Main';

const store = ConfigureStore();

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Main />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
