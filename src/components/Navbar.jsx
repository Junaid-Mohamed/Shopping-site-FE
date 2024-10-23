import { Link } from "react-router-dom";
import './Navbar.css';
const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
            <Link to="/" className="navbar-brand" >GrocerEase</Link>

            <div className="search-container">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </div>

            <div className="navbar-icons" >
                <Link to="" className="nav-link" >Login</Link>
                <Link to="" className="nav-link" ><i className="fas fa-heart"></i></Link>
                <Link to="" className="nav-link" ><i className="fas fa-shopping-cart"> Cart</i></Link>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;