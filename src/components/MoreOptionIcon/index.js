import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default (props) =>
    <div className='fp-c-more-option-icon' onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} size='2x' color='#3b5998' />
    </div>


