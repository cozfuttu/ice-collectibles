import { WalletContext } from "context/WalletContext"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPartsContractAddress } from "utils/addressHelpers"
import multicall from "utils/multicall"
import { State } from "./types"
import { fetchUserNftsDataAsync, fetchUserPartsDataAsync } from "./userState"
import partsAbi from 'config/abi/NftParts.json'

export const useFetchAllData = () => {
  const { account } = useContext(WalletContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchUserPartsDataAsync(account))
    }
  }, [account])
}

/* export const useNfts = () => {
  const nfts = useSelector((state: State) => state.userState.nfts)
  return nfts
} */

export const useParts = () => {
  const parts = useSelector((state: State) => state?.userState?.parts)
  return parts
}

export const useNotification = () => {
  const notifications = useSelector((state: State) => state.uiState.notification)
  return notifications
}