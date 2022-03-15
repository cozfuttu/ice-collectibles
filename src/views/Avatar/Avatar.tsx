import React from "react";
import styled from "styled-components";

const AvatarSection = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarProfile = styled.img`
  border: 8px solid black;
  width: 392px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const PartsColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const PartsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
`;

const PartBox = styled.img`
  border: 4px solid black;
  width: 72px;
  height: 72px;
`;

interface AvatarProps {
  parts: number[];
}

const Avatar: React.FC<AvatarProps> = ({ parts }) => {
  // Part array sirasiyla: hair, head, eyes, nose, mouth, arms, torso, background
  return (
    <AvatarSection>
      <Row>
        <AvatarProfile src={require(`layers/NotFound.png`).default} />
        <PartsColumn>
          {parts.map((partId, index) => {
            if (index > 3) return;
            if (!parts[index])
              return (
                <PartBox
                  key={partId}
                  src={require(`layers/NotFound.png`).default}
                />
              );

            let layer: string;
            switch (index) {
              case 0:
                layer = "torso";
                break;
              case 1:
                layer = "arms";
                break;
              case 2:
                layer = "head";
                break;
              case 3:
                layer = "mouth";
                break;
              default:
                return;
            }
            return (
              <PartBox
                key={partId}
                src={require(`layers/${layer}/${partId}.png`).default}
              />
            );
          })}
        </PartsColumn>
      </Row>
      <PartsRow>
        {parts.map((partId, index) => {
          if (index <= 3) return;
          if (!parts[index])
            return (
              <PartBox
                key={partId}
                src={require(`layers/NotFound.png`).default}
              />
            );
          let layer: string;
          switch (index) {
            case 4:
              layer = "nose";
              break;
            case 5:
              layer = "eyes";
              break;
            case 6:
              layer = "hair";
              break;
            case 7:
              layer = "background";
              break;
            default:
              return;
          }
          return (
            <PartBox
              key={partId}
              src={require(`layers/${layer}/${partId}.png`).default}
            />
          );
        })}
      </PartsRow>
    </AvatarSection>
  );
};

export default Avatar;
