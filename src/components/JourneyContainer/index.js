import React from 'react';
import './styles.scss';
import UserHeader from '../UserHeader';

class JourneyContainer extends React.Component {
    render = () => {
        console.log('journies ', this.props.journies)
        return (
        <div className='fp-c-journey-container'>
            {
                this.props.journies && this.props.journies.top &&
                  <UserHeader key={this.props.journies.top.user.uid} className='fp-c-journey' user={{...this.props.journies.top.user, username: null}} />
                // this.props.journies.top.map(journey => 
                //     <UserHeader key={journey.user.uid} className='fp-c-journey' user={{...journey.user, username: null}} />
                //     )
            }
            {
                this.props.journies && this.props.journies.default.map(journey => 
                    <UserHeader  key={journey.user.uid}  className='fp-c-journey' user={{...journey.user, username: null}} />
                    )
            }
        </div>
        )
    }
}

export default JourneyContainer;