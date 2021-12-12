const initialState = {
  content: 'Default notification',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return {
        message: action.data.message,
        time: action.data.time,
      }
    default:
      return state
  }
}
export const showNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      data: { message: message, time: time },
    })
  }
}
export default notificationReducer
