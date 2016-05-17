import React from 'react';

import Image from '../components/Image';

export default class extends React.Component {

	componentWillMount() {
		const { wrapper } = this.props;
		this.props.answer.get('images').setSize(($(wrapper).width() - 60) / 6); //FIXME
	}

	componentWillReceiveProps(props) {
		const { wrapper } = props;
		props.answer.get('images').setSize(($(wrapper).width() - 60) / 6); //FIXME
	}

	answerClick(){
		const { answer, chooseAnswer } = this.props;
		if(!answer.get('you_choice')) {
			chooseAnswer(answer.get('question_id'), answer.get('id'));
		}
	}


	render() {

		const { answer } = this.props;
		const ImagesTemplate = answer.get('images').models.map((image, i) => 
			<Image key={i} image={image} className={'answer__image-block'} />);
		const textTemplate = (answer.get('text') != '') ? <div className="answer__text">{answer.get('text')}</div> : '';


		return (
			<div className="answer" onClick={e => this.answerClick()}>
				<div className="answer__block">
					<div className="answer__block-inner">
						{
							!answer.get('you_choice') ?
							<div className="answer__hovered-block">
								<i className="material-icons mi">&#xE86C;</i>
							</div> :
							<div className="answer__result-block">
								<span className="answer__percent">{answer.get('percent')}%</span>
							</div>
						}
						{
							ImagesTemplate.length == 0 ? void 0 :
							<div className="answer__images">{ImagesTemplate}</div>
						}					
						{textTemplate} 
					</div>
				</div>
			</div>
		);

	}

}