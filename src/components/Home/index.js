// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchUserFeed, fetchUserJourney, updateActiveFeed, fetchRelatedUserFeedList, fetchRelatedUserFeed, updateMap } from '../../actions';
import './styles.scss';
import { TOP_JOURNEY, journeyPathName, FOTO_CATEGORY } from '../../constants';
import { showJourney } from './journey.function';
import FeedContainer from '../FeedContainer';
import StoryContainer from '../StoryContainer';
import JourneyContainer from '../JourneyContainer';

class Home extends React.Component {
  state = {
    showJourney: false,
    showStory: false,
    selectedIndex: TOP_JOURNEY
  }
  chooseFeed = () => {
    let result = this.state.showJourney ? showJourney(this.props.journey, this.state.selectedIndex, FOTO_CATEGORY.PLACE) : this.props.all;
    if (!result) {
      return null;
    }
    result = result.filter(item => item !== null);
    return result.length > 0 ? result : null;
  }
  refreshFeed = () => {
    // TODO: scroll above the window like instagram to fetch latest feed/journey/profile update for the user
    this.props.fetchUserFeed('abc123');
  }

  componentWillMount() {
    // TODO: need to redirect to '/' if the route contains any other route
    if (this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
    }
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.updateActiveFeed(null);
      // this.props.updateMap({ isHidden: true });
      this.props.fetchRelatedUserFeed({ userId: null, feedId: null, originalFeedId: null });
      this.props.fetchRelatedUserFeedList({ userId: null, feedId: null });
      if (this.props.history.location.pathname.includes(journeyPathName)) {
        this.props.fetchUserJourney({ userId: 'abc123', search: location.search });
        this.setState({ showJourney: true, selectedIndex: TOP_JOURNEY });
        console.log('show Journey ', this.state.showJourney);
      } else {
        this.props.fetchUserFeed('abc123');
        this.setState({ showJourney: false, selectedIndex: TOP_JOURNEY });
      }
    })
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <React.Fragment>
        { (this.state.showJourney || this.state.showStory) &&
          <div className='fp-c-card fp-c-feed-container__story-journey-container'>
            {
              this.state.showStory &&
              <StoryContainer />
            }
            {
              this.state.showJourney &&
              <JourneyContainer journies={this.props.journey ? this.props.journey.feed : null} selectedIndex={this.state.selectedIndex}
                onSelectedIndexChange={(index) => this.setState({ showJourney: true, selectedIndex: index })} />
            }
          </div>
        }
        <FeedContainer
          getUpdates={this.refreshFeed}
          feed={this.chooseFeed()}
        />
      </React.Fragment>
    );
  }
}

Home.propTypes = {

};

Home.defaultProps = {

};
const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.auth.currentUserId,
  all: state.feed.all,
  journey: state.feed.journey
});
export default connect(mapStateToProps, { fetchUserFeed, fetchUserJourney, updateActiveFeed, fetchRelatedUserFeedList, fetchRelatedUserFeed, updateMap })(withRouter(Home));
