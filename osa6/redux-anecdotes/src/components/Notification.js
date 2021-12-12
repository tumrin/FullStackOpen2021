import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const message = useSelector(({ notification }) => notification.message)
  const time = useSelector(({ notification }) => notification.time)
  const [visible, setVisible] = useState('visible')
  const dispatch = useDispatch()

  useEffect(() => {
    setVisible('visible')
    setTimeout(() => {
      setVisible('hidden')
      dispatch(showNotification('', 0))
    }, time * 1000)
  }, [dispatch, time])

  const style = {
    visibility: visible,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{`${message}`}</div>
}

export default Notification
