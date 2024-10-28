import { useNavigate } from 'react-router-dom';
import freshDeal from '../assets/images/fresh-deal.jpg';
import seasonal from '../assets/images/seasonal-offers.jpg';
import './promotion.css';

const PromotionSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="promo-section">
        <div onClick={() => navigate('/products')} className="promo-banner">
          <img className="promo-image" src={freshDeal} alt="" />
          <div>
            <h2>Fresh Deals</h2>
            <p>Grab the best deals on the fresh groceries this season.</p>
          </div>
        </div>
        <div className="promo-banner">
          <img
            onClick={() => navigate('/products')}
            className="promo-image"
            src={seasonal}
            alt=""
          />
          <div>
            <h2>Seasonal Offers</h2>
            <p>Exclusive discounts on selected items this week.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionSection;
