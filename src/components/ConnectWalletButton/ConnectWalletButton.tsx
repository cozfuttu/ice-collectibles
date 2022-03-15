import React, { useContext } from 'react'
import styled from 'styled-components'
import { WalletContext } from '../../context/WalletContext'
import { Button } from '../Button'

const ConnectWalletBtn = styled(Button)`
  &:hover {
    transform: scale(1.2);
  }
`

const ConnectWalletButton = () => {
  const { account, connect, disconnect } = useContext(WalletContext)

  if (account) {
    return (
      <ConnectWalletBtn onClick={disconnect} style={{ backgroundColor: 'red' }}>
        {account.substring(0, 5) + '...' + account.substring(39)}
      </ConnectWalletBtn>
    )
  }

  return (
    <ConnectWalletBtn onClick={connect}>
      Connect Wallet
    </ConnectWalletBtn>
  )
}

export default ConnectWalletButton