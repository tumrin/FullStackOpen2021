import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const content = event.target.value
    dispatch(changeFilter(content))
  }
  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input onChange={(e) => handleChange(e)}></input>
    </div>
  )
}

export default Filter
