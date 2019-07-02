import React from 'react';
import './styles.scss';

export default (props) =>
    <div className={props.isActive ? 'fp-toggle fp-toggle-active' : 'fp-toggle'} onClick={props.toggle}>
        <span className={props.isActive ? 'fp-toggle-slider fp-toggle-slider-active' :'fp-toggle-slider'}></span>
    </div>