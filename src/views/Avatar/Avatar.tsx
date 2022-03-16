import { Button } from "components";
import { layersOrder, format } from "config/avatarLayers";
import useCompoundNft from "hooks/useCompoundNft";
import React, { useState } from "react";
import useNotificationUpdate from 'hooks/useNotificationUpdate'
import styled from "styled-components";

const AvatarSection = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarProfile = styled.canvas`
  border: 8px solid black;
  width: 470px;
  height: 600px;
  image-resolution: 19;
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
  justify-content: space-around;
`;

const PartBox = styled.img`
  border: 4px solid black;
  width: 72px;
  height: 72px;
`;

interface AvatarProps {
  partModelIds: number[]
  partTokenIds: number[]
}

const Avatar: React.FC<AvatarProps> = ({ partModelIds, partTokenIds }) => {
  // Part array order: background, torso, arms, head, mouth, nose, eyes, hair
  const { onCompound } = useCompoundNft()
  const { onShow } = useNotificationUpdate()

  const [disabled, setDisabled] = useState(false)

  const loadImage = (path: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`${path} load failed`))
      img.src = path
    })
  }

  const depict = (modelId: number) => {
    const canvas = (document.getElementById('avatarprofile') as HTMLCanvasElement)
    const ctx = canvas?.getContext("2d")
    if (modelId < layersOrder.length) return ctx?.clearRect(0, 0, canvas.width, canvas.height);
    return loadImage(`layers/${layersOrder[Math.floor(modelId / 100) - 1].name}/${modelId}.png`).then(async (img: any) => {
      ctx!.drawImage(img, 0, 0, format.width, format.height)
    })
  }

  /*  const renderCanvas = async (modelId: number) => {
      if (modelId < layersOrder.length) return null;
      const canvas = document.createElement('canvas')
      canvas.id = `canvas${Math.floor(modelId / 100)}`
      canvas.style.zIndex = `${Math.floor(modelId / 100)}`
      canvas.style.width = '626'
      canvas.style.height = '800'
      const ctx = canvas.getContext("2d")
      const myOptions = Object.assign({}, modelId)
      return loadImage(`layers/${layersOrder[Math.floor(modelId / 100) - 1].name}/${modelId}.png`).then(async (img: any) => {
        ctx!.drawImage(img, 0, 0, format.width, format.height)
      })
    } */

  partModelIds.forEach((modelId) => {
    depict(modelId)
  })

  const handleMintNft = async () => {
    setDisabled(true)
    try {
      const tokenId = await onCompound(partTokenIds)
    }
    catch (e: any) {
      const details = {
        message: e.message,
        title: 'Error',
        status: e.code,
      }
      onShow(details)
    }
    finally {
      setDisabled(false)
    }
  };

  return (
    <AvatarSection>
      <Row>
        <AvatarProfile id='avatarprofile' />
        <PartsColumn>
          {partModelIds.map((partId, index) => {
            if (index > 3) return null;
            if (partId < 100)
              return (
                <PartBox
                  key={partId}
                  src={require(`layers/NotFound.png`).default}
                />
              );

            let layer: string;
            switch (index) {
              case 0:
                layer = "background";
                break;
              case 1:
                layer = "torso";
                break;
              case 2:
                layer = "arms";
                break;
              case 3:
                layer = "head";
                break;
              default:
                return null;
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
        {partModelIds.map((partId, index) => {
          if (index <= 3) return null;
          if (partId < 100)
            return (
              <PartBox
                key={partId}
                src={require(`layers/NotFound.png`).default}
              />
            );
          let layer: string;
          switch (index) {
            case 4:
              layer = "mouth";
              break;
            case 5:
              layer = "nose";
              break;
            case 6:
              layer = "eyes";
              break;
            case 7:
              layer = "hair";
              break;
            default:
              return null;
          }
          return (
            <PartBox
              key={partId}
              src={require(`layers/${layer}/${partId}.png`).default}
            />
          );
        })}
      </PartsRow>
      <Button
        disabled={(partModelIds.find((modelId) => modelId < layersOrder.length) !== undefined) || disabled}
        style={{ marginTop: '16px' }}
        onClick={handleMintNft}
      >
        Compound NFT!
      </Button>
    </AvatarSection>
  );
};

export default Avatar;
