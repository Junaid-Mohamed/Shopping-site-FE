
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';



const OrderSuccess = () => {
 
  return (
    <>
      <Navbar />
      <div className='container my-4' >
      <h3 style={{ color: 'green' }} >Order Placed Successfully.</h3>
      <Link to={'/products'} className='btn btn-secondary' >Continue Shopping</Link>
      </div>
    </>
  );
};

export default OrderSuccess;
