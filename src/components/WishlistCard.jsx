import './wishlistCard.css';

const WishlistCard = ({ product }) => {
  return (
    <div className="wishlist-card">
      <img className="image" src={product.image} alt={product.name} />
      <i class="fas fa-heart heart"></i>
      <p>{product.name}</p>
      <h3>₹{product.price}</h3>
      <button style={{ width: '100%' }} className="btn btn-secondary">
        Move to Cart
      </button>
    </div>
  );
};

export default WishlistCard;
