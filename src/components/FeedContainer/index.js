// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import throttle from 'lodash.throttle';
import Feed from '../Feed';
import RelatedFeed from '../RelatedFeed';
import { updateActiveFeed, fetchRelatedUserFeedList, fetchRelatedUserFeed, updateMap } from '../../actions';
import { MOOD } from '../../constants';
import './styles.scss';

class FeedContainer extends React.Component {
    relatedFeedListTimeout = null;
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }
    reset() {
        this.clearTimeout();
        this.props.updateActiveFeed(null);
        this.props.fetchRelatedUserFeedList({ userId: null, feedId: null });
        this.props.fetchRelatedUserFeed({userId: null, feedId: null, originalFeedId: null});
    }
    getUpdates = () => {
        // TODO: scroll above the window like instagram to fetch latest feed/journey/profile updates
        // tell home component to forward the latest updates
        this.props.getUpdates();
    }

    componentWillMount() {
        // TODO: get logged in UserId
        this.throttle = throttle(this.scroll, 200, { leading: false, trailing: true });
        window.addEventListener('scroll', this.throttle);
        this.reset();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.throttle);
        this.reset();
    }
    clearTimeout() {
        if (this.relatedFeedListTimeout) {
            window.clearTimeout(this.relatedFeedListTimeout);
            this.relatedFeedListTimeout = 0;
        }
    }
    scroll = event => {
        this.reset();
        let feed = this.selectFeed();
        if (!feed || !this.containerRef.current) {
            return;
        }
        const indexId = this.containerRef.current.scrollHeight ? parseInt(window.scrollY * feed.length / this.containerRef.current.scrollHeight, 10) : 0;
        feed = feed[indexId];
        if (!this.props.activeFeed || (this.props.activeFeed && this.props.activeFeed.id !== feed.id)) {
            this.props.updateActiveFeed({ ...feed })
        }

        this.relatedFeedTimeout = setTimeout(() => {
            // TODO: depending on the time wait on feed, fetch the related feeds
            this.props.fetchRelatedUserFeedList({ userId: 'abc123', feedId: feed.id });
        }, 3000)
    }
    selectFeed = () => {
        return this.props.mood === MOOD.FEED ? this.props.all : this.props.travel;
    }
    shouldComponentUpdate(nextProps) {
        if(nextProps.mood !== this.props.mood) {
            this.reset();
        }
        return true;
    }
    render() {
        // chooseFeed is expensive operation. also called inside scroll function. Need to replace with less expensive operation
        let feed = this.selectFeed()
        console.log('feed ', feed)
        // TODO: substitute with other logic. can end in infinite loop for render
        if (feed) {
            if (this.props.relatedFeed && this.props.relatedFeed.id
                && this.props.activeFeed && this.props.activeFeed.id
                && this.props.relatedFeed.id !== this.props.activeFeed.id) {
                this.props.updateActiveFeed(this.props.relatedFeed)
            } else if (!this.props.activeFeed) {
                this.scroll();
            }
        }
        return (
            <div ref={this.containerRef}>
                <Link to='/journey/top?from=Pune'>Go</Link>
                <Link to='/'>There</Link>
                {
                    feed && feed.map((data, index) => {
                        const isRelatedFeed = this.props.relatedFeed && this.props.relatedFeed.feedId === data.id;
                        const item = isRelatedFeed ? this.props.relatedFeed : data;
                        return (
                            <Feed
                                key={isRelatedFeed ? `related${item.id}${item.fotoId}` : item.id}
                                isRelatedFeed={isRelatedFeed}
                                feed={item}
                                closeRelatedFeed={() => this.props.fetchRelatedUserFeed({ userId: null, fotoId: null, feedId: null, originalFeedId: null })}
                                updateImageIndex={(id) => this.props.updateActiveFeed({ ...this.selectFeed(), imageIndex: id })}
                            />
                        )
                    })
                }
                {/* TODO: for now the related feed is very specific to the feedId. But the related feed should be according to
        userId, feedId, locationId: {globe}, context of fotos i.e. locationId: {local}  */}
                <div className='fp-c-feed-container__related-feed'>
                    {
                        feed && <RelatedFeed feed={this.props.relatedFeedList}
                            showRelatedFeed={(fotoId, relatedFeedId, originalFeedId) => this.props.fetchRelatedUserFeed({ userId: 'abc123', fotoId: fotoId, feedId: relatedFeedId, originalFeedId: originalFeedId })} />
                    }
                </div>
            </div>
        );
    }
}

FeedContainer.propTypes = {

};

FeedContainer.defaultProps = {

};
// TODO: create selector for all and travel
const mapStateToProps = (state, ownProps) => ({
    currentUserId: state.auth.currentUserId,
    relatedFeedList: state.feed.relatedFeedList,
    relatedFeed: state.feed.relatedFeed,
    activeFeed: state.feed.activeFeed,
    mood: state.ui.headerActions.mood,
    all: state.feed.all,
    travel: state.feed.travel
})
export default connect(mapStateToProps, { fetchRelatedUserFeedList, fetchRelatedUserFeed, updateActiveFeed, updateMap })(withRouter(FeedContainer));
