import { all } from 'redux-saga/effects';
import profileSaga from './profile.saga';
import authSaga from './auth.saga';
import feedSaga from './feed.saga';
import journeySaga from './journey.saga';
import travelSaga from './travel.saga';

export default function* rootSaga() {
    yield all([...authSaga(), ...profileSaga(), ...feedSaga(), ...journeySaga(), ...travelSaga()])
  }