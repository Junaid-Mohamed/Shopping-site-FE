import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import CartCard from '../components/CartCard';
import Navbar from '../components/Navbar';
import './cart.css';
import { useCart } from './context/CartProvider';
import { useSearch } from './context/SerachProvider';

const Cart = () => {
  const { search } = useSearch();

  const { cart, totalPrice, fetchCart, placeOrder } = useCart();
  const [placeOrderCheck,setPlaceOrder] = useState(false);
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected delivery address
  const navigate = useNavigate();
   const { getUserId } = useAuth();
    const userId = getUserId();

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

   // Fetch user details
   const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/${userId}`
      );
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async() => {
    if(selectedAddress){
      const deliveryAddress = userProfile.address.filter(addr=>addr._id===selectedAddress)
      placeOrder(cart,totalPrice + totalPrice * 0.2,deliveryAddress[0]);
      navigate('/order/success');
    }
    else{
      alert('Please select address to place order')
    }
  }

  useEffect(() => {
    fetchCart(setLoading);
    getUserDetails();
  }, []);

  const filteredCart = cart.filter((item) =>
    item.product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Select address for delivery
  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <main className="cart">
      <Navbar />

      <div className="my-4 text-center">
        <h1>My Cart ({cart.length}) </h1>
        <h3 style={{ color: 'green' }}>{message}</h3>
        {loading? <p>Loading....</p>:<>
        {cart.length > 0 ? (
          <div className="cart-container">
            <div className="cart-items mt-2">
              {filteredCart.map((item) => (
                <CartCard
                  key={item.product._id}
                  handleMessage={handleMessage}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <div className="price-details mt-2">
              <p className="heading">PRICE DETAILS</p>
              <hr />
              <div className="price-sub-details">
                <div className="price-descp">
                  <p>
                    Price ({cart.length} {cart.length > 1 ? `items` : 'item'})
                  </p>
                  <p>Discount</p>
                  <p>Delivery Charges</p>
                </div>
                <div className="price-amount">
                  <p>₹{totalPrice}</p>
                  <p>- ₹{totalPrice * 0.5}</p>
                  <p>₹{totalPrice * 0.2}</p>
                </div>
              </div>
              <hr />
              <div className="total">
                <p>TOTAL AMOUNT</p>
                <p>₹ {totalPrice + totalPrice * 0.2}</p>
              </div>
              <hr />
              <p className="discount">
                You will save ₹{totalPrice * 0.5} on this order
              </p>
              {placeOrderCheck && <>
              <h3>Select Address:</h3>
          {userProfile?.address?.map((addr) => (
            <li
              key={addr._id}
              style={{
                border:
                  addr._id === selectedAddress
                    ? '2px solid black'
                    : '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                margin: '10px 0',
                listStyle: 'none',
              }}
            >
              {addr.street}, {addr.city}, {addr.state}, {addr.postalCode} <br /> 
              <button
                className="btn btn-primary mt-2 mx-2"
                onClick={() => handleSelectAddress(addr._id)}
              >
                {addr._id === selectedAddress
                  ? 'Selected for Delivery'
                  : 'Select for Delivery'}
              </button>
            </li>
          ))}
              <Link to={'/users/user-profile'} style={{ width: '100%' }} className="btn btn-outline-primary my-2">
                Add New Address
              </Link>
              <button onClick={handlePlaceOrder} style={{ width: '100%' }} className="btn btn-primary">
                Place order
              </button>
              
              </>}
              { !placeOrderCheck && <button onClick={()=>setPlaceOrder(true)} style={{ width: '100%' }} className="btn btn-primary">
                Select Address & Place order
              </button>}
            </div>
          </div>
        ) : (
          <div>
            <p>Cart is empty. Add items to cart</p>
            <Link to={'/products'} className='btn btn-secondary' >Continue Shopping</Link>
             </div>
        )}
        </>}
      </div>
    </main>
  );
};

export default Cart;
