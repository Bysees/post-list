import { FC } from 'react'
import { Link } from 'react-router-dom'
import { postApi } from '../../api/postApi'
import { Post } from '../../model/types'
import { route } from '6_shared/consts'
import { Loader } from '6_shared/ui'
import styles from './styles.module.scss'

type Props = {
  postId: Post['id']
}

const PostCard: FC<Props> = ({ postId }) => {

  const { data, isLoading, isUninitialized, isFetching, isError } = postApi.usePostByIdQuery(postId)

  if (isLoading || isUninitialized || isFetching) {
    return <Loader center size='big' />
  }

  if (isError) {
    throw Error()
  }

  const { body, id, title } = data

  return (
    <div className={styles.post}>
      <div className={styles.post__id}>Post id - {id} </div>
      <h2 className={styles.post__title}>{title}</h2>
      <p className={styles.post__body}>{body}</p>
      <Link className={styles.link} to={route.main}>
        назад
      </Link>
    </div>
  )
}

export { PostCard }
