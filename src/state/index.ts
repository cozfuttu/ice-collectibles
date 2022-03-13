import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiState'
import userReducer from './userState'

export default configureStore({
  reducer: {
    uiState: uiReducer,
    userState: userReducer
  }
})