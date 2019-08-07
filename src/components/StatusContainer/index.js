import React from 'react';
import './styles.scss';
import { MOOD, EMOJI } from '../../constants';
class StatusContainer extends React.Component {
    state = {
        showOptions: false
    }
    onChange = (mood) => {
        if(this.props.mood !== mood) {
            this.props.onChange(mood);
        }
    }
    render = () => {
       return ( 
       <div className='fp-c-status-container' onClick={() => this.setState({showOptions: !this.state.showOptions})}>
           <img className='fp-c-status-container__img--selected' src= {EMOJI[this.props.mood]}/>
           <img className='fp-c-status-container__img--selected' src= {EMOJI[this.props.weather]}/>
           {
               this.state.showOptions &&
               <div className='fp-c-status-container__options'>
               <img onClick={() => this.onChange(MOOD.TRAVEL)} className='fp-c-status-container__img' src= {EMOJI[MOOD.TRAVEL]}/>
               <img onClick={() => this.onChange(MOOD.JOURNEY)} className='fp-c-status-container__img' src= {EMOJI[MOOD.JOURNEY]}/>
               <img onClick={() => this.onChange(MOOD.GENERAL)} className='fp-c-status-container__img' src= {EMOJI[MOOD.GENERAL]}/>
               <img onClick={() => this.onChange(MOOD.HUNGRY)} className='fp-c-status-container__img' src= {EMOJI[MOOD.HUNGRY]}/>
               </div>
           }
        </div>
       )
    }
}

export default StatusContainer; 