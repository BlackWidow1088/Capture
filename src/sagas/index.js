import { all, take, call, put, fork, select, takeEvery, takeLatest } from 'redux-saga/effects';
import profileSaga from './profile.saga';
import authSaga from './auth.saga';
import feedSaga from './feed.saga';
import journeySaga from './journey.saga';

export default function* rootSaga() {
    yield all([...authSaga(), ...profileSaga(), ...feedSaga(), ...journeySaga()])
  }