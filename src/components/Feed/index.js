import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';
import Header from './Header';
import Description from './Description';
import TileLayout from './TileLayout';
import RelatedFeed from './RelatedFeed';
import BackArrow from '../BackArrow';
import MoreOptionIcon from '../MoreOptionIcon';
import Comment from './Comment';

import { getRelatedFeed } from '../../actions';

class Feed extends React.Component {
    state = {
        currentFeedId: -1,
        showingRelatedFeed: false
    }
    componentWillMount() {
        this.setState({ currentFeedId: this.props.feedId });
    }
    render = () => {
        const feed = this.props.feed.filter(item => item.id === this.state.currentFeedId)[0];
        if (!feed) {
            return null;
        }
        return (
            <div className="fp-feed">
                {/* <div className={this.props.feedId !== this.state.currentFeedId ? 'fp-feed-back-arrow fp-position-relative': 'fp-display-none'}>
                <BackArrow back={() => this.setState({currentFeedId: this.props.feedId})}/>
                </div> */}
                <Header user={feed.user} date={feed.date} />
                <Description description={feed.description} />
                {
                    !this.state.showingRelatedFeed &&
                    <div className='fp-position-relative' style={{ top: '-7px', left: '11px' }}>
                        <MoreOptionIcon onClick={() => {
                            this.props.getRelatedFeed(this.props.feedId)
                            this.setState({ showingRelatedFeed: true })
                        }}
                            icon={['fas', 'angle-left']}
                        />
                    </div>
                }
                <TileLayout
                    fotos={feed.fotos}
                    videos={feed.videos}
                    feedId={feed.id}
                    user={feed.user} />
                <RelatedFeed feedId={this.props.feedId} showFeed={(feedId) => this.setState({ currentFeedId: feedId })}
                    isVisible={this.state.showingRelatedFeed}
                    close={() => this.setState({ currentFeedId: this.props.feedId, showingRelatedFeed: false })}
                />
                <Comment />
            </div>
        )
    }
}
Feed.propTypes = {
    feedId: PropTypes.string.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
    feed: state.feed.all
})
export default connect(mapStateToProps, { getRelatedFeed })(Feed);