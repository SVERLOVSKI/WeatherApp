import { configureStore } from '@reduxjs/toolkit'
import locationReducer from '../features/locationSlice'

export const store = configureStore({
  reducer: {
    defaultLocation: locationReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>