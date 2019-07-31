// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logInRequest, fetchUserFeed } from '../../actions';


class App extends Component {
  componentDidMount() {
    // We're going to assume, for simplicity, that the user's auth
    // token was persisted in localStorage, and this is a returning visit.
    // In the future, it may be nice to add a "logged out" state, but
    // it's a lot of additional but straightforward complexity. It
    // doesn't seem like the best use of my time.

    // This is what it would be in a real app:
    // const authToken = localStorage.getItem('fb__auth_token');
    const authToken = 'abc123';

    if (authToken) {
      this.props.logInRequest({ authToken });
    }
  }

  render() {
    // TODO: fetch the feed inside the route validator for the home page.
    if(this.props.currentUserId) {
      this.props.fetchUserFeed(this.props.currentUserId);
    }
    return (
      <div> 
        {this.props.children}
      </div>
    );
  }
};

App.propTypes = {
  children: PropTypes.node,
};
const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.auth.currentUserId
})

export default connect(mapStateToProps, { logInRequest, fetchUserFeed })(App);
