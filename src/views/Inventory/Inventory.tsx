import { layersOrder } from "config/avatarLayers";
import React, { useEffect, useState } from "react";
import { useParts } from "state/hooks";
import styled from "styled-components";

const InventorySection = styled.div`
  border: 8px solid black;
  display: flex;
  flex-direction: column;
`;

const InventoryTabs = styled.div`
  border: 8px solid black;
  flex-wrap: wrap;
  width: 500px;
`;

const InventoryTab = styled.img`
  border: 8px solid blue;
  width: 100px;
  cursor: pointer;
`;

const InventoryBox = styled.div`
  border: 8px solid red;
  width: 500px;
`;

const ItemBox = styled.img`
  border: 4px solid green;
  width: 100px;
  cursor: pointer;
`;

interface InventoryProps {
  setChosenModalIds: any
  setChosenPartIds: any
  chosenTokenIds: number[]
  tabIndex: number
  setTabIndex: any
}

const InventoryTabIndexes = [100, 200, 300, 400, 500, 600, 700, 800];

const Inventory: React.FC<InventoryProps> = ({
  setChosenModalIds,
  setChosenPartIds,
  chosenTokenIds,
  tabIndex,
  setTabIndex
}) => {
  const parts = useParts(); // The parts user has in their wallet.

  const [shownParts, setShownParts] = useState(
    parts.filter((part) => part.modelId < tabIndex)
  );

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    setShownParts(
      parts.filter(
        (part) => part.modelId < index + 100 && part.modelId >= index
      )
    );
  };

  useEffect(() => {
    handleTabChange(tabIndex)
  }, [tabIndex])

  const handleItemSelect = (modelId: number, tokenId: number) => {
    const isSelected = chosenTokenIds.includes(tokenId)
    const index = Math.floor(modelId / 100);
    // Your iq may not be enough to understand this part
    if (isSelected) {
      setChosenModalIds((prevState: number[]) => [...prevState.slice(0, index - 1), index - 1, ...prevState.slice(index, prevState.length)])
      setChosenPartIds((prevState: number[]) => [...prevState.slice(0, index - 1), 0, ...prevState.slice(index, prevState.length)])
    }
    else {
      // BEST STATE MODIFICATION IN THE WORLD
      setChosenModalIds((prevState: number[]) => [...prevState.slice(0, index - 1), modelId, ...prevState.slice(index, prevState.length)])
      // BEST STATE MODIFICATION IN THE WORLD V2.0
      setChosenPartIds((prevState: number[]) => [...prevState.slice(0, index - 1), tokenId, ...prevState.slice(index, prevState.length)])
    }

  }
  return (
    <InventorySection>
      <InventoryTabs>
        {InventoryTabIndexes.map((indexNo) => {
          const layer = layersOrder[(indexNo / 100) - 1].name
          return (
            <InventoryTab
              key={indexNo}
              src={
                `layers/${layer}/${indexNo}.png`
              }
              onClick={() => setTabIndex(indexNo)}
            />
          );
        })}
      </InventoryTabs>
      <InventoryBox>
        {/* parts.map((partId) => {
          bişi bişi bişi
          return (
            <ItemBox src={}
          )
        }) */}
        {shownParts.map((part) => {
          const layer = layersOrder[Math.floor(part.modelId / 100) - 1].name
          const isSelected = chosenTokenIds.includes(part.id)
          return (
            <ItemBox
              key={part.id}
              src={
                `layers/${layer}/${part.modelId}.png`
              }
              onClick={() => handleItemSelect(part.modelId, part.id)}
              style={{ border: isSelected ? '8px solid lightgreen' : '4px solid green' }}
            />
          );
        })}
      </InventoryBox>
    </InventorySection>
  );
};

export default Inventory;
