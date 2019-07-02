
import { combineReducers } from 'redux';
import {
    UPDATE_ACTIVE_FEED, GET_FEED, GET_RELATED_FEED
} from '../actions';
import { getFotoDetails } from '../utils/scrap.utils';
import feedStub from '../stubs/feed';
import relatedFeedStub from '../stubs/related_feed';

const loadFeed = () => {
    feedStub.forEach(item => item.fotos = item.fotos.map(foto => getFotoDetails(foto)));
    return feedStub;
}
const initialState = {
    all: loadFeed(),
    activeFeed: null,
    relatedFeed: [],
    loading: false
};
// ////////////////////
// Reducers //////////
// //////////////////
function all(state = initialState.all, action) {
    switch (action.type) {
        case GET_FEED:
            return state
        default:
            return state
    }
}
function activeFeed(state = initialState.activeFeed, action) {
    switch (action.type) {
        case UPDATE_ACTIVE_FEED:
            return action.payload;

        default:
            return state;
    }
}

function relatedFeed(state = initialState.relatedFeed, action) {
    switch(action.type) {
        case GET_RELATED_FEED:
            return relatedFeedStub;
        default:
            return state;
    }
}

export default combineReducers({
    all,
    activeFeed,
    relatedFeed
});


// ////////////////////
// Selectors //////////
// //////////////////