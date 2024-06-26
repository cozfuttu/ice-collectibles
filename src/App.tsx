import React, { useContext, useEffect, useState } from "react";
import { useFetchAllData, useNotification, useUser } from "state/hooks";
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

const InventoryTabIndexes = [100, 200, 300, 400, 500, 600, 700, 800];

function App() {
  const val = useUser();
  const notification = useNotification()
  const { onClose } = useNotificationUpdate()

  const [chosenPartIds, setChosenPartIds] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // Burası token id'leri tutucak, model id'leri değil.
  const [chosenPartModelIds, setChosenPartModelIds] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [tabIndex, setTabIndex] = useState(100)
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
      {/* DON'T FORGET TO IMPLEMENT SUSPENSE! */}
      <ConnectButtonContainer>
        <ConnectWalletButton />
      </ConnectButtonContainer>
      {
        notification &&
        <Modal closeFunc={onClose} />
      }
      <Avatar partModelIds={chosenPartModelIds} partTokenIds={chosenPartIds} setInventoryTabIndex={setTabIndex} />
      <Inventory
        setChosenModalIds={setChosenPartModelIds}
        setChosenPartIds={setChosenPartIds}
        chosenTokenIds={chosenPartIds}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
      {<Button onClick={handleMintNft}>Log info</Button>}
    </Page>
  );
}

export default App;
