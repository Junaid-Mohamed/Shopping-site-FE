import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  //   regex for email and phonenumber
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';

    // Email validation
    if (!emailRegex.test(formData.email))
      newErrors.email = 'Enter a valid email address';

    // Password validation
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    // Phone number validation
    if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number must be 10 digits';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      //   console.log('FormData submitted.', formData);
      const data = await axios.post(
        'http://localhost:3000/api/users/',
        formData
      );
      setSuccessMsg('Signed up successfully. Now you can login.');
      //   console.log(data);
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/login');
      }, 3000);
    } else {
      console.log('Form not valid');
    }
  };

  return (
    <div className="container m-4 p-4 w-50">
      <h1 className="my-4"> Sign Up</h1>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={handleFormChange}
            value={formData.name}
            className="form-control"
            name="name"
            placeholder="Name"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            onChange={handleFormChange}
            className="form-control"
            name="email"
            value={formData.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            onChange={handleFormChange}
            value={formData.password}
            className="form-control"
            name="password"
            placeholder="Password"
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div className="form-group mt-3">
          <label>Phone Number</label>
          <input
            type="text"
            onChange={handleFormChange}
            value={formData.phoneNumber}
            className="form-control"
            name="phoneNumber"
            placeholder="Phone"
          />
          {errors.phoneNumber && (
            <p style={{ color: 'red' }}>{errors.phoneNumber}</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label>Address</label>
          <input
            type="text"
            onChange={handleFormChange}
            value={formData.address.street}
            className="form-control"
            name="street"
            placeholder="Street"
          />
          <input
            type="text"
            onChange={handleFormChange}
            value={formData.address.city}
            className="form-control mt-2"
            name="city"
            placeholder="City"
          />
          <input
            type="text"
            onChange={handleFormChange}
            value={formData.address.state}
            className="form-control mt-2"
            name="state"
            placeholder="State"
          />
          <input
            type="text"
            onChange={handleFormChange}
            value={formData.address.postalCode}
            className="form-control mt-2"
            name="postalCode"
            placeholder="Postal Code"
          />
        </div>
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="btn btn-primary my-4"
        >
          Sign Up
        </button>
      </form>
      <Link to={'/login'} style={{ textDecoration: 'none' }}>
        Have an account?{' '}
        <span style={{ textDecoration: 'underline' }}>Login in</span>
      </Link>
      <div>
        <p style={{ color: 'green', fontSize: '1.2rem', paddingTop: '10px' }}>
          {successMsg}
        </p>
      </div>
    </div>
  );
};

export default Signup;
