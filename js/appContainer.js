import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { toggleWrapper } from './actions/AppActions';

import App from './containers/App';


// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
import rootReducer from './reducers/rootReducer';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);


// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc


export default class AppContainer extends React.Component {
	constructor() {
		super();

		var div = document.createElement('div');
		div.id = "add-question-wrapper";
		document.body.appendChild(div);

		var buttons = document.getElementsByClassName('show-add-question-modal');

		function addEventListenerList(list, event, fn) {
			for (var i = 0, len = list.length; i < len; i++) {
				list[i].addEventListener(event, fn, false);
			}
		}

		addEventListenerList(buttons, 'click', (e) => store.dispatch(toggleWrapper()));

		/*function addEventListenerByClass(className, event, fn) {
			var list = document.getElementsByClassName(className);
			for (var i = 0, len = list.length; i < len; i++) {
				list[i].addEventListener(event, fn, false);
			}
		}

		addEventListenerByClass('coins', 'dragstart', handleDragStart);*/


		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById('add-question-wrapper')
		);
	}
}