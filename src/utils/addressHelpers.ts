import addresses, { CHAIN_ID } from "config/contracts"

export const getMintingContractAddress = () => addresses.mintingContract[CHAIN_ID]
export const getPartsContractAddress = () => addresses.partsContract[CHAIN_ID]
export const getNativeTokenContractAddress = () => addresses.nativeToken[CHAIN_ID]
export const getUsdcContractAddress = () => addresses.usdc[CHAIN_ID]
export const getMulticallContractAddress = () => addresses.multicall[CHAIN_ID]