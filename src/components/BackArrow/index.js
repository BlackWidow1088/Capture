import React from 'react';
import './styles.scss';

export default (props) =>
    <div className='fp-backarrow fp-position-absolute'>
        <img src={`${process.env.PUBLIC_URL}/back_arrow.png`} style={{width: '30px', height: '30px'}} onClick={props.back}/>
    </div>