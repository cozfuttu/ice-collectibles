import { NotificationState } from "state/types";

enum successTitle {
  'TRANSACTION_SUCCESSFUL' = 'Transaction Successful',
  'CONNECTION_SUCCESSFUL' = 'Connection Successful',
}

enum errorsTitle {
  'WALLET_ERROR' = 'Wallet Error',
  'NETWORK_ERROR' = 'Network Error',
  'UNKNOWN_ERROR' = 'Unknown Error',
}

export enum errorsStatus {
  // Wallet Errors
  'NO_WALLET_DETECTED' = 'No Wallet Detected',
  'TRANSACTION_REJECTED' = 'Transaction Rejected',
  'TRANSACTION_REVERTED' = 'Transaction Reverted',

  // Network Errors
  'WRONG_NETWORK' = 'Wrong Network',
  "CHAIN_CHANGED" = 'Chain Changed',

  // Common Errors
  'UNKNOWN_ERROR' = 'Unknown Error.',
}

export enum successStatus {
  'WALLET_CONNECTED' = 'Wallet Connected.',
  'NFT_MINTED' = 'NFT Minting Completed.',
  'NFT_SALVAGED' = 'NFT Salvage Completed.',
  'ICE_SALVAGED' = 'ICE Salvage Completed.',
}

export const errorsConfig: NotificationState[] = [
  {
    title: errorsTitle.WALLET_ERROR,
    message: 'You need to install Metamask in order to use this dApp.',
    status: errorsStatus.NO_WALLET_DETECTED
  },
  {
    title: errorsTitle.WALLET_ERROR,
    message: 'You rejected the transaction.',
    status: errorsStatus.TRANSACTION_REJECTED
  },
  {
    title: errorsTitle.WALLET_ERROR,
    message: 'An error occurred while proccessing your transaction, please try again.',
    status: errorsStatus.TRANSACTION_REVERTED
  },
  {
    title: errorsTitle.NETWORK_ERROR,
    message: 'You need to change your network to Polygon.',
    status: errorsStatus.WRONG_NETWORK
  },
  {
    title: errorsTitle.NETWORK_ERROR,
    message: 'You need to change your network to Polygon. Disconnecting...',
    status: errorsStatus.CHAIN_CHANGED
  },
  {
    title: errorsTitle.UNKNOWN_ERROR,
    message: 'An unknown error happened. Please contact with us to report this.',
    status: errorsStatus.UNKNOWN_ERROR
  }
]

export const successConfig: NotificationState[] = [
  {
    title: successTitle.CONNECTION_SUCCESSFUL,
    message: 'You have successfully connected your Metamask with ICE Genesis.',
    status: successStatus.WALLET_CONNECTED
  },
  {
    title: successTitle.TRANSACTION_SUCCESSFUL,
    message: 'You have successfully salvaged your ICE and gained xxx new parts!',
    status: successStatus.ICE_SALVAGED
  },
  {
    title: successTitle.TRANSACTION_SUCCESSFUL,
    message: 'You have successfully compounded your parts into an ICE NFT!',
    status: successStatus.NFT_MINTED
  },
  {
    title: successTitle.TRANSACTION_SUCCESSFUL,
    message: 'You have successfully salvaged your ICE NFT into parts!',
    status: successStatus.NFT_SALVAGED
  },
]