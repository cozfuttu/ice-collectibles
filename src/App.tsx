import React, { useContext, useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useFetchAllData, useNotification, useUser } from "state/hooks";
import { closeNotification } from "state/uiState";
import useNotificationUpdate from 'hooks/useNotificationUpdate'
import styled from "styled-components";
import { Avatar } from "views/Avatar";
import { Inventory } from "views/Inventory";
import { Button, Modal } from "./components";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { WalletContext } from "./context/WalletContext";

const Page = styled.div`
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ConnectButtonContainer = styled.div`
  position: fixed;
  width: 90%;
  top: 5%;
  display: flex;
  justify-content: end;
`;

const ModalContainer = styled.div`
  width: 75%;
  position: fixed;
  left: 50%;
  margin-left: -37.5%;
`

function App() {
  const val = useUser();
  const notification = useNotification()
  const { onClose } = useNotificationUpdate()
  const dispatch = useDispatch()

  const [chosenPartIds, setChosenPartIds] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // Burası token id'leri tutucak, model id'leri değil.
  const [chosenPartModelIds, setChosenPartModelIds] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const { connect } = useContext(WalletContext);

  useEffect(() => {
    connect();
  }, [connect]);

  useFetchAllData();
  console.log('chosenModelIds: ', chosenPartModelIds)
  console.log('chosenPartIds: ', chosenPartIds)

  const handleMintNft = async () => {

    console.log("ur info", val);
  };

  return (
    <Page>
      <ConnectButtonContainer>
        <ConnectWalletButton />
      </ConnectButtonContainer>
      {
        notification &&
        <ModalContainer>
          <Modal closeFunc={onClose} />
        </ModalContainer>
      }
      <Avatar partModelIds={chosenPartModelIds} partTokenIds={chosenPartIds} />
      <Inventory
        setChosenModalIds={setChosenPartModelIds}
        setChosenPartIds={setChosenPartIds}
        chosenTokenIds={chosenPartIds}
      />
      {/* <Modal show={showModal} closeFunc={() => setShowModal(false)} /> */}
      {<Button onClick={handleMintNft}>Log info</Button>}
      {/* <Button onClick={async () => {await mintNft()}}>CREATE</Button> */}
    </Page>
  );
}

export default App;
