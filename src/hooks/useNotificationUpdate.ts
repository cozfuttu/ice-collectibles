import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { NotificationState } from "state/types"
import { closeNotification, showNotification } from "state/uiState"

const useNotificationUpdate = () => {
  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    dispatch(closeNotification())
  }, [dispatch])

  const handleShow = useCallback((notification: NotificationState) => {
    dispatch(showNotification(notification))
  }, [dispatch])

  return { onClose: handleClose, onShow: handleShow }
}

export default useNotificationUpdate