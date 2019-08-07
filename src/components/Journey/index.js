import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchUserJourney, updateActiveFeed, updateMap} from '../../actions';
import { TOP_JOURNEY, FOTO_CATEGORY } from '../../constants';
import { showJourney } from '../Home/journey.function';
import ImageGallery from 'react-image-gallery';
import JourneyContainer from '../JourneyContainer';
import './styles.scss';

class Journey extends React.Component {
    state = {
        selectedIndex: TOP_JOURNEY
    }
    componentWillMount() {
        this.props.fetchUserJourney({ userId: 'abc123', search: this.props.location.search });
        this.props.updateMap({isFullLayout: true})
        this.unlisten = this.props.history.listen((location, action) => {
            this.props.fetchUserJourney({ userId: 'abc123', search: location.search });
            this.props.updateMap({isFullLayout: true})
        });
    }
    componentWillUnmount() {
        this.unlisten();
        this.props.updateMap({isFullLayout: false});
    }
    render = () => {
        const journey = showJourney(this.props.journey, this.state.selectedIndex, FOTO_CATEGORY.PLACE)
        const images = [];
        if (journey) {
            journey.fotos.forEach(item => images.push({ original: item.foto, thumbnail: item.foto }))
        }
        const feed = this.props.journey ? this.props.journey.feed : null;
        return (
            <React.Fragment>
            <div className='fp-c-journey'>
                <ImageGallery items={images} thumbnailPosition='bottom' showPlayButton={false}/>
            </div>
            <div className='fp-c-journey__journies'>
                <JourneyContainer journies={feed} selectedIndex={this.state.selectedIndex}
                    onSelectedIndexChange={(index) => this.setState({ selectedIndex: index })} />
            </div>
            </React.Fragment>
          );
    }
}

const mapStateToProps = (state, ownProps) => ({
    journey: state.feed.journey
});
export default connect(mapStateToProps, { fetchUserJourney, updateActiveFeed, updateMap })(withRouter(Journey));
