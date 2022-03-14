import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "state/types";
import fetchUserNftsData from "./fetchUserNftsData";
import fetchUserPartsData from "./fetchUserPartsData";

const initialState: UserState = { nfts: [], parts: [], ownedNftCount: 0 }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserNftsData(state, action) {
      const newNftData = action.payload
      state.nfts = newNftData
    },
    setUserPartsData(state, action) {
      const { partsData, ownedNftCount } = action.payload
      state.parts = partsData
      state.ownedNftCount = ownedNftCount
    }
  }
})

export const { setUserNftsData, setUserPartsData } = userSlice.actions

// Thunks
export const fetchUserNftsDataAsync = (account: string) => async (dispatch) => {
  const nftsData = await fetchUserNftsData(account)
  dispatch(setUserNftsData(nftsData))
}

export const fetchUserPartsDataAsync = (account: string) => async (dispatch) => {
  const partsData = await fetchUserPartsData(account)
  dispatch(setUserPartsData(partsData))
}

export default userSlice.reducer