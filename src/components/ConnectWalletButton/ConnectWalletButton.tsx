import React, { useContext } from 'react'
import { WalletContext } from '../../context/WalletContext'
import { Button } from '../Button'

const ConnectWalletButton = () => {
  const { account, connect, disconnect } = useContext(WalletContext)

  if (account) {
    return (
      <Button onClick={disconnect} style={{ backgroundColor: 'red' }}>
        {account.substring(0, 5) + '...' + account.substring(39)}
      </Button>
    )
  }

  return (
    <Button onClick={connect}>
      Connect Wallet
    </Button>
  )
}

export default ConnectWalletButton