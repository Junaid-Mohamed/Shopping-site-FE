import { useCart } from '../pages/context/CartProvider';
import { useWishlist } from '../pages/context/WishlistProvider';
import './cartCard.css';

const CartCard = ({ product, quantity }) => {
  const { addToWishlist } = useWishlist();
  const { removeFromCart } = useCart();

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
          Quantity: <span className="decrease">-</span>
          <span className="count">{quantity}</span>
          <span className="increase">+</span>
        </p>

        <button
          onClick={() => {
            removeFromCart(product._id);
            window.location.reload();
          }}
          className="btn btn-secondary btn-cart"
        >
          Remove from Cart
        </button>
        <button
          onClick={() => {
            addToWishlist(product._id);
            removeFromCart(product._id);
            window.location.reload();
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
