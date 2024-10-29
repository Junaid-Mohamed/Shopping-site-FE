import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { getUserId } = useAuth();

  const userId = getUserId();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `https://grocer-ease-five.vercel.app/api/users/wishlist/${userId}`
        );
        setWishlist(response.data || []);
      } catch (error) {
        console.log(`error fetching wishlist`, error);
      }
    };
    fetchWishlist();
  }, []);

  // functions to add and remove from wishlist

  const addToWishlist = async (productId) => {
    const prod = { userId, productId };
    try {
      const resp = await axios.post(
        'https://grocer-ease-five.vercel.app/api/users/wishlist/add-to-wishlist/',
        prod
      );
      if (resp.status == 200) {
        setWishlist([...wishlist, productId]);
      }
    } catch (error) {
      console.log('error adding to wishlist.', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    console.log('console.log');
    const prod = { userId, productId };
    console.log(prod);
    try {
      const resp = await axios.delete(
        'https://grocer-ease-five.vercel.app/api/users/wishlist/remove-from-wishlist',
        { data: prod }
      );
      console.log(resp);
      if (resp.status == 200) {
        setWishlist(wishlist.filter((id) => id.toString() !== productId));
      }
    } catch (error) {
      console.log(`Error removing from wishlist`, error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
