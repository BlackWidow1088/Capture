import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import mapStyle from './map-style';
import env from '../../../env';
import './styles.scss';

class GoogleMapWrapper extends React.Component {
    state = {
        markers: null
    }
    render = () => {
        return (<GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 18.5204, lng: 73.8567 }}
            defaultOptions={{
                styles: mapStyle,
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                rotateControl: false,
                fullscreenControl: false
            }}>
            {
                this.state.markers && this.state.markers.map(marker => (
                    <Marker
                        position={marker}
                    />
                ))
            }
        </GoogleMap>)
    }
}

const ReactGoogleMapWrapper = withScriptjs(withGoogleMap(props => {
    return (
        <GoogleMapWrapper parent={props} />
    )
}));


// IMP: the map layout is rendered in fixed position. So make sure the parent HTML element has position:relative
//  for correct rendering
class BackgroundMap extends React.Component {
    render = () => {
        return (
            <div style={{ position: 'relative' }}>
                <div className='fp-background-map-layout'>
                    <ReactGoogleMapWrapper
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${env.api}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `800px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        )
    }
}

export default BackgroundMap;