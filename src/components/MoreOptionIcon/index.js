import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default (props) =>
    <div className='fp-more-option-icon-div' onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} size='2x' color='#3b5998' />
    </div>


