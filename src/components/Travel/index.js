import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import {fetchUserJourney, updateActiveFeed } from '../../actions';

class Travel extends React.Component {
    render = () => {
        return null;
    }
}

const mapStateToProps = (state, ownProps) => ({
    journey: state.feed.journey
});
export default connect(mapStateToProps, { fetchUserJourney, updateActiveFeed })(withRouter(Travel));
