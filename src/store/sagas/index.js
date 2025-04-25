import { spawn } from 'redux-saga/effects'
import ticketsWatcher from './tickets'

export default function * rootSaga () {
  yield spawn(ticketsWatcher)
}
