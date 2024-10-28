import { useNavigate } from 'react-router-dom';
import { useCart } from '../pages/context/CartProvider';
import { useWishlist } from '../pages/context/WishlistProvider';
import './wishlistCard.css';

const WishlistCard = ({ product, handleMessage }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="wishlist-card">
      <img className="image" src={product.image} alt={product.name} />
      <i className="fas fa-heart heart"></i>
      <p>{product.name}</p>
      <h3>₹{product.price}</h3>
      <button
        onClick={() => {
          addToCart(product._id);
          handleMessage('Item moved to cart');
          setTimeout(() => {
            navigate('/users/cart');
          }, 2000);
        }}
        style={{ width: '100%' }}
        className="btn btn-secondary"
      >
        Move to Cart
      </button>
      <button
        onClick={() => {
          removeFromWishlist(product._id);
          handleMessage('Item removed from wishlist');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }}
        style={{ width: '100%', marginTop: '10px' }}
        className="btn btn-danger"
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistCard;
