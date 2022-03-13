/// <reference types="react-scripts" />

interface Window {
  ethereum: {
    isMetaMask?: true
    request: (...args: any[]) => Promise<any>
    on: (...args: any[]) => void
    sendAsync: (...args: any[]) => void
  }
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
  }
}