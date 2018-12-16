import React from 'react';
import './ImageLinkForm.css';
import Scroll from 'react-scroll';

var scroll = Scroll.animateScroll;

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
	return (
		<div className="moon-gray b--moon-gray">
			<p className='f3'>
			{`Paste a photo's URL into the box below and I will do my best to see what's in it!`}
			</p>
			<br/>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<select>
						<option id="generalModel">General Model</option>
						<option id="faceDetection">Face Detection</option>
						<option id="foodDetection">Food Detection</option>
						<option id="celebDetection">Celebrity Detection</option>
					</select>
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
		</div>
	);
}

export default ImageLinkForm;