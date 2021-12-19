import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const message = props.notification.message
  const time = props.notification.time
  const [visible, setVisible] = useState('visible')
  useEffect(() => {
    setVisible('visible')
    setTimeout(() => {
      setVisible('hidden')
      props.showNotification('', 0)
    }, time * 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

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
  }
}
const mapDispatchToProps = { showNotification }

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
export default ConnectedNotification
