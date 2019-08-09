import React from 'react';
import { connect } from 'react-redux';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyle from './yelowish-style';
import mapElements from './map';
import env from '../../../env';
import './styles.scss';
import { eqSet } from '../../../utils/scrap.utils';
import { DEFAULT_MARKER_PATH, MARKER } from '../../../constants';
import BackgroundMapMarker from './BackgroundMapMarker';

// TODO: need to develop robust code for google maps
// TODO: handling of maps when no internet.. google doesnt return map information after hitting api limit
//       safety measure needs to be implemented.
const clusterSizes = [30, 30, 30, 30, 30]
class GoogleMapWrapper extends React.Component {
    position = [];
    endPositions = [];
    updateBounds = false;
    currentFeedId = null;
    state = {
        zoom: 5,
        hiddenMarkers: []
    }
    update = () => {
        this.endPositions = [];
        if(this.props.data.mapOptions.route && this.props.data.mapOptions.route.markers) {
            this.updateBounds = new window.google.maps.LatLngBounds();
            this.props.data.mapOptions.route.markers.forEach((marker, index) => {
                this.endPositions.push({location: marker, markerId: index === 0 ? 'start' : 'end', img: DEFAULT_MARKER_PATH});
                this.updateBounds.extend(marker);
            });
        }
        const current = this.props.data.activeFeed
        if(current && current.fotos) {
            if(this.currentFeedId !== current.id) {
                // if(!current.imageIndex) {
                this.position = [];
                if(!this.updateBounds) {
                    this.updateBounds = new window.google.maps.LatLngBounds();
                }
                current.fotos.map(marker => {
                    const latlng = new window.google.maps.LatLng(marker.lat, marker.lng)
                    this.position.push({ location: latlng, markerId: marker.fotoId, img: MARKER});
                    this.updateBounds.extend(latlng);
                })
            } 
            this.currentFeedId = current.id;
        } else {
            this.position = [];
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
        if (!window.google) {
            return null;
        }
        // let userPic = (this.props.data.activeFeed && this.props.data.activeFeed.user.userpic) || (DEFAULT_MARKER_PATH)
        this.updateBounds = null;
        this.update();
        console.log('positions ', this.position)
        return (<GoogleMap
            ref={map => {
                this.map = map;
                this.map && this.updateBounds && this.map.fitBounds(this.updateBounds, { top: 10, right: 0, bottom: 10, left: 0 })
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
                // TODO: updating state will end in infinte renerdering loop
                // this.setState({ zoom: 4 })
            }}
            zoom={this.state.zoom}
        >
            {
                this.endPositions &&
                this.endPositions.map(marker => 
                    <BackgroundMapMarker
                    key={marker.markerId}
                    hidden={false}
                    img={marker.img}
                    position={marker.location}
                    highlight={false}
                    opacity={0}
                    // options={{ id: marker.markerId }}
                />)
            }
            {
                this.position.length &&
                // <MarkerClusterer
                //     onClusteringEnd={this.finishCluster}
                //     averageCenter
                //     enableRetinaIcons
                //     clusterClass={'fp-c-background-map__marker-cluster'}
                //     gridSize={40}
                //     styles={[
                //         {
                //             url: userPic,
                //             height: clusterSizes[0],
                //             lineHeight: clusterSizes[0],
                //             textColor: 'white',
                //             width: clusterSizes[0],
                //         },
                //         {
                //             url: userPic,
                //             height: clusterSizes[1],
                //             lineHeight: clusterSizes[1],
                //             textColor: 'white',
                //             width: clusterSizes[1],
                //         },
                //         {
                //             url: userPic,
                //             height: clusterSizes[2],
                //             lineHeight: clusterSizes[2],
                //             textColor: 'white',
                //             width: clusterSizes[2],
                //         },
                //         {
                //             url: userPic,
                //             height: clusterSizes[3],
                //             lineHeight: clusterSizes[3],
                //             textColor: 'white',
                //             width: clusterSizes[3],
                //         },
                //         {
                //             url: userPic,
                //             height: clusterSizes[4],
                //             lineHeight: clusterSizes[4],
                //             textColor: 'white',
                //             width: clusterSizes[4],
                //         },
                //     ]}
                // >
                    // {
                        this.position.map(marker => {
                            let isHightlightedMarker = this.props.data.activeFeed && this.props.data.activeFeed.imageIndex === marker.markerId ? true : false
                            return (
                                <BackgroundMapMarker
                                    key={marker.markerId}
                                    hidden={false}
                                    // hidden={this.state.hiddenMarkers && this.state.hiddenMarkers.includes(marker.markerId)}
                                    img={marker.img}
                                    position={marker.location}
                                    highlight={isHightlightedMarker}
                                    opacity={0}
                                    // options={{ id: marker.markerId }}
                                />
                            )
                        })
                    // }
                // </MarkerClusterer>
            }
            { this.props.data.mapOptions.route && this.props.data.mapOptions.route.polyline && 
                <Polyline
                    geodesic={true}
                    // onMouseOver={this.pathMouseOver}
                    options={{ ...mapElements.polyline, path: this.props.data.mapOptions.route.polyline }}
                />
            }

        </GoogleMap>)
    }
}

const ReactGoogleMapWrapper = withScriptjs(withGoogleMap(props => {
    try {
        return (
            <GoogleMapWrapper data={props.data} />
        )
    } catch (err) {
        return null;
    }
}));


// IMP: the map layout is rendered in fixed position. So make sure the parent HTML element has position:relative
//  for correct rendering
class BackgroundMap extends React.Component {
    render = () => {
        return (
            <div className={this.props.mapOptions.isHidden ? 'fp-c-background-map-container fp-is-hidden':'fp-c-background-map-container'}>
                <div className={this.props.mapOptions.isFullLayout ? 'fp-c-card fp-l-background-map--round fp-l-background-map--full-layout' : 'fp-c-card fp-l-background-map--round'}>
                    <ReactGoogleMapWrapper
                        data={this.props}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${env.api}&v=3.exp&libraries=geometry,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={this.props.mapOptions.isFullLayout ? {height: '800px', width: '1800px'} : { height: `500px`, width: '370px' }} />}
                        // containerElement={<div style={{ height: `800px` }} />}
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
    activeFeed: state.feed.activeFeed,
    mapOptions: state.ui.mapActions
});

export default connect(mapStateToProps)(BackgroundMap);
