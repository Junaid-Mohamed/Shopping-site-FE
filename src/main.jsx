import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import './index.css';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import ProductListing from './pages/ProductsListing.jsx';
import Signup from './pages/Signup.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Wishlist from './pages/Wishlist.jsx';
import { CartProvider } from './pages/context/CartProvider.jsx';
import { SearchProvider } from './pages/context/SerachProvider.jsx';
import { WishlistProvider } from './pages/context/WishlistProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products',
    element: <ProtectedRoute element={<ProductListing />} />,
  },
  {
    path: '/products/:id',
    element: <ProtectedRoute element={<ProductDetails />} />,
  },
  {
    path: '/users/user-profile',
    element: <ProtectedRoute element={<UserProfile />} />,
  },
  {
    path: '/users/wishlist',
    element: <ProtectedRoute element={<Wishlist />} />,
  },
  {
    path: '/users/cart',
    element: <ProtectedRoute element={<Cart />} />,
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
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
