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
    },
    {
      address: mintingContractAddress,
      name: 'returnOwnedCompleteNfts',
      params: [account]
    }
  ]

  const [, userInfo2] = await multicall(mintingAbi, userCall)

  const ownedNftIds = userInfo2[0]

  const ownedNftIdsNumber: number[] = ownedNftIds.map((tokenId) => parseInt(tokenId._hex))

  const nftsData = await Promise.all(
    ownedNftIdsNumber.map(async (tokenId) => {
      const nftDataCall = [
        {
          address: mintingContractAddress,
          name: 'getCompleteNftById',
          params: [tokenId]
        }
      ]

      const [nftDataResponse] = await multicall(mintingAbi, nftDataCall)

      console.log('fetched nfts: ', nftDataResponse)

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
        id: parseInt(nftDataResponse?.id._hex),
        parts: nftDataResponse.parts,
        owner: nftDataResponse.owner
      }
    })
  )
  return nftsData
}

export default fetchUserNftsData