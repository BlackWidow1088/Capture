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
               <img onClick={() => this.onChange(MOOD.LIVE)} className='fp-c-status-container__img' src= {EMOJI[MOOD.LIVE]}/>
               <img onClick={() => this.onChange(MOOD.TRAVEL)} className='fp-c-status-container__img' src= {EMOJI[MOOD.TRAVEL]}/>
               <img onClick={() => this.onChange(MOOD.FEED)} className='fp-c-status-container__img' src= {EMOJI[MOOD.FEED]}/>
               <img onClick={() => this.onChange(MOOD.FOOD)} className='fp-c-status-container__img' src= {EMOJI[MOOD.FOOD]}/>
               </div>
           }
        </div>
       )
    }
}

export default StatusContainer; 