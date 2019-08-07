import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import configureStore from './store';

import App from './components/App';
import Header from './components/Header';
import Home from './components/Home';
import Journey from './components/Journey';
import Profile from './components/Profile';
import Search from './components/Search';
import Editor from './components/Editor';
import Live from './components/Live';
import BackgroundMap from './components/Maps/BackgroundMap';
import WindowEvents from './components/WindowEvents';
import DevTools from './components/DevTools';

import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faThumbsUp, faLaughBeam, faEllipsisH, faAngleLeft,
   faTimesCircle, faVideo, faCamera, faSearch, faGlobeAmericas, faArrowCircleRight, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faThumbsUp as faThumbsUpRegular,
  faShareSquare as faShareSquareRegular,
  faCommentAlt as faCommentAlt
} from '@fortawesome/free-regular-svg-icons';
import InterestedContainer from './components/InterestedContainer';

library.add(
  faHeart, faThumbsUp, faLaughBeam, faEllipsisH, faAngleLeft, faTimesCircle, faVideo, faCamera, faSearch, faGlobeAmericas,
  faArrowCircleRight,faChevronCircleRight, faChevronCircleLeft,

  faThumbsUpRegular, faShareSquareRegular, faCommentAlt
)


const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <App>
        <BackgroundMap />
        <Header />
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/journey/:place" component={Journey} />
          <Route exact path="/search/q" component={Search} />
          <Route exact path="/live" component={Live} />
          <Route exact path="/editor/:editorName" component={Editor} />
          <Route exact path="/profile/:userName" component={Profile} />
        <WindowEvents />
        <InterestedContainer />
        <DevTools />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
  // 101407193474
);
