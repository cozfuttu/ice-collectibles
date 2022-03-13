import { getMintingContractAddress, getPartsContractAddress } from "utils/addressHelpers";
import { ContractOptions } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import useWeb3 from "./useWeb3";
import mintingContractAbi from 'config/abi/CompleteNfts.json'
import partsContractAbi from 'config/abi/NftParts.json'

export const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const contract = new web3.eth.Contract(abi, address, contractOptions)

  return contract
}

export const useMintingContract = () => {
  const abi = (mintingContractAbi as unknown) as AbiItem
  return useContract(abi, getMintingContractAddress())
}

export const usePartsContract = () => {
  const abi = (partsContractAbi as unknown) as AbiItem
  return useContract(abi, getPartsContractAddress())
}