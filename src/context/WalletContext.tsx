import { CHAIN_ID } from "config/contracts"
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

  const connectHandler = useCallback(async () => {
    if (!ethereum) {
      alert("You need to install Metamask in order to use this dApp.")
    }

    try {
      const network = await ethereum.request({ method: 'net_version' })
      console.log('network: ', network)
      if (parseInt(network) !== CHAIN_ID) {
        alert("You need to change your network to Polygon.")
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
      setNetworkId(network)
    } catch (err) {
      alert("An error happened. Ignore this if you rejected the connection request.")
      console.log('An error happened while connecting wallet: ', err)
    }
  }, [ethereum])

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
        window.alert("You need to change your network to Polygon. Disconnecting...")
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