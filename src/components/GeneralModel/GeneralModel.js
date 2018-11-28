import React from 'react';

const GeneralModel = ({ name, accuracy }) => {
	return (
		<div className='center ma'>
            <div className='absolute mt2 moon-gray'>
                <p>
                    {name}, {accuracy}
                </p>
            </div>
        </div>
	);
}

export default GeneralModel;