import { combineReducers } from '@reduxjs/toolkit'
import { postSlice } from '5_entities/post'
import { baseApi } from '6_shared/api'

export const rootReducer = combineReducers({
  [postSlice.name]: postSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer
})
