import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './Navbar.css';
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          GrocerEase
        </Link>

        <div className="search-container">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        <div className="navbar-icons">
          {isAuthenticated ? (
            <Link
              onClick={() => {
                logout();
                navigate('/');
              }}
              to=""
              className="nav-link"
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
          {isAuthenticated ? (
            <Link
              onClick={() => navigate('/users/user-profile')}
              to=""
              className="nav-link"
            >
              <i className="fas fa-user-circle"></i>
            </Link>
          ) : (
            ''
          )}
          <Link to="/users/wishlist" className="nav-link">
            <i className="fas fa-heart"></i>
          </Link>
          <Link to="/users/cart" className="nav-link">
            <i className="fas fa-shopping-cart"> Cart</i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
