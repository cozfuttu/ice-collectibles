// ERC-721 Standard (minted ice colony characters) (fetched from smart contract mapping)
export interface NftData {
  id: number
  parts: number[]
  owner: string
}

// fetched from database
export interface NftState extends NftData {
  imageUri: string
}

// ERC-1155 Standard (ice colony character parts) (fetched from smart contract mapping)
export interface PartData {
  id: number
  typeId: number
  modelId: number
  owner: string
}

// fetched from database
export interface PartState extends PartData {
  imageUri: string
}

export interface NotificationState {
  status: string
  title: string
  message: string
  image?: string
}

export interface UiState {
  notification: NotificationState | null
}

export interface UserState {
  nfts: NftState[]
  parts: PartState[]
  ownedNftCount: number
}

export interface State {
  userState: UserState
  uiState: UiState
}