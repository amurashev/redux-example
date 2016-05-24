

import {
	TOGGLE_WRAPPER,
	ADD_QUESTION, QUESTION_ADDED, CHANGE_QUESTION_TEXT, CHANGE_QUESTION_CATEGORY, ADD_QUESTION_IMAGE, REMOVE_QUESTION_IMAGE,
	ADD_ANSWER, CHANGE_ANSWER_TEXT, REMOVE_ANSWER, ADD_ANSWER_IMAGE, REMOVE_ANSWER_IMAGE
} from '../constants/AppConstants';


export function addQuestion() {
	return (dispatch, getState) => {
		return sendQuestion(getState().question)
			.then(data => dispatch(questionAdded(data)));
	}
}

function sendQuestion(data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: main.urls.questions,
			data: JSON.stringify(data),
			success: resolve,
			error: reject
		});
	})
}

export function questionAdded(data) {
	return {
		type: QUESTION_ADDED,
		data: data
	}
}



export function toggleWrapper() {
	return {
		type: TOGGLE_WRAPPER
	}
}

export function changeQuestionText(text) {
	return {
		type: CHANGE_QUESTION_TEXT,
		text: text
	}
}

export function changeQuestionCategory(categoryId) {
	return {
		type: CHANGE_QUESTION_CATEGORY,
		categoryId: categoryId
	}
}

export function addQuestionImage(image) {
	return {
		type: ADD_QUESTION_IMAGE,
		image: image
	}
}


export function removeQuestionImage(key) {
	return {
		type: REMOVE_QUESTION_IMAGE,
		key: key
	}
}


export function addAnswer() {
	return {
		type: ADD_ANSWER
	}
}

export function removeAnswer(answerKey) {
	return {
		type: REMOVE_ANSWER,
		answerKey: answerKey
	}
}


export function changeAnswerText(data) {
	return {
		type: CHANGE_ANSWER_TEXT,
		text: data.text,
		answerKey: data.answerKey
	}
}

export function addAnswerImage(data) {
	return {
		type: ADD_ANSWER_IMAGE,
		image: data.image,
		answerKey: data.answerKey
	}
}

export function removeAnswerImage({answerKey, imageKey}) {
	return {
		type: REMOVE_ANSWER_IMAGE,
		answerKey,
		imageKey
	}
}

