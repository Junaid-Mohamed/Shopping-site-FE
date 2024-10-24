import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import productData from "./products.json";
import './productsListing.css';

const ProductListing = () => {
    
    const [products, setProducts] = useState(productData);
    const [filters,setFilters] = useState({
        price: 50,
        category: "All",
        rating: 0,
        sort: "price-asc"
    });

    const handleFilterChange = (e) => {
        const {name, value, checked} = e.target;

        if(name === "category"){
            setFilters((prevState)=> {
                const newCategories = checked ? 
                [...prevState.category, value]
                : prevState.category.filter((cat)=> cat !== value);

                return {
                    ...prevState,
                    category: newCategories
                }
            })
        }
        else{
            setFilters((prevState)=>({
                ...prevState,
                [name]: value
        }))  
        }

        console.log(filters);
        
    }

   const addToCart = (product) => {
    console.log(product, "adding to cart");
   } 

   const addToWishlist = (product) => {
    console.log(product, "adding to wishlist")
   }

    return (
        <>
        <Navbar/>
    
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
                        </div>

                    <input type="range"
                        min="50"
                        max="200"
                        step="50"
                        name="price"
                        value={filters.price}
                        onChange={handleFilterChange}
                        
                    />

                </div>
                <div className="filter-category">
                    <h4>Category</h4>
                    <div className="category-labels" >
                    <label htmlFor="category"><input type="checkbox" value="ruits & Vegetables" onChange={handleFilterChange} name="category"/> Fruits & Vegetables</label>
                    <label htmlFor="category"><input type="checkbox" value="Dairy & Eggs" onChange={handleFilterChange} name="category"/> Dairy & Eggs</label>
                    <label htmlFor="category"><input type="checkbox" value="Beverages" onChange={handleFilterChange} name="category"/> Beverages</label>
                    <label htmlFor="category"><input type="checkbox" value="Bakery" onChange={handleFilterChange} name="category"/> Bakery</label>
                    <label htmlFor="category"><input type="checkbox" value="Snacks" onChange={handleFilterChange} name="category"/> Snacks</label>
                    </div>
                </div>
                <div className="filter-rating" >
                    <h4>Rating</h4>
                    <div className="rating-labels" >
                        <label htmlFor=""><input type="radio" name="rating" value={4}/> 4 Stars & above</label>
                        <label htmlFor=""><input type="radio" name="rating" value={3}/> 3 Stars & above</label>
                        <label htmlFor=""><input type="radio" name="rating" value={2}/> 2 Stars & above</label>
                        <label htmlFor=""><input type="radio" name="rating" value={1}/> 1 Star & above</label>
                    </div>
                </div>
                <div className="filter-sort-price">
                    <h4>Sort by</h4>
                    <div className="sort-labels" >
                        <label htmlFor=""><input type="radio" name="sort" value="price-asc"/> Price - Low to High </label>
                        <label htmlFor=""><input type="radio" name="sort" value="price-desc"/> Price - High to Low </label>
                    </div>
                </div>
            </div>
            <div className="products-container">
                <h2>Showing All Groceries <span>(Showing all {productData.length} products)</span> </h2>
                <div className="row">
                    
                    {productData.map(product=>(
                        <div className="col-md-4" >
                        <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        addToWishlist={addToWishlist}
                        />
                        </div>
                    ))}
                </div>
            </div>
        </div>
  
        </>
    )
}

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