import axios from "axios";
import { useEffect, useState } from "react";
import bakery from "../assets/images/bakery.jpg";
import beverages from "../assets/images/beverages.jpg";
import dairy from "../assets/images/dairy&eggs.jpg";
import fruits from "../assets/images/fruits&veggies.jpg";
import snacks from "../assets/images/snacks.jpg";
import "./categories.css";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const fetchCategories = async () => {
            const data = await axios.get('http://localhost:3000/api/categories');
            console.log(data.data.data.categories);
            setCategories(data.data.data.categories);
        }
        fetchCategories();
        
    },[])

    return(
        <div className="container">
        <div className="categories-section">
            {categories.map((category)=>(
                <div key={category._id} className="category-item" >
                    <img width={100} height={100} src={category.image} alt={category.name}/>
                    <div className="category-name">{category.name}</div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Categories;