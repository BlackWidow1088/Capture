import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default (props) => {

    return (
        <div className='fp-c-slider'>
            <div className='fp-c-slider__left' onClick={() => props.onChange(-1)}>
            <FontAwesomeIcon icon='chevron-circle-left' size='2x' color='#29487d' />
            </div>
            <div className='fp-c-slider__right' onClick={() => props.onChange(1)}>
            <FontAwesomeIcon icon='chevron-circle-right' size='2x' color='#29487d' />
            </div>
        </div>
    )
}