import React from 'react';
import './styles.scss';
import Slider from './slider';

// TODO: show collection of Fotos appear like Facebook collection
class TileLayout extends React.Component {
    state = {
        showSlider: false,
        imageIndex: 1
    }
    render() {
        return this.showHome();
    }

    showHome() {
        if (this.state.showSlider) {
            return (
                <div className='fp-tile-layout'>
                    <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[this.state.imageIndex]} />
                    <Slider onChange={this.showImage} />
                </div>
            )
        }
        switch (this.props.mode) {
            case 'portrait':
                return (
                    <div className='fp-tile-layout'>
                        <div className='fp-row'>
                            <div className='fp-portrait-column'>
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[0]} />
                            </div>
                            <div className='fp-portrait-sub-column'>
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[1]} />
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[2]} />
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[3]} />
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[5]} />
                            </div>
                            <div className='fp-portrait-sub-column'>
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[4]} />
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[5]} />
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[1]} />
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[2]} />
                            </div>
                        </div>
                        <Slider onChange={this.showImage} />
                        <button onClick={() => this.setState({ showSlider: false })}>Click</button>
                    </div>
                );
            case 'landscape':
                return (
                    <div className='fp-tile-layout'>
                        <div className='fp-row'>
                            <div className='fp-landscape-column'>
                                <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[0]} />
                            </div>
                        </div>
                        <div className='fp-row'>
                            {
                                this.props.fotos.map((item, index) => {
                                    if (index > 0) {
                                        return (<div key={index} className='fp-landscape-sub-column'>
                                            <img src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/Journeys/0/' + this.props.fotos[index]} />
                                        </div>)
                                    }
                                })
                            }
                        </div>
                        <Slider onChange={this.showImage} />
                    </div>
                )
            default: return null;
        }
    }
    showImage = (direction) => {
        let showIndex = this.state.imageIndex + direction;
        showIndex = showIndex < 0 ? this.props.fotos.length - 1 : showIndex >= this.props.fotos.length ? 0 : showIndex;
        this.setState({ showSlider: true, imageIndex: showIndex })
        // switch(showIndex) {
        //     case 0: 
        //         this.setState({ imageIndex: showIndex, prevIndex: this.props.fotos.length, nextIndex: 1 });
        //         break;
        //     case this.props.length - 1:
        //         this.setState({ imageIndex: showIndex, prevIndex: this.props.fotos.length-2, nextIndex: 1 });
        //         break;
        // }

    }
}
export default TileLayout;


