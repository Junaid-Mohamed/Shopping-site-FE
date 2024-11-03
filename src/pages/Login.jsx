import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const from = location.state?.from || '/';
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        'https://grocer-ease-five.vercel.app/api/users/login',
        formData
      );
      if (data.status == 200) {
        console.log(data);
        setSuccessMsg('Logged in successfully.');
        setTimeout(() => {
          setSuccessMsg('');
          login(data.data.userId);
          navigate(from, { replace: true });
        }, 2000);
      }
    } catch (error) {
      // console.log("Inside error");
      setSuccessMsg(error.response.data.message);
      setFormData((prevState) => ({
        email: '',
        password: '',
      }));
      // console.log(error.response.data.message);
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container m-4 p-4 w-50">
      <h1 className="my-4"> Login</h1>

      <div className="my-4">
        <div className="card">
          <div className="card-header">
            Test details to test the application functionlaity
          </div>
          <div className="card-body">
            <p className="card-text">email: test@gmail.com</p>
            <p className="card-text">password: TestPass</p>
            <hr />
            <p className="btn btn-info">
              Note: If you wish to signup you can go to signup page.
            </p>
          </div>
        </div>
      </div>

      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            onChange={handleFormDataChange}
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={formData.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mt-4">
          <label>Password</label>
          <input
            type="password"
            onChange={handleFormDataChange}
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formData.password}
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="btn btn-primary my-4"
        >
          Login
        </button>
      </form>
      <Link to={'/signup'} style={{ textDecoration: 'none' }}>
        Don't have an account?{' '}
        <span style={{ textDecoration: 'underline' }}>Sign Up</span>
      </Link>
      <div className="mt-3">{successMsg}</div>
    </div>
  );
};

export default Login;
