import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const message = props.notification.message
  const time = props.notification.time
  const anectode = props.anectode
  console.log(anectode)
  const [visible, setVisible] = useState('visible')
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    setVisible('visible')
    clearTimeout(timer)
    const timerID = setTimeout(() => {
      setVisible('hidden')
      props.showNotification('', 0)
    }, time * 1000)
    setTimer(timerID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, anectode])

  const style = {
    visibility: visible,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{`${message}`}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    anectode: state.anectode,
  }
}
const mapDispatchToProps = { showNotification }

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
export default ConnectedNotification
