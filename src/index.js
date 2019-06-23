import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import configureStore from './store';

import App from './components/App';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import BackgroundMap from './components/Maps/BackgroundMap';
import WindowEvents from './components/WindowEvents';
import DevTools from './components/DevTools';

import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faThumbsUp, faLaughBeam, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  faThumbsUp as faThumbsUpRegular,
  faShareSquare as faShareSquareRegular,
  faCommentAlt as faCommentAlt
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faHeart, faThumbsUp, faLaughBeam, faEllipsisH,
  faThumbsUpRegular, faShareSquareRegular, faCommentAlt
)


const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <App>
        <BackgroundMap />
        <Header />

          <Route exact path="/" component={Home} />
          <Route path="/:userName" component={Profile} />

        <WindowEvents />

        <DevTools />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
