import * as types from '../constants/actionTypes';

export function reactivate (state = true, { type, payload }) {
  switch (type) {
    case types.QRSCAN_CHECK_ENCRYPT_REQ:
      return false;
    case types.QRSCAN_CHECK_ENCRYPT_SUC:
      return true;
    case types.QRSCAN_CHECK_ENCRYPT_ERR:
      return true
    default:
      return state;
  }
}
