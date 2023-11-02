import { route } from '6_shared/consts'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const ErrorPage = () => {

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Что-то пошло не так...</h1>
      <Link className={styles.link} to={route.main}>
        Вернуться на главную страницу
      </Link>
    </div>
  )
}

export { ErrorPage }
