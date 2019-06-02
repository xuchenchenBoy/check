import { fork } from 'redux-saga/effects';
import login from './login'
import checkpoint from './checkpoint'
import search from './search'

export default function* () {
  yield fork(checkpoint)
  yield fork(login)
  yield fork(search)
   
  
}
