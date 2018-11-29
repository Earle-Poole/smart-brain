import React from 'react';


const Rank = ({name, entries}) => {
	return (
		<div className='moon-gray'>
			<div className='f3'>
			{`Hello, ${name}, I am keeping track of how many photos you've had identified. You're at`}
			</div>
			<br/><br/>
			<div className='f1'>
			{`${entries}!`}
			</div>
			<br/>
		</div>
	);
}

export default Rank;