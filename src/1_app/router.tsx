import { createBrowserRouter } from 'react-router-dom'
import { PostPage } from '2_pages/post'
import { MainPage } from '2_pages/main'
import { ErrorPage } from '2_pages/error/ErrorPage'
import { route } from '6_shared/consts/routes'

export const router = createBrowserRouter(
  [
    {
      path: route.main,
      element: <MainPage />,
      errorElement: <ErrorPage />
    },
    {
      path: `${route.posts}/:postId`,
      element: <PostPage />,
      errorElement: <ErrorPage />
    }
  ],
  { basename: import.meta.env.BASE_URL }
)
