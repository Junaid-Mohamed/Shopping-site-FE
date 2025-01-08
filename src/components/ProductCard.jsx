import { useNavigate } from 'react-router-dom';
import fruits from '../assets/images/fruits&veggies.jpg';
import { useCart } from '../pages/context/CartProvider';
import { useWishlist } from '../pages/context/WishlistProvider';
import { StarRating } from '../pages/ProductDetails';
import './productCard.css';

const ProductCard = ({ product, handleMessage }) => {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-card">
      <img
        onClick={() => handleProductClick(product._id)}
        src={product.image}
        alt="product"
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Rs. {product.price}</p>
        <p className="rating">
              {product.rating}{' '}
              <span>
                <StarRating rating={product.rating} />
              </span>
            </p>
        <div className="product-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              addToCart(product._id);
              handleMessage('Item added to cart.');
            }}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              addToWishlist(product._id);
              handleMessage('Item added to wishlist.');
            }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
