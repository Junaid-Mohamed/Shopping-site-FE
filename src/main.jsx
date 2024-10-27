import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Login from './pages/Login.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import ProductListing from './pages/ProductsListing.jsx';
import Signup from './pages/Signup.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products',
    element: <ProductListing />,
  },
  {
    path: '/products/:id',
    element: <ProductDetails />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

ReactDom.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
