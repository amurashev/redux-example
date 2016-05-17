


import { combineReducers } from 'redux';

import { 
	RECEIVE_QUESTIONS, APPEND_QUESTIONS,
	UPDATE_QUESTION, 
	UPDATE_FILTER,
	UPDATE_FILTER_OFFSET
} from '../constants/AppConstants';

import QuestionCollection from '../../../../common/collections/questionCollection';
import QuestionModel from '../../../../common/models/questionModel';



function question(state = new QuestionModel(), action) {
	switch (action.type) {
		case UPDATE_QUESTION:
			return new QuestionModel(action.requestQuestion);
		default:
			return state;
	}
}

function questions(state = new QuestionCollection(), action) {

	Object.freeze(state); // Don't mutate state directly, always use assign()!
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return new QuestionCollection(action.requestQuestions);

		case APPEND_QUESTIONS:
			state.add(action.requestQuestions);
			return new QuestionCollection(state.models);

		case UPDATE_QUESTION:
			return new QuestionCollection(state.map((model) => {
				return model.get('id') === action.questionId ? question(model, action) : model;
			}));
		
		default:
			return state;
	}
}



function filter(state = {
	type: 'vote',
	offset: 0,
	limit: 3,
	category_id: 'all',
	photo: false
}, action) {
	Object.freeze(state);
	switch (action.type) {
		case UPDATE_FILTER:
			return { ...state, ...action.filter, offset: 0 };
		case UPDATE_FILTER_OFFSET:
			return { ...state, offset: state.offset + 3 };
		default:
			return state;
	}
}

export default combineReducers({
	questions,
	filter
});

