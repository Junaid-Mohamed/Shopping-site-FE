import { useEffect, useState } from 'react';
import CartCard from '../components/CartCard';
import Navbar from '../components/Navbar';
import './cart.css';
import { useCart } from './context/CartProvider';
import { useSearch } from './context/SerachProvider';

const Cart = () => {
  const { search } = useSearch();

  const { cart, totalPrice, fetchCart } = useCart();

  const [message, setMessage] = useState('');

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const filteredCart = cart.filter((item) =>
    item.product.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main className="cart">
      <Navbar />

      <div className="my-4 text-center">
        <h1>My Cart ({cart.length}) </h1>
        <h3 style={{ color: 'green' }}>{message}</h3>
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
              <button style={{ width: '100%' }} className="btn btn-primary">
                Place order
              </button>
            </div>
          </div>
        ) : (
          <div>Cart is empty. Add items to cart</div>
        )}
      </div>
    </main>
  );
};

export default Cart;
