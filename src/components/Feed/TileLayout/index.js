import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import Slider from './slider';
import MoreOptionIcon from '../../MoreOptionIcon';

import { updateActiveFeed } from '../../../actions';

// TODO: show collection of Fotos appear like Facebook collection
class TileLayout extends React.Component {
    state = {
        imageIndex: -1,
        showVideo: false,
    }
    render() {
        this.fotos = this.props.feed.fotos
        return this.showHome();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.feed.id !== this.props.feed.id) {
            this.setState({ showVideo: false, imageIndex: -1 })
            this.props.updateActiveFeed({ ...nextProps.feed});
        }
        if(this.state.imageIndex >= nextProps.feed.fotos.length) {
            this.setState({ showVideo: false, imageIndex: -1 })
            return false;
        }
        return true;
    }

    showHome() {
        return (
            <div className='fp-c-tile-layout'>
                {
                    (() => {
                        if (this.state.showVideo) {
                            return (
                                <div className='fp-l-position--relative'>
                                    <div className='fp-l-tile-layout__row'>
                                        {
                                            this.props.feed.videos &&
                                            <video width="514" height="300" controls>
                                                <source src={`${this.props.feed.videos[0]}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        }
                                    </div>
                                    {
                                    <Slider onChange={this.showImage} />
                                    }
                                </div>
                            )
                        }
                        if (this.fotos.length < 5 || this.state.imageIndex >=0 ) {
                            let index = this.state.imageIndex >=0 ? this.state.imageIndex : 0;
                            return <div className='fp-l-position--relative'>
                                <img src={`${this.fotos[index].foto}`} />
                                {
                                    this.fotos.length !== 1 && <Slider onChange={this.showImage} />
                                }
                            </div>
                        }
                        return (
                            <div className='fp-l-position--relative'>
                                <div className='fp-l-tile-layout__row'>
                                    <div className='fp-l-tile-layout__column'>
                                        <img src={`${this.fotos[0].foto}`} />
                                        <img src={`${this.fotos[1].foto}`} />
                                    </div>
                                    <div className='fp-l-tile-layout__column'>
                                        <img src={`${this.fotos[2].foto}`} />
                                        <img src={`${this.fotos[3].foto}`} />
                                        <img src={`${this.fotos[4].foto}`} />
                                    </div>
                                </div>
                                {
                                     <Slider onChange={this.showImage} />
                                }
                            </div>
                        )
                    })()
                }
                {
                    <div>
                        <div className={this.state.imageIndex !== -1  && this.fotos.length >=5? 'fp-l-position--relative' : 'fp-l-display--none'} style={{ top: '-1rem', float: 'right', right: '58px' }}>
                            <MoreOptionIcon onClick={() => {
                                this.setState({ showVideo: false, imageIndex: -1 })
                                this.props.updateActiveFeed({ ...this.props.feed });
                            }}
                                icon={['fas', 'ellipsis-h']}
                            />
                        </div>
                        {
                            this.props.feed.videos && this.props.feed.videos.length &&
                            <div className='fp-l-position--relative' style={{ top: '-1rem', float: 'right', right: '25px' }}>
                            <MoreOptionIcon onClick={() => {
                                if (this.state.showVideo) {
                                    this.setState({ showVideo: false, imageIndex: -1 })
                                } else {
                                    this.setState({ showVideo: true, imageIndex: -1 })
                                }
                                this.props.updateActiveFeed({ ...this.props.feed });
                            }}
                                icon={this.state.showVideo ? ['fas', 'camera'] : ['fas', 'video']}
                            />
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
    showImage = (direction) => {
        let showIndex = this.state.imageIndex + direction;
        showIndex = showIndex < 0 ? this.fotos.length - 1 : showIndex >= this.fotos.length ? 0 : showIndex;
        this.setState({ showVideo: false, imageIndex: showIndex })
        this.props.updateActiveFeed({ ...this.props.feed, imageIndex: this.fotos[showIndex].fotoId });
    }
}
TileLayout.propTypes = {

};

TileLayout.defaultProps = {

};

export default connect(null, { updateActiveFeed })(TileLayout);


