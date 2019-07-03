import * as types from '../constants/actionTypes';

export function list (state = [], { type, payload }) {
  switch (type) {
    case types.SEARCH_GET_PLATE_SUC:
      return payload || [];
    case types.SEARCH_GET_PLATE_ERR:
    case types.RESET_PLATE_LIST:
      return []
    default:
      return state;
  }
}

export function loading(state = false, { type, payload }) {
  switch (type) {
    case types.SEARCH_GET_PLATE_REQ:
      return true;
    case types.SEARCH_GET_PLATE_SUC:
      return false;
    case types.SEARCH_GET_PLATE_ERR:
      return false;
    default:
      return state;
  }
}

export function hadReqList(state = false, { type, payload }) {
  switch (type) {
    case types.SEARCH_GET_PLATE_REQ:
      return true;
    default:
      return state;
  }
}