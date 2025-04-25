import { takeLatest, put } from 'redux-saga/effects'
import {
  getTickets,
  addTickets,
  updateTicket,
  deleteTicket
} from '../../utils/apiCalls'

import {
  getAllTicketsStart,
  getAllTicketsComplete,

  addTicketsStart,
  addTicketsComplete,

  updateTicketStart,
  updateTicketComplete,

  deleteTicketStart,
  deleteTicketComplete
} from '../redux-slices/tickets'

import { toast } from '../../components/Toast'

// Root saga watcher: watches for dispatched actions and triggers the corresponding worker saga
export default function* ticketsWatcher() {
  yield takeLatest(getAllTicketsStart.type, getAllTicketsWorker)
  yield takeLatest(addTicketsStart.type, addTicketsWorker)
  yield takeLatest(updateTicketStart.type, updateTicketWorker)
  yield takeLatest(deleteTicketStart.type, deleteTicketWorker)
}

// Worker saga: Handles fetching all tickets
function* getAllTicketsWorker(action) {
  try {
    const { userId } = action && action.payload

    // Call API to get tickets for the given user
    const { data } = yield getTickets({ userId })

    // Dispatch complete action with the fetched data
    yield put(getAllTicketsComplete(data))
  } catch (e) {
    // Show error toast and dispatch complete with empty data on failure
    yield toast('Something went wrong!', 'error')
    yield put(getAllTicketsComplete({}))
  }
}

function* addTicketsWorker(action) {
  try {
    const { data, setColumns } = action && action.payload

    const { data: resData } = yield addTickets(data)

    yield setColumns(prev => ({
      ...prev,
      todo: {
        ...prev.todo,
        tasks: [resData, ...prev.todo.tasks]
      }
    }));

    yield put(addTicketsComplete())
    yield toast('Task Added Successfully!', 'success')

  } catch (e) {
    yield toast('Something went wrong!', 'error')

    yield put(addTicketsComplete())
  }
}

function* updateTicketWorker(action) {
  try {
    const { id, data } = action && action.payload

    yield updateTicket({ id, data })

    yield put(updateTicketComplete())
    yield toast('Task Updated Successfully!', 'success')

  } catch (e) {
    yield toast('Something went wrong!', 'error')

    yield put(updateTicketComplete())
  }
}

function* deleteTicketWorker(action) {
  try {
    const { id } = action && action.payload

    yield deleteTicket(id)

    yield put(deleteTicketComplete())
    yield toast('Task Deleted Successfully!', 'success')

  } catch (e) {
    // yield toast('Something went wrong!', 'error')

    yield put(deleteTicketComplete())
  }
}