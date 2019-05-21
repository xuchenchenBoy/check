import * as types from '../constants/actionTypes';
import { call, put, take, select, fork, } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

function *getInit ({payload}) {
  try {
    
  } catch (e) {
    console.log(e);
  }
}

export default function *() {
  yield takeLatest(types.LOTTERY_INIT_REQUEST, getInit);
}
