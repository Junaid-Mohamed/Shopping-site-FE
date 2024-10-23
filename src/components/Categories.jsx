import bakery from "../assets/images/bakery.jpg";
import beverages from "../assets/images/beverages.jpg";
import dairy from "../assets/images/dairy&eggs.jpg";
import fruits from "../assets/images/fruits&veggies.jpg";
import snacks from "../assets/images/snacks.jpg";
import "./categories.css";

const Categories = () => {

    const categories = [
        {
            name: 'Fruits & Vegetables',
            image: fruits
        },
        {
            name: 'Dairy & Eggs',
            image: dairy
        },
        {
            name: 'Beverages',
            image: beverages
        },
        {
            name: 'Bakery',
            image: bakery
        },
        {
            name: 'Snacks',
            image: snacks
        },
    ]


    return(
        <div className="container">
        <div className="categories-section">
            {categories.map((category,index)=>(
                <div key={index} className="category-item" >
                    <img width={100} height={100} src={category.image} alt={category.name}/>
                    <div className="category-name">{category.name}</div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Categories;