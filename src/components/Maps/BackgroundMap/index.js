import React from 'react';
import { connect } from 'react-redux';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyle from './yelowish-style';
import env from '../../../env';
import './styles.scss';
import { findUserName, eqSet } from '../../../utils/scrap.utils';
import BackgroundMapMarker from './BackgroundMapMarker';

class GoogleMapWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.position = [];
        this.currentFeedId = null;
        this.state = {
            zoom: 5,
            hiddenMarkers: []
        }
    }
    finishCluster = (e) => {
        const hidden = []
        e.getClusters().forEach((item, index) => {
            const markers = item.getMarkers();
            markers.forEach(marker => markers.length !== 1 ? hidden.push(marker.id) : null);
        });
        if (!eqSet(new Set(hidden), new Set(this.state.hiddenMarkers))) {
            this.setState({ hiddenMarkers: hidden })
        }
    }
    render = () => {
        let userPic = null;
        let updateBounds = false;
        if(this.props.data.activeFeed) {
            if (this.currentFeedId !== this.props.data.activeFeed.feedId && this.props.data.feed[0]) {
                this.position = [];
                updateBounds = new window.google.maps.LatLngBounds();
                this.props.data.feed[0].fotos.map((marker, index) => {
                    const latlng = new window.google.maps.LatLng(marker.lat, marker.lng)
                    this.position.push({ location: latlng, markerId: index });
                    updateBounds.extend(latlng); 
                })
            }
            if(this.props.data.activeFeed.user) {
                userPic = `${process.env.PUBLIC_URL}/data/fotos/${findUserName(this.props.data.activeFeed.user.username)}/${this.props.data.activeFeed.user.userpic}`
            }
            this.currentFeedId = this.props.data.activeFeed.feedId;
        } else {
            this.position = [];
        }
        return (<GoogleMap
            ref={map => {
                this.map = map;
                this.map && updateBounds && this.map.fitBounds(updateBounds, {top: 30, right:0,bottom:400, left: 0})
            }}
            defaultCenter={{ lat: 31.0529171, lng: 81.2762373 }}
            defaultOptions={{
                styles: mapStyle,
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                rotateControl: false,
                fullscreenControl: false
            }}
            onBoundsChanged={() => {
                this.setState({ zoom: 4 })}}
            zoom={this.state.zoom}
        >
            {
            this.position.length && 
            <MarkerClusterer
                onClusteringEnd={this.finishCluster}
                averageCenter
                enableRetinaIcons
                clusterClass={'fp-bg-map-marker-cluster'}
                gridSize={60}
                styles={[
                    {
                        url: userPic,
                        height: 53,
                        lineHeight: 53,
                        textColor: 'white',
                        width: 53,
                    },
                    {
                        url: userPic,
                        height: 56,
                        lineHeight: 56,
                        textColor: 'white',
                        width: 56,
                    },
                    {
                        url: userPic,
                        height: 66,
                        lineHeight: 66,
                        textColor: 'white',
                        width: 66,
                    },
                    {
                        url: userPic,
                        height: 78,
                        lineHeight: 78,
                        textColor: 'white',
                        width: 78,
                    },
                    {
                        url: userPic,
                        height: 90,
                        lineHeight: 90,
                        textColor: 'white',
                        width: 90,
                    },
                ]}
            >
                {
                    this.position.map((marker, index) => {
                        let isHightlightedMarker = this.props.data.activeFeed.photoId === index ? true : false
                        return (
                            <BackgroundMapMarker
                                key={marker.markerId}
                                hiddenMarkers={this.state.hiddenMarkers}
                                img={userPic}
                                position={marker.location}
                                highlight={isHightlightedMarker}
                                opacity={0}
                                options={{ id: marker.markerId }}
                            />
                        )
                    })
                }
            </MarkerClusterer>
            }

        </GoogleMap>)
    }
}

const ReactGoogleMapWrapper = withScriptjs(withGoogleMap(props => {
    return (
        <GoogleMapWrapper data={props.data} />
    )
}));


// IMP: the map layout is rendered in fixed position. So make sure the parent HTML element has position:relative
//  for correct rendering
class BackgroundMap extends React.Component {
    render = () => {
        return (
            <div style={{ position: 'relative' }}>
                <div className={this.props.mapOptions.isFullLayout ? 'fp-background-map-complete-layout':'fp-background-map-layout'}>
                    <ReactGoogleMapWrapper
                        data={this.props}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${env.api}&v=3.exp`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `800px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        )
    }
}
BackgroundMap.propTypes = {

};

BackgroundMap.defaultProps = {

};

const mapStateToProps = state => ({
    feed: state.feed.all.filter(item => state.feed.activeFeed && item.id === state.feed.activeFeed.feedId),
    activeFeed: state.feed.activeFeed,
    mapOptions: state.ui.mapActions
});

export default connect(mapStateToProps)(BackgroundMap);
