import { FC, memo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../model/types'
import { route } from '6_shared/consts'
import styles from './styles.module.scss'

type Props = {
  post: Post
  offset: number
  height: number
}

const PostItem: FC<Props> = memo(({ offset, height, post }) => {
  const { body, id, title } = post
  const postHeight = height

  const itemRef = useRef<HTMLParagraphElement>(null)
  const [isOverflowText, setIsOverflowText] = useState(false)

  useEffect(() => {
    if (!itemRef.current) {
      return
    }

    const element = itemRef.current

    const checkIsOverflow = () => {
      const isOverflowed = element.scrollWidth > element.offsetWidth
      setIsOverflowText(isOverflowed)
    }

    checkIsOverflow()

    window.addEventListener('resize', checkIsOverflow)

    return () => {
      window.removeEventListener('resize', checkIsOverflow)
    }
  }, [])

  return (
    <li
      className={styles.item}
      style={{
        height: postHeight,
        transform: `translate3d(0, ${offset}px, 0)`
      }}>
      <div className={styles.item__wrapper}>
        <h5 className={styles.item__title}>
          {id} : {title}
        </h5>
        <p ref={itemRef} className={styles.item__body}>
          {body}
        </p>
        {isOverflowText && (
          <div className={styles.item__link}>
            <Link to={`${route.posts}/${id}`}>просмотр</Link>
          </div>
        )}
      </div>
    </li>
  )
})

export { PostItem }
