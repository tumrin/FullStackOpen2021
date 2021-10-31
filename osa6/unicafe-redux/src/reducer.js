const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { bad: state.bad, good: state.good + 1, ok: state.ok }
    case 'OK':
      return { bad: state.bad, good: state.good, ok: state.ok + 1 }
    case 'BAD':
      return { bad: state.bad + 1, good: state.good, ok: state.ok }
    case 'ZERO':
      return { bad: 0, good: 0, ok: 0 }
    default:
      return state
  }
}

export default counterReducer
