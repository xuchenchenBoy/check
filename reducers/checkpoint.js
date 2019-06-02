import * as types from '../constants/actionTypes';

export function list (state = [], { type, payload }) {
  switch (type) {
    case types.CHECKPOINT_GET_LIST_SUC:
      return payload || [];
    case types.CHECKPOINT_GET_LIST_ERR:
      return []
    default:
      return state;
  }
}
