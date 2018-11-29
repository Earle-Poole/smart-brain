import React from 'react';
import './GeneralModel.css';

const GeneralModel = ({ name, accuracy, imageUrl, displayNameAcc }) => {
    if (displayNameAcc){
        return (
            <div className='center ma'>
                <div className='absolute mt2 moon-gray ttc f2'>
                    <img id='inputimage' alt='' src={imageUrl} width='400px' height='auto' />
                    <p>
                        {`${name}, ${accuracy}%`}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
           null
        );
    }
}

export default GeneralModel;