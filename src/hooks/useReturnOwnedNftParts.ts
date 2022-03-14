import { WalletContext } from "context/WalletContext"
import { useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { fetchUserPartsDataAsync } from "state/userState"
import { returnOwnedNftParts } from "utils/callHelpers"
import { usePartsContract } from "./useContract"

const useReturnOwnedNftParts = () => {
  const dispatch = useDispatch()
  const { account } = useContext(WalletContext)
  const partsContract = usePartsContract()

  const handleFunc = useCallback(async () => {
    //@ts-ignore
    const txHash = await returnOwnedNftParts(partsContract, account)
    dispatch(fetchUserPartsDataAsync(account))
    return txHash
  }, [account, partsContract])

  return { onReturn: handleFunc }
}

export default useReturnOwnedNftParts