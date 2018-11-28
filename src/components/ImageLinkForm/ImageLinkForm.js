import React from 'react';
import './ImageLinkForm.css';
import Scroll from 'react-scroll';

var scroll = Scroll.animateScroll;

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
	return (
		<div className="moon-gray b--moon-gray">
			<p className='f3'>
			{`Paste a photo's URL into the box below and I will detect if there's a face in it!`}
			</p>
			<br/>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f3 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button 
						className='w-30 grow f3 link ph3 pv2 dib bg-orange moon-gray'
						style={{background: 'rgb(158, 62, 62) 50%'}}
						onClick={() => {
							onButtonSubmit();
							scroll.scrollToBottom();
						}}
						>Detect
					</button>
				</div>
			</div>
			<p className='f4'>
			{`Soon I will be able to detect celebrities, food, and apparel!`}
			</p>
		</div>
	);
}

export default ImageLinkForm;