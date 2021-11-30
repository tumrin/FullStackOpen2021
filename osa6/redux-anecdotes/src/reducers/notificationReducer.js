const initialState = {
  content: 'Default notification',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return {
        content: action.data.content,
        visibility: action.data.visibility,
        message: action.data.message,
      }
    default:
      return state
  }
}
export const showNotification = (content, visibility, message) => {
  console.log('content: ')
  console.log(visibility)
  return {
    type: 'NOTIFICATION',
    data: { content: content, visibility: visibility, message: message },
  }
}
export default notificationReducer
