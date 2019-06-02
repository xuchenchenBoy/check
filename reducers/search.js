import * as types from '../constants/actionTypes';

export function list (state = [], { type, payload }) {
  switch (type) {
    case types.SEARCH_GET_PLATE_SUC:
      return payload || [];
    case types.SEARCH_GET_PLATE_ERR:
      return []
    default:
      return state;
  }
}
