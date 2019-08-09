import React from 'react';
import './styles.scss';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';

class Live extends React.Component {
    state = {
        option: 'first',
        'first': [
            `${process.env.PUBLIC_URL}/data/live/video1.mp4`,
            `${process.env.PUBLIC_URL}/data/live/video2.mp4`,
        ],
        'second': [`${process.env.PUBLIC_URL}/data/live/video3.mp4`,]
    }
    render = () => {
        const images = [];
        const opt = this.state.option;
        this.state[opt].forEach(item => images.push({
            original: item,
            thumbnail: item
        }));
        return (
            <div>
                <div className='fp-c-card fp-c-live__panel'>
                    <div className='fp-c-live--list'>
                            <div onClick={() => this.setState({option: 'first'})}><p><em>#FCroad #traffic #isHappening? #marathi #hindi</em>#thereGirls?</p></div>
                            <div><p onClick={() => this.setState({option: 'second'})}><em>#pashanlake #closedopen? #marathiOnly</em>#couples</p></div>
                            <div><p><em>#mahtobaTekdi #weather?</em>#peopleOutForWalk? #highlurecommended?</p></div>
                    </div>
                </div>
                <div className='fp-c-live'>
                <video width="614" height="500" controls>
                                            <source src={this.state[this.state.option][0]} type="video/mp4" />
                                            Your browser does not support the video tag.
                </video>
                </div>
            </div>
        )
    }
}
export default connect(null, { })(Live);