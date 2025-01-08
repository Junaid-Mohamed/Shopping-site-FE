import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Navbar from '../components/Navbar';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [editAddress, setEditAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected delivery address

  const { getUserId } = useAuth();
  const userId = getUserId();

  // Fetch user details
  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://grocer-ease-five.vercel.app/api/users/${userId}`
      );
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Add new address
  const handleAddAddress = async () => {
    try {
      const response = await axios.put(
        `https://grocer-ease-five.vercel.app/api/users/${userId}/address`,
        newAddress
      );
      setUserProfile(response.data);
      setNewAddress({ street: '', city: '', state: '', postalCode: '' });
    } catch (error) {
      console.log(error);
    }
  };

  // Edit existing address
  const handleEditAddress = async (addressId) => {
    try {
      const response = await axios.put(
        `https://grocer-ease-five.vercel.app/api/users/${userId}/address/${addressId}`,
        editAddress
      );
      setUserProfile(response.data);
      setEditAddress(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete address
  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `https://grocer-ease-five.vercel.app/api/users/${userId}/address/${addressId}`
      );
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Select address for delivery
  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

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

        <h3>Addresses:</h3>
        
          {userProfile?.address?.map((addr) => (
            <li
              key={addr._id}
              style={{
                border:
                  addr._id === selectedAddress
                    ? '2px solid black'
                    : '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                margin: '10px 0',
                width: '50%',
                listStyle: 'none',
              }}
            >
              {addr.street}, {addr.city}, {addr.state}, {addr.postalCode} <br />
              <button
                className="btn btn-primary mt-2 mx-2"
                onClick={() => setEditAddress(addr)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger mt-2 mx-2"
                onClick={() => handleDeleteAddress(addr._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary mt-2 mx-2"
                onClick={() => handleSelectAddress(addr._id)}
              >
                {addr._id === selectedAddress
                  ? 'Selected for Delivery'
                  : 'Select for Delivery'}
              </button>
            </li>
          ))}
        

        {/* Add new address form */}
        <h3 className="mt-4">
          {editAddress ? 'Edit Address' : 'Add New Address'}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editAddress
              ? handleEditAddress(editAddress._id)
              : handleAddAddress();
          }}
        >
          <input
            className="my-2 me-3"
            type="text"
            placeholder="Street"
            value={editAddress ? editAddress.street : newAddress.street}
            onChange={(e) =>
              editAddress
                ? setEditAddress({ ...editAddress, street: e.target.value })
                : setNewAddress({ ...newAddress, street: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City"
            value={editAddress ? editAddress.city : newAddress.city}
            onChange={(e) =>
              editAddress
                ? setEditAddress({ ...editAddress, city: e.target.value })
                : setNewAddress({ ...newAddress, city: e.target.value })
            }
          />{' '}
          <br />
          <input
            className="my-2 me-3"
            type="text"
            placeholder="State"
            value={editAddress ? editAddress.state : newAddress.state}
            onChange={(e) =>
              editAddress
                ? setEditAddress({ ...editAddress, state: e.target.value })
                : setNewAddress({ ...newAddress, state: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={editAddress ? editAddress.postalCode : newAddress.postalCode}
            onChange={(e) =>
              editAddress
                ? setEditAddress({ ...editAddress, postalCode: e.target.value })
                : setNewAddress({ ...newAddress, postalCode: e.target.value })
            }
          />
          <button className="btn btn-secondary mx-2" type="submit">
            {editAddress ? 'Update Address' : 'Add Address'}
          </button>
          {editAddress && (
            <button onClick={() => setEditAddress(null)}>Cancel</button>
          )}
        </form>

        <Link className="btn btn-info" to={'/products'}>
          Explore Products
        </Link>
        <Link className="btn btn-info m-4" to={'/users/cart'}>
          Checkout
        </Link>
      </div>
    </>
  );
};

export default UserProfile;
