import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import WishlistCard from '../components/WishlistCard';
import { useSearch } from './context/SerachProvider';
import { useWishlist } from './context/WishlistProvider';

const Wishlist = () => {
  const { search } = useSearch();
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(true)
  const userId = localStorage.getItem('authToken');
  // console.log(userId);

  const getUserDetails = async () => {
    try {
      const user = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/${userId}`
      );
      if (user) {
        // setWishlist((prevState)=>[...prevState,{user.wishlist}]);
        setWishlist(user.data.wishlist);
        setLoading(!loading);
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const filteredWishlist = wishlist.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container my-4 text-center">
        <h1>My Wishlist</h1>
        <h3 style={{ color: 'green' }}>{message}</h3>
        <div className="row">
          {!loading?(wishlist.length === 0 ? (
            <p>Wishlist is empty, add items to wishlist</p>
          ) : (
            filteredWishlist.map((prod) => (
              <div key={prod._id} className="col-md-3">
                <WishlistCard handleMessage={handleMessage} product={prod} />
              </div>
            ))
          )):<p>Loading....</p>}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
