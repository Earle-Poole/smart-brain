import React from 'react';
import Tilt from 'react-tilt';
import think from './think.png'
import './Logo.css';

const Logo = () => {
	return (
		<div>
			<Tilt className="Tilt center ma0 mt4 mb5 shadow-2" options={{ max : 55 }} style={{ height: 285, width: 400 }} >
 				<div className="Tilt-inner">
 					<img alt='logo' src={think}/>
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;