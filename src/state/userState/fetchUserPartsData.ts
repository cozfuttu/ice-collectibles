import BigNumber from "bignumber.js"
import { PartData, PartState } from "state/types"
import { getPartsContractAddress } from "utils/addressHelpers"
import multicall from "utils/multicall"
import partsAbi from "config/abi/NftParts.json"
import mintingAbi from 'config/abi/CompleteNfts.json'

const fetchUserPartsData = async (account: string) => {
  const partsContractAddress = getPartsContractAddress()

  console.log('partsAdd: ', partsContractAddress)
  console.log('akjnds: ', account)

  const userCall = [
    {
      address: partsContractAddress,
      name: 'getUserByAddress',
      params: ['0x2557f50BD8b2c9F82EA331eDf0E8db30F83f6E57']
    },
    {
      address: partsContractAddress,
      name: 'returnOwnedNftParts',
      params: ['0x2557f50BD8b2c9F82EA331eDf0E8db30F83f6E57']
    }
  ]

  const [userInfo1, userInfo2] = await multicall(partsAbi, userCall)

  console.log('user owned nft count: ', userInfo1)
  console.log('user owned nft parts: ', userInfo2)

  const { ownedNftCount } = userInfo1
  const ownedNftPartIds = userInfo2[0]

  const ownedNftPartIdsNumber: number[] = ownedNftPartIds.map((tokenId) => parseInt(tokenId._hex))

  const partsData = await Promise.all(
    ownedNftPartIdsNumber.map(async (tokenId) => {
      const partDataCall = [
        {
          address: partsContractAddress,
          name: 'getNftPartById',
          params: [tokenId]
        }
      ]

      const [partDataResponse] = await multicall(partsAbi, partDataCall)

      // DATABASEDEN DE VERİ ÇEKİCEKSİN!

      return {
        id: parseInt(partDataResponse.id._hex),
        typeId: parseInt(partDataResponse.typeId._hex),
        modelId: parseInt(partDataResponse.modelId._hex),
        owner: partDataResponse.owner
      }
    })
  )
  return partsData
}

export default fetchUserPartsData