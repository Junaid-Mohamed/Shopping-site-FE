import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './categories.css';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await axios.get(
        'https://grocer-ease-five.vercel.app/api/categories'
      );
      setCategories(data.data.data.categories);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    // console.log(category)
    let categoryParam;
    if (category === 'Fruits & Vegetables') {
      categoryParam = 'Fruits,Vegetables';
    } else if (category === 'Dairy & Egg') {
      categoryParam = 'Dairy';
    } else {
      categoryParam = category;
    }
    navigate(`/products?category=${categoryParam}`);
  };

  return (
    <div className="container">
      <div className="categories-section">
        {categories.map((category) => (
          <div
            onClick={() => handleCategoryClick(category.name)}
            key={category._id}
            className="category-item"
          >
            <img
              width={100}
              height={100}
              src={category.image}
              alt={category.name}
            />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
