import React from 'react';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import './styles.scss';

class MapMarkerClusterer extends MarkerClusterer {
    componentWillUpdate() {
        return this.props.markersUpdated;
    }
    render() {
        const { children } = this.props
        return <div>{children}</div>
    }
}
export default MapMarkerClusterer;
