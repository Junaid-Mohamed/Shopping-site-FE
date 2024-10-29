import { useCart } from '../pages/context/CartProvider';
import { useWishlist } from '../pages/context/WishlistProvider';
import './cartCard.css';

const CartCard = ({ product, quantity, handleMessage }) => {
  const { addToWishlist } = useWishlist();
  const { removeFromCart, addToCart, decreaseQuantityFromCart } = useCart();

  return (
    <div className="cart-card">
      <img src={product.image} alt={product.name} className="cart-image" />
      <div className="cart-details">
        <p>{product.name}</p>
        <h4 className="price">
          ₹{product.price} <span>{product.price * 2}</span>{' '}
        </h4>
        <p className="offer">50% off</p>
        <p className="quantity">
          Quantity: <span onClick={()=> quantity>1? decreaseQuantityFromCart(product._id):alert("cannot decrement quantity more than 1")} className="decrease">-</span>
          <span className="count">{quantity}</span>
          <span onClick={()=> addToCart(product._id)} className="increase">+</span>
        </p>

        <button
          onClick={() => {
            removeFromCart(product._id);
            // window.location.reload();
            handleMessage('Item removed from cart');
          }}
          className="btn btn-secondary btn-cart"
        >
          Remove from Cart
        </button>
        <button
          onClick={() => {
            quantity=1;
            addToWishlist(product._id);
            removeFromCart(product._id);
            setTimeout(() => {
              window.location.reload();
            }, 3000);

            handleMessage('Item moved to wishlist');
          }}
          className="btn btn-wishlist"
        >
          Move to wishlist
        </button>
      </div>
    </div>
  );
};

export default CartCard;
