import React from 'react';


const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white f3'>
			{`Hello, ${name}, I am keeping track of how many faces you've had identified. You're at`}
			</div>
			<br/><br/>
			<div className='white f1'>
			{`${entries}!`}
			</div>
			<br/>
		</div>
	);
}

export default Rank;