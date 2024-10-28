import { useEffect } from 'react';
import CartCard from '../components/CartCard';
import Navbar from '../components/Navbar';
import './cart.css';
import { useCart } from './context/CartProvider';

const Cart = () => {
  const { cart, totalPrice, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main className="cart">
      <Navbar />

      <div className="my-4 text-center">
        <h1>My Cart ({cart.length}) </h1>
        {cart.length > 0 ? (
          <div className="cart-container">
            <div className="cart-items mt-2">
              {cart.map((item) => (
                <CartCard
                  key={item.product._id}
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
