import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ImageQuestion from '../components/ImageQuestion';
import Answer from '../components/Answer';

import DropList from '../../../../common/components/DropList';

import * as FeedActions from '../actions/AppActions'

class App extends Component {

	componentDidMount() {1

		const { actions } = this.props;
		var myDropzone = new Dropzone(this.refs.questionAddPhoto, {
			url: main.urls.fileUpload,
			previewTemplate: '<div id="preview-template" style="display: none;"></div>',
			//accept: (file, done) => this.preloadImage(file, done),
			complete: (file) => {
				const newImage = JSON.parse(file.xhr.responseText);
				actions.addQuestionImage(newImage)
			}
		});
		
	}

	render() {
		const { state, question, actions } = this.props;
		console.warn('App', state, question);

		const imagesTemplate = question['images'].map((image, i) =>
			<ImageQuestion key={i} image={image} removeImageFunc={() => actions.removeQuestionImage(i)} />
		);
		const categoriesArr = main.categories.map((c) => {
			c.itemClickEvent = () => actions.changeQuestionCategory(c.id);
			return c;
		});

		const hiddenClass = state.show ? '' : ' add-question-block--hidden';

		return (
			<div className={'add-question-block' + hiddenClass} data-state={state.show}>
				<div className="question">
					<div className="question__text-block">
	                    <textarea className="question__text" ref="questionText"
	                              onChange={e => actions.changeQuestionText(this.refs.questionText.value)}
	                              rows="3" placeholder="Вопрос" value={question['text']} />
						<i className="material-icons mi question__add-photo" ref="questionAddPhoto">add_a_photo</i>
						<div className="question__images">{imagesTemplate}</div>
					</div>
	
					<div className="question__answers-block">
						<div className="answers">
							{question['answers'].map(
								(answer, i) => <Answer key={i} answer={answer} answerKey={i} actions={actions}/>
							)}
						</div>
					</div>
	
					<div className="question__panel-block">
						<DropList className="question__category" items={categoriesArr} selectedItem={question['category_id']} />
						<button className="question__add-answer btn btn-link"
						        onClick={() => actions.addAnswer()} type="button">
							<i className="material-icons mi">add</i> Add answer
						</button>
						<button className="question__send btn btn-danger"
						        onClick={e => actions.addQuestion(e)} type="button">
							<i className="material-icons mi">record_voice_over</i> Ask
						</button>
					</div>
				</div>
			</div>
		);
	}
}




function mapStateToProps (state) {
	return {
		state: state.state,
		question: state.question
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(FeedActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)