import { combineReducers } from 'redux';
import * as checkpoint from './checkpoint'
import * as search from './search'
import * as qrScan from './qrScan'

export default combineReducers({
  checkpoint: combineReducers(checkpoint),
  search: combineReducers(search),
  qrScan: combineReducers(qrScan),
})
