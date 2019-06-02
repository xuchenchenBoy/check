import { fork } from 'redux-saga/effects';
import login from './login'

export default function* () {
  yield fork(login)
   
  
}
