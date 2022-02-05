import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {

  let notification = useSelector(state => state.notification)
  if ( !notification ) {
    return null
  }

  const style = {
    width: 'max-content',
    margin: 'auto'
  }
  const variant = notification.type === 'success' ? 'success' : 'danger'

  return (
    <Alert variant={variant} style={style}>
      {notification.content}
    </Alert>
  )
}

export default Notification