// eslint-disable-next-line no-unused-vars
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import { currentUserSelector } from '../../reducers/auth.reducer';
import { updateMap, changeMood, fetchUserTravel, fetchUserFeed, } from '../../actions';

import HeaderAction from '../HeaderAction';
import Flyout from '../Flyout';
import HeaderDivider from '../HeaderDivider';
import HeaderLink from '../HeaderLink';
import MaxWidthWrapper from '../MaxWidthWrapper';

import styles from './styles';
import CustomSearchBox from '../Maps/CustomSearchBox';
import { MOOD, WEATHER } from '../../constants';
import './styles.scss';
import StatusContainer from '../StatusContainer';

class Header extends React.Component {
  updateMood = (mood) => {
    switch(mood) {
      case MOOD.FOOD:
        this.props.history.push('/food');
        break;
      case MOOD.LIVE:
        this.props.history.push('/live');
        break;
      default:
        if(mood === MOOD.TRAVEL) {
          this.props.fetchUserTravel(this.props.currentUserId)
        } else {
          this.props.fetchUserFeed(this.props.currentUserId)
        }
        this.props.history.push('/feed');
        break;
    }
    this.props.changeMood(mood);
  }
  render() {
    let {
      activeFlyout,
      currentUser,
      toggleFlyout,
    } = this.props;
    let headerNavigation;
    // let [searchInput, updateSearchInput] = useState('');
    if (currentUser) {
      headerNavigation = (
        <div className={css(styles.headerNavigation)}>
          <div className={css(styles.headerNavigationChunk)}>
            <HeaderLink
              to={`/${currentUser.userName}`}
              label={currentUser.firstName}
              imageSrc={currentUser.profilePhoto}
            />
            <HeaderDivider />
            <HeaderLink to="/" label="Home" />
          </div>

          <div className={css(styles.headerNavigationChunk)}>
            <HeaderAction actionName="friends" />
            <HeaderAction actionName="messages" />
            <HeaderAction actionName="notifications" />
          </div>
        </div>
      )
    }
    return (
      <div className={css(styles.headerContainer)}>
        <div className={css(styles.header)}>
          <MaxWidthWrapper mergeStyles={styles.headerContents}>
            {/* <div onClick={() => this.props.history.push('/live')} className='fp-c-header__live'>
              <img src={LIVE}/>
            </div> */}
            <CustomSearchBox changeMood={this.props.changeMood}/>
            <StatusContainer 
            onChange={this.updateMood}
            mood={this.props.mood} weather={WEATHER.RAIN}/>
            {/* <div className={css(styles.headerSearch)}>
              <SquareLogo mergeStyles={styles.logo} searchJourney={() => this.setState({searchJourney: true})} />
              <div className='fp-c-header__search-box'>
              {
                this.state.searchJourney ? 
                <CustomSearchBox /> :
                <input className='fp-c-header__search-box--generic'
                placeholder='Search' />
                // onKeyPress={e => e.key === 'Enter' && updateSearchInput(`/search/${e.target.value}`)} />
              }
              </div>
            </div> */}

            {headerNavigation}

            {activeFlyout && <Flyout />}
          </MaxWidthWrapper>
        </div>
        {/* {searchInput && <Redirect to={searchInput} />} */}
      </div>
    );
  }
};

Header.propTypes = {
  activeFlyout: PropTypes.string,
  currentUser: PropTypes.shape({
    userName: PropTypes.string,
    firstName: PropTypes.string,
    profilePhoto: PropTypes.string,
  }),
};


const mapStateToProps = state => ({
  currentUserId: state.auth.currentUserId,
  activeFlyout: state.ui.headerActions.activeFlyout,
  mood: state.ui.headerActions.mood,
  currentUser: currentUserSelector(state)
});

export default connect(mapStateToProps, { updateMap, changeMood, fetchUserTravel, fetchUserFeed, })(withRouter(Header));
