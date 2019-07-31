// eslint-disable-next-line no-unused-vars
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import { currentUserSelector } from '../../reducers/auth.reducer';
import { updateMap } from '../../actions';

import HeaderAction from '../HeaderAction';
import Flyout from '../Flyout';
import HeaderDivider from '../HeaderDivider';
import HeaderLink from '../HeaderLink';
import MaxWidthWrapper from '../MaxWidthWrapper';

import styles from './styles';
import CustomSearchBox from '../Maps/CustomSearchBox';

class Header extends React.Component {
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
            <CustomSearchBox />
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
  activeFlyout: state.ui.headerActions.activeFlyout,
  currentUser: currentUserSelector(state)
});

export default connect(mapStateToProps, { updateMap })(Header);
