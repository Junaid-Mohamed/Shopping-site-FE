import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDom from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ProductListing from './pages/ProductsListing.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path: "/products",
    element: <ProductListing/>
  }
])

ReactDom.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)