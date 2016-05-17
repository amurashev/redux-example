import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Question from '../components/Question';
import DropList from '../../../../common/components/DropList';
import CheckBox from '../../../../common/components/CheckBox';

import * as FeedActions from '../actions/AppActions'

class App extends Component {

	componentDidMount(){
		const { actions } = this.props;
		const scrollFunction = () => {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			var twoScreens = window.innerHeight * 2;
			var ifScreen = scrolled + twoScreens > document.body.scrollHeight;

			if(ifScreen) {
				actions.changeFilterOffset();
			}
		};
		window.onscroll = _.debounce(scrollFunction, 200);
	}

	onTextChange(){

		const { actions } = this.props;
		let text = this.refs.filterText.value;
		actions.changeFilter({ text: text });
	}

	render() {
		const { questions, filter,  actions } = this.props;

		const QuestionsTemplate = getQuestionsTemplate(questions, actions);
		const filterCategoriesArr = main.categories.map((c) => {
			c.itemClickEvent = () => actions.changeFilter({ category_id: c.id});
			return c;
		});
		filterCategoriesArr.unshift({
			id: 'all',
			name: 'Все категории',
			itemClickEvent: () => actions.changeFilter({ category_id: 'all'})
		});

		const filterTypesArr = [
			{ name: 'Популярные', itemClickEvent: () => actions.changeFilter({ type: 'vote' }) },
			{ name: 'Новые', itemClickEvent: () => actions.changeFilter({ type: 'time' }) }
		];

		return (
			<div className="feed-layout">
				<div className="filter-layout">
					<div className="filter">
						<DropList className="filter__button" items={filterCategoriesArr} />
						<DropList className="filter__button" items={filterTypesArr} />
						<CheckBox className="filter__checkbox" text="Только с фото"
						          itemClickEvent={(checked) => actions.changeFilter({ photo: checked })}  />
						<input type="text" className="filter__input" ref="filterText"
						       onKeyUp={_.debounce(() => this.onTextChange(), 500)} placeholder="Поиск" />
					</div>
				</div>
				<div className="questions-layout">
					<div className="questions-layout__col questions-layout__col-1">{QuestionsTemplate[0]}</div>
					<div className="questions-layout__col questions-layout__col-2">{QuestionsTemplate[1]}</div>
					<div className="questions-layout__col questions-layout__col-3">{QuestionsTemplate[2]}</div>
				</div>
			</div>
		);
	}
}



function getQuestionsTemplate(questions, actions, cols = 3) {
	const initArr = () => {
		let arr = [];
		for(let i = 0; i < cols; i++) arr.push([]);
		return arr;
	};

	return questions.reduce((arr, question, i) => {
		arr[i % cols].push(<Question key={i} wrapper="#feed-wrapper" question={question} actions={actions} />);
		return arr;
	}, initArr());
}


function mapStateToProps (state) {
	return {
		questions: state.questions,
		filter: state.filter
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(FeedActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)