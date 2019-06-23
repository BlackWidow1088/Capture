import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline
} from "react-google-maps";
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import mapStyle from './map-style';
import mapElements from './map';
import './map.css';

class Map extends React.Component {
    state = {};
    onSearchBoxMountedFrom = ref => {
        this.searchBoxFrom = ref;
    }
    onSearchBoxMountedTo = ref => {
        this.searchBoxTo = ref;
    }
    onMapMounted = ref => {
        this.map = ref;
        this.directionsService = new window.google.maps.DirectionsService();
    }

    onPlacesChanged = () => {
        if (this.map) {
            const destination = this.searchBoxTo.getPlaces();
            if (this.searchBoxFrom && destination) {
                // show Route connecting places
                const from = this.searchBoxFrom.getPlaces();
                if (from) {
                    this.setRoute(from[0], destination[0]);
                    return;
                }
            }
            if (destination) {
                this.setMarkers([destination[0]]);
            }
        }
    }

    setRoute = async (placesFrom, placesTo) => {
        this.directionsService.route({
            origin: placesFrom.formatted_address,
            destination: placesTo.formatted_address,
            travelMode: 'DRIVING'
        }, (result, status) => {
            const markers = [];
            let route = null;
            if (status === window.google.maps.DirectionsStatus.OK) {
                const myRoute = result.routes[0].legs[0];
                route = this.setPolyline(myRoute);
                markers.push({ lat: myRoute.steps[0].start_location.lat(), lng: myRoute.steps[0].start_location.lng() })
                markers.push({ lat: myRoute.steps[myRoute.steps.length - 1].start_location.lat(), lng: myRoute.steps[myRoute.steps.length - 1].start_location.lng() })
            } else {
                console.log('caught error while receeiving direction ');
                result = null;
            }
            this.setState({ markers: markers, route: route });
            this.setMarkers([placesFrom, placesTo])
        });
    }

    setMarkers = (places) => {
        const bounds = new window.google.maps.LatLngBounds();

        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
            } else {
                bounds.extend(place.geometry.location)
            }
        });
        const nextMarkers = places.map(place => ({
            lat: place.geometry.location.lat(), lng: place.geometry.location.lng()
        }));

        this.setState({
            markers: nextMarkers,
        });
        this.map.fitBounds(bounds);
    }

    setPolyline = (myRoute) => {
        const points = []
        for (let i = 0; i < myRoute.steps.length; i++) {
            for (let j = 0; j < myRoute.steps[i].lat_lngs.length; j++) {
                points.push(myRoute.steps[i].lat_lngs[j]);
            }
        }
        return points;
    }

    pathMouseOver = (event) => {
        console.log('path chosen')
    }
    render() {
        let count = 0;
        return (<GoogleMap
            ref={this.onMapMounted}
            defaultZoom={8}
            defaultCenter={{ lat: 18.5204, lng: 73.8567 }}
            defaultOptions={{ 
                styles: mapStyle,
                   // these following 7 options turn certain controls off see link below
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}>
            {/* <SearchBox
                ref={this.onSearchBoxMountedTo}
                controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={this.onPlacesChanged}>
                <input
                    type="text"
                    placeholder="Destination"
                    style={mapElements.searchBoxTo}
                />
            </SearchBox>
            <div className="fp-map-search-from-arrow" onClick={() => this.setState({ showSearchBoxFrom: !this.state.showSearchBoxFrom })}></div>
            {
                this.state.showSearchBoxFrom ?
                    <SearchBox
                        ref={this.onSearchBoxMountedFrom}
                        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                        onPlacesChanged={this.onPlacesChanged}>
                        <input
                            type="text"
                            placeholder="From"
                            style={mapElements.searchBoxFrom}
                        />
                    </SearchBox> : null
            } */}
            {
                this.state.markers && this.state.markers.map(marker => (
                    <Marker key={count++}
                        position={marker}
                    />
                ))
            }
            {this.state.route && (
                <Polyline
                    geodesic={true}
                    onMouseOver={this.pathMouseOver}
                    options={{ ...mapElements.polyline, path: this.state.route }}
                />
            )}
        </GoogleMap>)
    }
}

export default withScriptjs(withGoogleMap(props => {
    return (
        <Map parent={props} />
    )
}
));