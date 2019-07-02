import * as types from '../constants/actionTypes';
import { call, put, take, select, fork, } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { postReq } from '../utils/request'
import NavigationService from '../utils/navigationService'
import { storeData } from '../utils/storage'

function *login () {
  while (1) {
    const { payload } = yield take(types.LOGIN_SUBMIT_REQUEST)
    try {
      yield call(postReq, { url: '/v1.0/auth/login', params: payload })
      console.log(payload)
      const { username } = payload;
      yield storeData('username', username)
      NavigationService.replaceRouter('search')
    } catch (e) {
      console.log(e);
    }
  }
}

export default function *() {
  yield fork(login);
}
