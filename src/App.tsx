import React, { useContext, useEffect, useState } from "react";
import { useFetchAllData, useParts } from "state/hooks";
import styled from "styled-components";
import { Avatar } from "views/Avatar";
import { Inventory } from "views/Inventory";
import { Button } from "./components";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import Modal from "./components/Modal/Modal";
import { WalletContext } from "./context/WalletContext";

const Page = styled.div`
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ConnectButtonContainer = styled.div`
  position: fixed;
  width: 90%;
  top: 5%;
  display: flex;
  justify-content: end;
`;

function App() {
  const [showModal, setShowModal] = useState(false);
  const [chosenPartIds, setChosenPartIds] = useState([]); // Burası token id'leri tutucak, model id'leri değil.
  const [chosenPartModelIds, setChosenPartModelIds] = useState([]);
  const { connect } = useContext(WalletContext);
  const val = useParts();

  const modalIds = [100, 200, 300, 400, 500, 600, 700, 800];

  useEffect(() => {
    connect();
  }, [connect]);

  useFetchAllData();

  const handleMintNft = async () => {
    console.log("yeee", val);
  };

  return (
    <Page>
      <ConnectButtonContainer>
        <ConnectWalletButton />
      </ConnectButtonContainer>
      <Avatar parts={modalIds} />
      <Inventory
        setChosenModalIds={setChosenPartModelIds}
        setChosenPartIds={setChosenPartIds}
      />
      {/* <Modal show={showModal} closeFunc={() => setShowModal(false)} /> */}
      {<Button onClick={handleMintNft}>Toggle Modal</Button>}
      {/* <Button onClick={async () => {await mintNft()}}>CREATE</Button> */}
    </Page>
  );
}

export default App;
