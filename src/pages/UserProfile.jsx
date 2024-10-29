import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Navbar from '../components/Navbar';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});

  const { getUserId } = useAuth();

  const userId = getUserId();

  const getUserDetails = async () => {
    try {
      const user = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/${userId}`
      );
      if (user) {
        // console.log(user);
        setUserProfile(user.data);
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1>User Profile</h1>
        <p>
          <strong>Name:</strong> {userProfile.name}
        </p>
        <p>
          <strong>Email Id:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userProfile.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong>
        </p>
        <ul>
          {userProfile?.address?.map((addr, index) => (
            <li key={index}>
              {addr.street}, {addr.city}, {addr.state}, {addr.postalCode}
            </li>
          ))}
        </ul>
        <Link className="btn btn-info" to={'/products'}>
          Explore products
        </Link>
      </div>
    </>
  );
};

export default UserProfile;
