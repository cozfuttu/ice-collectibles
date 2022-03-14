import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "state/types";
import fetchUserNftsData from "./fetchUserNftsData";
import fetchUserPartsData from "./fetchUserPartsData";

const initialState: UserState = { nfts: [], parts: [] }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserNftsData(state, action) {
      const newNftData = action.payload
      return {...state, nfts: newNftData}
    },
    setUserPartsData(state, action) {
      const newPartData = action.payload
      console.log('payloadd: ', action.payload)
      return {...state, parts: newPartData}
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
  console.log('partsData: ', partsData)
  dispatch(setUserPartsData(partsData))
}

export default userSlice.reducer