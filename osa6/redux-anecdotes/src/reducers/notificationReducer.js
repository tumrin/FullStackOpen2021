const initialState = {
  content: 'Default notification',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return {
        content: action.data,
      }
    default:
      return state
  }
}
export const showNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    data: { content },
  }
}
export default notificationReducer
