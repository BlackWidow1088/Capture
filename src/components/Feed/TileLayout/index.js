import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import Slider from './slider';
import MoreOptionIcon from '../../MoreOptionIcon';
import VideoPlayer from '../../VideoPlayer';

import { updateActiveFeed } from '../../../actions';

import { findUserName } from '../../../utils/scrap.utils';

const TILES = 'TILES';
const SINGLE = 'SINGLE';
const VIDEO = 'VIDEO';
// TODO: show collection of Fotos appear like Facebook collection
class TileLayout extends React.Component {
    state = {
        imageIndex: 0,
        show: TILES,
    }
    render() {
        this.formattedName = findUserName(this.props.user.username);
        this.fotos = this.props.fotos
        return this.showHome();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.feedId !== this.props.feedId) {
            this.setState({ show: TILES, imageIndex: 0 })
            this.props.updateActiveFeed({ feedId: nextProps.feedId, photoId: null, user: nextProps.user });
        }
        return true;
    }

    showHome() {
        return (
            <div className='fp-tile-layout'>
                <div className={this.state.show === SINGLE ? 'fp-position-relative' : 'fp-display-none'} style={{ top: '-16px', left: '58px' }}>
                    <MoreOptionIcon onClick={() => {
                        this.setState({ show: TILES, imageIndex: 0 })
                        this.props.updateActiveFeed({ feedId: this.props.feedId, photoId: null, user: this.props.user });
                    }}
                        icon={['fas', 'ellipsis-h']}
                    />
                </div>
                <div className='fp-position-relative' style={{ top: '-16px', left: '25px' }}>
                    <MoreOptionIcon onClick={() => {
                        if (this.state.show === VIDEO) {
                            this.setState({ show: TILES, imageIndex: 0 })
                        } else {
                            this.setState({ show: VIDEO, imageIndex: 0 })
                        }
                        this.props.updateActiveFeed({ feedId: this.props.feedId, photoId: null, user: this.props.user });
                    }}
                        icon={this.state.show === VIDEO ? ['fas', 'camera'] : ['fas', 'video']}
                    />
                </div>
                {
                    (() => {
                        switch (this.state.show) {
                            case VIDEO:
                                return (
                                    <div className='fp-row'>
                                        {
                                            this.props.videos &&
                                            <VideoPlayer 
                                            img={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/${this.props.user.userpic}`}
                                            video={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/videos/${this.props.videos[0]}`} />
                                        }
                                    </div>
                                )
                            case SINGLE:
                                return <img src={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/${this.fotos[this.state.imageIndex].foto}`} />

                            default:
                                return (
                                    <div className='fp-row'>
                                        <div className='fp-column'>
                                            <img src={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/${this.fotos[0].foto}`} />
                                            <img src={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/${this.fotos[1].foto}`} />
                                        </div>
                                        <div className='fp-column'>
                                            <img src={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/${this.fotos[2].foto}`} />
                                            <img src={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/${this.fotos[3].foto}`} />
                                            <img src={`${process.env.PUBLIC_URL}/data/fotos/${this.formattedName}/Journeys/0/${this.fotos[4].foto}`} />
                                        </div>
                                    </div>
                                )
                        }
                    })()
                }
                <Slider onChange={this.showImage} />
            </div>
        )
    }
    showImage = (direction) => {
        let showIndex = this.state.imageIndex + direction;
        showIndex = showIndex < 0 ? this.fotos.length - 1 : showIndex >= this.fotos.length ? 0 : showIndex;
        this.setState({ show: SINGLE, imageIndex: showIndex })
        this.props.updateActiveFeed({ feedId: this.props.feedId, photoId: showIndex, user: this.props.user });
    }
}
TileLayout.propTypes = {

};

TileLayout.defaultProps = {

};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { updateActiveFeed })(TileLayout);


