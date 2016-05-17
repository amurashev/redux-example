import React from 'react';

export default class extends React.Component {


	render() {

		const { user } = this.props;

		return (
			<div className="user-info">
				<div className="user-info__avatar-block">
					<img className="img-circle user-info__avatar" src={user.get('avatar_small')} alt={user.get('full_name')} />
				</div>
				<div className="user-info__name-block">
					<a href={main.urls.userProfile + '/' + user.get('full_name')} className="user-info__name">{user.get('full_name')}</a>
				</div>
			</div>
		)
	}

}