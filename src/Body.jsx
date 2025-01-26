// import React, { useEffect, useState } from 'react';
// import './Body.css'; // Assuming you have a CSS file for styling

// function Body() {
//     const [categories, setCategories] = useState([]);
//     const [mealsByCategory, setMealsByCategory] = useState({});
//     const [mealDetails, setMealDetails] = useState(null);
//     const [expandedCategory, setExpandedCategory] = useState(null);

//     useEffect(() => {
//         fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//             .then(response => response.json())
//             .then(data => {
//                 setCategories(data.categories);
//                 data.categories.forEach(category => {
//                     fetchMeals(category.strCategory);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching categories:', error);
//             });
//     }, []);

//     const fetchMeals = (category) => {
//         const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 setMealsByCategory(prevState => ({
//                     ...prevState,
//                     [category]: data.meals
//                 }));
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//     };

//     const fetchMealDetails = (mealId) => {
//         const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.meals) {
//                     setMealDetails(data.meals[0]);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching meal details:', error);
//             });
//     };

//     const getIngredients = (meal) => {
//         const ingredients = [];
//         for (let i = 1; i <= 20; i++) {
//             const ingredient = meal[`strIngredient${i}`];
//             const measure = meal[`strMeasure${i}`];
//             if (ingredient && ingredient.trim() !== '') {
//                 ingredients.push(`${ingredient} - ${measure}`);
//             }
//         }
//         return ingredients;
//     };

//     const getIngredientImages = (meal) => {
//         const ingredientImages = [];
//         for (let i = 1; i <= 20; i++) {
//             const ingredient = meal[`strIngredient${i}`];
//             if (ingredient && ingredient.trim() !== '') {
//                 const imgUrl = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
//                 ingredientImages.push(
//                     <div className="ingredient-image" key={ingredient}>
//                         <img src={imgUrl} alt={ingredient} />
//                         <p>{ingredient}</p>
//                     </div>
//                 );
//             }
//         }
//         return ingredientImages;
//     };

//     return (
//         <div>
//             <h2>Meals by Category</h2>
//             {categories.map(category => (
//                 <div key={category.idCategory}>
//                     <h3>{category.strCategory}</h3>
//                     <div className="meal-list">
//                         {mealsByCategory[category.strCategory] && mealsByCategory[category.strCategory].slice(0, expandedCategory === category.strCategory ? mealsByCategory[category.strCategory].length : 3).map(meal => (
//                             <div className="meal-card" key={meal.idMeal} onClick={() => fetchMealDetails(meal.idMeal)}>
//                                 <h4>{meal.strMeal}</h4>
//                                 <img src={meal.strMealThumb} alt={meal.strMeal} />
//                             </div>
//                         ))}
//                     </div>
//                     {mealsByCategory[category.strCategory] && mealsByCategory[category.strCategory].length > 3 && (
//                         <button className="arrow-button" onClick={() => setExpandedCategory(expandedCategory === category.strCategory ? null : category.strCategory)}>
//                             {expandedCategory === category.strCategory ? '↑' : '↓'}
//                         </button>
//                     )}
//                 </div>
//             ))}

//             {mealDetails && (
//                 <div id="mealDetails" className="meal">
//                     <h3>{mealDetails.strMeal}</h3>
//                     <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
//                     <p><strong>Category:</strong> {mealDetails.strCategory}</p>
//                     <p><strong>Area:</strong> {mealDetails.strArea}</p>
//                     <p><strong>Instructions:</strong> {mealDetails.strInstructions}</p>
//                     <h4>Ingredients:</h4>
//                     <ul>
//                         {getIngredients(mealDetails).map((ingredient, index) => (
//                             <li key={index}>{ingredient}</li>
//                         ))}
//                     </ul>
//                     <h4>Ingredient Images:</h4>
//                     <div className="ingredient-images">
//                         {getIngredientImages(mealDetails)}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Body;

import React, { useEffect, useState } from 'react';

function Body() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                const obj = await response.json();
                setData(obj.categories); // Assuming you want to store categories in the state
                console.log(obj);
            } catch (e) {
                console.log("Failed to get data", e);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div>
            {data.length > 0 ? (
                <ul>
                    {data.map(category => (
                        <li key={category.idCategory}>{category.strCategory}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Body;