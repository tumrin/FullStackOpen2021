import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const content = event.target.value
    props.changeFilter(content)
  }
  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input onChange={(e) => handleChange(e)}></input>
    </div>
  )
}
const mapDispatchToProps = { changeFilter }

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
