import { PostList } from '5_entities/post'
import styles from './styles.module.scss'

const MainPage = () => {
  
  return (
    <div className={styles.wrapper}>
      <PostList />
    </div>
  )
}

export { MainPage }
