import { WalletContext } from "context/WalletContext"
import { useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { fetchUserNftsDataAsync, fetchUserPartsDataAsync } from "state/userState"
import { compoundNft } from "utils/callHelpers"
import { useMintingContract } from "./useContract"

const useCompoundNft = () => {
  const dispatch = useDispatch()
  const { account } = useContext(WalletContext)
  const mintingContract = useMintingContract()

  const handleCompound = useCallback(async (sortedNftPartIds: number[]) => {
    const txHash = await compoundNft(mintingContract, sortedNftPartIds, account)
    dispatch(fetchUserPartsDataAsync(account))
    dispatch(fetchUserNftsDataAsync(account))
    return txHash
  }, [account, mintingContract])

  return { onCompound: handleCompound }
}

export default useCompoundNft