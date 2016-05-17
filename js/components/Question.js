import React, { Component } from 'react'

import Image from '../components/Image';

import Answer from '../components/Answer';


export default class Question extends Component {

	componentWillMount() {
		const { wrapper } = this.props;		
		this.props.question.get('images').setSize(($(wrapper).width() / 3 - 28)); //FIXME
	}   

	componentWillReceiveProps(props) {
		const { wrapper } = props;
		props.question.get('images').setSize(($(wrapper).width() / 3 - 28)); //FIXME
	}


	likeQuestionHandler(){
		const { question, actions: { likeQuestion } } = this.props;
		if(!question.get('likes_is_liked')) {
			likeQuestion(question.get('id'));
		}
	}


	render() {
		const { question, actions, wrapper } = this.props;
		const categoryName = main.categories.filter((cat) => cat.id == question.get('category_id'))[0].name; //FIXME

		const ImagesTemplate = question.get('images').models.map((image, i) => 
			<Image key={i} image={image} className={'question__image-block'} />);
		const AnswersTemplate = question.get('answers').models.map((answer, i) => 
			<Answer key={i} answer={answer} chooseAnswer={actions.chooseAnswer} wrapper={wrapper} />);
		
		//const withImageQuestionClass = question.get('images').length ? 'question--with-image' : 'question--without-image';
		const withImageAnswerClass = question.get('answers_with_image') ? 'answers--with-image' : 'answers--without-image';
		
		const iconLiked = question.get('likes_is_liked') ? 'favorite' : 'favorite_border';
		
		//console.warn(question.toJSON());

		return (
			<div className="question-layout">
				<div className={'question '}>
					<div className="question__images clearfix">{ImagesTemplate}</div>
					<div className="question__text-block">
						<div className="question__text-border-block">
							<div className="question__text">{question.get('text')}</div>
						</div>
					</div>
					<div className="question__date">{question.get('date_normal')}</div>
					<div className="question__opt-block">
						<div className="question__category-name">{categoryName}</div>
						<div className="question__buttons">
							<span className="question__button">
								<i className="question__button-icon material-icons">chat</i>
								<span className="question__button-num">{question.get('comments_count')}</span>
							</span>
							<span className="question__button" onClick={ e => this.likeQuestionHandler()}>
								<i className="question__button-icon material-icons">{iconLiked}</i>
								<span className="question__button-num">{question.get('likes_count')}</span>
							</span>
						</div>
					</div>
					{/*<User user={question.get('user')} />*/}
				</div>
				<div className={'answers ' + withImageAnswerClass}>{AnswersTemplate}</div>
			</div>
		)


	}




	windowResize(){

		if(!this._isMounted) return;

		this.props.question.get('images').setSize($('#question-feed').width() - 30);
		this.setState({
			images: this.props.question.get('images'),
		});
	}

}




