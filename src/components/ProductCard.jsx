import fruits from '../assets/images/fruits&veggies.jpg';
import { useWishlist } from '../pages/context/WishlistProvider';
import './productCard.css';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const handleProductClick = (productId) => {
    console.log(productId);
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
        <p className="product-price">{product.price}</p>
        <div className="product-actions">
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => addToWishlist(product._id)}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
