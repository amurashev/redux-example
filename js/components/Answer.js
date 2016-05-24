
import React from 'react';

import ImageAnswer from './ImageAnswer'


export default class extends React.Component {

    componentDidMount() {

        const { actions, answerKey } = this.props;
        var myDropzone = new Dropzone(this.refs.addAnswerPhoto, {
            url: main.urls.fileUpload,
            previewTemplate: '<div id="preview-template" style="display: none;"></div>',
            //accept: (file, done) => this.preloadImage(file, done),
            complete: (file) => {
                const newImage = JSON.parse(file.xhr.responseText);
                actions.addAnswerImage({
	                answerKey: answerKey,
	                image: newImage
                })
            }
        });
    }

    render() {

        const { answer, actions, answerKey } = this.props;

        const imagesTemplate = answer['images'].map((image, i) =>
            <ImageAnswer key={i} image={image} removeImageFunc={() => actions.removeAnswerImage({
                answerKey: answerKey,
                imageKey: i
            })}  />
        );

        return (
            <div className="answer">
                <div className="answer__text-block">
                    <input type="text" className="answer__text" ref="answerText" maxLength="150"
                           placeholder="Answer" value={answer['text']}
                           onChange={e => actions.changeAnswerText({
	                           text: this.refs.answerText.value,
	                           answerKey: answerKey
                            }
                    )} />
                    <div className="answer__images">{imagesTemplate}</div>
                    <i className="material-icons answer__delete" onClick={() => actions.removeAnswer(answerKey)}>clear</i>
                    <i className="material-icons answer__upload-image" ref="addAnswerPhoto">add_a_photo</i>
                </div>
            </div>
        )
    }

   
}




