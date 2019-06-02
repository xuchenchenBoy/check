import { fork } from 'redux-saga/effects';
import login from './login'
import checkpoint from './checkpoint'

export default function* () {
  yield fork(checkpoint)
  yield fork(login)
   
  
}
