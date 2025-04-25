import { createSlice } from '@reduxjs/toolkit'

const {
  actions: {
    getAllTicketsStart,
    getAllTicketsComplete,

    addTicketsStart,
    addTicketsComplete,

    updateTicketStart,
    updateTicketComplete,

    deleteTicketStart,
    deleteTicketComplete
  },
  reducer
} = createSlice({
  name: 'tickets',
  initialState: {
    loading: false,
    allTickets: {}
  },
  reducers: {
    getAllTicketsStart: (state) => ({
      ...state,
      loading: true
    }),
    getAllTicketsComplete: (state, { payload }) => ({
      ...state,
      loading: false,
      allTickets: payload
    }),

    addTicketsStart: (state) => ({
      ...state,
    }),
    addTicketsComplete: (state) => ({
      ...state,
    }),

    updateTicketStart: (state) => ({
      ...state,
    }),
    updateTicketComplete: (state) => ({
      ...state,
    }),

    deleteTicketStart: (state) => ({
      ...state,
    }),
    deleteTicketComplete: (state) => ({
      ...state,
    })
  }
})

export default reducer

export {
  getAllTicketsStart,
  getAllTicketsComplete,

  addTicketsStart,
  addTicketsComplete,

  updateTicketStart,
  updateTicketComplete,

  deleteTicketStart,
  deleteTicketComplete
}
