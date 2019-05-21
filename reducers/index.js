import { combineReducers } from 'redux';
import * as init from './init'

export default combineReducers({
  init: combineReducers(init),
})
