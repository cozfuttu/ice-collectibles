import { WalletContext } from "context/WalletContext"
import { useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { fetchUserNftsDataAsync, fetchUserPartsDataAsync } from "state/userState"
import { compoundNft } from "utils/callHelpers"
import { useMintingContract } from "./useContract"

const useCompoundNft = (nftParts: number[]) => {
  const dispatch = useDispatch()
  const { account } = useContext(WalletContext)
  const mintingContract = useMintingContract()

  const handleCompound = useCallback(async () => {
    const txHash = await compoundNft(mintingContract, nftParts, account)
    dispatch(fetchUserPartsDataAsync(account))
    dispatch(fetchUserNftsDataAsync(account))
    return txHash
  }, [account, mintingContract, nftParts])

  return { onCompound: handleCompound }
}

export default useCompoundNft