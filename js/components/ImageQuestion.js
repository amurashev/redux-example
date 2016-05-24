import React from 'react';

export default class extends React.Component {

    render() {
        const { image, removeImageFunc } = this.props;
        return <div className="question__image-block">
            <img className="" src={image.path} />
            <i className="material-icons mi question__delete-photo" onClick={e => removeImageFunc() }>clear</i>
        </div>
    }
}