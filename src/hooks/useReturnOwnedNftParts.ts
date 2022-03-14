import { WalletContext } from "context/WalletContext"
import { useCallback, useContext } from "react"
import { returnOwnedNftParts } from "utils/callHelpers"
import { usePartsContract } from "./useContract"

const useReturnOwnedNftParts = () => {
  const { account } = useContext(WalletContext)
  const partsContract = usePartsContract()

  const handleFunc = useCallback(async () => {
    //@ts-ignore
    const txHash = await returnOwnedNftParts(partsContract)
    console.log('sdanjkd', txHash)
    return txHash
  }, [account, partsContract])

  return { onReturn: handleFunc }
}

export default useReturnOwnedNftParts