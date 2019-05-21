import * as types from '../constants/actionTypes';

export function lotteryInfo (state = {
  list: [],
  leftTime: 0,
  lotteryId: -1
}, { type, payload }) {
  switch (type) {
    case types.LOTTERY_INIT_SUCCESS:
      return state
    default:
      return state;
  }
}
