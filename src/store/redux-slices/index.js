import { combineReducers } from '@reduxjs/toolkit'

import ticketReducer from './tickets'

const appReducer = combineReducers({
  tickets: ticketReducer
})

export default appReducer
