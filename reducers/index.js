import { combineReducers } from 'redux';
import * as checkpoint from './checkpoint'

export default combineReducers({
  checkpoint: combineReducers(checkpoint),
})
