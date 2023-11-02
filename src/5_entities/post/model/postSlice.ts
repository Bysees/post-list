import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { postApi } from '../api/postApi'
import { Post } from './types'

interface InitialState {
  page: number
  limit: number
  posts: Post[]
}

const START_PAGE = 1
const DEFAULT_LIMIT = 10

const initialState: InitialState = {
  page: START_PAGE,
  limit: DEFAULT_LIMIT,
  posts: []
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(postApi.endpoints.posts.matchFulfilled, (state, { payload }) => {
      state.posts = state.posts.concat(payload.posts)
    })
  }
})

export const { setPage } = postSlice.actions

export const selectPosts = (state: RootState) => {
  return state.post.posts
}

export const selectPage = (state: RootState) => {
  return state.post.page
}

export const selectLimit = (state: RootState) => {
  return state.post.limit
}
