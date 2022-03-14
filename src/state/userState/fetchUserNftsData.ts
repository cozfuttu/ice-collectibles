import BigNumber from "bignumber.js"
import { NftData } from "state/types"
import { getMintingContractAddress } from "utils/addressHelpers"
import multicall from "utils/multicall"
import mintingAbi from 'config/abi/CompleteNfts.json'

const fetchUserNftsData = async (account: string) => {
  const mintingContractAddress = getMintingContractAddress()

  const userCall = [
    {
      address: mintingContractAddress,
      name: 'getUserByAddress',
      params: [account]
    }
  ]

  const [userInfo] = await multicall(mintingAbi, userCall)

  const { ownedCompleteNfts }: { ownedCompleteNfts: number[] } = userInfo

  const nftsData = await Promise.all(
    ownedCompleteNfts.map(async (tokenId) => {
      const nftDataCall = [
        {
          address: mintingContractAddress,
          name: 'getCompleteNftById',
          params: [tokenId]
        }
      ]

      const [nftDataResponse]: [NftData] = await multicall(mintingAbi, nftDataCall)

      // DATABASEDEN DE VERİ ÇEKİCEKSİN!

      /*  const partsData = await Promise.all(
              nftDataResponse.parts.map(async (partId: BigNumber) => {
                const partDataCall = [
                  {
                    address: partsContractAddress,
                    name: 'getPartById',
                    params: [partId]
                  }
                ]
      
                const [partDataResponse] = await multicall(partsAbi, partDataCall)
      
                return {
                  tokenId: new BigNumber(partDataResponse.tokenId).toNumber(),
                  typeId: new BigNumber(partDataResponse.typeId).toNumber(),
                  modelId: new BigNumber(partDataResponse.modelId).toNumber(),
                  owner: partDataResponse.owner
                }
              })
          ) */

      return {
        id: new BigNumber(nftDataResponse.id).toNumber(),
        parts: nftDataResponse.parts,
        owner: nftDataResponse.owner
      }
    })
  )
  return nftsData
}

export default fetchUserNftsData