import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderHistory, setOrders] = useState([]);

  const userId = localStorage.getItem('authToken');

  const fetchCart = async (setLoading) => {
    try {
      const response = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/cart/${userId}`
      );
      setCart(response.data);
      calculateTotal(response.data);
      setLoading(false)
    } catch (error) {
      console.log(`error fetching cart items`, error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.put(
        `https://grocer-ease-five.vercel.app/api/users/cart/clear/${userId}`
      );
      setCart([]);
    } catch (error) {
      console.log(`error fetching cart items`, error);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems?.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );
    setTotalPrice(total);
  };

  //  add to cart

  const addToCart = async (productId) => {
    try {
      const resp = await axios.post(
        'https://grocer-ease-five.vercel.app/api/users/cart/add-to-cart',
        { userId, productId }
      );
      if (resp.status == 200) {
        setCart(resp.data);
        calculateTotal(resp.data);
      }
    } catch (error) {
      console.log('Error adding to cart', error);
    }
  };

  // decrease quantity from cart

  const decreaseQuantityFromCart = async (productId) => {
    try {
      const resp = await axios.put(
        'https://grocer-ease-five.vercel.app/api/users/cart/update-cart',
        { userId, productId }
      );
      if (resp.status == 200) {
        setCart(resp.data);
        calculateTotal(resp.data);
      }
    } catch (error) {
      console.log('Error adding to cart', error);
    }
  };

  const removeFromCart = async (productId) => {
    const prod = { userId, productId };
    try {
      const resp = await axios.delete(
        'https://grocer-ease-five.vercel.app/api/users/cart/remove-from-cart',
        { data: prod }
      );
      if (resp.status == 200) {
        setCart(resp.data);
        calculateTotal(resp.data);
      }
    } catch (error) {
      console.log('error removing cart item.');
    }
  };

  //  place order

  const placeOrder = async (cart,totalPrice,address) => {
    try {
      await axios.post(`https://grocer-ease-five.vercel.app/api/users/${userId}/orders`,{cart,totalPrice,address})
      clearCart();
    } catch (error) {
      console.log('error placing orders.');
    }
  }

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/${userId}/orders`
      );
      // console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.log(`error fetching cart items`, error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        orderHistory,
        addToCart,
        removeFromCart,
        fetchCart,
        fetchOrderHistory,
        decreaseQuantityFromCart,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
