// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import Feed from '../Feed';
import { getFeed, updateActiveFeed } from '../../actions';


class Home extends React.Component {
  componentWillMount() {
    this.props.getFeed();
    this.props.updateActiveFeed({ feedId: this.props.feed[0].id, photoId: null, user: this.props.feed[0].user });
  }
  componentWillUnmount() {
    this.props.updateActiveFeed(null);
  }
  render() {
    return (
      <div>
        <div>
          {
            this.props.feed && this.props.feed.map(item => 
            <Feed 
            key={item.id}
            feedId={item.id}
            />)
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {

};

Home.defaultProps = {

};
const mapStateToProps = (state, ownProps) => ({
  feed: state.feed.all
})
export default connect(mapStateToProps, { getFeed, updateActiveFeed })(Home);
