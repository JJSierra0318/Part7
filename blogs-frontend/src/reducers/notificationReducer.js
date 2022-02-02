let timeoutID

const NotificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_NOTI':
    return action.data
  case 'REMOVE_NOTI':
    return null
  default:
    return state
  }
}

export const setNotification = (content, type, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      data: {
        content,
        type
      }
    })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTI'
      })
    }, time * 1000)
  }
}

export default NotificationReducer