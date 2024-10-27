import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import './productsListing.css';

const ProductListing = () => {
  const [loading, setLoading] = useState('Products are loading...');
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: 0,
    category: [],
    rating: 0,
    sort: 'price-asc',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await axios.get('http://localhost:3000/api/products');
      setProducts(data.data.data.products);
      setLoading('');
    };
    fetchProducts();

    const query = new URLSearchParams(location.search);
    const category = query.get('category');
    const categoryArray = category ? category.split(',') : [];
    setFilters((prevState) => ({
      ...prevState,
      category: categoryArray,
    }));
  }, [location]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'category') {
      setFilters((prevState) => {
        const newCategories = checked
          ? [...prevState.category, value]
          : prevState.category.filter((cat) => cat !== value);

        return {
          ...prevState,
          category: newCategories,
        };
      });
    } else if (name === 'price') {
      setFilters((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  //   const addToCart = (product) => {
  //     console.log(product, 'adding to cart');
  //   };

  //   const addToWishlist = (product) => {
  //     console.log(product, 'adding to wishlist');
  //   };

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products.filter((product) => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(product.category);

      const ratingMatch = product.rating >= filters.rating;

      const priceMatch = filters.price === 0 || product.price <= filters.price;

      return categoryMatch && ratingMatch && priceMatch;
    });

    if (filters.sort === 'price-asc') {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }, [products, filters]);

  return (
    <>
      <Navbar />

      <div className="products-page">
        <div className="filters-container">
          <div className="filter-heading">
            <h4>Filters</h4>
            <a>Clear</a>
          </div>
          <div className="filter-price">
            <h4>Price</h4>
            <div className="price-labels">
              <span>50</span>
              <span>100</span>
              <span>150</span>
              <span>200</span>
              <span>250</span>
              <span>300</span>
            </div>

            <input
              type="range"
              min="50"
              step="50"
              max="300"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-category">
            <h4>Category</h4>
            <div className="category-labels">
              <label htmlFor="category">
                <input
                  type="checkbox"
                  checked={filters.category.includes('Fruits')}
                  value="Fruits"
                  onChange={handleFilterChange}
                  name="category"
                />{' '}
                Fruits
              </label>
              <label htmlFor="category">
                <input
                  type="checkbox"
                  checked={filters.category.includes('Vegetables')}
                  value="Vegetables"
                  onChange={handleFilterChange}
                  name="category"
                />{' '}
                Vegetables
              </label>
              <label htmlFor="category">
                <input
                  type="checkbox"
                  checked={filters.category.includes('Dairy')}
                  value="Dairy"
                  onChange={handleFilterChange}
                  name="category"
                />{' '}
                Dairy & Eggs
              </label>
              <label htmlFor="category">
                <input
                  type="checkbox"
                  checked={filters.category.includes('Beverages')}
                  value="Beverages"
                  onChange={handleFilterChange}
                  name="category"
                />{' '}
                Beverages
              </label>
              <label htmlFor="category">
                <input
                  type="checkbox"
                  checked={filters.category.includes('Bakery')}
                  value="Bakery"
                  onChange={handleFilterChange}
                  name="category"
                />{' '}
                Bakery
              </label>
              <label htmlFor="category">
                <input
                  type="checkbox"
                  checked={filters.category.includes('Snacks')}
                  value="Snacks"
                  onChange={handleFilterChange}
                  name="category"
                />{' '}
                Snacks
              </label>
            </div>
          </div>
          <div className="filter-rating">
            <h4>Rating</h4>
            <div className="rating-labels">
              <label>
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="rating"
                  value={4}
                />{' '}
                4 Stars & above
              </label>
              <label>
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="rating"
                  value={3}
                />{' '}
                3 Stars & above
              </label>
              <label>
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="rating"
                  value={2}
                />{' '}
                2 Stars & above
              </label>
              <label>
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="rating"
                  value={1}
                />{' '}
                1 Star & above
              </label>
            </div>
          </div>
          <div className="filter-sort-price">
            <h4>Sort by</h4>
            <div className="sort-labels">
              <label>
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="sort"
                  value="price-asc"
                />{' '}
                Price - Low to High{' '}
              </label>
              <label>
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="sort"
                  value="price-desc"
                />{' '}
                Price - High to Low{' '}
              </label>
            </div>
          </div>
        </div>

        {/* Products container */}

        <div className="products-container">
          <p>{loading}</p>
          <h2>
            Showing All Groceries{' '}
            <span>
              (Showing all {filteredAndSortedProducts.length} products)
            </span>{' '}
          </h2>
          <div className="row">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product._id}
                // onClick={() => handleProductClick(product._id)}
                className="col-md-4"
              >
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;

/**
 * const filteredProduct = products.filter((product)=> {
        if(filters.category !== "All" && filters.category !== product.category) return false;
        if(product.rating < filters.rating) return false;
        return true;
    })

    const sortedProducts = [...filteredProduct].sort((a,b)=> {
        if(filters.sort === 'price-asc') return a.price - b.price;
        else if(filters.sort === 'price-dsc') return b.price - a.price;
        return 0;
    })

    
 */
