import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default (props) =>
    <div style={{ position: 'relative' }}>
        <div className='fp-more-option-icon-div'>
            <FontAwesomeIcon icon={['fas', 'ellipsis-h']} size='2x' color='#3b5998' />
        </div>
    </div>


