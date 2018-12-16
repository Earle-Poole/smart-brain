import React from 'react';
import './CelebDetection.css'

const CelebDetection = ({ name, accuracy, imageUrl, displayNameAcc }) => {
    if (displayNameAcc === 3){
        return (
            <div className='center ma'>
                <div className='absolute mt2 moon-gray ttc f2'>
                    <img id='inputimage' alt='' src={imageUrl} width='400px' height='auto' />
                    <p className='f2 mv1'>{`${name[0]}, ${accuracy[0]}%`}</p>
                    <br className='h5'/>
                </div>
            </div>
        );
    } else {
        return null
    }
}

export default CelebDetection;