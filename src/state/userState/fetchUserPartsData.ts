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
    }
  ]

  console.log('aaa')

  const [userInfo] = await multicall(partsAbi, userCall)

  console.log('jkasjks: ', userInfo)

  const { ownedNftParts }: { ownedNftParts: number[] } = userInfo

  const partsData = await Promise.all(
    ownedNftParts.map(async (tokenId) => {
      const partDataCall = [
        {
          address: partsContractAddress,
          name: 'getNftPartById',
          params: [tokenId]
        }
      ]

      const [partDataResponse]: [PartData] = await multicall(partsAbi, partDataCall)

      // DATABASEDEN DE VERİ ÇEKİCEKSİN!

      return {
        id: new BigNumber(partDataResponse.id).toNumber(),
        typeId: new BigNumber(partDataResponse.typeId).toNumber(),
        modelId: new BigNumber(partDataResponse.modelId).toNumber(),
        owner: partDataResponse.owner
      }
    })
  )
  return partsData
}

export default fetchUserPartsData