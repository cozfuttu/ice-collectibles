import { createSlice } from '@reduxjs/toolkit'
import { UiState } from 'state/types'

const initialState: UiState = { notification: null }

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
        image: action.payload.image ?? null
      }
    },
    closeNotification(state) {
      state.notification = null
    }
  }
})

export const { showNotification, closeNotification } = uiSlice.actions

export default uiSlice.reducer