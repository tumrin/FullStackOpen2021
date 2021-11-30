import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification.content)
  const visibility = useSelector(({ notification }) => notification.visibility)
  const message = useSelector(({ notification }) => notification.message)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (visibility) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        dispatch(showNotification(notification, false))
      }, 1000)
    }
  }, [dispatch, notification, visibility])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if (visible) {
    return <div style={style}>{`${message} ${notification}`}</div>
  }
  return <div></div>
}

export default Notification
