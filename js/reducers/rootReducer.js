
import { combineReducers } from 'redux';

import {
	TOGGLE_WRAPPER,
	ADD_QUESTION, QUESTION_ADDED, CHANGE_QUESTION_TEXT, CHANGE_QUESTION_CATEGORY, ADD_QUESTION_IMAGE, REMOVE_QUESTION_IMAGE,
	ADD_ANSWER, CHANGE_ANSWER_TEXT, REMOVE_ANSWER, ADD_ANSWER_IMAGE, REMOVE_ANSWER_IMAGE
} from '../constants/AppConstants';

//import QuestionModel from '../../../../common/models/questionModel';

const QUESTION_TEXT_MAX_LENGTH = 255;
const ANSWER_TEXT_MAX_LENGTH = 150;

const answerInitialState = {
	text: '',
	count: 0,
	you_choice: void 0,
	images: []
};

const questionInitialState = {
	text: '',
	category_id: 17,
	answers: [answerInitialState, answerInitialState],
	images: [],
	comments: []
};


function answer(state = answerInitialState, action) {
	switch (action.type) {
		case CHANGE_ANSWER_TEXT:
			if(action.text.length > ANSWER_TEXT_MAX_LENGTH) {
				return state;
			} else {
				return { ...state, text: action.text };				
			}
		case ADD_ANSWER_IMAGE:
			if(state.images.length == 1) {
				return state
			} else {
				let images = state.images.slice();
				images.push(action.image);
				return {...state, images};
			}
		case REMOVE_ANSWER_IMAGE:
			return { ...state, images: state.images.filter((k, i) => i != action.imageKey)};
		default:
			return state;
	}
}


function question(state = questionInitialState, action) {
	switch (action.type) {

		case CHANGE_QUESTION_TEXT:
			if(action.text.length > QUESTION_TEXT_MAX_LENGTH) {
				return state;
			} else {
				return { ...state, text: action.text };
			}
		case CHANGE_QUESTION_CATEGORY:
			return { ...state, category_id: action.categoryId };
		case ADD_QUESTION_IMAGE:
			if(state.images.length == 5) {
				return state;
			} else {
				let images = state.images.slice();
				images.push(action.image);
				return { ...state, images };
			}

		case REMOVE_QUESTION_IMAGE:
			return { ...state, images: state.images.filter((k, i) => i != action.key)};
		case ADD_ANSWER:
			if(state.answers.length == 4) {
				return state
			} else {
				let answers = state.answers.slice();
				answers.push(answerInitialState);
				return { ...state, answers };
			}
		case REMOVE_ANSWER:
			if(state.answers.length == 2) {
				return state
			} else {
				return { ...state, answers: state.answers.filter((k, i) => i != action.answerKey)};
			}
		
		case CHANGE_ANSWER_TEXT:
		case ADD_ANSWER_IMAGE:
		case REMOVE_ANSWER_IMAGE:
			return { ...state, answers: state.answers.map((a, i) => i === action.answerKey ? answer(a, action) : a )};
		default:
			return state;
	}
}


function state(state = {
	show: false
}, action) {
	switch (action.type) {
		case QUESTION_ADDED:
			console.warn(QUESTION_ADDED, action);
			return { ...state, show: 0 };
		case TOGGLE_WRAPPER:
			return { ...state, show: !state.show };
		default:
			return state;
	}
}

export default combineReducers({
	state,
	question
});

