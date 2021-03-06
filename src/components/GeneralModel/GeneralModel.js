import React from 'react';
import './GeneralModel.css';

const GeneralModel = ({ name, accuracy, imageUrl, displayNameAcc }) => {
    if (displayNameAcc === 1){
        return (
            <div className='center ma'>
                <div className='absolute mt2 moon-gray ttc f2'>
                    <img id='inputimage' alt='' src={imageUrl} width='400px' height='auto' />
                    <p className='f2 mv1'>{`${name[0]}, ${accuracy[0]}%`}</p>
                    <p className='f3 mv1'>{`${name[1]}, ${accuracy[1]}%`}</p>
                    <p className='f3 mv1'>{`${name[2]}, ${accuracy[2]}%`}</p>
                    <p className='f3 mv1'>{`${name[3]}, ${accuracy[3]}%`}</p>
                    <br className='h5'/>
                </div>
            </div>
        );
    } else {
        return null
    }
}

export default GeneralModel;