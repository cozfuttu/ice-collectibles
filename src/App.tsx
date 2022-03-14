import useReturnOwnedNftParts from 'hooks/useReturnOwnedNftParts';
import React, { useContext, useEffect, useState } from 'react';
import { useFetchAllData, useParts } from 'state/hooks';
import styled from 'styled-components';
import { Button } from './components';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import Modal from './components/Modal/Modal';
import { WalletContext } from './context/WalletContext';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ConnectButtonContainer = styled.div`
  position: fixed;
  width: 90%;
  top: 5%;
  display: flex;
  justify-content: end;
`

function App() {
  const [showModal, setShowModal] = useState(false)
  const [chosenParts, setChosenParts] = useState([]) // Burası token id'leri tutucak, modal id'leri değil.
  const { connect } = useContext(WalletContext)
  const val = useParts()

  useEffect(() => {
    connect()
  }, [connect])

  useFetchAllData()

  const handleMintNft = async () => {
    console.log('yeee', val)
  }

  return (
    <Page>
      <ConnectButtonContainer>
        <ConnectWalletButton />
      </ConnectButtonContainer>
      <Modal show={showModal} closeFunc={() => setShowModal(false)} />
      <Button onClick={handleMintNft} >Toggle Modal</Button>
      {/* <Button onClick={async () => {await mintNft()}}>CREATE</Button> */}
    </Page>
  );
}

export default App;
