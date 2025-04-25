import React from 'react'
import { toast as toastify } from 'react-toastify'

export const toast = (message, type) => {
  switch (type) {
    case 'success':
      return toastify.success(Toast({ message, title: 'Success' }))

    case 'error':
      return toastify.error(Toast({ message, title: 'Error' }))

    case 'warning':
      toastify.warning(Toast({ message, title: 'Warning' }))
  }
}

const Toast = ({ message, title }) => (
  <div style={{display: 'block'}}>
    <p>{title}</p>

    <p>{message}</p>
  </div>
)
