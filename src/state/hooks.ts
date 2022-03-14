import { WalletContext } from "context/WalletContext"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { State } from "./types"
import { fetchUserPartsDataAsync } from "./userState"

export const useFetchAllData = () => {
  const { account } = useContext(WalletContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchUserPartsDataAsync(account))
    }
  }, [account, dispatch])
}

export const useNfts = () => {
  const nfts = useSelector((state: State) => state.userState.nfts)
  return nfts
}

export const useParts = () => {
  const parts = useSelector((state: State) => state.userState.parts)
  return parts
}

export const useUser = () => {
  const userData = useSelector((state: State) => state.userState)
  return userData
}

export const useNotification = () => {
  const notifications = useSelector((state: State) => state.uiState.notification)
  return notifications
}