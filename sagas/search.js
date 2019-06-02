import * as types from '../constants/actionTypes';
import { call, put, take, select, fork, } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { postReq, getReq } from '../utils/request'
import NavigationService from '../utils/navigationService'

function *handleSearch () {
  while (1) {
    const { payload } = yield take(types.SEARCH_GET_PLATE_REQ)
    try {
      const data = yield call(getReq, { url: '/v1.0/management/permits', params: payload })
      const { permits = [] } = data;
      yield put({ type: types.SEARCH_GET_PLATE_SUC, payload: permits || [] })
    } catch (e) {
      yield put({ type: types.SEARCH_GET_PLATE_ERR })
      console.log(e);
    }
  }
}

export default function *() {
  yield fork(handleSearch);
}
