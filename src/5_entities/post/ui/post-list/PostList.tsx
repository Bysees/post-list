import { FC, useMemo } from 'react'
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

  const { data, isUninitialized, isLoading, isError } = postApi.usePostsQuery({
    page,
    limit
  })

  const loadedPages = (data?.prevPage ?? 0) + 1
  const lastPage = data?.lastPage ?? 1

  const loadMorePosts = () => {
    if (page >= lastPage) {
      return
    }

    dispatch(setPage(page + 1))
  }

  const onIntersect = (isIntersect: boolean) => {
    if (!isIntersect) {
      return
    }

    loadMorePosts()
  }

  const { ref: divRef } = useInView({ onIntersect })

  //* Добавляем `пустые` посты, которые будут отображаться с Loader, до тех пор пока не загрузятся оригинальные
  const combinedPosts = useMemo(() => {
    const numberOfLoadingPosts = limit * (page - loadedPages)
    const loadingPosts: undefined[] = Array(numberOfLoadingPosts).fill(undefined)
    return [...posts, ...loadingPosts]
  }, [posts, limit, page, loadedPages])

  const POST_HEIGHT = 120
  const OVERSCAN = 1

  const { virtualItems: virtualPosts, totalHeight: listHeight } = useVirtualScroll({
    items: combinedPosts,
    itemsCount: combinedPosts.length,
    itemHeight: POST_HEIGHT,
    overscan: OVERSCAN
  })

  const lastVirtualItem = virtualPosts[virtualPosts.length - 1]

  useScrollRestoration(PostList.name)

  if (isUninitialized || isLoading) {
    return <Loader center size='big' />
  }

  if (isError) {
    throw Error()
  }

  return (
    <ul className={styles.list} style={{ height: listHeight }}>
      {virtualPosts.map(({ item: post, offsetTop, height }) => {
        return <PostItem key={offsetTop} offset={offsetTop} height={height} post={post} />
      })}

      {lastVirtualItem && (
        <div
          ref={divRef}
          aria-description='intersection element'
          style={{
            position: 'absolute',
            transform: `translate3d(0, ${lastVirtualItem.offsetTop}px, 0)`
          }}
        />
      )}
    </ul>
  )
}

export { PostList }
