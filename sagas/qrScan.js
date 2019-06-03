import * as types from '../constants/actionTypes';
import { call, put, take, select, fork, } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { postReq, getReq } from '../utils/request'
import NavigationService from '../utils/navigationService'
import { BASE_URL } from '../utils/index'

function *checkEncrypt () {
  while (1) {
    const { payload } = yield take(types.QRSCAN_CHECK_ENCRYPT_REQ)
    try {
      const data = yield call(postReq, { url: '/v1.0/management/encrypt', params: payload })
      yield put({ type: types.QRSCAN_CHECK_ENCRYPT_SUC })
      const { id, plate_number, permit_number, phone } = data;
      NavigationService.navigate('webContainer', {
        url: `${BASE_URL}/index.html#/permit?id=${id}&plate_number=${ plate_number }&permit_number=${ permit_number }&phone=${phone}`
      })
    } catch (e) {
      yield put({ type: types.QRSCAN_CHECK_ENCRYPT_ERR })
      console.log(e);
    }
  }
}

export default function *() {
  yield fork(checkEncrypt);
}
