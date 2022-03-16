
import { WalletContext } from "context/WalletContext"
import { useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { NotificationState } from "state/types"
import { closeNotification, showNotification } from "state/uiState"
import { fetchUserNftsDataAsync, fetchUserPartsDataAsync } from "state/userState"
import { compoundNft } from "utils/callHelpers"
import { useMintingContract } from "./useContract"

const useNotificationUpdate = () => {
  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    dispatch(closeNotification())
  }, [])

  const handleShow = useCallback((notification: NotificationState) => {
    dispatch(showNotification(notification))
  }, [])

  return { onClose: handleClose, onShow: handleShow }
}

export default useNotificationUpdate