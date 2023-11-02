import { useParams } from 'react-router-dom'
import { PostCard } from '5_entities/post'

const PostPage = () => {
  const { postId } = useParams()

  if (!postId) {
    throw Error('The component should be used provided that the postId is definitely not undefined')
  }

  return <PostCard postId={Number(postId)} />
}

export { PostPage }
