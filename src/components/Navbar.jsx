import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useSearch } from '../pages/context/SerachProvider';
import './Navbar.css';
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const { search, setSearch } = useSearch();

  const navigate = useNavigate();

  let cartCount = 2;
  let wishlistCount = 3;

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <Link to="/users/user-profile" className="nav-link">
              <i style={{ color: 'green' }} className="fas fa-user-circle"></i>
            </Link>
          ) : (
            ''
          )}
          <Link to="/users/wishlist" className="nav-link">
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </Link>
          <Link to="/users/cart" className="nav-link">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
