import { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../model/types'
import { route } from '6_shared/consts'
import { useResizeObserver } from '6_shared/lib'
import { Loader } from '6_shared/ui'
import styles from './styles.module.scss'

type Props = {
  post?: Post
  offset: number
  height: number
}

const PostItem: FC<Props> = memo(({ offset, height, post }) => {
  const postHeight = height

  const [isOverflowText, setIsOverflowText] = useState(false)

  const onResize: ResizeObserverCallback = ([entry]) => {
    const { scrollWidth, offsetWidth } = entry.target as HTMLParagraphElement
    const isOverflowed = scrollWidth > offsetWidth
    setIsOverflowText(isOverflowed)
  }

  const ref = useResizeObserver(onResize)

  const postContent = ({ body, id, title }: Post) => {
    return (
      <>
        <h5 className={styles.item__title}>
          {id} : {title}
        </h5>
        <p ref={ref} className={styles.item__body}>
          {body}
        </p>
        {isOverflowText && (
          <div className={styles.item__link}>
            <Link to={`${route.posts}/${id}`}>просмотр</Link>
          </div>
        )}
      </>
    )
  }

  return (
    <li
      className={styles.item}
      style={{
        height: postHeight,
        transform: `translate3d(0, ${offset}px, 0)`
      }}>
      <div className={styles.item__wrapper}>
        {post ? postContent(post) : <Loader center size='small' />}
      </div>
    </li>
  )
})

export { PostItem }
