import { combineReducers } from 'redux';
import * as checkpoint from './checkpoint'
import * as search from './search'

export default combineReducers({
  checkpoint: combineReducers(checkpoint),
  search: combineReducers(search),
})
