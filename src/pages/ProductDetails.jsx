import {
  faHandHoldingUsd,
  faLock,
  faStar,
  faStarHalfAlt,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from './context/CartProvider';
import './productDetails.css';

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} />);
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ opacity: 0.3 }} />
      );
    }
  }

  return <span>{stars}</span>;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        if (product) {
          setProduct(product.data);
          console.log(product);
        } else {
          console.log('No Product.');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="product-details-container">
          <div className="image-container">
            <img
              src={product.image}
              className="product-image"
              alt={product.name}
            />
            <button className="btn btn-primary button">Buy Now</button>
            <button
              onClick={() => addToCart(product._id)}
              className="btn btn-secondary button"
            >
              Add to Cart
            </button>
          </div>
          <div className="details-container">
            <p className="description">
              {product.name} {product.description}
            </p>
            <p className="rating">
              {product.rating}{' '}
              <span>
                <StarRating rating={product.rating} />
              </span>
            </p>
            <p className="price">
              ₹ {product.price} <span>₹ {product.price * 2}</span>{' '}
            </p>
            <p className="offer">50% off</p>
            <p className="quantity">
              Quantity: <span className="decrease">-</span>
              <span className="count">{1}</span>
              <span className="increase">+</span>
            </p>
            <hr />
            <div className="features">
              <div className="feature">
                <FontAwesomeIcon icon={faLock} size="2x" />
                <p>Secure Payment</p>
              </div>
              <div className="feature">
                <FontAwesomeIcon icon={faTruck} size="2x" />
                <p>Free Delivery</p>
              </div>
              <div className="feature">
                <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" />
                <p>Pay on Delivery</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
