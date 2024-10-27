import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted.');
    console.log(formData);
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
    </div>
  );
};

export default Login;
