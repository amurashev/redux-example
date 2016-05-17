import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { fetchQuestions } from './actions/AppActions';

import App from './containers/App';


import rootReducer from './reducers/rootReducer';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);


export default class AppContainer extends React.Component {
	constructor() {
		super();

		store.dispatch(fetchQuestions()).then(() => {
			ReactDOM.render(
				<Provider store={store}>
					<App />
				</Provider>,
				document.getElementById('feed-wrapper')
			);
		});
	}
}