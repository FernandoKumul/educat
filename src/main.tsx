import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import router from './router'
import { GoogleOAuthProvider } from '@react-oauth/google'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='775584470054-nj6mpn55vgluu3arst36546t3g6e9sju.apps.googleusercontent.com' >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
