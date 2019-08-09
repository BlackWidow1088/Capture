import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import Slider from './slider';
import MoreOptionIcon from '../../MoreOptionIcon';

// import { updateActiveFeed } from '../../../actions';

// TODO: show collection of Fotos appear like Facebook collection
class TileLayout extends React.Component {
    state = {
        imageIndex: 0,
        showImage: false
    }
    render() {
        this.fotos = this.props.feed.fotos
        return this.showHome();
    }
    // shouldComponentUpdate(nextProps) {
    //     if (nextProps.feed.id !== this.props.feed.id) {
    //         this.setState({ showVideo: false, imageIndex: 0 })
    //         this.props.updateActiveFeed({ ...nextProps.feed });
    //     }
    //     if (this.state.imageIndex >= nextProps.feed.fotos.length) {
    //         this.setState({ showVideo: false, imageIndex: 0 })
    //         return false;
    //     }
    //     return true;
    // }

    showHome() {
        let index = this.state.imageIndex >= 0 ? this.state.imageIndex : 0;
        return (
            <div key={`${this.props.feed.id}${index}`} onMouseEnter={() => this.setState({showImage: true})} 
            onMouseLeave={() => this.setState({showImage: false})}
            className='fp-c-tile-layout'>
                {
                    (() => {
                        if (this.fotos[index].isVideo) {
                            return (
                                <div className='fp-l-position--relative'>
                                    <div className='fp-l-tile-layout__row'>
                                        {
                                            <video width="614" height="500" controls>
                                                <source src={`${this.fotos[index].foto}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        }
                                    </div>
                                    {
                                       this.fotos.length > 1 && this.state.showImage && <Slider onChange={this.showImage} />
                                    }
                                </div>
                            )
                        }

                        return <div className='fp-l-position--relative'>
                            <img src={`${this.fotos[index].foto}`} />
                            {
                                this.fotos.length > 1 && this.state.showImage && <Slider onChange={this.showImage} />
                            }
                        </div>
                    })()
                }
            </div>
        )
    }
    showImage = (direction) => {
        let showIndex = this.state.imageIndex + direction;
        showIndex = showIndex < 0 ? this.fotos.length - 1 : showIndex >= this.fotos.length ? 0 : showIndex;
        this.setState({ showVideo: false, imageIndex: showIndex })
        this.props.updateImageIndex(this.fotos[showIndex].fotoId)
        // this.props.updateActiveFeed({ ...this.props.feed, imageIndex: this.fotos[showIndex].fotoId });
    }
}
TileLayout.propTypes = {

};

TileLayout.defaultProps = {

};

export default connect(null, {  })(TileLayout);


