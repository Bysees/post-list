import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { router } from './router'
import '6_shared/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
  </React.StrictMode>
)
