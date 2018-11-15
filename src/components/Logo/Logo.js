import React from 'react';
import Tilt from 'react-tilt';
import think from './think.png'
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma5 mt0'>
			<Tilt className="Tilt br5 ma4 ml4 shadow-2" options={{ max : 55 }} style={{ height: 285, width: 400 }} >
 				<div className="Tilt-inner" style={{display: 'flex'}}>
 					<img alt='logo' src={think}/>
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;