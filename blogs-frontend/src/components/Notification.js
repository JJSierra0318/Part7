import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  let notification = useSelector(state => state.notification)
  if ( !notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    width: 'max-contetn'
  }

  return <div style={style}>
    {notification.content}
  </div>
}

export default Notification