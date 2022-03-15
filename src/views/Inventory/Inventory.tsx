import React, { Dispatch, SetStateAction, useState } from "react";
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
`;

interface InventoryProps {
  setChosenModalIds: Dispatch<SetStateAction<never[]>>;
  setChosenPartIds: Dispatch<SetStateAction<never[]>>;
}

const InventoryTabIndexes = [200, 300, 400, 500, 600, 700, 800, 900, 1000];

const Inventory: React.FC<InventoryProps> = ({
  setChosenModalIds,
  setChosenPartIds,
}) => {
  const parts = useParts(); // The parts user has in their wallet.

  const [tabIndex, setTabIndex] = useState(200);
  const [shownParts, setShownParts] = useState(
    parts.filter((part) => part.modelId < tabIndex)
  );
  console.log("tabInd: ", shownParts);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    setShownParts(
      parts.filter(
        (part) => part.modelId < index && part.modelId >= index - 100
      )
    );
  };
  return (
    <InventorySection>
      <InventoryTabs>
        {InventoryTabIndexes.map((index) => {
          let layer: string;
          switch (index) {
            case 200:
              layer = "torso";
              break;
            case 300:
              layer = "arms";
              break;
            case 400:
              layer = "head";
              break;
            case 500:
              layer = "mouth";
              break;
            case 600:
              layer = "nose";
              break;
            case 700:
              layer = "eyes";
              break;
            case 800:
              layer = "hair";
              break;
            case 900:
              layer = "background";
              break;
            default:
              return null;
          }
          return (
            <InventoryTab
              key={index}
              src={
                require(`layers/${layer}/${index - 100}.png`).default
              }
              onClick={() => handleTabChange(index)}
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
          let layer: string = "";
          if (part.modelId < 200) layer = "torso";
          else if (part.modelId < 300) layer = "arms";
          else if (part.modelId < 400) layer = "head";
          else if (part.modelId < 500) layer = "mouth";
          else if (part.modelId < 600) layer = "nose";
          else if (part.modelId < 700) layer = "eyes";
          else if (part.modelId < 800) layer = "hair";
          else if (part.modelId < 900) layer = "background";
          console.log(
            "imguri: ",
            `layers/${layer}/${part.modelId}.png`
          );
          return (
            <ItemBox
              key={part.id}
              src={
                require(`layers/${layer}/${part.modelId}.png`).default
              }
            />
          );
        })}
      </InventoryBox>
    </InventorySection>
  );
};

export default Inventory;
