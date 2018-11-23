import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, componentColors }) => {
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', color: componentColors}}>
				<p onClick={() => onRouteChange('signout')} className='f2 link dim underline pv2 ph4 pointer'>Sign Out</p>
			</nav>
		)
	} else {
		return (
			<div>
				<nav style={{display: 'flex', justifyContent: 'flex-end', color: componentColors}}>
					<p onClick={() => onRouteChange('signin')} className='f2 link dim underline pv2 ph4 pointer'>Sign In</p>
					<p onClick={() => onRouteChange('register')} className='f2 link dim underline pv2 ph4 pointer'>Register</p>
				</nav>
			</div>
		)
	}
}

export default Navigation;