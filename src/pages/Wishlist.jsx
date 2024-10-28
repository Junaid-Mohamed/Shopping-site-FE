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

  return (
    <>
      <Navbar />
      <div className="container my-4 text-center">
        <h1>My Wishlist</h1>
        <div className="row">
          {wishlist.length === 0 ? (
            <p>Wishlist is empty, add items to wishlist</p>
          ) : (
            wishlist.map((prod) => (
              <div key={prod._id} className="col-md-3">
                <WishlistCard product={prod} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
