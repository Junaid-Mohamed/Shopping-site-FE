import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = localStorage.getItem('authToken');

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/cart/${userId}`
      );
      setCart(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.log(`error fetching cart items`, error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

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

  const decreaseQuantityFromCart = async(productId)=>{
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
  }

  const removeFromCart = async (productId) => {
    console.log(userId, productId);
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

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, addToCart, removeFromCart, fetchCart, decreaseQuantityFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
