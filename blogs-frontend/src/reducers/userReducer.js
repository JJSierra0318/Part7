const userReducer = (state = null, action ) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const userLogin = user => {
  return async dispatch => {
    const data = user
    dispatch({
      type: 'SET_USER',
      data
    })
  }
}

export const userLogout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer