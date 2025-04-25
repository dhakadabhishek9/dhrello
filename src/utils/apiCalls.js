import { deleteRequest, getRequest, postRequest, putRequest } from './axios'

const { VITE_APP_API_URL } = import.meta.env

const getTickets = (params) =>
    getRequest(`${VITE_APP_API_URL}/todos/user/${params?.userId}`)

const addTickets = (data) =>
    postRequest(`${VITE_APP_API_URL}/todos/add`, data)

const updateTicket = ({ data, id }) =>
    putRequest(`${VITE_APP_API_URL}/todos/${id}`, data)

const deleteTicket = (id) =>
    deleteRequest(`${VITE_APP_API_URL}/todos/${id}`)

export {
    getTickets,
    addTickets,
    updateTicket,
    deleteTicket
}