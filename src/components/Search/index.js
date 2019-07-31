import React from 'react';
import { connect } from 'react-redux';
import ProfileLink from './ProfileLink';
import Feed from '../Feed';
import UserHeader from '../UserHeader';
import './styles.scss';

import { updateMap, updateActiveFeed } from '../../actions';
import * as API from '../../utils/API.utils';
const TOP_FEED = 'TOP_FEED';
class Search extends React.Component {
    state = {
        selectedIndex: TOP_FEED,
        showFood: false,
        feed: null
    }
    // TODO: not all considitions handled 
    fetchRoute = async () => {
        let places = this.props.location.search.split('&');
        const fetchPlaces = [];
        places.forEach(place => fetchPlaces.push(place.split('=')[1]))
        try {
            const result = await API.fetchFeedForPlaces(fetchPlaces);
            this.setState({ feed: result });
            console.log('result ', result)
        } catch (error) {
            console.log(error)
        }
    }
    showJourney = () => {
        let feed = null;
        if (!(this.state.feed && this.state.feed.default && this.state.feed.default.length)) {
            return feed;
        }
        switch (this.state.selectedIndex) {
            case TOP_FEED:
                if (this.state.showFood) {
                    feed = {
                        id: this.state.feed.top.id,
                        user: this.state.feed.top.user,
                        fotos: this.state.feed.top.combinedFood.length >= 10 ? this.state.feed.top.combinedFood.slice(0, 11) : this.state.feed.top.combinedFood 
                    }
                    this.props.updateActiveFeed(feed)
                    break;
                }
                feed = {
                    id: this.state.feed.top.id,
                    user: this.state.feed.top.user,
                    fotos: this.state.feed.top.combined.length >= 10 ? this.state.feed.top.combined.slice(0, 11): this.state.feed.top.combined
                }
                this.props.updateActiveFeed(feed);
                break;
            default:
                feed = this.state.feed.default[this.state.selectedIndex]
                this.props.updateActiveFeed(feed);
                break;
        }
        return feed;
    }
    componentWillMount() {
        this.props.updateMap({ isFullLayout: true })
        this.fetchRoute();

        // this.props.searchFeed({
        //     start: {
        //         name: 'Pittsburgh',
        //         lat: 40.4312839,
        //         lng: -80.1205845
        //     },
        //     dest: {
        //         name: 'NewYork',
        //         lat: 40.6971494,
        //         lng: -74.2598661
        //     }
        // });
    }
    componentWillUnmount() {
        this.props.updateMap({ isFullLayout: false })
    }
    render = () => {
        const feed = this.showJourney();
        // return null;
        // let journey = this.props.journey && this.props.journey.journey;
        // console.log('journey', journey);
        // if (!journey) return null;
        // let { combined, combinedFood } = this.makeGeneralJourney(journey);
        return (
            <div className='fp-l-position--relative'>
                <div className='fp-c-search-sidebar--primary'>
                    {/* <ProfileLink key='app' category={this.showCategory} user={null} all={combined} food={combinedFood} />
                    {
                        journey.filter(item => !item.solo).map(user => (
                            <ProfileLink key={user.user.uid} category={this.showCategory} user={user.user} all={user.fotos} food={user.fotos.filter(foto => foto.category === categories.food)} />
                        ))
                    } */}
                    {
                        feed && 
                        <UserHeader user={feed.user} date={feed.date} />
                    }
                    <div className='fp-c-search__image-container'>
                    {
                        
                        feed && feed.fotos && feed.fotos.length &&
                        feed.fotos.filter(item => item.category === 'place').map(foto => 
                                <img key={foto.fotoId} src={foto.foto} className='fp-c-card fp-c-search__image'/>
                             )
                    //     <Feed
                    //     key={feed.id}
                    //     isActiveFeed={true}
                    //     isRelatedFeed={false}
                    //     feed={feed}
                    //     closeRelatedFeed={null}
                    //   />
                    }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
})
export default connect(null, { updateMap, updateActiveFeed })(Search);