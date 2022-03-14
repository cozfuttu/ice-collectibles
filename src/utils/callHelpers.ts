import BigNumber from "bignumber.js";
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'

export const approve = async (mainContract: Contract, spenderContract: Contract, account) => {
  return mainContract.methods
    .approve(spenderContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gasPrice: '32000000000' })
}

export const compoundNft = async (mintingContract: Contract, nftParts: number[], account: string) => {
  return mintingContract.methods
    .compoundNft(nftParts)
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const returnOwnedNftParts = async (partsContract, account: string = '0x2557f50BD8b2c9F82EA331eDf0E8db30F83f6E57') => {
  return partsContract.methods
    .returnOwnedNftParts('0x2557f50BD8b2c9F82EA331eDf0E8db30F83f6E57')
    .call((err, res) => {
      if (err) {
        console.log('error occured: ', err)
        return
      }
      console.log('result is: ', res)
    })
}