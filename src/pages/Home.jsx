import market from '../assets/images/super-market.jpg';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PromotionSection from '../components/PromotionSection';

const imageStyle = {
  width: '100%',
  height: '450px',
  objectFit: 'cover',
  borderRadius: '16px',
  marginTop: '15px',
  marginBottom: '15px',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <Navbar />
      <Categories />
      <div style={containerStyle}>
        <img
          className="container"
          style={imageStyle}
          src={market}
          alt="market"
        />
      </div>
      <PromotionSection />
      <Footer />
    </div>
  );
};

export default Home;
