import * as types from '../constants/actionTypes';
import { call, put, take, select, fork, } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { postReq, getReq, } from '../utils/request'
import NavigationService from '../utils/navigationService'
import { Toast } from '@ant-design/react-native';

function *getList () {
  while (1) {
    const { payload } = yield take(types.CHECKPOINT_GET_LIST_REQ)
    try {
      const data = yield call(getReq, { url: '/v1.0/gate/status', params: payload })
      yield put({ type: types.CHECKPOINT_GET_LIST_SUC, payload: data })
    } catch (e) {
      yield put({ type: types.CHECKPOINT_GET_LIST_ERR })
      console.log(e);
    }
  }
}

function *openPoint() {
  while (1) {
    const { payload } = yield take(types.CHECKPOINT_OPEN_REQ)
    try {
      yield call(getReq, { url: '/v1.0/gate/open', params: payload })
      Toast.success('开闸成功', 1, () => {}, false)
      yield put({ type: types.CHECKPOINT_GET_LIST_REQ })
    } catch (e) {
      console.log(e);
    }
  }
}

function *restorePoint() {
  while (1) {
    const { payload } = yield take(types.CHECKPOINT_RESTORE_REQ)
    try {
      yield call(postReq, { url: '/v1.0/gate/gate-recover', params: payload })
      Toast.success('恢复成功', 1, () => {}, false)
      yield put({ type: types.CHECKPOINT_GET_LIST_REQ })
    } catch (e) {
      console.log(e);
    }
  }
}

function *closePoint() {
  while (1) {
    const { payload } = yield take(types.CHECKPOINT_CLOSE_REQ)
    try {
      yield call(postReq, { url: '/v1.0/gate/gate-close', params: payload })
      Toast.success('锁定成功', 1, () => {}, false)
      yield put({ type: types.CHECKPOINT_GET_LIST_REQ })
    } catch (e) {
      console.log(e);
    }
  }
}

export default function *() {
  yield fork(getList);
  yield fork(openPoint);
  yield fork(restorePoint);
  yield fork(closePoint);
}
