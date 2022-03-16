import { getPartsContractAddress } from "utils/addressHelpers"
import multicall from "utils/multicall"
import partsAbi from "config/abi/NftParts.json"

const fetchUserPartsData = async (account: string) => {
  const partsContractAddress = getPartsContractAddress()

  const userCall = [
    {
      address: partsContractAddress,
      name: 'getUserByAddress',
      params: [account]
    },
    {
      address: partsContractAddress,
      name: 'returnOwnedNftParts',
      params: [account]
    }
  ]

  const [userInfo1, userInfo2] = await multicall(partsAbi, userCall)

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

      let partDataResponse;
      try {
        [partDataResponse] = await multicall(partsAbi, partDataCall)
      }

      catch (e) {
        console.log('Error occured while fetching part: ', tokenId)
      }

      // DATABASEDEN DE VERİ ÇEKİCEKSİN!

      return {
        id: parseInt(partDataResponse?.id._hex),
        typeId: parseInt(partDataResponse?.typeId._hex),
        modelId: parseInt(partDataResponse?.modelId._hex),
        owner: partDataResponse?.owner
      }
    })
  )
  return { partsData, ownedNftCount: parseInt(ownedNftCount._hex) }
}

export default fetchUserPartsData