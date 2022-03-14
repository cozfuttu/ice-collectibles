import { WalletContext } from "context/WalletContext"
import { useContext } from "react"
import { useDispatch } from "react-redux"

const useCompoundNft = (nftParts: number[]) => {
  const dispatch = useDispatch()
  const { account } = useContext(WalletContext)
}

export default useCompoundNft