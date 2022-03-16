import { CHAIN_ID } from "config/contracts"
import { errorsConfig, errorsStatus } from "config/notifications"
import useNotificationUpdate from "hooks/useNotificationUpdate"
import { useCallback } from "react"
import { createContext, useEffect, useState } from "react"

interface WalletState {
  account: string
  chainId: number | null
  disconnect: () => void
  connect: () => Promise<void>
}

export const WalletContext = createContext({
  account: '',
  chainId: null,
} as WalletState)


const WalletContextProvider: React.FC = ({ children }) => {
  const { ethereum } = window
  const [account, setAccount] = useState('')
  const [networkId, setNetworkId] = useState(null)
  const { onShow } = useNotificationUpdate()

  const connectHandler = useCallback(async () => {
    if (!ethereum) {
      onShow(errorsStatus.NO_WALLET_DETECTED)
      return
    }

    try {
      const network = await ethereum.request({ method: 'net_version' })
      if (parseInt(network) !== CHAIN_ID) {
        onShow(errorsStatus.WRONG_NETWORK)
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
      setNetworkId(network)
    } catch (err: any) {
      if (err.code === 4001) onShow(errorsStatus.TRANSACTION_REJECTED)
      else onShow(errorsStatus.TRANSACTION_REJECTED)
    }
  }, [ethereum, onShow])

  const disconnectHandler = () => {
    setAccount('')
  }

  useEffect(() => {
    ethereum.on('accountsChanged', (accounts) => {
      console.log('account Changed!')
      setAccount(accounts[0])
    })
    ethereum.on('chainChanged', (chainId) => {
      if (parseInt(chainId) === CHAIN_ID) connectHandler()
      else {
        setAccount('')
        setNetworkId(null)
        onShow(errorsStatus.CHAIN_CHANGED)
      }
    })
  }, [connectHandler, ethereum])

  return (
    <WalletContext.Provider value={{ account: account, chainId: networkId, connect: connectHandler, disconnect: disconnectHandler }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider