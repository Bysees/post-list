import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { Post } from '../model/types'
import { extractPages } from '../lib/extractPages'
import { baseApi } from '6_shared/api'

type PostsQueryResult = {
  posts: Post[]
  totalCount: number
  firstPage?: number
  prevPage?: number
  nextPage?: number
  lastPage: number
}

type PostsQueryParams = {
  page: number
  limit: number
}

const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    posts: build.query<PostsQueryResult, PostsQueryParams>({
      query: ({ page, limit }) => ({
        url: `/posts`,
        params: {
          _page: page,
          _limit: limit
        }
      }),
      transformResponse: async (posts: Post[], { response }: FetchBaseQueryMeta) => {
        const totalCount = +response?.headers.get('x-total-count')!
        const links = response?.headers.get('Link')?.split(',')!
        const pages = extractPages(links)

        return {
          posts,
          totalCount,
          firstPage: pages.first,
          prevPage: pages.prev,
          nextPage: pages.next,
          lastPage: pages.last
        }
      },
      keepUnusedDataFor: 60 * 10
    }),
    postById: build.query<Post, Post['id']>({
      query: (id) => ({
        url: `/posts/${id}`
      }),
      keepUnusedDataFor: 60 * 10
    })
  })
})

export { postApi }
