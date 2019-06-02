import * as types from '../constants/actionTypes';
import { call, put, take, select, fork, } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { postReq } from '../utils/request'
import NavigationService from '../utils/navigationService'

function *login () {
  while (1) {
    const { payload } = yield take(types.LOGIN_SUBMIT_REQUEST)
    try {
      const data = yield call(postReq, { url: '/v1.0/auth/login', params: payload })
      if (data) {
        NavigationService.navigate('search')
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default function *() {
  yield fork(login);
}
