import React from 'react';
import './styles.scss';
export default (props) => {

    return (
        <div className='fp-c-tile-layout__next-image'>
            <div className='fp-c-circle' onClick={() => props.onChange(-1)}></div>
            <div className='fp-c-circle fp-l-margin--left-5' onClick={() => props.onChange(1)}></div>
        </div>
    )
}