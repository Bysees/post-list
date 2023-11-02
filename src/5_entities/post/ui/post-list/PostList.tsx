import { FC, useRef } from 'react'
import { PostItem } from './PostItem'
import { postApi } from '../../api/postApi'
import { selectLimit, selectPage, selectPosts, setPage } from '../../model/postSlice'
import { useAppDispatch, useAppSelector } from '6_shared/model'
import { useInView, useScrollRestoration, useVirtualScroll } from '6_shared/lib'
import { Loader } from '6_shared/ui'
import styles from './styles.module.scss'

const PostList: FC = () => {
  const dispatch = useAppDispatch()
  
  const page = useAppSelector(selectPage)
  const limit = useAppSelector(selectLimit)
  const posts = useAppSelector(selectPosts)

  const { data, isUninitialized, isLoading, isFetching, isError } = postApi.usePostsQuery({
    page,
    limit
  })

  const nextPage = data?.nextPage ?? 1
  const lastPage = data?.lastPage ?? 1

  const loadMorePosts = () => {
    if (isFetching || page >= lastPage) {
      return
    }
    
    dispatch(setPage(nextPage))
  }

  const divRef = useRef<HTMLDivElement>(null)

  useInView(divRef, {
    onIntersect: loadMorePosts
  })

  const POST_HEIGHT = 120
  const OVERSCAN = 1

  const { virtualItems: virtualPosts, totalHeight: listHeight } = useVirtualScroll({
    items: posts,
    itemsCount: posts.length,
    itemHeight: POST_HEIGHT,
    overscan: OVERSCAN
  })
  
  useScrollRestoration(PostList.name)

  if (isUninitialized || isLoading) {
    return <Loader center size='big' />
  }

  if (isError) {
    throw Error()
  }

  return (
    <>
      <ul className={styles.list} style={{ height: listHeight }}>
        {virtualPosts.map(({ item: post, offsetTop, height }) => {
          return <PostItem key={post.id} post={post} offset={offsetTop} height={height} />
        })}
      </ul>
      <div ref={divRef} aria-description='intesection element' />
      {isFetching && <Loader size='small' />}
    </>
  )
}

export { PostList }
