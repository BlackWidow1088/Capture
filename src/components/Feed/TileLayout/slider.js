import React from 'react';
import './styles.scss';
export default (props) => {

    return (
        <div className='fp-tile-layout-next-image'>
            <div className='fp-circle' onClick={() => props.onChange(-1)}></div>
            <div className='fp-circle fp-margin-l-5' onClick={() => props.onChange(1)}></div>
        </div>
    )
}