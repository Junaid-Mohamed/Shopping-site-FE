import { Link } from "react-router-dom";
import './Navbar.css';
const Navbar = () => {
    return (
        <nav className="container navbar navbar-light bg-light">
            <Link to="/" className="navbar-brand" >Electroic Store</Link>

            <div className="search-container">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </div>

            <div className="navbar-icons" >
                <Link to="" className="nav-link" >Login</Link>
                <Link to="" className="nav-link" ><i className="fas fa-heart"></i></Link>
                <Link to="" className="nav-link" ><i className="fas fa-shopping-cart"></i></Link>
            </div>
        </nav>
    )
}

export default Navbar;