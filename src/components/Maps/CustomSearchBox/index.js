// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import SquareLogo from '../../SquareLogo';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as API from '../../../utils/API.utils';
import { updateMap } from '../../../actions';
import { TOP_JOURNEY } from '../../../constants';

class CustomSearchBox extends React.Component {
    state = {
        searchJourney: false
    }
    from = () => {
        this.fromPlace = this.fromSearchBox.getPlaces()[0];
    }
    to = () => {
        this.toPlace = this.toSearchBox.getPlaces()[0];
    }
    searchJourney = async () => {
        if(!this.fromPlace && !this.toPlace) {
            return;
        }
        let markers = [];
        let polyline = null;
        if(this.fromPlace && this.toPlace) {
            try{
                const result = await API.fetchGoogleMapRoute({ 
                    from: this.fromPlace.formatted_address,
                    to: this.toPlace.formatted_address
                });
                if (result.status === window.google.maps.DirectionsStatus.OK) {
                    const myRoute = result.routes[0].legs[0];
                    polyline = this.setPolyline(myRoute);
                    markers.push(new window.google.maps.LatLng(myRoute.steps[0].start_location.lat(), myRoute.steps[0].start_location.lng()));
                    markers.push(new window.google.maps.LatLng(myRoute.steps[myRoute.steps.length - 1].start_location.lat(), myRoute.steps[myRoute.steps.length - 1].start_location.lng()));
                } else {
                    result = null;
                }
                this.props.updateMap({route: { polyline, markers }})
                // this.props.history.push(`/search/journey?from=${this.fromPlace.formatted_address}&to=${this.toPlace.formatted_address}`)
                this.props.history.push(`/home/journey/${TOP_JOURNEY}?from=${this.fromPlace.formatted_address}&to=${this.toPlace.formatted_address}`)
            } catch(error) {
                console.log(error)
            }
            return;
        }

        const place = this.fromPlace || this.toPlace;
        markers.push(new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()));
        this.props.updateMap({route: { markers }});
        // this.props.history.push(`/search/journey?place=${place.formatted_address}`)
        this.props.history.push(`/home/journey/${TOP_JOURNEY}?place=${place.formatted_address}`)
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

        return nextMarkers;
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
    render() {
        return (
            <div className='fp-c-custom-search'>
                <div className='fp-c-custom-search__globe-logo'>
                <SquareLogo icon={this.state.searchJourney ? ['fas', 'search']: ['fas', 'globe-americas']} searchJourney={() => this.setState({ searchJourney: !this.state.searchJourney })} />
                </div>
                {/* <div className='fp-c-custom-search__search-box'> */}
                    {
                        this.state.searchJourney ?
                            // <React.Fragment>
                            <div className='fp-c-custom-search__search-box'>
                                <input
                                    ref={(c) => {
                                        if (!c || !window.google) {
                                            return;
                                        }
                                        this.fromSearchBox = new window.google.maps.places.SearchBox(c, { types: ['geocode'] });
                                        this.fromSearchBox.addListener('places_changed', this.from)
                                    }}
                                    placeholder="From..."
                                    type="text"
                                    className='fp-c-custom-search__search-box--map'
                                    onChange={() => this.fromPlace = null}
                                />
                                <input
                                    ref={(c) => {
                                        if (!c || !window.google) {
                                            return;
                                        }
                                        this.toSearchBox = new window.google.maps.places.SearchBox(c, { types: ['geocode'] });
                                        this.toSearchBox.addListener('places_changed', this.to)
                                    }}
                                    placeholder="To..."
                                    type="text"
                                    className='fp-c-custom-search__search-box--map'
                                    onChange={() => this.toPlace = null}
                                />
                                <FontAwesomeIcon onClick={this.searchJourney} icon={['fas', 'arrow-circle-right']} color={'#29487d'} />
                            {/* // </React.Fragment> */}
                            </div>
                            :
                            <div className='fp-c-custom-search__search-box'>
                            <input className='fp-c-custom-search__search-box--generic'
                                placeholder='Search' />
                        {/* // onKeyPress={e => e.key === 'Enter' && updateSearchInput(`/search/${e.target.value}`)} /> */}
                        </div>
                    }
                {/* </div> */}
            </div>
        )
    }
}

CustomSearchBox.propTypes = {
};

CustomSearchBox.defaultProps = {

};
const mapStateToProps = (state, ownProps) => ({

})
export default connect(null, { updateMap })(withRouter(CustomSearchBox));
