import fruits from "../assets/images/fruits&veggies.jpg";
import "./productCard.css";

const ProductCard = ({product, addToCart, addToWishlist}) => {
    return(
        <div className="product-card">
            <img src={fruits} alt="product" className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <div className="product-actions">
                    <button
                    className="btn btn-primary"
                    onClick={()=> addToCart(product)}
                    >Add to Cart</button>
                    <button
                    className="btn btn-secondary"
                    onClick={()=> addToWishlist(product)}
                    >Add to Wishlist</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;