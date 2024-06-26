import { ethers } from 'ethers'

export const approve = async (mainContract, spenderContract, account: string) => {
  return mainContract.methods
    .approve(spenderContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gasPrice: '32000000000' })
}

export const compoundNft = async (mintingContract, sortedNftParts: number[], account: string) => {
  return mintingContract.methods
    .compoundNft(sortedNftParts)
    .send({ from: account, gasPrice: '32000000000' })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const returnOwnedNftParts = async (partsContract, account: string) => {
  return partsContract.methods
    .returnOwnedNftParts(account)
    .call((err, res) => {
      if (err) {
        console.log('error occured: ', err)
        return
      }
      console.log('result is: ', res)
    })
}