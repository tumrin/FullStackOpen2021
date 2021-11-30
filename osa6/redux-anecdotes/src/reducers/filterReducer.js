const initialState = {
  content: '',
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return {
        content: action.data.content,
      }
    default:
      return state
  }
}
export const changeFilter = (content) => {
  return {
    type: 'FILTER',
    data: { content },
  }
}
export default filterReducer
