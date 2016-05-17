

import {
	REQUEST_QUESTIONS, RECEIVE_QUESTIONS, APPEND_QUESTIONS,
	UPDATE_QUESTION,
	UPDATE_FILTER,
	UPDATE_FILTER_OFFSET
} from '../constants/AppConstants';


function requestQuestions() {
	return {
		type: REQUEST_QUESTIONS
	}
}

function receiveQuestions(json) {
	return {
		type: RECEIVE_QUESTIONS,
		requestQuestions: json,
		receivedAt: Date.now()
	}
}


function getQuestions(filter) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'GET',
			url: main.urls.questions,
			data: filter,
			success: resolve,
			error: reject
		});
	})
}

export function fetchQuestions() {
	return (dispatch, getState) => {
		dispatch(requestQuestions());
		return getQuestions(getState().filter)
			.then(data => dispatch(receiveQuestions(data)));
	}
}






function updateQuestion(data, id) {
	return {
		type: UPDATE_QUESTION,
		questionId: id,
		requestQuestion: data
	}
}

export function likeQuestion(questionId) {

	return dispatch => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: main.urls.questionLike,
				data: JSON.stringify({
					question_id: questionId
				}),
				success: resolve,
				error: reject
			});
		}).then(data => dispatch(updateQuestion(data, questionId)));
	}
}





export function chooseAnswer(questionId, answerId) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: main.urls.questionChooseAnswer,
				data: JSON.stringify({
					question_id: questionId,
					answer_id: answerId
				}),
				success: resolve,
				error: reject
			});
		}).then(data => dispatch(updateQuestion(data, questionId)));
	}
}






export function changeFilter(filter) {
	return (dispatch, getState) => {
		dispatch(updateFilter(filter));
		dispatch(fetchQuestions());
	}
}

function updateFilter(filter) {
	return {
		type: UPDATE_FILTER,
		filter: filter
	}
}


export function changeFilterOffset() {
	return (dispatch, getState) => {
		dispatch(updateFilterOffset());
		dispatch(appendQuestionRequest());
	}
}

function updateFilterOffset() {
	return {
		type: UPDATE_FILTER_OFFSET
	}
}

export function appendQuestionRequest() {
	return (dispatch, getState) => {
		return getQuestions(getState().filter)
			.then(data => data.length && dispatch(appendQuestions(data)));
	}
}

function appendQuestions(data) {
	return {
		type: APPEND_QUESTIONS,
		requestQuestions: data
	}
}



