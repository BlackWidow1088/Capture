import React from 'react';
import {
    OverlayView,
    Marker
} from "react-google-maps";
import './styles.scss';

class BackgroundMapMarker extends Marker {
    state = {
        zIndex: 1,
    }
    getPixelPositionOffset = (width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
      })
    render() {
        return (
           !this.props.hidden &&
            <OverlayView
            style={{zIndex: this.state.zIndex}}
            key={Math.random()}
            position={this.props.position}
            /*
             * An alternative to specifying position is specifying bounds.
             * bounds can either be an instance of google.maps.LatLngBounds
             * or an object in the following format:
             * bounds={{
             *    ne: { lat: 62.400471, lng: -150.005608 },
             *    sw: { lat: 62.281819, lng: -150.287132 }
             * }}
             */
            /*
             * 1. Specify the pane the OverlayView will be rendered to. For
             *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
             *    Defaults to `OverlayView.OVERLAY_LAYER`.
             */
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            /*
             * 2. Tweak the OverlayView's pixel position. In this case, we're
             *    centering the content.
             */
            getPixelPositionOffset={this.getPixelPositionOffset}
            /*
             * 3. Create OverlayView content using standard React components.
             */
          >
            {/* <div className='fp-bg-map-marker-container'>
                <div className='fp-bg-map-marker-anchor'>
                    <div className='fp-bg-map-marker fp-popup-bubble'> */}
                
                        <img src={this.props.img} 
                        onMouseOver = {(event) => {
                            console.log(event)
                            this.setState({zIndex: 1000 })
                        }}
                        onMouseOut = {(event) => {
                            this.setState({zIndex: 1})}}
                        className={this.props.highlight ? 'fp-c-card fp-c-background-map__marker-img fp-is-active' : 'fp-c-card fp-c-background-map__marker-img'} />
                    {/* </div>
                </div>
            </div> */}
          </OverlayView>
        )
    }
}

export default BackgroundMapMarker;