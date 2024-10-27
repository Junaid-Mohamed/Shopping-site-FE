import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import WishlistCard from '../components/WishlistCard';
import { useWishlist } from './context/WishlistProvider';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem('authToken');
  // console.log(userId);

  const getUserDetails = async () => {
    try {
      const user = await axios.get(`http://localhost:3000/api/users/${userId}`);
      if (user) {
        console.log(user);
        console.log(user.wishlist);
        // setWishlist((prevState)=>[...prevState,{user.wishlist}]);
        setWishlist(user.data.wishlist);
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  console.log(wishlist);
  return (
    <>
      <Navbar />
      <div className="container my-4 text-center">
        <h1>My Wishlist</h1>
        <div className="row">
          {wishlist.map((prod) => (
            <div className="col-md-3">
              <WishlistCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
