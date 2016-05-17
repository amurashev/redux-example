import React from 'react';

export default class extends React.Component {

	render() {
		const { image, className } = this.props;
		
		return <div className={className}
					style={{
                    width: image.get('blockWidth') + 'px',
                    height: image.get('blockHeight') + 'px',
                    marginRight: image.get('blockMarginRight') + 'px',
                    marginBottom: image.get('blockMarginBottom') + 'px'
                }}>
			<img src={image.get('path')}
				 style={{
                    width: image.get('imageWidth') + 'px',
                    height: image.get('imageHeight') + 'px',
                    marginTop: -image.get('imageMarginTop') + 'px',
                    marginLeft: -image.get('imageMarginLeft') + 'px'
                }} />
		</div>
	}
}