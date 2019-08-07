import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class InterestedContainer extends React.Component {
    state = {
        expand: false
    }
    render = () => {
        return (
            <div onClick={() => this.setState({expand: !this.state.expand})} className='fp-c-card fp-c-interested-container'>
                <div className='fp-c-interested-container__title'>
                <FontAwesomeIcon icon='map-marked-alt' size='lg' color='#29487d' />
                    <span style={{marginLeft: '5px'}}>19 interested to know about your location</span>
                </div>
                {
                    this.state.expand &&
                    <div style={{fontSize: '14px'}}>
                        <div>10 #Chill #Hangout #currentweather #latestupdate</div>
                        <div>2 #food #restaurent #streetfood #foodie</div>
                        <div>5 #traffic #pollution</div>
                        <div>2 #happenningplace?</div>
                    </div>
                }
            </div>
        )
    }
}

export default InterestedContainer; 